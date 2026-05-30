/**
 * METRIC_META — single source of truth for data provenance.
 * Used by Compare, Explore, and Analyze pages.
 *
 * format: { source, year, indicator }
 *   source    — publishing organization
 *   year      — year the data represents (not current year)
 *   indicator — official indicator code / index name
 */

const CURRENT_YEAR = 2025;

export const METRIC_META = {

  /* ── Atlas / Geography ───────────────────────── */
  population:    { source: "UN / World Bank", year: 2023, indicator: "SP.POP.TOTL" },
  area:          { source: "UN",              year: 2023, indicator: "Geographic Survey" },
  capital:       { source: "UN",              year: 2023, indicator: "Administrative" },
  currency:      { source: "ISO 4217",        year: 2023, indicator: "ISO 4217" },
  languages:     { source: "Ethnologue",      year: 2023, indicator: "Language Survey" },
  timezone:      { source: "IANA",            year: 2023, indicator: "IANA tz database" },
  forestCoverage:{ source: "FAO",             year: 2022, indicator: "FRA 2020" },

  /* ── Economy ─────────────────────────────────── */
  gdp:           { source: "World Bank",      year: 2023, indicator: "NY.GDP.MKTP.CD" },
  gdpPerCapita:  { source: "World Bank",      year: 2023, indicator: "NY.GDP.PCAP.CD" },
  inflation:     { source: "IMF",             year: 2023, indicator: "PCPIPCH" },
  unemployment:  { source: "World Bank",      year: 2023, indicator: "SL.UEM.TOTL.ZS" },

  /* ── Climate / Environment ───────────────────── */
  avgTemp:       { source: "Open-Meteo",      year: 2024, indicator: "Live API" },
  co2Emissions:  { source: "IEA",             year: 2022, indicator: "CO2 Emissions" },
  renewableEnergy:{ source: "IRENA",          year: 2022, indicator: "Renewables Share" },
  aqi:           { source: "WHO",             year: 2022, indicator: "Air Quality" },

  /* ── Lifestyle / HDI ─────────────────────────── */
  happiness:     { source: "WHR",             year: 2023, indicator: "World Happiness Report" },
  education:     { source: "UNDP",            year: 2022, indicator: "HDI Education Index" },
  internet:      { source: "ITU / World Bank",year: 2023, indicator: "IT.NET.USER.ZS" },
  lifeExpectancy:{ source: "World Bank",      year: 2022, indicator: "SP.DYN.LE00.IN" },

  /* ── Pulse / Innovation ──────────────────────── */
  pulseScore:    { source: "Grey Globes",     year: 2024, indicator: "Composite Index" },
  innovation:    { source: "GII",             year: 2023, indicator: "Global Innovation Index" },
};

/**
 * getAgeClass(year) → "fresh" | "stale" | "old"
 *   fresh  = ≤ 1 year old  → green
 *   stale  = 1–2 years old → yellow
 *   old    = > 2 years old → red
 */
export const getAgeClass = (year) => {
  const age = CURRENT_YEAR - year;
  if (age <= 1) return "fresh";
  if (age <= 2) return "stale";
  return "old";
};
