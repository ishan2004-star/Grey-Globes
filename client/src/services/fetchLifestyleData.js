async function fetchLifestyleData(countryData) {

  try {

    const region =
      countryData.atlas.region;

    const gdp =
      countryData.economy.gdpPerCapita;

    let happiness = "7.2";

    let healthcare = "Advanced";

    let education = "High";

    let internet = "Excellent";

    let safety = "Stable";

    let workLife = "Balanced";

    let costOfLiving = "Moderate";

    let mobilitySummary =
      "Modern urban transportation infrastructure with expanding digital connectivity and metropolitan accessibility.";

    if (region === "Europe") {

      happiness = "7.8";

      healthcare = "World-Class";

      education = "Advanced";

      internet = "Exceptional";

      safety = "High";

      workLife = "Excellent";

      costOfLiving = "High";

    }

    if (region === "Asia") {

      happiness = "6.9";

      healthcare = "Strong";

      education = "Competitive";

      internet = "Highly Connected";

      safety = "Moderate";

      workLife = "Demanding";

      costOfLiving = "Variable";

    }

    if (region === "Africa") {

      happiness = "5.8";

      healthcare = "Developing";

      education = "Emerging";

      internet = "Expanding";

      safety = "Variable";

      workLife = "Dynamic";

      costOfLiving = "Affordable";

    }

    if (region === "Americas") {

      happiness = "7.1";

      healthcare = "Advanced";

      education = "Strong";

      internet = "Excellent";

      safety = "Moderate";

      workLife = "Fast-Paced";

      costOfLiving = "Elevated";

    }

    return {

      happiness,

      healthcare,

      education,

      internet,

      safety,

      workLife,

      costOfLiving,

      mobilitySummary

    };

  } catch (error) {

    console.log(error);

    return {

      happiness:
        "Unavailable",

      healthcare:
        "Unavailable",

      education:
        "Unavailable",

      internet:
        "Unavailable",

      safety:
        "Unavailable",

      workLife:
        "Unavailable",

      costOfLiving:
        "Unavailable",

      mobilitySummary:
        "Lifestyle intelligence unavailable."

    };

  }

}

export default fetchLifestyleData;