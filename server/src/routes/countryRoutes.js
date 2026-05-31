const express = require("express");

const router = express.Router();

const { getCountryDetails } = require("../controllers/countryController");

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Country API Endpoint",
  });
});

router.get("/:countryName", getCountryDetails);

module.exports = router;