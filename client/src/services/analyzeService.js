export const availableMetrics = [

  {
    id: "gdp",
    label: "GDP (USD Trillion)"
  },

  {
    id: "gdpPerCapita",
    label: "GDP Per Capita (USD)"
  },

  {
    id: "population",
    label: "Population"
  },

  {
    id: "lifeExpectancy",
    label: "Life Expectancy (Years)"
  },

  {
    id: "inflation",
    label: "Inflation (%)"
  },

  {
    id: "area",
    label: "Area (km²)"
  },

  // Phase 3A metrics
  {
    id: "gdpGrowthRate",
    label: "GDP Growth Rate (%)"
  },

  {
    id: "populationGrowth",
    label: "Population Growth (%)"
  },

  {
    id: "birthRate",
    label: "Birth Rate (per 1,000)"
  },

  {
    id: "deathRate",
    label: "Death Rate (per 1,000)"
  },

  {
    id: "forestCoverage",
    label: "Forest Coverage (%)"
  },

  {
    id: "literacyRate",
    label: "Literacy Rate (%)"
  },

  {
    id: "schoolEnrollment",
    label: "School Enrollment (%)"
  },

  {
    id: "internetUsers",
    label: "Internet Users (%)"
  },

  {
    id: "unemployment",
    label: "Unemployment Rate (%)"
  },

];

export const fetchAllAndAnalyze = async (
  metricId,
  direction = "desc"
) => {

  try {

    const response =
      await fetch(
        `http://localhost:5000/api/analysis?metric=${metricId}&sort=${direction}`
      );

    const data =
      await response.json();

    return data;

  }

  catch (error) {

    console.error(error);

    return [];

  }

};