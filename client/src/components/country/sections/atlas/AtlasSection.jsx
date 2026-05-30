import "./atlasSection.css";
import CompareMetric from "../../../shared/compareMetric/CompareMetric";
import CompareCountriesBar from "../../../shared/compareCountriesBar/CompareCountriesBar";
import { METRIC_META } from "../../../../data/metricMeta";

function AtlasSection({
    country,
    compareCountry,
    compareMode = false
}) {

    if (!country) return null;

    return (

<section
  id="atlas"
  className={`atlasSection reveal ${
    compareMode ? "compareActive" : ""
  }`}
>

    <div className="atlasHeader">

        <p className="atlasLabel">
            GEOGRAPHICAL INTELLIGENCE
        </p>

        <h1 className="atlasTitle">
            Atlas
        </h1>

    </div>

    <div className={`atlasHero ${
        compareMode
            ? "atlasCompareHero"
            : ""
    }`}>

        <div className="atlasIdentity">

            <div className="flagBlock">

                <img
                    src={country.atlas.flag}
                    alt={country.atlas.name}
                    className="flagImage"
                />

            </div>

            <div className="countryInfo">

                <span>
                    Official Name
                </span>

                <h2>
                    {country.atlas.officialName}
                </h2>

                <p>
                    {country.atlas.region}
                </p>

            </div>

        </div>

        <a
            href={country.atlas.map}
            target="_blank"
            rel="noreferrer"
            className="mapPreview"
        >

            <img
                src={`https://picsum.photos/seed/${country.atlas.name}/1600/900`}
                alt={country.atlas.name}
                className="mapImage"
            />

            <div className="mapOverlay">

                <div className="mapContent">

                    <span>
                        Open Interactive Map
                    </span>

                    <h3>
                        View Territory
                    </h3>

                </div>

            </div>

        </a>

        {compareMode && compareCountry && (

            <div className="atlasIdentity">

                <div className="flagBlock">

                    <img
                        src={compareCountry.atlas.flag}
                        alt={compareCountry.atlas.name}
                        className="flagImage"
                    />

                </div>

                <div className="countryInfo">

                    <span>
                        Official Name
                    </span>

                    <h2>
                        {compareCountry.atlas.officialName}
                    </h2>

                    <p>
                        {compareCountry.atlas.region}
                    </p>

                </div>

            </div>

        )}

    </div>

    <div className={`atlasGrid ${
        compareMode
            ? "atlasCompareGrid"
            : ""
    }`}>

        <CompareMetric
            label="Population"
            leftValue={country.atlas.population.toLocaleString()}
            rightValue={compareCountry?.atlas.population.toLocaleString()}
            leftCountry={country.atlas.name}
            rightCountry={compareCountry?.atlas.name}
            compareMode={compareMode}
            source={METRIC_META.population.source}
            year={METRIC_META.population.year}
            indicator={METRIC_META.population.indicator}
        />

        <CompareMetric
            label="Area"
            leftValue={`${country.atlas.area.toLocaleString()} km²`}
            rightValue={`${compareCountry?.atlas.area.toLocaleString()} km²`}
            leftCountry={country.atlas.name}
            rightCountry={compareCountry?.atlas.name}
            compareMode={compareMode}
            source={METRIC_META.area.source}
            year={METRIC_META.area.year}
            indicator={METRIC_META.area.indicator}
        />

        <CompareMetric
            label="Capital"
            leftValue={country.atlas.capital}
            rightValue={compareCountry?.atlas.capital}
            leftCountry={country.atlas.name}
            rightCountry={compareCountry?.atlas.name}
            compareMode={compareMode}
        />

        <CompareMetric
            label="Currency"
            leftValue={country.atlas.currency}
            rightValue={compareCountry?.atlas.currency}
            leftCountry={country.atlas.name}
            rightCountry={compareCountry?.atlas.name}
            compareMode={compareMode}
        />

        <CompareMetric
            label="Languages"
            leftValue={country.atlas.languages}
            rightValue={compareCountry?.atlas.languages}
            leftCountry={country.atlas.name}
            rightCountry={compareCountry?.atlas.name}
            compareMode={compareMode}
        />

        <CompareMetric
            label="Region"
            leftValue={country.atlas.region}
            rightValue={compareCountry?.atlas.region}
            leftCountry={country.atlas.name}
            rightCountry={compareCountry?.atlas.name}
            compareMode={compareMode}
        />

        <CompareMetric
            label="Timezone"
            leftValue={country.atlas.timezone}
            rightValue={compareCountry?.atlas.timezone}
            leftCountry={country.atlas.name}
            rightCountry={compareCountry?.atlas.name}
            compareMode={compareMode}
        />

        <CompareMetric
            label="Forest Coverage"
            leftValue={country.atlas.forestCoverage}
            rightValue={compareCountry?.atlas.forestCoverage}
            leftCountry={country.atlas.name}
            rightCountry={compareCountry?.atlas.name}
            compareMode={compareMode}
        />

    </div>

</section>

    );

}

export default AtlasSection;