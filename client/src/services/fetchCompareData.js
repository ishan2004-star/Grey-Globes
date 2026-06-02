async function fetchCompareData(
  countryA,
  countryB
) {
  try {

    const response = await fetch(
      `http://localhost:5000/api/compare?c1=${countryA}&c2=${countryB}`
    );

    const data = await response.json();

    return [
      data.country1,
      data.country2
    ];

  } catch (error) {

    console.error(error);

    return null;

  }
}

export default fetchCompareData;