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

const {
    fetchDemographicsData,
} = require("./demographicsService");

const {
    fetchWorldBankExtendedData,
} = require("./worldBankExtendedService");

const {
    fetchHDIData,
} = require("./hdiService");

const {
    fetchCostOfLivingData,
} = require("./costOfLivingService");

const {
    fetchNewsData,
} = require("./newsService");

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

        // Parallel batch 1: Economy, Climate, Demographics, WorldBank Extended, HDI, Cost of Living
        const [
            economy,
            climate,
            demographics,
            worldBankExtended,
            hdiData,
            costOfLivingData,
        ] = await Promise.all([

            fetchEconomyData(
                country.atlas.code
            ),

            fetchClimateData(
                country.atlas.lat,
                country.atlas.lng
            ),

            fetchDemographicsData(
                country.atlas.code
            ),

            fetchWorldBankExtendedData(
                country.atlas.code
            ),

            fetchHDIData(
                country.atlas.code
            ),

            fetchCostOfLivingData(
                country.atlas.code
            ),

        ]);

        // Merge real forest coverage into climate
        if (worldBankExtended.forestCoverage !== "Data Not Available") {
            climate.forestCoverage = worldBankExtended.forestCoverage;
        }

        // Also update atlas forest coverage
        if (worldBankExtended.forestCoverage !== "Data Not Available") {
            country.atlas.forestCoverage = worldBankExtended.forestCoverage;
        }

        // Merge demographics into atlas
        country.atlas.populationGrowth = demographics.populationGrowth;
        country.atlas.birthRate = demographics.birthRate;
        country.atlas.deathRate = demographics.deathRate;
        country.atlas.lifeExpectancy = demographics.lifeExpectancy;

        const lifestyle =
            await fetchLifestyleData({
                ...country,
                economy,
            });

        // Merge extended lifestyle data
        lifestyle.hdi = hdiData.hdi;
        lifestyle.educationIndex = hdiData.educationIndex;
        lifestyle.costOfLivingIndex = costOfLivingData.costOfLivingIndex;
        lifestyle.rentIndex = costOfLivingData.rentIndex;
        lifestyle.groceryIndex = costOfLivingData.groceryIndex;
        lifestyle.restaurantIndex = costOfLivingData.restaurantIndex;
        lifestyle.safetyIndex = costOfLivingData.safetyIndex;
        lifestyle.crimeIndex = costOfLivingData.crimeIndex;
        lifestyle.literacyRate = worldBankExtended.literacyRate;
        lifestyle.schoolEnrollment = worldBankExtended.schoolEnrollment;
        lifestyle.internetUsersPercent = worldBankExtended.internetUsers;
        lifestyle.officialName = country.atlas.officialName;
        lifestyle.drivingSide = country.atlas.drivingSide;
        lifestyle.demonym = country.atlas.demonym;

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

        // Fetch news in parallel (non-blocking)
        let news = { headlines: [] };
        try {
            news = await fetchNewsData(
                country.atlas.name
            );
        } catch {
            // News is non-critical
        }

        return {

            ...country,

            economy,

            climate,

            lifestyle,

            mobility,

            pulse,

            news,

        };

    } catch (error) {

        console.error(error);

        return null;

    }
};

module.exports = {
    fetchIntelligenceData,
};