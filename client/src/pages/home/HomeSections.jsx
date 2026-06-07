import { useNavigate } from "react-router-dom";
import "./HomeSections.css";

const problemCards = [
  {
    title: "Economy",
    text: "Understand growth, opportunity, and the signals behind a country's direction.",
  },
  {
    title: "Healthcare",
    text: "Compare access, quality, and everyday confidence across potential destinations.",
  },
  {
    title: "Safety",
    text: "Look beyond headlines with a clearer view of stability and daily life.",
  },
  {
    title: "Quality of Life",
    text: "Balance cost, lifestyle, mobility, and long-term fit in one place.",
  },
];

const audienceTags = [
  "Considering relocation",
  "Evaluating job markets",
  "Planning retirement abroad",
  "Researching for investment",
  "Curious about the world",
];

function HomeSections() {
  const navigate = useNavigate();

  return (
    <main className="homeScroll">
      <section className="homeSection homeProblemSection">
        <div className="homeSectionInner homeProblemGrid">
          <div className="homeSectionCopy">
            <span className="homeSectionLabel">The Problem We Solve</span>
            <h2>Choosing a country should not feel like guesswork.</h2>
            <p>
              Grey Globes brings the signals people usually research across
              dozens of tabs into one focused view, helping decisions feel
              clearer, calmer, and more grounded.
            </p>
          </div>

          <div className="homeMetricGrid">
            {problemCards.map((card) => (
              <article className="homeMetricCard" key={card.title}>
                <span>{card.title}</span>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="homeSection homeAudienceSection">
        <div className="homeSectionInner homeCentered">
          <span className="homeSectionLabel">Who Uses Grey Globes</span>
          <h2>Built for decisions that cross borders.</h2>
          <div className="homeAudienceTags" aria-label="Grey Globes audiences">
            {audienceTags.map((tag) => (
              <span className="homeAudienceTag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="homeSection homeQuoteSection">
        <div className="homeSectionInner homeQuoteBlock">
          <blockquote>
            The right place is not only where opportunity exists. It is where
            your future can breathe.
          </blockquote>
          <p>
            Grey Globes is built for people who want to understand the world
            before they choose their place in it.
          </p>
        </div>
      </section>

      <section className="homeSection homeClosingSection">
        <div className="homeSectionInner homeClosingCard">
          <span className="homeClosingBadge">Start With The World</span>
          <h2>Explore your next beginning.</h2>
          <p>
            Search countries, compare signals, and move from curiosity to
            clarity.
          </p>
          <button
            className="homeClosingButton"
            type="button"
            onClick={() => navigate("/explore")}
          >
            Explore
          </button>
        </div>
      </section>
    </main>
  );
}

export default HomeSections;
