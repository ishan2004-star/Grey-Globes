const axios = require("axios");

/**
 * Fetches extended World Bank indicators for a country.
 * Indicators:
 *   AG.LND.FRST.ZS    — Forest area (% of land area)
 *   SE.ADT.LITR.ZS     — Literacy rate (% adults)
 *   SE.PRM.ENRR         — School enrollment, primary (% gross)
 *   IT.NET.USER.ZS       — Internet users (% of population)
 */

const INDICATORS = {
  forestCoverage: "AG.LND.FRST.ZS",
  literacyRate: "SE.ADT.LITR.ZS",
  schoolEnrollment: "SE.PRM.ENRR",
  internetUsers: "IT.NET.USER.ZS",
};

const getLatestValue = (data) => {
  if (!data?.[1]) return null;
  const entry = data[1].find((item) => item.value !== null);
  return entry || null;
};

const fetchWorldBankExtendedData = async (countryCode) => {
  try {

    const requests = Object.values(INDICATORS).map((indicator) =>
      axios.get(
        `https://api.worldbank.org/v2/country/${countryCode}/indicator/${indicator}?format=json`
      )
    );

    const responses = await Promise.all(requests);

    const [forest, literacy, enrollment, internet] = responses.map(
      (r) => getLatestValue(r.data)
    );

    return {

      forestCoverage: forest?.value != null
        ? `${forest.value.toFixed(1)}%`
        : "Data Not Available",

      literacyRate: literacy?.value != null
        ? `${literacy.value.toFixed(1)}%`
        : "Data Not Available",

      schoolEnrollment: enrollment?.value != null
        ? `${enrollment.value.toFixed(1)}%`
        : "Data Not Available",

      internetUsers: internet?.value != null
        ? `${internet.value.toFixed(1)}%`
        : "Data Not Available",

    };

  } catch (error) {

    console.error("World Bank extended fetch error:", error.message);

    return {
      forestCoverage: "Data Not Available",
      literacyRate: "Data Not Available",
      schoolEnrollment: "Data Not Available",
      internetUsers: "Data Not Available",
    };

  }
};

module.exports = {
  fetchWorldBankExtendedData,
};
