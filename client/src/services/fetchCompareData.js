import fetchCountryData
  from "./fetchCountryData";

import fetchEconomyData
  from "./fetchEconomyData";

import fetchClimateData
  from "./fetchClimateData";

import fetchLifestyleData
  from "./fetchLifestyleData";

import fetchMobilityData
  from "./fetchMobilityData";

import fetchPulseData
  from "./fetchPulseData";

async function buildCountryProfile(query) {

  const country =
    await fetchCountryData(query);

  if (!country) return null;

  const economy =
    await fetchEconomyData(
      country.atlas.code
    );

  const climate =
    await fetchClimateData(
      country.atlas.lat,
      country.atlas.lng
    );

  const lifestyle =
    await fetchLifestyleData({
      ...country,
      economy
    });

  const mobility =
    await fetchMobilityData({
      ...country,
      economy,
      lifestyle
    });

  const pulse =
    await fetchPulseData({
      ...country,
      economy,
      climate,
      lifestyle,
      mobility
    });

  return {

    ...country,

    economy,

    climate,

    lifestyle,

    mobility,

    pulse

  };

}

async function fetchCompareData(
  countryA,
  countryB
) {

  const results =
    await Promise.all([

      buildCountryProfile(countryA),

      buildCountryProfile(countryB)

    ]);

  return results;

}

export default fetchCompareData;