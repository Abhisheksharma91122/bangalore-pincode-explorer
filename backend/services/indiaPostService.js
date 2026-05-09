const axios = require('axios');
const axiosRetry = require('axios-retry').default;
const NodeCache = require('node-cache');
const Pincode = require('../models/Pincode');

// Cache for 1 hour, check expired every 10 mins
const apiCache = new NodeCache({ stdTTL: 3600, checkperiod: 600 });

// Configure axios with retry logic
const apiClient = axios.create({
  baseURL: 'https://api.postalpincode.in',
  timeout: 5000, // 5 seconds timeout
});

axiosRetry(apiClient, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.code === 'ECONNABORTED';
  },
});

/**
 * Normalizes the India Post API response and saves it to MongoDB.
 */
const normalizeAndSave = async (postOffices) => {
  if (!postOffices || postOffices.length === 0) return [];

  const normalized = postOffices.map((po) => ({
    areaName: po.Name,
    pincode: po.Pincode,
    district: po.District,
    state: po.State,
    region: po.Region,
    deliveryStatus: po.DeliveryStatus,
    taluk: po.Block || po.Taluk,
    // Latitude/Longitude are not provided by this API
  }));

  // Save to DB asynchronously to not block the response
  setTimeout(async () => {
    try {
      for (const item of normalized) {
        // Upsert to prevent duplicates
        await Pincode.updateOne(
          { areaName: item.areaName, pincode: item.pincode },
          { $set: item },
          { upsert: true }
        );
      }
    } catch (err) {
      console.error('Error saving fetched data to MongoDB:', err.message);
    }
  }, 0);

  return normalized;
};

/**
 * Fetch data from India Post API by Pincode
 */
const fetchByPincode = async (pincode) => {
  const cacheKey = `pincode_${pincode}`;
  const cachedData = apiCache.get(cacheKey);
  if (cachedData) return cachedData;

  try {
    const { data } = await apiClient.get(`/pincode/${pincode}`);
    if (data && data[0] && data[0].Status === 'Success') {
      const results = await normalizeAndSave(data[0].PostOffice);
      apiCache.set(cacheKey, results);
      return results;
    }
    return []; // Not found or error
  } catch (error) {
    console.error(`India Post API Error (Pincode ${pincode}):`, error.message);
    return []; // Return empty array on failure as fallback
  }
};

/**
 * Fetch data from India Post API by Area/Post Office Name
 */
const fetchByArea = async (areaName) => {
  // Normalize string for caching
  const cacheKey = `area_${areaName.toLowerCase().trim()}`;
  const cachedData = apiCache.get(cacheKey);
  if (cachedData) return cachedData;

  try {
    const { data } = await apiClient.get(`/postoffice/${encodeURIComponent(areaName)}`);
    if (data && data[0] && data[0].Status === 'Success') {
      const results = await normalizeAndSave(data[0].PostOffice);
      apiCache.set(cacheKey, results);
      return results;
    }
    return [];
  } catch (error) {
    console.error(`India Post API Error (Area ${areaName}):`, error.message);
    return [];
  }
};

module.exports = {
  fetchByPincode,
  fetchByArea,
};
