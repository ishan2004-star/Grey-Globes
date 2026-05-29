import "./economySection.css";

import CompareMetric
from "../../../shared/compareMetric/CompareMetric";

import SectionHero
from "../../../shared/sectionHero/SectionHero";

import SectionHeader
from "../../../shared/sectionHeader/SectionHeader";

import InsightBlock
from "../../../shared/insightBlock/InsightBlock";

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
      rightValue: compareCountry?.economy.gdpPerCapita
    },

    {
      label: "Inflation Rate",
      leftValue: country.economy.inflation,
      rightValue: compareCountry?.economy.inflation
    },

    {
      label: "Unemployment",
      leftValue: country.economy.unemployment,
      rightValue: compareCountry?.economy.unemployment
    },

    {
      label: "Workforce Status",
      leftValue: country.economy.workforce,
      rightValue: compareCountry?.economy.workforce
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