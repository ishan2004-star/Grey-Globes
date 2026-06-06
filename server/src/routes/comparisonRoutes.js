const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  saveComparison,
  getComparisons,
  deleteComparison,
} = require("../controllers/comparisonController");

router.post("/", auth, saveComparison);
router.get("/", auth, getComparisons);
router.delete("/:id", auth, deleteComparison);

module.exports = router;
