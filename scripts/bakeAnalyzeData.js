/**
 * Grey Globes — Data Baking Script
 * ─────────────────────────────────
 * Run this script to fetch the latest country data from the World Bank API
 * and write it directly into analyzeService.js as a static dataset.
 *
 * Usage:
 *   node scripts/bakeAnalyzeData.js
 *
 * Run this periodically (monthly/quarterly) to keep data fresh.
 * No API key needed — World Bank API is free and public.
 */

const https = require("https");
const fs = require("fs");
const path = require("path");

const OUTPUT_FILE = path.join(
  __dirname,
  "../client/src/services/analyzeService.js"
);

// ── Helpers ──────────────────────────────────────────────────────
function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`JSON parse error for ${url}`));
        }
      });
    }).on("error", reject);
  });
}

async function fetchWorldBankIndicator(indicatorCode) {
  const url = `https://api.worldbank.org/v2/country/all/indicator/${indicatorCode}?format=json&per_page=300&mrnev=1`;
  const data = await fetchJSON(url);
  const map = {};
  if (data && data[1]) {
    data[1].forEach((item) => {
      if (item.countryiso3code && item.value !== null) {
        map[item.countryiso3code] = item.value;
      }
    });
  }
  return map;
}

async function fetchRestCountries() {
  const url = "https://restcountries.com/v3.1/all?fields=name,cca3,population,area,flags";
  return fetchJSON(url);
}

// ── Main ──────────────────────────────────────────────────────────
async function bake() {
  console.log("⏳ Fetching data from World Bank API...");

  const [
    gdpMap,
    gdpPerCapitaMap,
    lifeExpMap,
    co2Map,
    educationMap,
    internetMap,
    inflationMap,
    countries,
  ] = await Promise.all([
    fetchWorldBankIndicator("NY.GDP.MKTP.CD"),
    fetchWorldBankIndicator("NY.GDP.PCAP.CD"),
    fetchWorldBankIndicator("SP.DYN.LE00.IN"),
    fetchWorldBankIndicator("EN.ATM.CO2E.PC"),
    fetchWorldBankIndicator("HD.HCI.OVRL"),
    fetchWorldBankIndicator("IT.NET.USER.ZS"),
    fetchWorldBankIndicator("FP.CPI.TOTL.ZG"),
    fetchRestCountries(),
  ]);

  console.log(`✅ Fetched ${countries.length} countries from RestCountries.`);

  const rows = [];

  for (const c of countries) {
    const iso3 = c.cca3;
    const flagCode = iso3.toLowerCase();

    const gdp         = gdpMap[iso3];
    const gdpPC       = gdpPerCapitaMap[iso3];
    const population  = c.population;
    const area        = c.area;
    const lifeExp     = lifeExpMap[iso3];
    const co2         = co2Map[iso3];
    const education   = educationMap[iso3];
    const internet    = internetMap[iso3];
    const inflation   = inflationMap[iso3];

    // Skip countries with almost no data
    const hasData = gdp || gdpPC || lifeExp || inflation;
    if (!hasData) continue;

    rows.push({
      name:          c.name.common,
      flag:          `https://flagcdn.com/${flagCode}.svg`,
      gdp:           gdp       ? gdp / 1e12 : null,
      gdpPerCapita:  gdpPC     || null,
      population:    population || null,
      area:          area      || null,
      lifeExpectancy:lifeExp   || null,
      co2:           co2       || null,
      education:     education || null,
      internet:      internet  || null,
      inflation:     inflation || null,
    });
  }

  // Sort by GDP desc for readability
  rows.sort((a, b) => (b.gdp || 0) - (a.gdp || 0));

  console.log(`✅ Processed ${rows.length} countries with usable data.`);

  // ── Build the JS file ──────────────────────────────────────────
  const datasetLines = rows.map((r) => {
    const n  = (v, d = 4) => v !== null ? v.toFixed(d) : "null";
    return `  { name:${JSON.stringify(r.name).padEnd(28)}, flag:"https://flagcdn.com/${r.name.toLowerCase().replace(/\s+/g, "-")}.svg", gdp:${n(r.gdp,3)}, gdpPerCapita:${n(r.gdpPerCapita,0)}, population:${r.population ?? "null"}, area:${r.area ?? "null"}, lifeExpectancy:${n(r.lifeExpectancy,1)}, co2:${n(r.co2,2)}, education:${n(r.education,3)}, internet:${n(r.internet,1)}, inflation:${n(r.inflation,1)} }`;
  });

  const now = new Date().toISOString();

  const fileContent = `// AUTO-GENERATED — Do not edit manually.
// Last baked: ${now}
// Re-generate: node scripts/bakeAnalyzeData.js

export const availableMetrics = [
  { id: "gdp",            label: "GDP (USD Trillion)" },
  { id: "gdpPerCapita",   label: "GDP Per Capita (USD)" },
  { id: "population",     label: "Population" },
  { id: "area",           label: "Area (km²)" },
  { id: "lifeExpectancy", label: "Life Expectancy (Years)" },
  { id: "co2",            label: "CO₂ Emissions (Tons/capita)" },
  { id: "education",      label: "Education Index (HDI)" },
  { id: "internet",       label: "Internet Penetration (%)" },
  { id: "inflation",      label: "Inflation (%)" },
];

const COUNTRY_DATASET = [
${datasetLines.join(",\n")},
];

const VALUE_FORMATTERS = {
  gdp:            v => \`$\${v.toFixed(2)}T\`,
  gdpPerCapita:   v => \`$\${Math.round(v).toLocaleString()}\`,
  population:     v => v >= 1e9 ? \`\${(v/1e9).toFixed(2)}B\` : v >= 1e6 ? \`\${(v/1e6).toFixed(1)}M\` : v.toLocaleString(),
  area:           v => \`\${v.toLocaleString()} km²\`,
  lifeExpectancy: v => \`\${v.toFixed(1)} yrs\`,
  co2:            v => \`\${v.toFixed(1)} T/cap\`,
  education:      v => v.toFixed(3),
  internet:       v => \`\${v.toFixed(1)}%\`,
  inflation:      v => \`\${v.toFixed(1)}%\`,
};

export const fetchAllAndAnalyze = (metricId, direction = "desc") => {
  const formatter = VALUE_FORMATTERS[metricId];
  if (!formatter) return [];

  const processed = COUNTRY_DATASET
    .filter(c => c[metricId] !== null && c[metricId] !== undefined)
    .map(c => ({
      name:         c.name,
      flag:         c.flag,
      numericValue: c[metricId],
      rawValue:     formatter(c[metricId]),
    }));

  processed.sort((a, b) =>
    direction === "desc" ? b.numericValue - a.numericValue : a.numericValue - b.numericValue
  );

  return processed;
};
`;

  fs.writeFileSync(OUTPUT_FILE, fileContent, "utf8");
  console.log(`\n🎉 Done! analyzeService.js has been updated with ${rows.length} countries.`);
  console.log(`   File: ${OUTPUT_FILE}`);
}

bake().catch((err) => {
  console.error("❌ Bake failed:", err.message);
  process.exit(1);
});
