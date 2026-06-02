
const axios = require("axios");

const METRICS = {

    gdp: {
        indicator: "NY.GDP.MKTP.CD",
        source: "World Bank",
    },

    gdpPerCapita: {
        indicator: "NY.GDP.PCAP.CD",
        source: "World Bank",
    },

    population: {
        indicator: "SP.POP.TOTL",
        source: "World Bank",
    },

    lifeExpectancy: {
        indicator: "SP.DYN.LE00.IN",
        source: "World Bank",
    },

    inflation: {
        indicator: "FP.CPI.TOTL.ZG",
        source: "World Bank",
    },

    area: {
        source: "Rest Countries",
    },

};


const formatValue = (
    metric,
    value
) => {

    switch (metric) {

        case "gdp":
            return `$${(
                value / 1e12
            ).toFixed(2)}T`;

        case "gdpPerCapita":
            return `$${Math.round(
                value
            ).toLocaleString()}`;

        case "population":
            return value.toLocaleString();

        case "lifeExpectancy":
            return `${value.toFixed(
                1
            )} yrs`;

        case "inflation":
            return `${value.toFixed(
                1
            )}%`;

        default:
            return value;

    }
};

const fetchAnalysisData =
    async (
        metric,
        sort
    ) => {

        try {

            if (metric === "area") {

                const countriesResponse =
                    await axios.get(
                        "https://restcountries.com/v3.1/all?fields=name,flags,area"
                    );

                const processed =
                    countriesResponse.data

                        .filter(
                            country =>
                                country.area
                        )

                        .map(country => ({

                            name:
                                country.name.common,

                            flag:
                                country.flags?.svg,

                            numericValue:
                                country.area,

                            rawValue:
                                `${country.area.toLocaleString()} km²`,

                            source:
                                "Rest Countries",

                            year:
                                new Date().getFullYear(),

                            ageClass:
                                "fresh",

                        }));

                processed.sort(
                    (a, b) =>
                        sort === "asc"
                            ? a.numericValue - b.numericValue
                            : b.numericValue - a.numericValue
                );

                return processed.slice(0, 200);

            }

            const config =
                METRICS[metric];

            if (!config) {
                return [];
            }

            const response =
                await axios.get(

                    `https://api.worldbank.org/v2/country/all/indicator/${config.indicator}?format=json&per_page=20000`

                );

            const records =
                response.data[1];

            const countriesResponse =
                await axios.get(
                    "https://restcountries.com/v3.1/all?fields=name,flags"
                );

            const countryLookup =
                new Map();

            for (const country of countriesResponse.data) {

                countryLookup.set(
                    country.name.common,
                    country.flags?.svg
                );

            }

            const latestMap =
                new Map();

            for (const item of records) {

                if (
                    item.value === null
                ) {
                    continue;
                }

                const countryName =
                    item.country.value;

                if (
                    !countryLookup.has(
                        countryName
                    )
                ) {
                    continue;
                }

                const existing =
                    latestMap.get(
                        countryName
                    );

                if (
                    !existing ||
                    Number(item.date) >
                    existing.year
                ) {

                    const year =
                        Number(item.date);

                    const currentYear =
                        new Date().getFullYear();

                    let ageClass =
                        "old";

                    if (
                        currentYear - year <= 1
                    ) {
                        ageClass = "fresh";
                    }

                    else if (
                        currentYear - year <= 2
                    ) {
                        ageClass = "stale";
                    }

                    latestMap.set(
                        countryName,
                        {
                            name: countryName,

                            flag:
                                countryLookup.get(
                                    countryName
                                ),

                            numericValue:
                                item.value,

                            rawValue:
                                formatValue(
                                    metric,
                                    item.value
                                ),

                            source:
                                config.source,

                            year:
                                Number(item.date),
                            ageClass,
                        }
                    );

                }

            }

            const processed =
                Array.from(
                    latestMap.values()
                );

            processed.sort(
                (a, b) =>
                    sort === "asc"
                        ? a.numericValue -
                        b.numericValue
                        : b.numericValue -
                        a.numericValue
            );

            return processed.slice(0, 200);

            return processed;

        } catch (error) {

            console.error(error);

            return [];

        }

    };

module.exports = {
    fetchAnalysisData,
};