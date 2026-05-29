import "./climateSection.css";

import CompareMetric
from "../../../shared/compareMetric/CompareMetric";

import SectionHero
from "../../../shared/sectionHero/SectionHero";

import SectionHeader
from "../../../shared/sectionHeader/SectionHeader";

function ClimateSection({
  country,
  compareCountry,
  compareMode = false
}) {

  if (!country) return null;

  const metrics = [

    {
      label: "Average Temperature",
      leftValue: country.climate.avgTemp,
      rightValue: compareCountry?.climate.avgTemp
    },

    {
      label: "Air Quality",
      leftValue: country.climate.airQuality,
      rightValue: compareCountry?.climate.airQuality
    },

    {
      label: "Renewable Energy",
      leftValue: country.climate.renewableEnergy,
      rightValue: compareCountry?.climate.renewableEnergy
    },

    {
      label: "CO₂ Emissions",
      leftValue: country.climate.emissions,
      rightValue: compareCountry?.climate.emissions
    }

  ];

  return (

<section
  id="climate"
  className={`
    intelligenceSection
    climateSection
    reveal
    ${compareMode ? "compareActive" : ""}
  `}
>

  <SectionHeader
    liveText="LIVE ENVIRONMENTAL DATA"
    label="CLIMATE INTELLIGENCE"
    title="Climate"
    dotColor="#3498db"
  />

  <SectionHero
    leftLabel="Climate Conditions"
    leftValue={country.climate.conditions}
    summary={country.climate.climateSummary}
    rightLabel="Climate Conditions"
    rightValue={compareCountry?.climate.conditions}
    compareMode={compareMode}
  />

  <div className="sectionContentGrid climateGrid">

    {
      metrics.map((metric) => (

        <CompareMetric
          key={metric.label}
          label={metric.label}
          leftValue={metric.leftValue}
          rightValue={metric.rightValue}
          leftCountry={country.atlas.name}
          rightCountry={compareCountry?.atlas.name}
          compareMode={compareMode}
        />

      ))
    }

    <div className="climateFeature">

      <span>
        Forest Area Coverage
      </span>

      <h1>
        {country.climate.forestCoverage}
      </h1>

      <p>
        Dense mountainous forest regions with
        high biodiversity preservation.
      </p>

      {compareMode && compareCountry && (

        <h2 className="compareForestCoverage">

          {compareCountry.climate.forestCoverage}

        </h2>

      )}

    </div>

  </div>

</section>

  );

}

export default ClimateSection;