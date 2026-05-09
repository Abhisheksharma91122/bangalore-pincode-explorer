const mongoose = require('mongoose');

const pincodeSchema = new mongoose.Schema(
  {
    areaName: {
      type: String,
      required: true,
      index: true,
    },
    pincode: {
      type: String,
      required: true,
      index: true,
    },
    district: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    taluk: {
      type: String,
    },
    region: {
      type: String,
    },
    deliveryStatus: {
      type: String,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

// Create compound and text indexes for faster searches
pincodeSchema.index({ areaName: 'text', pincode: 'text' });
pincodeSchema.index({ pincode: 1, areaName: 1 });

const Pincode = mongoose.model('Pincode', pincodeSchema);

module.exports = Pincode;
