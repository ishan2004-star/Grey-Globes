// GlassCard.jsx

import "./GlassCard.css";
import { useNavigate } from "react-router-dom";

function GlassCard() {
  const navigate = useNavigate();

  return (
    <div className="container">

      <div className="textSection">
        <h1>
          Beyond Borders <br />
          Lies Your Next Beginning
        </h1>

        <p>
          From thriving economies to peaceful lifestyles,
from innovation hubs to hidden opportunities —
Grey Globes brings every corner of the world closer to your future.
Explore nations shaped by culture, ambition, innovation, and possibility. 

        </p>

        <div className="heroCtaRow">
          <button
            className="heroButton heroButtonPrimary"
            type="button"
            onClick={() => navigate("/explore")}
          >
            Explore
          </button>

          <button
            className="heroButton heroButtonSecondary"
            type="button"
            onClick={() => navigate("/compare")}
          >
            Compare
          </button>
        </div>

        <div className="heroStats">
          <div className="heroStat">
            <strong>190+</strong>
            <span>Countries</span>
          </div>
          <div className="heroStat">
            <strong>60+</strong>
            <span>Indicators</span>
          </div>
          <div className="heroStat">
            <strong>Live</strong>
            <span>Data</span>
          </div>
        </div>
      </div>

    </div>
  );
}

export default GlassCard;
