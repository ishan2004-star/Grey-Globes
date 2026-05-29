import "./countryHero.css";

function CountryHero() {
  return (
    <section className="countryHero">

      <div className="countryHeroContent">

        <h1>🇯🇵 JAPAN</h1>

        <p>
          Advanced economy with rich culture
          and technological innovation.
        </p>

        <div className="heroStats">

          <div className="statCard">
            <span>Population</span>
            <h3>125.1M</h3>
          </div>

          <div className="statCard">
            <span>Capital</span>
            <h3>Tokyo</h3>
          </div>

          <div className="statCard">
            <span>GDP</span>
            <h3>$4.2T</h3>
          </div>

          <div className="statCard">
            <span>Currency</span>
            <h3>Yen</h3>
          </div>

        </div>

      </div>

    </section>
  );
}

export default CountryHero;