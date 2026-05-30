import "./DataBadge.css";
import { getAgeClass } from "../../../data/metricMeta";

/**
 * DataBadge
 * Renders: ● Source, Year  (colored dot = freshness)
 *
 * Props:
 *   source    — e.g. "World Bank"
 *   year      — e.g. 2023
 *   indicator — e.g. "NY.GDP.MKTP.CD"  (optional)
 */
function DataBadge({ source, year, indicator }) {
  if (!source || !year) return null;

  const ageClass = getAgeClass(year);
  const ageLabels = { fresh: "Recent", stale: `${2025 - year}yr old`, old: `${2025 - year}yrs old` };

  return (
    <div className="dataBadge" title={indicator ? `Indicator: ${indicator}` : undefined}>
      <span className={`dataBadgeDot dataBadgeDot--${ageClass}`}>●</span>
      <span className="dataBadgeText">
        {source}, {year}
      </span>
      <span className={`dataBadgeAge dataBadgeAge--${ageClass}`}>
        · {ageLabels[ageClass]}
      </span>
    </div>
  );
}

export default DataBadge;
