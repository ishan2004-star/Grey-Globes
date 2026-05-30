import "./PulseSection.css";
import CompareMetric from "../../../shared/compareMetric/CompareMetric";
import SectionHero from "../../../shared/sectionHero/SectionHero";
import SectionHeader from "../../../shared/sectionHeader/SectionHeader";
import InsightBlock from "../../../shared/insightBlock/InsightBlock";
import { METRIC_META } from "../../../../data/metricMeta";

function PulseSection({
  country,
  compareCountry,
  compareMode = false
}) {

  if (!country) return null;

  const metrics = [
    {
      label: "Infrastructure",
      leftValue: country.pulse.infrastructure,
      rightValue: compareCountry?.pulse.infrastructure
      // qualitative — no badge
    },
    {
      label: "Innovation",
      leftValue: country.pulse.innovation,
      rightValue: compareCountry?.pulse.innovation,
      ...METRIC_META.innovation
    },
    {
      label: "Global Integration",
      leftValue: country.pulse.integration,
      rightValue: compareCountry?.pulse.integration
      // qualitative — no badge
    },
    {
      label: "Strategic Outlook",
      leftValue: country.pulse.outlook,
      rightValue: compareCountry?.pulse.outlook
      // qualitative — no badge
    }
  ];

  return (

    <section
      id="pulse"
      className={`
    intelligenceSection
    pulseSection
    reveal
    ${compareMode ? "compareActive" : ""}
  `}
    >

      <SectionHeader
        liveText="REAL-TIME PULSE"
        label="STRATEGIC INTELLIGENCE"
        title="Pulse"
        dotColor="#e74c3c"
      />

      <SectionHero
        leftLabel="National Profile"
        leftValue={country.pulse.resilience}
        summary={country.pulse.pulse}
        rightLabel="National Profile"
        rightValue={compareCountry?.pulse.resilience}
        compareMode={compareMode}
        source={METRIC_META.pulseScore.source}
        year={METRIC_META.pulseScore.year}
        indicator={METRIC_META.pulseScore.indicator}
      />

      <div className="sectionContentGrid pulseMetrics">

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

      </div>

      <InsightBlock
        label="AI Synthesis"
        leftText={country.pulse.aiSummary}
        rightText={compareCountry?.pulse.aiSummary}
        compareMode={compareMode}
        variant="ai"
      />

    </section>

  );

}

export default PulseSection;