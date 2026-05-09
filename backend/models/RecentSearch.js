const mongoose = require('mongoose');

const recentSearchSchema = new mongoose.Schema(
  {
    query: {
      type: String,
      required: true,
      index: true,
    },
    type: {
      type: String, // 'pincode' or 'area' or 'mixed'
      required: true,
    },
    searchedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Optional: Automatically delete searches older than 30 days
recentSearchSchema.index({ searchedAt: 1 }, { expireAfterSeconds: 30 * 24 * 60 * 60 });

const RecentSearch = mongoose.model('RecentSearch', recentSearchSchema);

module.exports = RecentSearch;
