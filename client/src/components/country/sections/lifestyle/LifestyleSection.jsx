import "./LifestyleSection.css";

import CompareMetric
  from "../../../shared/compareMetric/CompareMetric";

import SectionHero
  from "../../../shared/sectionHero/SectionHero";

import SectionHeader
  from "../../../shared/sectionHeader/SectionHeader";

import InsightBlock
  from "../../../shared/insightBlock/InsightBlock";

function LifestyleSection({
  country,
  compareCountry,
  compareMode = false
}) {

  if (!country) return null;

  const metrics = [

    {
      label: "Healthcare Quality",
      leftValue: country.lifestyle.healthcare,
      rightValue: compareCountry?.lifestyle.healthcare
    },

    {
      label: "Education Index",
      leftValue: country.lifestyle.education,
      rightValue: compareCountry?.lifestyle.education
    },

    {
      label: "Internet Accessibility",
      leftValue: country.lifestyle.internet,
      rightValue: compareCountry?.lifestyle.internet
    },

    {
      label: "Public Safety",
      leftValue: country.lifestyle.safety,
      rightValue: compareCountry?.lifestyle.safety
    },

    {
      label: "Work-Life Balance",
      leftValue: country.lifestyle.workLife,
      rightValue: compareCountry?.lifestyle.workLife
    },

    {
      label: "Cost of Living",
      leftValue: country.lifestyle.costOfLiving,
      rightValue: compareCountry?.lifestyle.costOfLiving
    }

  ];

  return (

    <section
      id="lifestyle"
      className={`
    intelligenceSection
    lifestyleSection
    reveal
    ${compareMode ? "compareActive" : ""}
  `}
    >

      <SectionHeader
        liveText="HUMAN DEVELOPMENT INTELLIGENCE"
        label="HUMAN DEVELOPMENT INTELLIGENCE"
        title="Lifestyle"
        dotColor="#f1c40f"
      />

      <SectionHero
        leftLabel="Happiness Score"
        leftValue={country.lifestyle.happiness}
        summary="High life satisfaction with strong infrastructure and public services."
        rightLabel="Happiness Score"
        rightValue={compareCountry?.lifestyle.happiness}
        compareMode={compareMode}
      />

      <div className="sectionContentGrid lifestyleGrid">

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

        <InsightBlock
          label="Urban Mobility"
          leftText={country.lifestyle.mobilitySummary}
          rightText={compareCountry?.lifestyle.mobilitySummary}
          compareMode={compareMode}
        />

      </div>

    </section>

  );

}

export default LifestyleSection;