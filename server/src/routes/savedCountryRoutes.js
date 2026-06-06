const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  saveCountry,
  getSavedCountries,
  unsaveCountry,
  checkSaved,
} = require("../controllers/savedCountryController");

router.post("/", auth, saveCountry);
router.get("/", auth, getSavedCountries);
router.delete("/:countryCode", auth, unsaveCountry);
router.get("/check/:countryCode", auth, checkSaved);

module.exports = router;
