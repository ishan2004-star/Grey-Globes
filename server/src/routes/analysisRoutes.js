const express = require("express");

const {
  getAnalysisData,
} = require("../controllers/analysisController");

const router = express.Router();

router.get("/", getAnalysisData);

module.exports = router;