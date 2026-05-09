const Pincode = require('../models/Pincode');
const RecentSearch = require('../models/RecentSearch');
const { fetchByPincode, fetchByArea } = require('../services/indiaPostService');

// @desc    Universal search for pincode or area
// @route   GET /api/search?q=...
// @access  Public
const search = async (req, res, next) => {
  try {
    const query = req.query.q;

    if (!query || query.trim() === '') {
      return res.status(400).json({ success: false, message: 'Search query is required' });
    }

    const isNumeric = /^\d+$/.test(query);

    let filter = {};
    let results = [];
    
    if (isNumeric) {
      // If it's a number, assume it's a partial or full pincode
      filter = { pincode: { $regex: query, $options: 'i' } };
      
      // Save recent search asynchronously
      RecentSearch.create({ query, type: 'pincode' }).catch(err => console.error(err));
      
      results = await Pincode.find(filter).limit(50);
      
      // Fallback to India Post API if DB is empty and it's a valid 6-digit pin
      if (results.length === 0 && query.length === 6) {
        results = await fetchByPincode(query);
      }
    } else {
      // If text, search by area name (fuzzy/regex)
      filter = { areaName: { $regex: query, $options: 'i' } };
      
      // Save recent search asynchronously
      RecentSearch.create({ query, type: 'area' }).catch(err => console.error(err));
      
      results = await Pincode.find(filter).limit(50);
      
      // Fallback to India Post API if DB is empty
      if (results.length === 0) {
        results = await fetchByArea(query);
      }
    }

    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get popular pincodes based on recent searches
// @route   GET /api/popular
// @access  Public
const getPopular = async (req, res, next) => {
  try {
    const popular = await RecentSearch.aggregate([
      { $group: { _id: "$query", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.status(200).json({
      success: true,
      data: popular.map(item => item._id),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get recent searches
// @route   GET /api/recent
// @access  Public
const getRecent = async (req, res, next) => {
  try {
    const recent = await RecentSearch.find()
      .sort({ searchedAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      data: recent,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  search,
  getPopular,
  getRecent,
};
