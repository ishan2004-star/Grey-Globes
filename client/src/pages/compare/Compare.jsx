import "./compare.css";

import { useState } from "react";

import Navbar from "../../components/ui/navbar/Navbar";
import StickyNav from "../../components/ui/stickynav/StickyNav";

import SearchSection from "../../components/country/searchsection/SearchSection";

import AtlasSection from "../../components/country/sections/atlas/AtlasSection";
import EconomySection from "../../components/country/sections/economy/EconomySection";
import ClimateSection from "../../components/country/sections/climate/ClimateSection";
import MobilitySection from "../../components/country/sections/mobility/MobilitySection";
import LifestyleSection from "../../components/country/sections/lifestyle/LifestyleSection";
import PulseSection from "../../components/country/sections/pulse/PulseSection";
import NewsSection from "../../components/country/sections/news/NewsSection";

import fetchCompareData
from "../../services/fetchCompareData";

function Compare() {

  const [leftCountry, setLeftCountry] =
    useState(null);

  const [rightCountry, setRightCountry] =
    useState(null);

  const [compareStarted, setCompareStarted] =
    useState(false);

  const [loadingCompare, setLoadingCompare] =
    useState(false);

  const [compareError, setCompareError] =
    useState("");

  const handleCompare = async (
    leftQuery,
    rightQuery
  ) => {

    setCompareError("");

    setLoadingCompare(true);

    const results =
      await fetchCompareData(
        leftQuery,
        rightQuery
      );

    if (!results) {

      setCompareError(
        "Unable to compare countries."
      );

      setLoadingCompare(false);

      return;

    }

    const [leftData, rightData] =
      results;

    if (
      leftData &&
      rightData &&
      leftData.success !== false &&
      rightData.success !== false
    ) {

      setLeftCountry(leftData);

      setRightCountry(rightData);

      setCompareStarted(true);

    }

    else {

      setCompareError(
        "Countries not found."
      );

    }

    setLoadingCompare(false);

  };

  return (

    <div className="comparePage">

      <Navbar />

      <SearchSection
        compareMode={true}
        handleCompare={handleCompare}
        loading={loadingCompare}
        error={compareError}
      />

      {compareStarted &&
        leftCountry &&
        rightCountry && (

        <StickyNav />

      )}

      {compareStarted &&
        leftCountry &&
        rightCountry && (

        <>

          <AtlasSection
            country={leftCountry}
            compareCountry={rightCountry}
            compareMode={true}
          />

          <EconomySection
            country={leftCountry}
            compareCountry={rightCountry}
            compareMode={true}
          />

          <ClimateSection
            country={leftCountry}
            compareCountry={rightCountry}
            compareMode={true}
          />

          <MobilitySection
            country={leftCountry}
            compareCountry={rightCountry}
            compareMode={true}
          />

          <LifestyleSection
            country={leftCountry}
            compareCountry={rightCountry}
            compareMode={true}
          />

          <PulseSection
            country={leftCountry}
            compareCountry={rightCountry}
            compareMode={true}
          />

          <NewsSection
            country={leftCountry}
            compareCountry={rightCountry}
            compareMode={true}
          />

        </>

      )}

    </div>

  );

}

export default Compare;