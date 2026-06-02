async function fetchIntelligenceData(
  countryName
) {
  try {

    const response = await fetch(
      `http://localhost:5000/api/intelligence/${countryName}`
    );

    const data =
      await response.json();

    return data;

  } catch (error) {

    console.error(error);

    return null;

  }
}

export default fetchIntelligenceData;