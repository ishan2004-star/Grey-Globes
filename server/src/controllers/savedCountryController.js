const SavedCountry = require("../models/SavedCountry");

// POST /api/saved-countries
const saveCountry = async (req, res) => {
  try {
    const { countryCode } = req.body;

    if (!countryCode) {
      return res.status(400).json({
        success: false,
        message: "Country code is required.",
      });
    }

    const existing = await SavedCountry.findOne({
      userId: req.user._id,
      countryCode,
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Country already saved.",
      });
    }

    const saved = await SavedCountry.create({
      userId: req.user._id,
      countryCode,
    });

    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    console.error("Save country error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// GET /api/saved-countries
const getSavedCountries = async (req, res) => {
  try {
    const saved = await SavedCountry.find({
      userId: req.user._id,
    }).sort({ savedAt: -1 });

    res.status(200).json({ success: true, data: saved });
  } catch (error) {
    console.error("Get saved countries error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// DELETE /api/saved-countries/:countryCode
const unsaveCountry = async (req, res) => {
  try {
    const { countryCode } = req.params;

    const result = await SavedCountry.findOneAndDelete({
      userId: req.user._id,
      countryCode,
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Saved country not found.",
      });
    }

    res.status(200).json({ success: true, message: "Country removed." });
  } catch (error) {
    console.error("Unsave country error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// GET /api/saved-countries/check/:countryCode
const checkSaved = async (req, res) => {
  try {
    const { countryCode } = req.params;

    const exists = await SavedCountry.findOne({
      userId: req.user._id,
      countryCode,
    });

    res.status(200).json({ success: true, saved: !!exists });
  } catch (error) {
    console.error("Check saved error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

module.exports = { saveCountry, getSavedCountries, unsaveCountry, checkSaved };
