const axios = require("axios");

const fetchCountryDetails = async (countryName) => {
  try {

    const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);

    if (!response.data?.length) {return null;}


    const country = response.data[0];

    return {

      atlas: {

        name: country.name.common,

        officialName: country.name.official,

        code: country.cca2,

        lat: country.latlng?.[0],

        lng: country.latlng?.[1],

        capital: country.capital?.[0],

        population: country.population,

        area: country.area,

        region: country.region,

        timezone: country.timezones?.[0],

        flag: country.flags?.svg,

        map: country.maps?.googleMaps,

        languages:
          Object.values(
            country.languages || {}
          ).join(", "),

        currency:
          Object.values(
            country.currencies || {}
          )[0]?.name,

        forestCoverage:
          "Data unavailable",
      },

    };

  } catch (error) {

    console.error(error);

    return null;

  }
};

module.exports = {
  fetchCountryDetails,
};