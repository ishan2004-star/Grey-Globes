const {
  fetchIntelligenceData,
} = require("../services/intelligenceService");

const getIntelligenceData = async (
  req,
  res
) => {
  try {

    const { countryName } =
      req.params;

    const intelligence =
      await fetchIntelligenceData(
        countryName
      );

    if (!intelligence) {
      return res.status(404).json({
        success: false,
        message: "Country not found",
      });
    }

    res.status(200).json(
      intelligence
    );

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Internal Server Error",
    });

  }
};

module.exports = {
  getIntelligenceData,
};