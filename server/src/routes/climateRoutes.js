const express = require("express");

const {getClimateData} = require("../controllers/climateController");

const router = express.Router();

router.get("/:lat/:lng", getClimateData);

module.exports = router;