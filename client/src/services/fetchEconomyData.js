async function fetchEconomyData(countryCode) {
  try {

    const response = await fetch(
      `http://localhost:5000/api/economy/${countryCode}`
    );

    const data = await response.json();

    return data;

  } catch (error) {

    console.log(error);

    return {
      gdp: "Unavailable",
      growth: "Economic intelligence unavailable.",
      gdpPerCapita: "Unavailable",
      inflation: "Unavailable",
      unemployment: "Unavailable",
      workforce: "Unavailable",
      industries: ["Unavailable"],
      overview: "Economic intelligence unavailable."
    };

  }
}

export default fetchEconomyData;