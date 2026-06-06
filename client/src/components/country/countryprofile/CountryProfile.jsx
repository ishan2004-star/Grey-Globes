import "./countryProfile.css";

import StickyNav from "../../ui/stickynav/StickyNav";

import AtlasSection from "../sections/atlas/AtlasSection";
import EconomySection from "../sections/economy/EconomySection";
import ClimateSection from "../sections/climate/ClimateSection";
import LifestyleSection from "../sections/lifestyle/LifestyleSection";
import MobilitySection from "../sections/mobility/MobilitySection";
import PulseSection from "../sections/pulse/PulseSection";
import NewsSection from "../sections/news/NewsSection";
import CountryActions from "../countryactions/CountryActions";

import useReveal from "../../../hooks/useReveal";

function CountryProfile({ country }) {

  useReveal();

  return (

    <div className="countryProfile">

      <StickyNav />

      <div className="profileSections">

        <AtlasSection country={country} />

        <EconomySection country={country} />

        <ClimateSection country={country} />

        <LifestyleSection country={country} />

        <MobilitySection country={country} />

        <PulseSection country={country} />

        <NewsSection country={country} />

        <CountryActions country={country} />

      </div>

    </div>

  );
}

export default CountryProfile;