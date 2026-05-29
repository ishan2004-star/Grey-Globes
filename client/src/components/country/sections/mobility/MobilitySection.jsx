import "./MobilitySection.css";

import CompareMetric
  from "../../../shared/compareMetric/CompareMetric";

import SectionHero
  from "../../../shared/sectionHero/SectionHero";

import SectionHeader
  from "../../../shared/sectionHeader/SectionHeader";

import InsightBlock
  from "../../../shared/insightBlock/InsightBlock";

function MobilitySection({
  country,
  compareCountry,
  compareMode = false
}) {

  if (!country) return null;

  const metrics = [

    {
      label: "Student Accessibility",
      leftValue: country.mobility.students,
      rightValue: compareCountry?.mobility.students
    },

    {
      label: "Work Opportunities",
      leftValue: country.mobility.jobs,
      rightValue: compareCountry?.mobility.jobs
    },

    {
      label: "PR Accessibility",
      leftValue: country.mobility.prAccess,
      rightValue: compareCountry?.mobility.prAccess
    },

    {
      label: "Visa Complexity",
      leftValue: country.mobility.visaComplexity,
      rightValue: compareCountry?.mobility.visaComplexity
    },

    {
      label: "English Support",
      leftValue: country.mobility.englishSupport,
      rightValue: compareCountry?.mobility.englishSupport
    },

    {
      label: "Global Exposure",
      leftValue: country.mobility.exposure,
      rightValue: compareCountry?.mobility.exposure
    }

  ];

  return (

    <section
      id="mobility"
      className={`
    intelligenceSection
    mobilitySection
    reveal
    ${compareMode ? "compareActive" : ""}
  `}
    >

      <SectionHeader
        liveText="GLOBAL MOBILITY DATA"
        label="MOBILITY INTELLIGENCE"
        title="Mobility"
        dotColor="#9b59b6"
      />

      <SectionHero
        leftLabel="Immigration Friendliness"
        leftValue={country.mobility.immigration}
        summary="Global mobility intelligence analyzing migration accessibility, workforce integration and international opportunity ecosystems."
        rightLabel="Immigration Friendliness"
        rightValue={compareCountry?.mobility.immigration}
        compareMode={compareMode}
      />

      <div className="sectionContentGrid mobilityGrid">

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
          label="Startup & Remote Ecosystem"
          leftText={country.mobility.ecosystem}
          rightText={compareCountry?.mobility.ecosystem}
          compareMode={compareMode}
        />

      </div>

    </section>

  );

}

export default MobilitySection;