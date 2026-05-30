import "./climateSection.css";
import CompareMetric from "../../../shared/compareMetric/CompareMetric";
import SectionHero from "../../../shared/sectionHero/SectionHero";
import SectionHeader from "../../../shared/sectionHeader/SectionHeader";
import DataBadge from "../../../shared/dataBadge/DataBadge";
import { METRIC_META } from "../../../../data/metricMeta";

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
      rightValue: compareCountry?.climate.avgTemp,
      ...METRIC_META.avgTemp
    },
    {
      label: "Air Quality Index",
      leftValue: country.climate.airQuality,
      rightValue: compareCountry?.climate.airQuality,
      ...METRIC_META.aqi
    },
    {
      label: "Renewable Energy",
      leftValue: country.climate.renewableEnergy,
      rightValue: compareCountry?.climate.renewableEnergy,
      ...METRIC_META.renewableEnergy
    },
    {
      label: "CO₂ Emissions",
      leftValue: country.climate.emissions,
      rightValue: compareCountry?.climate.emissions,
      ...METRIC_META.co2Emissions
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
          source={metric.source}
          year={metric.year}
          indicator={metric.indicator}
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

      <DataBadge
        source={METRIC_META.forestCoverage.source}
        year={METRIC_META.forestCoverage.year}
        indicator={METRIC_META.forestCoverage.indicator}
      />

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