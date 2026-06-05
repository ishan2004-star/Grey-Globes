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
            leftValue={country.atlas.population?.toLocaleString?.() || country.atlas.population}
            rightValue={compareCountry?.atlas.population?.toLocaleString?.() || compareCountry?.atlas.population}
            leftCountry={country.atlas.name}
            rightCountry={compareCountry?.atlas.name}
            compareMode={compareMode}
            source={METRIC_META.population.source}
            year={METRIC_META.population.year}
            indicator={METRIC_META.population.indicator}
        />

        <CompareMetric
            label="Area"
            leftValue={`${country.atlas.area?.toLocaleString?.()} km²`}
            rightValue={compareCountry ? `${compareCountry.atlas.area?.toLocaleString?.()} km²` : undefined}
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

        {/* Phase 3A — Geography */}
        <CompareMetric
            label="Borders"
            leftValue={country.atlas.borders || "Data Not Available"}
            rightValue={compareCountry?.atlas.borders || "Data Not Available"}
            leftCountry={country.atlas.name}
            rightCountry={compareCountry?.atlas.name}
            compareMode={compareMode}
            source={METRIC_META.borders.source}
            year={METRIC_META.borders.year}
            indicator={METRIC_META.borders.indicator}
        />

        <CompareMetric
            label="Coordinates"
            leftValue={country.atlas.coordinates || "Data Not Available"}
            rightValue={compareCountry?.atlas.coordinates || "Data Not Available"}
            leftCountry={country.atlas.name}
            rightCountry={compareCountry?.atlas.name}
            compareMode={compareMode}
            source={METRIC_META.coordinates.source}
            year={METRIC_META.coordinates.year}
            indicator={METRIC_META.coordinates.indicator}
        />

        <CompareMetric
            label="Latitude"
            leftValue={country.atlas.lat != null ? `${country.atlas.lat.toFixed(4)}°` : "Data Not Available"}
            rightValue={compareCountry?.atlas.lat != null ? `${compareCountry.atlas.lat.toFixed(4)}°` : "Data Not Available"}
            leftCountry={country.atlas.name}
            rightCountry={compareCountry?.atlas.name}
            compareMode={compareMode}
        />

        <CompareMetric
            label="Longitude"
            leftValue={country.atlas.lng != null ? `${country.atlas.lng.toFixed(4)}°` : "Data Not Available"}
            rightValue={compareCountry?.atlas.lng != null ? `${compareCountry.atlas.lng.toFixed(4)}°` : "Data Not Available"}
            leftCountry={country.atlas.name}
            rightCountry={compareCountry?.atlas.name}
            compareMode={compareMode}
        />

        <CompareMetric
            label="Landlocked"
            leftValue={country.atlas.landlocked || "Data Not Available"}
            rightValue={compareCountry?.atlas.landlocked || "Data Not Available"}
            leftCountry={country.atlas.name}
            rightCountry={compareCountry?.atlas.name}
            compareMode={compareMode}
            source={METRIC_META.landlocked.source}
            year={METRIC_META.landlocked.year}
            indicator={METRIC_META.landlocked.indicator}
        />

        {/* Phase 3A — Demographics */}
        <CompareMetric
            label="Population Growth"
            leftValue={country.atlas.populationGrowth || "Data Not Available"}
            rightValue={compareCountry?.atlas.populationGrowth || "Data Not Available"}
            leftCountry={country.atlas.name}
            rightCountry={compareCountry?.atlas.name}
            compareMode={compareMode}
            source={METRIC_META.populationGrowth.source}
            year={METRIC_META.populationGrowth.year}
            indicator={METRIC_META.populationGrowth.indicator}
        />

        <CompareMetric
            label="Birth Rate"
            leftValue={country.atlas.birthRate || "Data Not Available"}
            rightValue={compareCountry?.atlas.birthRate || "Data Not Available"}
            leftCountry={country.atlas.name}
            rightCountry={compareCountry?.atlas.name}
            compareMode={compareMode}
            source={METRIC_META.birthRate.source}
            year={METRIC_META.birthRate.year}
            indicator={METRIC_META.birthRate.indicator}
        />

        <CompareMetric
            label="Death Rate"
            leftValue={country.atlas.deathRate || "Data Not Available"}
            rightValue={compareCountry?.atlas.deathRate || "Data Not Available"}
            leftCountry={country.atlas.name}
            rightCountry={compareCountry?.atlas.name}
            compareMode={compareMode}
            source={METRIC_META.deathRate.source}
            year={METRIC_META.deathRate.year}
            indicator={METRIC_META.deathRate.indicator}
        />

        <CompareMetric
            label="Life Expectancy"
            leftValue={country.atlas.lifeExpectancy || "Data Not Available"}
            rightValue={compareCountry?.atlas.lifeExpectancy || "Data Not Available"}
            leftCountry={country.atlas.name}
            rightCountry={compareCountry?.atlas.name}
            compareMode={compareMode}
            source={METRIC_META.lifeExpectancy.source}
            year={METRIC_META.lifeExpectancy.year}
            indicator={METRIC_META.lifeExpectancy.indicator}
        />

        <CompareMetric
            label="Forest Coverage"
            leftValue={country.atlas.forestCoverage}
            rightValue={compareCountry?.atlas.forestCoverage}
            leftCountry={country.atlas.name}
            rightCountry={compareCountry?.atlas.name}
            compareMode={compareMode}
            source={METRIC_META.forestCoverage.source}
            year={METRIC_META.forestCoverage.year}
            indicator={METRIC_META.forestCoverage.indicator}
        />

    </div>

</section>

    );

}

export default AtlasSection;