import "./NewsSection.css";
import SectionHeader from "../../../shared/sectionHeader/SectionHeader";

function NewsSection({
  country,
  compareCountry,
  compareMode = false
}) {

  if (!country) return null;

  const headlines = country.news?.headlines || [];
  const compareHeadlines = compareCountry?.news?.headlines || [];

  if (headlines.length === 0 && (!compareMode || compareHeadlines.length === 0)) {
    return null;
  }

  return (

    <section
      id="news"
      className={`
        intelligenceSection
        newsSection
        reveal
        ${compareMode ? "compareActive" : ""}
      `}
    >

      <SectionHeader
        liveText="LATEST HEADLINES"
        label="NEWS INTELLIGENCE"
        title="News"
        dotColor="#e67e22"
      />

      <div className="newsContent">

        <div className="newsColumn">

          {compareMode && (
            <p className="newsCountryLabel">
              {country.atlas.name}
            </p>
          )}

          {headlines.length > 0 ? (
            headlines.map((item, index) => (

              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="newsCard"
              >

                <div className="newsCardContent">

                  <h3 className="newsTitle">
                    {item.title}
                  </h3>

                  <div className="newsMeta">

                    <span className="newsSource">
                      {item.source}
                    </span>

                    <span className="newsDivider">·</span>

                    <span className="newsDate">
                      {item.date}
                    </span>

                  </div>

                </div>

                <div className="newsArrow">
                  →
                </div>

              </a>

            ))
          ) : (
            <p className="newsEmpty">
              No headlines available.
            </p>
          )}

        </div>

        {compareMode && compareCountry && (

          <div className="newsColumn">

            <p className="newsCountryLabel">
              {compareCountry.atlas.name}
            </p>

            {compareHeadlines.length > 0 ? (
              compareHeadlines.map((item, index) => (

                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="newsCard"
                >

                  <div className="newsCardContent">

                    <h3 className="newsTitle">
                      {item.title}
                    </h3>

                    <div className="newsMeta">

                      <span className="newsSource">
                        {item.source}
                      </span>

                      <span className="newsDivider">·</span>

                      <span className="newsDate">
                        {item.date}
                      </span>

                    </div>

                  </div>

                  <div className="newsArrow">
                    →
                  </div>

                </a>

              ))
            ) : (
              <p className="newsEmpty">
                No headlines available.
              </p>
            )}

          </div>

        )}

      </div>

    </section>

  );

}

export default NewsSection;
