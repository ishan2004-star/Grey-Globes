const mongoose = require("mongoose");

const savedCountrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  countryCode: {
    type: String,
    required: [true, "Country code is required"],
    trim: true,
  },
  savedAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent duplicate saves for same user + country
savedCountrySchema.index(
  { userId: 1, countryCode: 1 },
  { unique: true }
);

module.exports = mongoose.model("SavedCountry", savedCountrySchema);
