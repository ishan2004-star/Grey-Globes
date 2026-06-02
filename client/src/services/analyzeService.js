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
}

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