import CompareHero
  from "./shared/CompareHero";

import CompareAtlasSection
  from "./sections/CompareAtlasSection";

import CompareEconomySection
  from "./sections/CompareEconomySection";

import CompareClimateSection
  from "./sections/CompareClimateSection";

import CompareLifestyleSection
  from "./sections/CompareLifestyleSection";

import CompareMobilitySection
  from "./sections/CompareMobilitySection";

import ComparePulseSection
  from "./sections/ComparePulseSection";

import CompareStickyNav
  from "./shared/CompareStickyNav";

function CompareProfile({ countries }) {

  return (

    <div className="compareProfile">

      <CompareHero
        countries={countries}
      />

      <CompareStickyNav />

      <CompareAtlasSection
        countries={countries}
      />

      <CompareEconomySection
        countries={countries}
      />

      <CompareClimateSection
        countries={countries}
      />

      <CompareLifestyleSection
        countries={countries}
      />

      <CompareMobilitySection
        countries={countries}
      />

      <ComparePulseSection
        countries={countries}
      />

    </div>

  );

}

export default CompareProfile;