const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
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
  text: {
    type: String,
    required: [true, "Comment text is required"],
    trim: true,
    maxlength: [1000, "Comment must not exceed 1000 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

commentSchema.index({ countryCode: 1, createdAt: -1 });
commentSchema.index({ userId: 1 });

module.exports = mongoose.model("Comment", commentSchema);
