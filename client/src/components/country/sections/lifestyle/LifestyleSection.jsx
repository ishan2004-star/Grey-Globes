import "./LifestyleSection.css";
import CompareMetric from "../../../shared/compareMetric/CompareMetric";
import SectionHero from "../../../shared/sectionHero/SectionHero";
import SectionHeader from "../../../shared/sectionHeader/SectionHeader";
import InsightBlock from "../../../shared/insightBlock/InsightBlock";
import { METRIC_META } from "../../../../data/metricMeta";

function LifestyleSection({
  country,
  compareCountry,
  compareMode = false
}) {

  if (!country) return null;

  const coreMetrics = [
    {
      label: "Healthcare Quality",
      leftValue: country.lifestyle.healthcare,
      rightValue: compareCountry?.lifestyle.healthcare
    },
    {
      label: "Education Index",
      leftValue: country.lifestyle.education,
      rightValue: compareCountry?.lifestyle.education,
      ...METRIC_META.education
    },
    {
      label: "Internet Accessibility",
      leftValue: country.lifestyle.internet,
      rightValue: compareCountry?.lifestyle.internet,
      ...METRIC_META.internet
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

  // Phase 3A — Human Development
  const humanDevMetrics = [
    {
      label: "Human Development Index",
      leftValue: country.lifestyle.hdi || "Data Not Available",
      rightValue: compareCountry?.lifestyle.hdi || "Data Not Available",
      ...METRIC_META.hdi
    },
    {
      label: "Education Index (UNDP)",
      leftValue: country.lifestyle.educationIndex || "Data Not Available",
      rightValue: compareCountry?.lifestyle.educationIndex || "Data Not Available",
      ...METRIC_META.educationIndex
    },
  ];

  // Phase 3A — Cost of Living Indices
  const costMetrics = [
    {
      label: "Cost of Living Index",
      leftValue: country.lifestyle.costOfLivingIndex || "Data Not Available",
      rightValue: compareCountry?.lifestyle.costOfLivingIndex || "Data Not Available",
      ...METRIC_META.costOfLivingIndex
    },
    {
      label: "Rent Index",
      leftValue: country.lifestyle.rentIndex || "Data Not Available",
      rightValue: compareCountry?.lifestyle.rentIndex || "Data Not Available",
      ...METRIC_META.rentIndex
    },
    {
      label: "Grocery Index",
      leftValue: country.lifestyle.groceryIndex || "Data Not Available",
      rightValue: compareCountry?.lifestyle.groceryIndex || "Data Not Available",
      ...METRIC_META.groceryIndex
    },
    {
      label: "Restaurant Index",
      leftValue: country.lifestyle.restaurantIndex || "Data Not Available",
      rightValue: compareCountry?.lifestyle.restaurantIndex || "Data Not Available",
      ...METRIC_META.restaurantIndex
    },
  ];

  // Phase 3A — Safety
  const safetyMetrics = [
    {
      label: "Safety Index",
      leftValue: country.lifestyle.safetyIndex || "Data Not Available",
      rightValue: compareCountry?.lifestyle.safetyIndex || "Data Not Available",
      ...METRIC_META.safetyIndex
    },
    {
      label: "Crime Index",
      leftValue: country.lifestyle.crimeIndex || "Data Not Available",
      rightValue: compareCountry?.lifestyle.crimeIndex || "Data Not Available",
      ...METRIC_META.crimeIndex
    },
  ];

  // Phase 3A — Education & Technology
  const educationTechMetrics = [
    {
      label: "Literacy Rate",
      leftValue: country.lifestyle.literacyRate || "Data Not Available",
      rightValue: compareCountry?.lifestyle.literacyRate || "Data Not Available",
      ...METRIC_META.literacyRate
    },
    {
      label: "School Enrollment",
      leftValue: country.lifestyle.schoolEnrollment || "Data Not Available",
      rightValue: compareCountry?.lifestyle.schoolEnrollment || "Data Not Available",
      ...METRIC_META.schoolEnrollment
    },
    {
      label: "Internet Users (%)",
      leftValue: country.lifestyle.internetUsersPercent || "Data Not Available",
      rightValue: compareCountry?.lifestyle.internetUsersPercent || "Data Not Available",
      ...METRIC_META.internetUsers
    },
  ];

  // Phase 3A — Society
  const societyMetrics = [
    {
      label: "Official Name",
      leftValue: country.lifestyle.officialName || "Data Not Available",
      rightValue: compareCountry?.lifestyle.officialName || "Data Not Available",
      ...METRIC_META.officialName
    },
    {
      label: "Driving Side",
      leftValue: country.lifestyle.drivingSide || "Data Not Available",
      rightValue: compareCountry?.lifestyle.drivingSide || "Data Not Available",
      ...METRIC_META.drivingSide
    },
    {
      label: "Demonym",
      leftValue: country.lifestyle.demonym || "Data Not Available",
      rightValue: compareCountry?.lifestyle.demonym || "Data Not Available",
      ...METRIC_META.demonym
    },
  ];

  const allPhase3AMetrics = [
    ...humanDevMetrics,
    ...costMetrics,
    ...safetyMetrics,
    ...educationTechMetrics,
    ...societyMetrics,
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
        source={METRIC_META.happiness.source}
        year={METRIC_META.happiness.year}
        indicator={METRIC_META.happiness.indicator}
      />

      <div className="sectionContentGrid lifestyleGrid">

        {
          coreMetrics.map((metric) => (

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

        {/* Phase 3A — Extended Lifestyle Metrics */}
        {
          allPhase3AMetrics.map((metric) => (

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