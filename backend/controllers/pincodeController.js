const Pincode = require('../models/Pincode');
const { fetchByPincode } = require('../services/indiaPostService');

// @desc    Get areas by exact pincode
// @route   GET /api/pincode/:pincode
// @access  Public
const getByPincode = async (req, res, next) => {
  try {
    const { pincode } = req.params;

    let results = await Pincode.find({ pincode });

    if (!results || results.length === 0) {
      // Fallback to India Post API
      results = await fetchByPincode(pincode);
    }

    if (!results || results.length === 0) {
      return res.status(404).json({ success: false, message: 'No areas found for this pincode' });
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
  getByPincode,
};
