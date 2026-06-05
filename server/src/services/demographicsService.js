const axios = require("axios");

/**
 * Fetches demographic indicators from World Bank API.
 * Indicators:
 *   SP.POP.GROW    — Population Growth Rate (%)
 *   SP.DYN.CBRT.IN — Birth Rate (per 1,000)
 *   SP.DYN.CDRT.IN — Death Rate (per 1,000)
 *   SP.DYN.LE00.IN — Life Expectancy (years)
 */

const INDICATORS = {
  populationGrowth: "SP.POP.GROW",
  birthRate: "SP.DYN.CBRT.IN",
  deathRate: "SP.DYN.CDRT.IN",
  lifeExpectancy: "SP.DYN.LE00.IN",
};

const getLatestValue = (data) => {
  if (!data?.[1]) return null;
  const entry = data[1].find((item) => item.value !== null);
  return entry || null;
};

const fetchDemographicsData = async (countryCode) => {
  try {

    const requests = Object.values(INDICATORS).map((indicator) =>
      axios.get(
        `https://api.worldbank.org/v2/country/${countryCode}/indicator/${indicator}?format=json`
      )
    );

    const responses = await Promise.all(requests);

    const [popGrowth, birth, death, lifeExp] = responses.map(
      (r) => getLatestValue(r.data)
    );

    return {

      populationGrowth: popGrowth?.value != null
        ? `${popGrowth.value.toFixed(2)}%`
        : "Data Not Available",

      birthRate: birth?.value != null
        ? `${birth.value.toFixed(1)} per 1,000`
        : "Data Not Available",

      deathRate: death?.value != null
        ? `${death.value.toFixed(1)} per 1,000`
        : "Data Not Available",

      lifeExpectancy: lifeExp?.value != null
        ? `${lifeExp.value.toFixed(1)} years`
        : "Data Not Available",

    };

  } catch (error) {

    console.error("Demographics fetch error:", error.message);

    return {
      populationGrowth: "Data Not Available",
      birthRate: "Data Not Available",
      deathRate: "Data Not Available",
      lifeExpectancy: "Data Not Available",
    };

  }
};

module.exports = {
  fetchDemographicsData,
};
