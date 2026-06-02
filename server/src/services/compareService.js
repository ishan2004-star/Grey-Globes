const {
  fetchIntelligenceData,
} = require("./intelligenceService");

const fetchCompareData = async (
  countryA,
  countryB
) => {
  try {

    const [
      country1,
      country2,
    ] = await Promise.all([

      fetchIntelligenceData(
        countryA
      ),

      fetchIntelligenceData(
        countryB
      ),

    ]);

    return {
      country1,
      country2,
    };

  } catch (error) {

    console.error(error);

    return null;

  }
};

module.exports = {
  fetchCompareData,
};