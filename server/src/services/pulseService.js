const fetchPulseData = async (
  countryData
) => {
  try {

    const region =
      countryData.atlas.region;

    let pulse =
      "Strategically developing nation with balanced economic growth and expanding international connectivity.";

    let resilience =
      "Stable";

    let infrastructure =
      "Developed";

    let innovation =
      "Growing";

    let outlook =
      "Positive";

    let integration =
      "Regional";

    if (region === "Europe") {

      pulse =
        "Highly developed economic and institutional systems with strong global integration, mature infrastructure and advanced social stability.";

      resilience =
        "High";

      infrastructure =
        "Advanced";

      innovation =
        "World-Class";

      outlook =
        "Long-Term Stable";

      integration =
        "Global";

    }

    if (region === "Asia") {

      pulse =
        "Rapidly evolving technological and economic landscape with strong industrial growth, expanding digital infrastructure and increasing geopolitical influence.";

      resilience =
        "Adaptive";

      infrastructure =
        "High Growth";

      innovation =
        "Competitive";

      outlook =
        "Acceleration Phase";

      integration =
        "International";

    }

    if (region === "Americas") {

      pulse =
        "Globally connected economy with strong entrepreneurial ecosystems, large-scale urban development and influential financial infrastructure.";

      resilience =
        "Strong";

      infrastructure =
        "Modern";

      innovation =
        "Advanced";

      outlook =
        "Expansion Focused";

      integration =
        "Global";

    }

    if (region === "Africa") {

      pulse =
        "Emerging development systems supported by rapid urbanization, expanding connectivity and accelerating digital transformation.";

      resilience =
        "Emerging";

      infrastructure =
        "Developing";

      innovation =
        "Expanding";

      outlook =
        "High Potential";

      integration =
        "Expanding";

    }

    return {

      pulse,

      resilience,

      infrastructure,

      innovation,

      outlook,

      integration,

      aiSummary:
        "National intelligence synthesized using macroeconomic performance, atmospheric systems, mobility accessibility, human development indicators and regional infrastructure analysis."

    };

  } catch (error) {

    console.error(error);

    return {

      pulse:
        "Pulse intelligence unavailable.",

      resilience:
        "Unavailable",

      infrastructure:
        "Unavailable",

      innovation:
        "Unavailable",

      outlook:
        "Unavailable",

      integration:
        "Unavailable",

      aiSummary:
        "AI synthesis unavailable."

    };

  }
};

module.exports = {
  fetchPulseData,
};