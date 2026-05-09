const express = require('express');
const router = express.Router();

const { search, getPopular, getRecent } = require('../controllers/searchController');
const { getByPincode } = require('../controllers/pincodeController');
const { getByArea } = require('../controllers/areaController');

// Search routes
router.get('/search', search);
router.get('/popular', getPopular);
router.get('/recent', getRecent);

// Specific routes
router.get('/pincode/:pincode', getByPincode);
router.get('/area/:name', getByArea);

module.exports = router;
