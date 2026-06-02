import { useState, useRef, useEffect } from "react";
import "./analyze.css";

import Navbar from "../../components/ui/navbar/Navbar";
import CountrySkeleton from "../../components/country/countryskeleton/CountrySkeleton";

import { availableMetrics, fetchAllAndAnalyze } from "../../services/analyzeService";

const DIRECTIONS = [
  { id: "desc", label: "Highest First" },
  { id: "asc", label: "Lowest First" },
];

/* ── Custom Dropdown ───────────────────────────────────────── */
function CustomDropdown({ options, value, onChange, placeholder }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = options.find(o => o.id === value);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="customDropdown" ref={ref}>
      <button
        className={`dropdownTrigger ${open ? "dropdownOpen" : ""}`}
        onClick={() => setOpen(o => !o)}
        type="button"
      >
        <span>{selected ? selected.label : placeholder}</span>
        <svg className={`dropdownChevron ${open ? "chevronUp" : ""}`} width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2.5 5L7 9.5L11.5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="dropdownPanel">
          <div className="dropdownPanelInner">
            {options.map(opt => (
              <button
                key={opt.id}
                type="button"
                className={`dropdownItem ${opt.id === value ? "dropdownItemActive" : ""}`}
                onClick={() => { onChange(opt.id); setOpen(false); }}
              >
                <span className="dropdownItemDot" />
                {opt.label}
                {opt.id === value && <span className="dropdownItemCheck">✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Main Page ─────────────────────────────────────────────── */
function Analyze() {
  const [metric, setMetric] = useState(availableMetrics[0].id);
  const [direction, setDirection] = useState("desc");
  const [results, setResults] = useState(null);
  const [allData, setAllData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    setLoading(true);
    setResults(null);
    setAllData([]);
    setVisibleCount(10);

    setTimeout(async () => {
      const data =
        await fetchAllAndAnalyze(
          metric,
          direction
        );
      setAllData(data);
      setResults({ metric: availableMetrics.find(m => m.id === metric) });
      setLoading(false);
    }, 400);
  };

  const handleLoadMore = () => setVisibleCount(prev => prev + 10);

  const RANK_MEDALS = ["🥇", "🥈", "🥉"];

  return (
    <div className="analyzePage">
      <Navbar />

      {/* halftone dot overlay */}
      <div className="analyzeHalftone" aria-hidden="true" />

      <main className="analyzeContent">

        {/* ── Hero ── */}
        <section className="analyzeHero">
          <span className="analyzeEyebrow">GLOBAL INTELLIGENCE</span>
          <h1>Global Rankings</h1>
          <p>
            Explore and rank countries using economic, demographic, development,
            environmental, and geographic indicators. Discover the world's top-performing
            countries based on selected metrics.
          </p>
        </section>

        {/* ── Controls ── */}
        <section className="analyzeControlsContainer">
          <div className="analyzeControls">

            <div className="controlGroup">
              <label className="controlLabel">METRIC</label>
              <CustomDropdown
                options={availableMetrics}
                value={metric}
                onChange={setMetric}
                placeholder="Select metric"
              />
            </div>

            <div className="controlDivider" />

            <div className="controlGroup">
              <label className="controlLabel">ORDER</label>
              <CustomDropdown
                options={DIRECTIONS}
                value={direction}
                onChange={setDirection}
                placeholder="Select order"
              />
            </div>

            <button className="analyzeBtn" onClick={handleAnalyze}>
              <span>Analyze</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

          </div>
        </section>

        {/* ── Results ── */}
        <section className="analyzeResultsSection">

          {loading && (
            <div className="analyzeLoading"><CountrySkeleton /></div>
          )}

          {!loading && !results && (
            <div className="analyzeEmptyState">
              <div className="emptyStateIcon">◎</div>
              <p>Select a metric and click <strong>Analyze</strong> to discover the world's top-ranked countries.</p>
            </div>
          )}

          {!loading && results && allData.length === 0 && (
            <div className="analyzeEmptyState">
              <div className="emptyStateIcon">✕</div>
              <p>No valid data available for this metric.</p>
            </div>
          )}

          {!loading && results && allData.length > 0 && (
            <div className="rankingList">

              <div className="rankingHeader">
                <h2 className="rankingTitle">Rankings by {results.metric.label}</h2>
                <span className="rankingCount">{allData.length} countries</span>
              </div>

              <div className="rankingGrid">
                {allData.slice(0, visibleCount).map((item, index) => {
                  const rank = index + 1;
                  let rankClass = "standardRank";
                  if (rank === 1) rankClass = "goldRank";
                  else if (rank === 2) rankClass = "silverRank";
                  else if (rank === 3) rankClass = "bronzeRank";

                  return (
                    <div
                      key={item.name}
                      className={`rankingCard ${rankClass}`}
                      style={{ animationDelay: `${index * 35}ms` }}
                    >
                      <div className="rankBadge">
                        {rank <= 3 ? <span className="rankMedal">{RANK_MEDALS[rank - 1]}</span> : `#${rank}`}
                      </div>

                      <div className="rankDetails">
                        <div className="rankCountryInfo">
                          {item.flag && (
                            <div className="rankFlagWrap">
                              <img src={item.flag} alt={`${item.name} flag`} className="rankFlag" />
                            </div>
                          )}
                          <span className="rankCountryName">{item.name}</span>
                        </div>
                        <div className="rankValueGroup">
                          <span className="rankMetricValue">{item.rawValue}</span>
                          <div className="rankCitation">
                            <span className={`dataDot dataDot--${item.ageClass}`} title={
                              item.ageClass === "fresh" ? "Data from last year"
                                : item.ageClass === "stale" ? "Data is 2 years old"
                                  : "Data is 3+ years old"
                            }>●</span>
                            <span className="rankSource">{item.source}, {item.year}</span>
                          </div>
                        </div>
                      </div>

                      <div className="rankBarTrack">
                        <div
                          className="rankBar"
                          style={{ width: `${(item.numericValue / allData[0].numericValue) * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {visibleCount < allData.length && (
                <div className="loadMoreContainer">
                  <button className="analyzeBtn loadMoreBtn" onClick={handleLoadMore}>
                    <span>Next 10 Countries</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              )}

            </div>
          )}
        </section>

      </main>
    </div>
  );
}

export default Analyze;