const {
    fetchCountryDetails,
} = require("./countryService");

const {
    fetchEconomyData,
} = require("./economyService");

const {
    fetchClimateData,
} = require("./climateService");

const {
    fetchLifestyleData,
} = require("./lifestyleService");

const {
    fetchMobilityData,
} = require("./mobilityService");

const {
    fetchPulseData,
} = require("./pulseService");

const fetchIntelligenceData = async (
    countryName
) => {
    try {

        const country =
            await fetchCountryDetails(
                countryName
            );

        if (!country) {
            return null;
        }

        const [
            economy,
            climate,
        ] = await Promise.all([

            fetchEconomyData(
                country.atlas.code
            ),

            fetchClimateData(
                country.atlas.lat,
                country.atlas.lng
            ),

        ]);

        const lifestyle =
            await fetchLifestyleData({
                ...country,
                economy,
            });

        const mobility =
            await fetchMobilityData({
                ...country,
                economy,
                lifestyle,
            });

        const pulse =
            await fetchPulseData({
                ...country,
                economy,
                climate,
                lifestyle,
                mobility,
            });

        return {

            ...country,

            economy,

            climate,

            lifestyle,

            mobility,

            pulse,

        };

    } catch (error) {

        console.error(error);

        return null;

    }
};

module.exports = {
    fetchIntelligenceData,
};