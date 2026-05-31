const express = require("express");

const {getEconomyData} = require("../controllers/economyController");

const router = express.Router();

router.get("/:countryCode", getEconomyData);

module.exports = router;