import "./searchSection.css";

import { useState } from "react";

function SearchSection({
  handleSearch,
  selectedCountry,
  loading,
  error,
  compareMode = false,
  handleCompare
}) {

  const [query, setQuery] = useState("");

  const [leftQuery, setLeftQuery] =
    useState("");

  const [rightQuery, setRightQuery] =
    useState("");

  return (

    <section
      className={`searchSection ${
        selectedCountry || compareMode
          ? "searchActive"
          : ""
      }`}
    >

      <span className="searchEyebrow">
        GLOBAL INTELLIGENCE PLATFORM
      </span>

      <h1>
        {compareMode
          ? "Compare Nations"
          : "Explore The World"}
      </h1>

      <p>

        {compareMode
          ? "Analyze countries side by side through economic, environmental and strategic intelligence."
          : "Discover countries, economies, cultures and global insights"}

      </p>

      {!compareMode && (

        <div className="searchBar">

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 30 30"
            fill="#9CA3AF"
          >
            <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
          </svg>

          <input
            type="text"
            placeholder="Search for a country..."
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            onKeyDown={(e) => {

              if (e.key === "Enter") {

                handleSearch(query);

              }

            }}
          />

        </div>

      )}

      {compareMode && (

        <div className="compareSearchWrapper">

          <div className="searchBar">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 30 30"
              fill="#9CA3AF"
            >
              <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
            </svg>

            <input
              type="text"
              placeholder="First country..."
              value={leftQuery}
              onChange={(e) =>
                setLeftQuery(e.target.value)
              }
            />

          </div>

          <div className="compareDivider">

            VS

          </div>

          <div className="searchBar">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 30 30"
              fill="#9CA3AF"
            >
              <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
            </svg>

            <input
              type="text"
              placeholder="Second country..."
              value={rightQuery}
              onChange={(e) =>
                setRightQuery(e.target.value)
              }
            />

          </div>

          <button
            className="compareButton"
            onClick={() => {

              handleCompare(
                leftQuery,
                rightQuery
              );

            }}
          >

            Compare Nations

          </button>

        </div>

      )}

      {loading && (
        <p className="searchStatus">
          Scanning global intelligence...
        </p>
      )}

      {error && (
        <p className="searchError">
          {error}
        </p>
      )}

    </section>

  );
}

export default SearchSection;