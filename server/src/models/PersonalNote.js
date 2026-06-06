const mongoose = require("mongoose");

const personalNoteSchema = new mongoose.Schema({
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
  note: {
    type: String,
    required: [true, "Note content is required"],
    trim: true,
    maxlength: [2000, "Note must not exceed 2000 characters"],
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// One note per user per country
personalNoteSchema.index(
  { userId: 1, countryCode: 1 },
  { unique: true }
);

module.exports = mongoose.model("PersonalNote", personalNoteSchema);
