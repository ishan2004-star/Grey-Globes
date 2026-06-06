const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createComment,
  getCommentsByCountry,
  getMyComments,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");

// Protected: user's own comments (must be before /:countryCode)
router.get("/user/me", auth, getMyComments);

// Public: get comments for a country
router.get("/:countryCode", getCommentsByCountry);

// Protected: create, update, delete
router.post("/", auth, createComment);
router.put("/:id", auth, updateComment);
router.delete("/:id", auth, deleteComment);

module.exports = router;
