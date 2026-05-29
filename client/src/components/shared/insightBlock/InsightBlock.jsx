import "./InsightBlock.css";

function InsightBlock({
  label,
  leftText,
  rightText,
  compareMode = false,
  variant = "default"
}) {

  return (

<div
  className={`
    insightBlock
    ${variant === "ai"
      ? "aiInsight"
      : ""
    }
  `}
>

  {variant === "ai" && (

    <div className="insightLine"></div>

  )}

  <div className="insightContent">

    <span>
      {label}
    </span>

    <p>
      {leftText}
    </p>

    {compareMode && rightText && (

      <p className="compareInsightText">

        {rightText}

      </p>

    )}

  </div>

</div>

  );

}

export default InsightBlock;