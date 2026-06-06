const mongoose = require("mongoose");

const comparisonSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  countries: {
    type: [String],
    required: [true, "Countries array is required"],
    validate: {
      validator: (arr) => arr.length >= 2,
      message: "At least two countries are required",
    },
  },
  title: {
    type: String,
    trim: true,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

comparisonSchema.index({ userId: 1 });

module.exports = mongoose.model("Comparison", comparisonSchema);
