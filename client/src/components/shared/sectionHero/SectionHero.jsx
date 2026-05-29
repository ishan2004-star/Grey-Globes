import "./SectionHero.css";

function SectionHero({
  leftLabel,
  leftValue,
  summary,
  rightLabel,
  rightValue,
  compareMode = false
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

        </div>

      )}

    </div>

  );

}

export default SectionHero;