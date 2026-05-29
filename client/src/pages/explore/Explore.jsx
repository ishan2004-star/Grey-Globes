import { useState } from "react";

import "./explore.css";

import Navbar from "../../components/ui/navbar/Navbar";

import SearchSection from "../../components/country/searchsection/SearchSection";

import CountryProfile from "../../components/country/countryprofile/CountryProfile";

import CountrySkeleton from "../../components/country/countryskeleton/CountrySkeleton";

import fetchCountryData from "../../services/fetchCountryData";

import fetchEconomyData from "../../services/fetchEconomyData";

import fetchClimateData from "../../services/fetchClimateData";

import fetchLifestyleData from "../../services/fetchLifestyleData";

import fetchMobilityData from "../../services/fetchMobilityData";

import fetchPulseData from "../../services/fetchPulseData";
function Explore() {

  const [selectedCountry, setSelectedCountry] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSearch = async (query) => {

    setLoading(true);

    setError("");

    setSelectedCountry(null);

    const formattedQuery =
      query.toLowerCase().trim();

    setTimeout(async () => {

      const countryData =
        await fetchCountryData(
          formattedQuery
        );

      if (!countryData) {

        setError(
          "Unable to locate country dataset."
        );

        setLoading(false);

        return;

      }

      const economyData =
        await fetchEconomyData(
          countryData.atlas.code
        );

      const climateData =
        await fetchClimateData(

          countryData.atlas.lat,

          countryData.atlas.lng

        );

      const lifestyleData =
        await fetchLifestyleData({

          ...countryData,

          economy: economyData

        });

      const mobilityData =
        await fetchMobilityData({

          ...countryData,

          economy: economyData,

          lifestyle: lifestyleData

        });

      const pulseData =
        await fetchPulseData({

          ...countryData,

          economy: economyData,

          climate: climateData,

          lifestyle: lifestyleData,

          mobility: mobilityData

        });


      setSelectedCountry({

        ...countryData,

        economy: economyData,

        climate: climateData,

        lifestyle: lifestyleData,

        mobility: mobilityData,

        pulse: pulseData

      });


      setLoading(false);

    }, 800);

  };

  return (

    <div className="explorePage">

      <Navbar />

      <main className="exploreContent">

        <SearchSection
          handleSearch={handleSearch}
          selectedCountry={selectedCountry}
          loading={loading}
          error={error}
        />

        {loading && (
          <CountrySkeleton />
        )}

        {selectedCountry && !loading && (
          <CountryProfile
            country={selectedCountry}
          />
        )}

      </main>

    </div>

  );

}

export default Explore;