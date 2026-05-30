import "./economySection.css";
import CompareMetric from "../../../shared/compareMetric/CompareMetric";
import SectionHero from "../../../shared/sectionHero/SectionHero";
import SectionHeader from "../../../shared/sectionHeader/SectionHeader";
import InsightBlock from "../../../shared/insightBlock/InsightBlock";
import { METRIC_META } from "../../../../data/metricMeta";

function EconomySection({
  country,
  compareCountry,
  compareMode = false
}) {

  if (!country) return null;

  const metrics = [
    {
      label: "GDP Per Capita",
      leftValue: country.economy.gdpPerCapita,
      rightValue: compareCountry?.economy.gdpPerCapita,
      ...METRIC_META.gdpPerCapita
    },
    {
      label: "Inflation Rate",
      leftValue: country.economy.inflation,
      rightValue: compareCountry?.economy.inflation,
      ...METRIC_META.inflation
    },
    {
      label: "Unemployment",
      leftValue: country.economy.unemployment,
      rightValue: compareCountry?.economy.unemployment,
      ...METRIC_META.unemployment
    },
    {
      label: "Workforce Status",
      leftValue: country.economy.workforce,
      rightValue: compareCountry?.economy.workforce
      // no meta — derived field
    }
  ];

  return (

<section
  id="economy"
  className={`
    intelligenceSection
    economySection
    reveal
    ${compareMode ? "compareActive" : ""}
  `}
>

  <SectionHeader
    liveText="LIVE WORLD BANK INTELLIGENCE"
    label="ECONOMIC INTELLIGENCE"
    title="Economy"
    dotColor="#2ecc71"
  />

  <SectionHero
    leftLabel="Gross Domestic Product"
    leftValue={country.economy.gdp}
    summary={country.economy.growth}
    rightLabel="Comparison GDP"
    rightValue={compareCountry?.economy.gdp}
    compareMode={compareMode}
    source={METRIC_META.gdp.source}
    year={METRIC_META.gdp.year}
    indicator={METRIC_META.gdp.indicator}
  />

  <div className="sectionContentGrid economyGrid">

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

    <div className="economyIndustries">

      <span>
        Major Industries
      </span>

      <div className="industryTags">

        {country.economy.industries.map(
          (industry) => (

            <div key={industry}>
              {industry}
            </div>

          )
        )}

      </div>

    </div>

    <InsightBlock
  label="Economic Overview"
  leftText={country.economy.overview}
  rightText={compareCountry?.economy.overview}
  compareMode={compareMode}
/>


  </div>

</section>

  );

}

export default EconomySection;