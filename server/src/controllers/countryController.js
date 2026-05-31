

const { fetchCountryDetails }  = require("../services/countryService");

const getCountryDetails = async (req, res) => {
  try {
    const {countryName }  = req.params;
 
    const  country  = await fetchCountryDetails(countryName);

    if (!country) {
      return res.status(404).json({
        success: false,
        message: "Country not found",
      });
    }

    res.status(200).json(country);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });

  }
};

module.exports = {
  getCountryDetails,
};