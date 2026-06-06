const Comment = require("../models/Comment");

// POST /api/comments
const createComment = async (req, res) => {
  try {
    const { countryCode, text } = req.body;

    if (!countryCode || !text) {
      return res.status(400).json({
        success: false,
        message: "Country code and comment text are required.",
      });
    }

    const comment = await Comment.create({
      userId: req.user._id,
      countryCode,
      text,
    });

    // Populate user info for immediate display
    const populated = await Comment.findById(comment._id).populate(
      "userId",
      "username"
    );

    res.status(201).json({ success: true, data: populated });
  } catch (error) {
    console.error("Create comment error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// GET /api/comments/:countryCode
const getCommentsByCountry = async (req, res) => {
  try {
    const { countryCode } = req.params;

    const comments = await Comment.find({ countryCode })
      .populate("userId", "username")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: comments });
  } catch (error) {
    console.error("Get comments error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// GET /api/comments/user/me
const getMyComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      userId: req.user._id,
    })
      .populate("userId", "username")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: comments });
  } catch (error) {
    console.error("Get my comments error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// PUT /api/comments/:id
const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Comment text is required.",
      });
    }

    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found.",
      });
    }

    if (comment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to edit this comment.",
      });
    }

    comment.text = text;
    await comment.save();

    const populated = await Comment.findById(comment._id).populate(
      "userId",
      "username"
    );

    res.status(200).json({ success: true, data: populated });
  } catch (error) {
    console.error("Update comment error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// DELETE /api/comments/:id
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found.",
      });
    }

    if (comment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this comment.",
      });
    }

    await Comment.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Comment deleted." });
  } catch (error) {
    console.error("Delete comment error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

module.exports = {
  createComment,
  getCommentsByCountry,
  getMyComments,
  updateComment,
  deleteComment,
};
