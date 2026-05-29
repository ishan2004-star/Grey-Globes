async function fetchEconomyData(countryCode) {

  try {

    const [
      gdpResponse,
      perCapitaResponse,
      inflationResponse,
      unemploymentResponse
    ] = await Promise.all([

      fetch(
        `https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.MKTP.CD?format=json`
      ),

      fetch(
        `https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.PCAP.CD?format=json`
      ),

      fetch(
        `https://api.worldbank.org/v2/country/${countryCode}/indicator/FP.CPI.TOTL.ZG?format=json`
      ),

      fetch(
        `https://api.worldbank.org/v2/country/${countryCode}/indicator/SL.UEM.TOTL.ZS?format=json`
      )

    ]);

    const gdpData =
      await gdpResponse.json();

    const perCapitaData =
      await perCapitaResponse.json();

    const inflationData =
      await inflationResponse.json();

    const unemploymentData =
      await unemploymentResponse.json();

    const latestGDP =
      gdpData[1]?.find(
        item => item.value !== null
      );

    const latestPerCapita =
      perCapitaData[1]?.find(
        item => item.value !== null
      );

    const latestInflation =
      inflationData[1]?.find(
        item => item.value !== null
      );

    const latestUnemployment =
      unemploymentData[1]?.find(
        item => item.value !== null
      );

    return {

      gdp:
        latestGDP?.value
          ? `$${(
              latestGDP.value / 1e12
            ).toFixed(2)}T`
          : "Unavailable",

      growth:
        "Macroeconomic intelligence aggregated from World Bank financial datasets and global development indicators.",

      gdpPerCapita:
        latestPerCapita?.value
          ? `$${Math.round(
              latestPerCapita.value
            ).toLocaleString()}`
          : "Unavailable",

      inflation:
        latestInflation?.value
          ? `${latestInflation.value.toFixed(2)}%`
          : "Unavailable",

      unemployment:
        latestUnemployment?.value
          ? `${latestUnemployment.value.toFixed(1)}%`
          : "Unavailable",

      workforce:
        "National Workforce Active",

      industries: [

        "Technology",
        "Manufacturing",
        "Finance",
        "Energy",
        "Infrastructure",
        "Logistics"

      ],

      overview:
        "Economic intelligence combines GDP performance, inflationary behavior, labor indicators and structural development signals sourced from global financial institutions."

    };

  } catch (error) {

    console.log(error);

    return {

      gdp: "Unavailable",

      growth:
        "Economic intelligence unavailable.",

      gdpPerCapita:
        "Unavailable",

      inflation:
        "Unavailable",

      unemployment:
        "Unavailable",

      workforce:
        "Unavailable",

      industries: [

        "Unavailable"

      ],

      overview:
        "Economic intelligence unavailable."

    };

  }

}

export default fetchEconomyData;