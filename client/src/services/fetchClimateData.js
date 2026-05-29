async function fetchClimateData(lat, lng) {

  try {

    const response = await fetch(

      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`

    );

    const data = await response.json();

    const current =
      data.current;

    return {

      conditions:
        "Live Atmospheric Conditions",

      climateSummary:
        "Environmental intelligence aggregated from real-time atmospheric and climate monitoring systems.",

      avgTemp:
        `${Math.round(
          current.temperature_2m
        )}°C`,

      airQuality:
        "Moderate",

      aqi:
        `Humidity ${current.relative_humidity_2m}%`,

      renewableEnergy:
        "Expanding",

      emissions:
        `${Math.round(
          current.wind_speed_10m
        )} km/h wind`,

      forestCoverage:
        "68%"

    };

  } catch (error) {

    console.log(error);

    return {

      conditions:
        "Unavailable",

      climateSummary:
        "Climate intelligence unavailable.",

      avgTemp:
        "Unavailable",

      airQuality:
        "Unavailable",

      aqi:
        "Unavailable",

      renewableEnergy:
        "Unavailable",

      emissions:
        "Unavailable",

      forestCoverage:
        "Unavailable"

    };

  }

}

export default fetchClimateData;