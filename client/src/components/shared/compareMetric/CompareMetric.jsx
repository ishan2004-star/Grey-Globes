import "./CompareMetric.css";

function CompareMetric({
  label,
  leftValue,
  rightValue,
  leftCountry,
  rightCountry,
  compareMode = false
}) {

  return (

    <div className="compareMetric">

      <span className="compareMetricLabel">
        {label}
      </span>

      {!compareMode && (

        <div className="singleMetricValue">

          <h3>
            {leftValue}
          </h3>

        </div>

      )}

      {compareMode && (

        <div className="compareMetricValues">

          <div className="metricCountry">

            <h3>
              {leftValue}
            </h3>

            <p>
              {leftCountry}
            </p>

          </div>

          <div className="metricDivider"></div>

          <div className="metricCountry">

            <h3>
              {rightValue}
            </h3>

            <p>
              {rightCountry}
            </p>

          </div>

        </div>

      )}

    </div>

  );

}

export default CompareMetric;