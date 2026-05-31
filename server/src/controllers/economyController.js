const {
  fetchEconomyData,
} = require("../services/economyService");

const getEconomyData = async (
  req,
  res
) => {
  try {

    const { countryCode } =
      req.params;

    const economy =
      await fetchEconomyData(
        countryCode
      );

    res.status(200).json(
      economy
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
  getEconomyData,
};