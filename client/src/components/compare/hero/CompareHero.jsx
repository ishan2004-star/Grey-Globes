
// features/compare/hero/CompareHero.jsx

import "./compareHero.css";

function CompareHero({
  leftCountry = "India",
  rightCountry = "Japan"
}) {

  return (

    <section className="compareHero">

      <div className="heroBackground"></div>

      <div className="compareHeroContent">

        <div className="compareHeroTop">

          <span>
            GLOBAL COMPARISON PLATFORM
          </span>

          <p>
            Economic • Climate • Mobility • Culture
          </p>

        </div>

        <div className="compareCountries">

          <div className="countryBlock leftCountry">

            <h1>
              {leftCountry}
            </h1>

          </div>

          <div className="vsBlock">

            <div className="vsLine"></div>

            <span>
              VS
            </span>

            <div className="vsLine"></div>

          </div>

          <div className="countryBlock rightCountry">

            <h1>
              {rightCountry}
            </h1>

          </div>

        </div>

      </div>

    </section>

  );

}

export default CompareHero;

