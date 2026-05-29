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
      </div>

      <div className="card">
        <div className="buttonContainer">

          <div
            className="glassButton"
            onClick={() => navigate("/explore")}
          >
            Explore
          </div>

          <div
            className="glassButton"
            onClick={() => navigate("/compare")}
          >
            Compare
          </div>

          <div
            className="glassButton"
            onClick={() => navigate("/analyze")}
          >
            Analyze
          </div>

        </div>
      </div>

    </div>
  );
}

export default GlassCard;