const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  upsertNote,
  getMyNotes,
  getNoteByCountry,
  deleteNote,
} = require("../controllers/noteController");

// All note routes are protected — notes are private
router.put("/", auth, upsertNote);
router.get("/", auth, getMyNotes);
router.get("/:countryCode", auth, getNoteByCountry);
router.delete("/:id", auth, deleteNote);

module.exports = router;
