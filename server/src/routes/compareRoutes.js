const express = require("express");

const {
  getCompareData,
} = require("../controllers/compareController");

const router = express.Router();

router.get(
  "/",
  getCompareData
);

module.exports = router;