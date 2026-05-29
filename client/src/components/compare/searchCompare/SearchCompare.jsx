import "./searchCompare.css";

import { useState } from "react";

function SearchCompare({
leftCountry,
rightCountry,
setLeftCountry,
setRightCountry,
handleCompare
}) {

const [leftQuery, setLeftQuery] =
useState("");

const [rightQuery, setRightQuery] =
useState("");

return (


<section className="searchCompare">

  <div className="searchCompareTop">

    <span>
      COUNTRY COMPARISON ENGINE
    </span>

    <h1>
      Compare Nations
    </h1>

  </div>

  <div className="compareSearchGrid">

    <div className="compareSearchBlock">

      <label>
        First Country
      </label>

      <input
        type="text"
        placeholder="Search country..."
        value={leftQuery}
        onChange={(e) =>
          setLeftQuery(e.target.value)
        }
      />

    </div>

    <button className="swapButton">

      VS

    </button>

    <div className="compareSearchBlock">

      <label>
        Second Country
      </label>

      <input
        type="text"
        placeholder="Search country..."
        value={rightQuery}
        onChange={(e) =>
          setRightQuery(e.target.value)
        }
      />

    </div>

  </div>

  <button
    className="compareButton"
    onClick={() =>
      handleCompare(
        leftQuery,
        rightQuery
      )
    }
  >

    Compare Countries

  </button>

</section>


);

}

export default SearchCompare;
