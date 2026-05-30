import "./SectionHero.css";
import DataBadge from "../dataBadge/DataBadge";

function SectionHero({
  leftLabel,
  leftValue,
  summary,
  rightLabel,
  rightValue,
  compareMode = false,
  source,
  year,
  indicator
}) {

  return (

    <div className={`sectionHero ${
      compareMode
        ? "sectionCompareHero"
        : ""
    }`}>

      <div className="sectionHeroPrimary">

        <span>
          {leftLabel}
        </span>

        <h1>
          {leftValue}
        </h1>

        {source && <DataBadge source={source} year={year} indicator={indicator} />}

      </div>

      <div className="sectionHeroSummary">

        <p>
          {summary}
        </p>

      </div>

      {compareMode && (

        <div className="sectionHeroPrimary">

          <span>
            {rightLabel}
          </span>

          <h1>
            {rightValue}
          </h1>

          {source && <DataBadge source={source} year={year} indicator={indicator} />}

        </div>

      )}

    </div>

  );

}

export default SectionHero;