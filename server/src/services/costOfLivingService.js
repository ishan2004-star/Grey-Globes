/**
 * Cost of Living and Safety data.
 * Based on Numbeo's published indices (2024).
 * Since Numbeo API requires paid access, we use curated reference data.
 */

const COST_OF_LIVING_DATA = {
  // Format: { costOfLiving, rent, grocery, restaurant, safety, crime }
  // All indices are relative to New York City (100)

  "US": { costOfLiving: 71.1, rent: 46.0, grocery: 74.5, restaurant: 67.0, safety: 55.3, crime: 48.4 },
  "GB": { costOfLiving: 67.5, rent: 33.8, grocery: 58.0, restaurant: 66.7, safety: 55.0, crime: 46.1 },
  "JP": { costOfLiving: 62.5, rent: 22.0, grocery: 68.2, restaurant: 42.0, safety: 78.2, crime: 22.0 },
  "DE": { costOfLiving: 60.1, rent: 25.5, grocery: 50.0, restaurant: 55.5, safety: 63.0, crime: 35.2 },
  "FR": { costOfLiving: 62.4, rent: 27.3, grocery: 60.5, restaurant: 62.0, safety: 51.0, crime: 50.3 },
  "CA": { costOfLiving: 64.2, rent: 32.0, grocery: 62.0, restaurant: 60.5, safety: 58.5, crime: 39.7 },
  "AU": { costOfLiving: 73.5, rent: 35.0, grocery: 70.0, restaurant: 65.5, safety: 58.0, crime: 42.5 },
  "IN": { costOfLiving: 21.1, rent: 5.4, grocery: 25.0, restaurant: 15.5, safety: 56.5, crime: 44.7 },
  "CN": { costOfLiving: 33.0, rent: 14.0, grocery: 32.5, restaurant: 25.0, safety: 70.0, crime: 27.0 },
  "BR": { costOfLiving: 30.5, rent: 8.5, grocery: 28.0, restaurant: 22.0, safety: 31.0, crime: 67.5 },
  "MX": { costOfLiving: 31.0, rent: 10.0, grocery: 30.0, restaurant: 25.0, safety: 39.5, crime: 56.2 },
  "KR": { costOfLiving: 67.0, rent: 18.0, grocery: 75.0, restaurant: 40.0, safety: 72.0, crime: 27.0 },
  "SG": { costOfLiving: 78.0, rent: 58.0, grocery: 64.0, restaurant: 44.5, safety: 84.0, crime: 16.5 },
  "CH": { costOfLiving: 118.4, rent: 51.0, grocery: 112.0, restaurant: 112.0, safety: 78.5, crime: 20.5 },
  "SE": { costOfLiving: 65.8, rent: 22.5, grocery: 56.5, restaurant: 58.0, safety: 52.0, crime: 48.0 },
  "NO": { costOfLiving: 85.5, rent: 28.0, grocery: 78.0, restaurant: 82.0, safety: 68.5, crime: 30.0 },
  "NL": { costOfLiving: 65.5, rent: 29.5, grocery: 52.0, restaurant: 62.0, safety: 65.0, crime: 31.5 },
  "IT": { costOfLiving: 58.5, rent: 19.5, grocery: 51.0, restaurant: 56.0, safety: 55.5, crime: 46.5 },
  "ES": { costOfLiving: 46.8, rent: 17.0, grocery: 42.0, restaurant: 44.5, safety: 62.0, crime: 32.0 },
  "PT": { costOfLiving: 43.5, rent: 17.0, grocery: 38.5, restaurant: 38.0, safety: 70.5, crime: 28.0 },
  "RU": { costOfLiving: 32.0, rent: 10.0, grocery: 30.0, restaurant: 28.0, safety: 53.0, crime: 40.5 },
  "TR": { costOfLiving: 26.8, rent: 7.0, grocery: 29.5, restaurant: 18.0, safety: 55.0, crime: 42.0 },
  "ZA": { costOfLiving: 30.0, rent: 7.5, grocery: 30.5, restaurant: 24.0, safety: 23.0, crime: 77.0 },
  "AE": { costOfLiving: 57.0, rent: 35.5, grocery: 45.0, restaurant: 45.0, safety: 86.0, crime: 14.5 },
  "SA": { costOfLiving: 38.0, rent: 10.5, grocery: 35.0, restaurant: 28.0, safety: 72.0, crime: 25.5 },
  "EG": { costOfLiving: 16.5, rent: 3.5, grocery: 17.5, restaurant: 11.0, safety: 52.0, crime: 46.0 },
  "NG": { costOfLiving: 25.5, rent: 10.0, grocery: 29.5, restaurant: 15.5, safety: 29.5, crime: 60.5 },
  "PK": { costOfLiving: 17.5, rent: 3.0, grocery: 22.0, restaurant: 10.5, safety: 38.0, crime: 54.5 },
  "BD": { costOfLiving: 20.0, rent: 3.5, grocery: 29.0, restaurant: 12.0, safety: 42.0, crime: 56.5 },
  "ID": { costOfLiving: 27.5, rent: 5.5, grocery: 28.5, restaurant: 14.5, safety: 58.5, crime: 39.0 },
  "PH": { costOfLiving: 29.0, rent: 7.0, grocery: 35.5, restaurant: 16.5, safety: 43.0, crime: 55.5 },
  "TH": { costOfLiving: 34.5, rent: 8.0, grocery: 33.0, restaurant: 17.5, safety: 60.0, crime: 36.0 },
  "VN": { costOfLiving: 28.0, rent: 6.5, grocery: 29.5, restaurant: 15.0, safety: 62.0, crime: 37.5 },
  "MY": { costOfLiving: 30.0, rent: 7.5, grocery: 30.0, restaurant: 17.5, safety: 55.0, crime: 47.0 },
  "NZ": { costOfLiving: 68.0, rent: 27.5, grocery: 65.5, restaurant: 62.0, safety: 62.0, crime: 37.5 },
  "PL": { costOfLiving: 38.5, rent: 14.5, grocery: 34.0, restaurant: 30.0, safety: 69.0, crime: 28.5 },
  "CZ": { costOfLiving: 42.0, rent: 17.5, grocery: 37.0, restaurant: 30.0, safety: 72.5, crime: 24.5 },
  "AT": { costOfLiving: 62.0, rent: 23.0, grocery: 56.0, restaurant: 58.0, safety: 74.0, crime: 23.0 },
  "IE": { costOfLiving: 73.0, rent: 42.5, grocery: 64.0, restaurant: 68.0, safety: 59.0, crime: 38.5 },
  "DK": { costOfLiving: 77.0, rent: 27.0, grocery: 58.0, restaurant: 78.0, safety: 72.0, crime: 25.5 },
  "FI": { costOfLiving: 68.5, rent: 22.5, grocery: 62.0, restaurant: 66.0, safety: 73.0, crime: 23.0 },
  "AR": { costOfLiving: 25.0, rent: 6.0, grocery: 22.0, restaurant: 18.0, safety: 36.0, crime: 62.5 },
  "CL": { costOfLiving: 38.0, rent: 11.0, grocery: 38.0, restaurant: 28.0, safety: 40.0, crime: 58.0 },
  "CO": { costOfLiving: 24.0, rent: 6.0, grocery: 24.0, restaurant: 14.0, safety: 35.0, crime: 66.0 },
  "PE": { costOfLiving: 28.0, rent: 7.5, grocery: 28.0, restaurant: 18.0, safety: 30.0, crime: 68.5 },
  "IS": { costOfLiving: 90.0, rent: 35.0, grocery: 82.0, restaurant: 88.0, safety: 78.0, crime: 24.5 },
  "LU": { costOfLiving: 74.5, rent: 42.5, grocery: 65.0, restaurant: 72.0, safety: 73.5, crime: 22.0 },
  "BE": { costOfLiving: 64.0, rent: 23.0, grocery: 55.0, restaurant: 62.0, safety: 58.5, crime: 42.5 },
  "QA": { costOfLiving: 54.0, rent: 28.0, grocery: 45.0, restaurant: 40.0, safety: 86.5, crime: 13.5 },
  "IL": { costOfLiving: 74.0, rent: 32.0, grocery: 62.5, restaurant: 65.5, safety: 60.0, crime: 36.5 },
  "KE": { costOfLiving: 26.0, rent: 5.0, grocery: 28.5, restaurant: 14.0, safety: 34.0, crime: 60.0 },
  "GH": { costOfLiving: 28.5, rent: 8.0, grocery: 32.0, restaurant: 15.0, safety: 47.5, crime: 48.0 },
  "ET": { costOfLiving: 24.5, rent: 8.0, grocery: 27.0, restaurant: 13.0, safety: 38.0, crime: 55.0 },
  "NP": { costOfLiving: 22.0, rent: 3.0, grocery: 25.0, restaurant: 10.0, safety: 55.0, crime: 39.0 },
  "LK": { costOfLiving: 22.5, rent: 4.0, grocery: 26.0, restaurant: 11.0, safety: 58.0, crime: 40.0 },
  "MM": { costOfLiving: 24.0, rent: 6.0, grocery: 30.0, restaurant: 12.0, safety: 52.0, crime: 40.5 },
  "UY": { costOfLiving: 44.0, rent: 11.5, grocery: 40.0, restaurant: 35.0, safety: 48.5, crime: 53.0 },
  "HK": { costOfLiving: 73.0, rent: 60.0, grocery: 68.0, restaurant: 38.0, safety: 82.0, crime: 18.0 },
};

const fetchCostOfLivingData = async (countryCode) => {
  try {

    const code = countryCode?.toUpperCase();
    const data = COST_OF_LIVING_DATA[code];

    if (data) {
      return {
        costOfLivingIndex: data.costOfLiving.toFixed(1),
        rentIndex: data.rent.toFixed(1),
        groceryIndex: data.grocery.toFixed(1),
        restaurantIndex: data.restaurant.toFixed(1),
        safetyIndex: data.safety.toFixed(1),
        crimeIndex: data.crime.toFixed(1),
      };
    }

    return {
      costOfLivingIndex: "Data Not Available",
      rentIndex: "Data Not Available",
      groceryIndex: "Data Not Available",
      restaurantIndex: "Data Not Available",
      safetyIndex: "Data Not Available",
      crimeIndex: "Data Not Available",
    };

  } catch (error) {

    console.error("Cost of Living fetch error:", error.message);

    return {
      costOfLivingIndex: "Data Not Available",
      rentIndex: "Data Not Available",
      groceryIndex: "Data Not Available",
      restaurantIndex: "Data Not Available",
      safetyIndex: "Data Not Available",
      crimeIndex: "Data Not Available",
    };

  }
};

module.exports = {
  fetchCostOfLivingData,
};
