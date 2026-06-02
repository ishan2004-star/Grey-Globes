const {
  fetchClimateData,
} = require("../services/climateService");

const getClimateData = async (
  req,
  res
) => {
  try {

    const { lat, lng } =
      req.params;

    const result =
      await fetchClimateData(
        lat,
        lng
      );

    if (!result) {
      return res.status(404).json({
        error:
          "Climate data not found",
      });
    }

    res.status(200).json(
      result
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
  getClimateData,
};