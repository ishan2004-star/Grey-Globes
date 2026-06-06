const Comparison = require("../models/Comparison");

// POST /api/comparisons
const saveComparison = async (req, res) => {
  try {
    const { countries, title } = req.body;

    if (!countries || !Array.isArray(countries) || countries.length < 2) {
      return res.status(400).json({
        success: false,
        message: "At least two countries are required.",
      });
    }

    const comparison = await Comparison.create({
      userId: req.user._id,
      countries,
      title: title || "",
    });

    res.status(201).json({ success: true, data: comparison });
  } catch (error) {
    console.error("Save comparison error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// GET /api/comparisons
const getComparisons = async (req, res) => {
  try {
    const comparisons = await Comparison.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: comparisons });
  } catch (error) {
    console.error("Get comparisons error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// DELETE /api/comparisons/:id
const deleteComparison = async (req, res) => {
  try {
    const { id } = req.params;

    const comparison = await Comparison.findById(id);

    if (!comparison) {
      return res.status(404).json({
        success: false,
        message: "Comparison not found.",
      });
    }

    if (comparison.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized.",
      });
    }

    await Comparison.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Comparison deleted." });
  } catch (error) {
    console.error("Delete comparison error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

module.exports = { saveComparison, getComparisons, deleteComparison };
