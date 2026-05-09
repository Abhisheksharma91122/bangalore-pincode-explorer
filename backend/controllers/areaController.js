const Pincode = require('../models/Pincode');
const { fetchByArea } = require('../services/indiaPostService');

// @desc    Get pincodes matching an area name
// @route   GET /api/area/:name
// @access  Public
const getByArea = async (req, res, next) => {
  try {
    const { name } = req.params;

    let results = await Pincode.find({ areaName: { $regex: name, $options: 'i' } });

    if (!results || results.length === 0) {
      // Fallback to India Post API
      results = await fetchByArea(name);
    }

    if (!results || results.length === 0) {
      return res.status(404).json({ success: false, message: 'No pincode found for this area' });
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

module.exports = {
  getByArea,
};
