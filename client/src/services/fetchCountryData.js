async function fetchCountryData(countryName) {
  try {

    const response = await fetch(
      `http://localhost:5000/api/countries/${countryName}`
    );

    const data = await response.json();

    return data;

  } catch (error) {

    console.log(error);

    return null;

  }
}

export default fetchCountryData;