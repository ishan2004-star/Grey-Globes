import "./compare.css";

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

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

const API_BASE = "http://localhost:5000/api";

function Compare() {

  const { isAuthenticated, authFetch } = useAuth();

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

  // Save comparison state
  const [saveTitle, setSaveTitle] = useState("");
  const [saveFeedback, setSaveFeedback] = useState("");
  const [saving, setSaving] = useState(false);

  const handleCompare = async (
    leftQuery,
    rightQuery
  ) => {

    setCompareError("");

    setLoadingCompare(true);

    setSaveFeedback("");

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

  const handleSaveComparison = async () => {
    if (!isAuthenticated || !leftCountry || !rightCountry) return;

    setSaving(true);
    setSaveFeedback("");

    try {
      const leftName = leftCountry?.atlas?.name || leftCountry?.name || "";
      const rightName = rightCountry?.atlas?.name || rightCountry?.name || "";

      const data = await authFetch(`${API_BASE}/comparisons`, {
        method: "POST",
        body: JSON.stringify({
          countries: [leftName, rightName],
          title: saveTitle.trim() || `${leftName} vs ${rightName}`,
        }),
      });

      if (data.success) {
        setSaveFeedback("Comparison saved!");
        setSaveTitle("");
      } else {
        setSaveFeedback(data.message || "Failed to save.");
      }
    } catch (err) {
      setSaveFeedback("Error saving comparison.");
    } finally {
      setSaving(false);
    }
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

          {/* Save Comparison Bar */}
          {isAuthenticated && (
            <div className="saveComparisonBar">
              <input
                id="comparison-title"
                type="text"
                className="saveComparisonInput"
                placeholder="Title (optional)"
                value={saveTitle}
                onChange={(e) => setSaveTitle(e.target.value)}
              />
              <button
                id="save-comparison-btn"
                className="saveComparisonBtn"
                onClick={handleSaveComparison}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Comparison"}
              </button>
              {saveFeedback && (
                <span className="saveComparisonFeedback">
                  {saveFeedback}
                </span>
              )}
            </div>
          )}

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