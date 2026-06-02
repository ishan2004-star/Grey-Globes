const express = require("express");

const {
  getIntelligenceData,
} = require("../controllers/intelligenceController");

const router = express.Router();

router.get("/:countryName", getIntelligenceData);

module.exports = router;