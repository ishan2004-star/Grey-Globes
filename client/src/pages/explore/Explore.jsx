import { useState } from "react";

import "./explore.css";

import Navbar from "../../components/ui/navbar/Navbar";

import SearchSection from "../../components/country/searchsection/SearchSection";

import CountryProfile from "../../components/country/countryprofile/CountryProfile";

import CountrySkeleton from "../../components/country/countryskeleton/CountrySkeleton";

import fetchIntelligenceData from "../../services/fetchIntelligenceData";

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
        await fetchIntelligenceData(
          formattedQuery
        );

      if (!countryData) {

        setError(
          "Unable to locate country dataset."
        );

        setLoading(false);

        return;

      }

      setSelectedCountry(
        countryData
      );

      setLoading(false);


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