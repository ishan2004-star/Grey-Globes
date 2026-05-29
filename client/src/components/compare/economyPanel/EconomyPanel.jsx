import "./economyPanel.css";

function EconomyPanel({ country }) {

return (


<div className="economyPanel">

  <div className="economyHero">

    <div className="economyGDP">

      <span>
        Gross Domestic Product
      </span>

      <h1>
        {country.economy.gdp}
      </h1>

    </div>

    <div className="economyGrowth">

      <p>
        {country.economy.growth}
      </p>

    </div>

  </div>

  <div className="economyGrid">

    <div className="economyMetric">

      <span>
        GDP Per Capita
      </span>

      <h3>
        {country.economy.gdpPerCapita}
      </h3>

    </div>

    <div className="economyMetric">

      <span>
        Inflation Rate
      </span>

      <h3>
        {country.economy.inflation}
      </h3>

    </div>

    <div className="economyMetric">

      <span>
        Unemployment
      </span>

      <h3>
        {country.economy.unemployment}
      </h3>

    </div>

    <div className="economyMetric">

      <span>
        Workforce Status
      </span>

      <h3>
        {country.economy.workforce}
      </h3>

    </div>

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

    <div className="economyOverviewBlock">

      <span>
        Economic Overview
      </span>

      <p>
        {country.economy.overview}
      </p>

    </div>

  </div>

</div>


);

}

export default EconomyPanel;
