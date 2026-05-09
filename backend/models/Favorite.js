const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema(
  {
    areaName: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      default: 'anonymous', // For simplicity, assume anonymous or IP-based if no auth
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
