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

        // Phase 3A — Geography
        borders: country.borders?.length
          ? country.borders.join(", ")
          : "None (Island Nation)",

        coordinates: country.latlng?.length === 2
          ? `${country.latlng[0].toFixed(2)}°, ${country.latlng[1].toFixed(2)}°`
          : "Data Not Available",

        landlocked: country.landlocked
          ? "Yes"
          : "No",

        // Phase 3A — Society
        drivingSide: country.car?.side
          ? country.car.side.charAt(0).toUpperCase() + country.car.side.slice(1)
          : "Data Not Available",

        demonym: country.demonyms?.eng?.m || "Data Not Available",
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