async function fetchMobilityData(countryData) {

  try {

    const region =
      countryData.atlas.region;

    const languages =
      countryData.atlas.languages;

    let immigration =
      "Moderate";

    let students =
      "Accessible";

    let jobs =
      "Competitive";

    let prAccess =
      "Structured";

    let visaComplexity =
      "Moderate";

    let englishSupport =
      "Limited";

    let exposure =
      "Regional";

    let ecosystem =
      "Emerging digital infrastructure with growing international mobility opportunities.";

    if (region === "Europe") {

      immigration =
        "High";

      students =
        "Excellent";

      jobs =
        "Advanced";

      prAccess =
        "Open";

      visaComplexity =
        "Moderate";

      englishSupport =
        "Strong";

      exposure =
        "Global";

      ecosystem =
        "Highly connected innovation ecosystems with strong startup density and advanced remote-work infrastructure.";

    }

    if (region === "Asia") {

      immigration =
        "Selective";

      students =
        "Competitive";

      jobs =
        "High Growth";

      prAccess =
        "Restricted";

      visaComplexity =
        "Complex";

      englishSupport =
        "Moderate";

      exposure =
        "Global";

      ecosystem =
        "Rapidly expanding digital economies with strong technology adoption and cross-border workforce growth.";

    }

    if (region === "Americas") {

      immigration =
        "Opportunity Driven";

      students =
        "Strong";

      jobs =
        "Expansive";

      prAccess =
        "Variable";

      visaComplexity =
        "Moderate";

      englishSupport =
        "High";

      exposure =
        "International";

      ecosystem =
        "Mature entrepreneurial ecosystems with globally integrated technology and finance sectors.";

    }

    if (region === "Africa") {

      immigration =
        "Developing";

      students =
        "Emerging";

      jobs =
        "Growing";

      prAccess =
        "Evolving";

      visaComplexity =
        "Variable";

      englishSupport =
        "Moderate";

      exposure =
        "Expanding";

      ecosystem =
        "Rapid urbanization and digital expansion creating new mobility and startup opportunities.";

    }

    if (
      languages.includes("English")
    ) {

      englishSupport =
        "Native-Level";

    }

    return {

      immigration,

      students,

      jobs,

      prAccess,

      visaComplexity,

      englishSupport,

      exposure,

      ecosystem

    };

  } catch (error) {

    console.log(error);

    return {

      immigration:
        "Unavailable",

      students:
        "Unavailable",

      jobs:
        "Unavailable",

      prAccess:
        "Unavailable",

      visaComplexity:
        "Unavailable",

      englishSupport:
        "Unavailable",

      exposure:
        "Unavailable",

      ecosystem:
        "Mobility intelligence unavailable."

    };

  }

}

export default fetchMobilityData;