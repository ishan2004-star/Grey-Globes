const CURRENT_YEAR = 2025;

// getAgeClass: returns 'fresh' (≤1yr), 'stale' (1-2yr), 'old' (>2yr)
const getAgeClass = (year) => {
  const age = CURRENT_YEAR - year;
  if (age <= 1) return "fresh";
  if (age <= 2) return "stale";
  return "old";
};

export const availableMetrics = [
  { id: "gdp",           label: "GDP (USD Trillion)",          source: "World Bank", year: 2023 },
  { id: "gdpPerCapita",  label: "GDP Per Capita (USD)",        source: "World Bank", year: 2023 },
  { id: "population",   label: "Population",                  source: "UN / World Bank", year: 2023 },
  { id: "area",         label: "Area (km²)",                  source: "UN",         year: 2023 },
  { id: "lifeExpectancy",label: "Life Expectancy (Years)",     source: "World Bank", year: 2022 },
  { id: "co2",          label: "CO₂ Emissions (Tons/capita)", source: "IEA / World Bank", year: 2022 },
  { id: "education",    label: "Education Index (HDI)",       source: "UNDP",       year: 2022 },
  { id: "internet",     label: "Internet Penetration (%)",    source: "ITU / World Bank", year: 2023 },
  { id: "inflation",    label: "Inflation (%)",               source: "IMF",        year: 2023 },
];

// Real-world data — updated to 2023 World Bank / IMF figures for GDP, inflation;
// Life Expectancy & CO₂ from 2022 (publication lag); Area is static.
const COUNTRY_DATASET = [
  { name:"United States",   flag:"https://flagcdn.com/us.svg", gdp:27.36, gdpPerCapita:80412, population:334900000,  area:9833517,  lifeExpectancy:78.5, co2:14.9, education:0.926, internet:91.8, inflation:3.4  },
  { name:"China",           flag:"https://flagcdn.com/cn.svg", gdp:17.79, gdpPerCapita:12614, population:1409670000, area:9596960,  lifeExpectancy:77.1, co2:8.0,  education:0.788, internet:76.4, inflation:0.2  },
  { name:"Germany",         flag:"https://flagcdn.com/de.svg", gdp:4.46,  gdpPerCapita:52824, population:84400000,   area:357114,   lifeExpectancy:81.1, co2:7.7,  education:0.950, internet:91.6, inflation:5.9  },
  { name:"Japan",           flag:"https://flagcdn.com/jp.svg", gdp:4.21,  gdpPerCapita:33834, population:124600000,  area:377975,   lifeExpectancy:84.3, co2:8.5,  education:0.920, internet:94.0, inflation:3.3  },
  { name:"India",           flag:"https://flagcdn.com/in.svg", gdp:3.57,  gdpPerCapita:2484,  population:1428600000, area:3287263,  lifeExpectancy:70.1, co2:1.9,  education:0.644, internet:52.4, inflation:5.7  },
  { name:"United Kingdom",  flag:"https://flagcdn.com/gb.svg", gdp:3.08,  gdpPerCapita:45296, population:67700000,   area:243610,   lifeExpectancy:81.0, co2:4.7,  education:0.929, internet:94.8, inflation:7.3  },
  { name:"France",          flag:"https://flagcdn.com/fr.svg", gdp:2.78,  gdpPerCapita:42330, population:67800000,   area:551695,   lifeExpectancy:82.3, co2:4.6,  education:0.900, internet:88.0, inflation:4.9  },
  { name:"Brazil",          flag:"https://flagcdn.com/br.svg", gdp:1.92,  gdpPerCapita:9060,  population:215300000,  area:8515767,  lifeExpectancy:75.9, co2:2.2,  education:0.754, internet:75.7, inflation:5.1  },
  { name:"Canada",          flag:"https://flagcdn.com/ca.svg", gdp:2.14,  gdpPerCapita:55520, population:38200000,   area:9984670,  lifeExpectancy:82.3, co2:15.2, education:0.936, internet:91.0, inflation:3.9  },
  { name:"Russia",          flag:"https://flagcdn.com/ru.svg", gdp:1.78,  gdpPerCapita:12390, population:144700000,  area:17098242, lifeExpectancy:72.6, co2:11.6, education:0.824, internet:88.2, inflation:7.4  },
  { name:"South Korea",     flag:"https://flagcdn.com/kr.svg", gdp:1.67,  gdpPerCapita:32420, population:51700000,   area:100210,   lifeExpectancy:83.5, co2:11.6, education:0.929, internet:97.6, inflation:3.6  },
  { name:"Australia",       flag:"https://flagcdn.com/au.svg", gdp:1.68,  gdpPerCapita:64490, population:26000000,   area:7692024,  lifeExpectancy:83.4, co2:15.0, education:0.946, internet:91.0, inflation:3.5  },
  { name:"Italy",           flag:"https://flagcdn.com/it.svg", gdp:2.01,  gdpPerCapita:33910, population:59600000,   area:301340,   lifeExpectancy:83.6, co2:5.6,  education:0.895, internet:74.9, inflation:8.7  },
  { name:"Spain",           flag:"https://flagcdn.com/es.svg", gdp:1.42,  gdpPerCapita:30090, population:47400000,   area:505990,   lifeExpectancy:83.3, co2:5.1,  education:0.905, internet:93.2, inflation:3.5  },
  { name:"Mexico",          flag:"https://flagcdn.com/mx.svg", gdp:1.32,  gdpPerCapita:10220, population:130000000,  area:1964375,  lifeExpectancy:75.1, co2:3.7,  education:0.775, internet:70.0, inflation:7.9  },
  { name:"Indonesia",       flag:"https://flagcdn.com/id.svg", gdp:1.32,  gdpPerCapita:4790,  population:275500000,  area:1904569,  lifeExpectancy:71.7, co2:2.3,  education:0.705, internet:62.1, inflation:3.7  },
  { name:"Netherlands",     flag:"https://flagcdn.com/nl.svg", gdp:1.01,  gdpPerCapita:57770, population:17600000,   area:41543,    lifeExpectancy:82.2, co2:9.4,  education:0.946, internet:95.0, inflation:10.0 },
  { name:"Saudi Arabia",    flag:"https://flagcdn.com/sa.svg", gdp:1.06,  gdpPerCapita:29870, population:35500000,   area:2149690,  lifeExpectancy:76.8, co2:18.7, education:0.875, internet:95.7, inflation:2.5  },
  { name:"Turkey",          flag:"https://flagcdn.com/tr.svg", gdp:0.91,  gdpPerCapita:10680, population:85300000,   area:783562,   lifeExpectancy:78.6, co2:6.1,  education:0.838, internet:81.9, inflation:64.3 },
  { name:"Switzerland",     flag:"https://flagcdn.com/ch.svg", gdp:0.81,  gdpPerCapita:92430, population:8700000,    area:41285,    lifeExpectancy:83.9, co2:4.4,  education:0.962, internet:93.3, inflation:2.1  },
  { name:"Argentina",       flag:"https://flagcdn.com/ar.svg", gdp:0.63,  gdpPerCapita:13710, population:45200000,   area:2780400,  lifeExpectancy:76.9, co2:3.8,  education:0.842, internet:77.0, inflation:142.7},
  { name:"Sweden",          flag:"https://flagcdn.com/se.svg", gdp:0.59,  gdpPerCapita:56190, population:10400000,   area:450295,   lifeExpectancy:82.9, co2:3.7,  education:0.947, internet:95.5, inflation:8.4  },
  { name:"Poland",          flag:"https://flagcdn.com/pl.svg", gdp:0.69,  gdpPerCapita:18070, population:37900000,   area:312679,   lifeExpectancy:77.6, co2:8.1,  education:0.880, internet:88.2, inflation:14.4 },
  { name:"Belgium",         flag:"https://flagcdn.com/be.svg", gdp:0.58,  gdpPerCapita:49720, population:11600000,   area:30528,    lifeExpectancy:81.7, co2:8.0,  education:0.937, internet:90.7, inflation:9.3  },
  { name:"Norway",          flag:"https://flagcdn.com/no.svg", gdp:0.58,  gdpPerCapita:107490,population:5400000,    area:323802,   lifeExpectancy:83.2, co2:7.5,  education:0.966, internet:99.0, inflation:5.8  },
  { name:"Nigeria",         flag:"https://flagcdn.com/ng.svg", gdp:0.48,  gdpPerCapita:2200,  population:218500000,  area:923768,   lifeExpectancy:53.4, co2:0.6,  education:0.539, internet:36.0, inflation:22.4 },
  { name:"Israel",          flag:"https://flagcdn.com/il.svg", gdp:0.52,  gdpPerCapita:55530, population:9300000,    area:20770,    lifeExpectancy:82.6, co2:7.4,  education:0.919, internet:90.0, inflation:5.0  },
  { name:"South Africa",    flag:"https://flagcdn.com/za.svg", gdp:0.41,  gdpPerCapita:6770,  population:59700000,   area:1219090,  lifeExpectancy:64.9, co2:7.4,  education:0.713, internet:68.2, inflation:5.9  },
  { name:"UAE",             flag:"https://flagcdn.com/ae.svg", gdp:0.50,  gdpPerCapita:49450, population:10000000,   area:83600,    lifeExpectancy:78.0, co2:20.7, education:0.911, internet:99.2, inflation:4.8  },
  { name:"Singapore",       flag:"https://flagcdn.com/sg.svg", gdp:0.47,  gdpPerCapita:82810, population:5700000,    area:719,      lifeExpectancy:83.9, co2:8.0,  education:0.939, internet:90.0, inflation:4.5  },
  { name:"Egypt",           flag:"https://flagcdn.com/eg.svg", gdp:0.39,  gdpPerCapita:3660,  population:104300000,  area:1001449,  lifeExpectancy:72.0, co2:2.6,  education:0.708, internet:69.0, inflation:33.9 },
  { name:"Pakistan",        flag:"https://flagcdn.com/pk.svg", gdp:0.34,  gdpPerCapita:1490,  population:231800000,  area:881913,   lifeExpectancy:67.2, co2:1.0,  education:0.544, internet:21.0, inflation:29.2 },
  { name:"Bangladesh",      flag:"https://flagcdn.com/bd.svg", gdp:0.42,  gdpPerCapita:2540,  population:169300000,  area:147570,   lifeExpectancy:73.6, co2:0.6,  education:0.632, internet:39.0, inflation:9.0  },
  { name:"Denmark",         flag:"https://flagcdn.com/dk.svg", gdp:0.40,  gdpPerCapita:67220, population:5900000,    area:43094,    lifeExpectancy:81.4, co2:5.4,  education:0.952, internet:97.3, inflation:8.5  },
  { name:"Finland",         flag:"https://flagcdn.com/fi.svg", gdp:0.28,  gdpPerCapita:50710, population:5500000,    area:338145,   lifeExpectancy:81.9, co2:7.0,  education:0.940, internet:91.9, inflation:7.2  },
  { name:"Ireland",         flag:"https://flagcdn.com/ie.svg", gdp:0.55,  gdpPerCapita:106040,population:5100000,    area:70273,    lifeExpectancy:82.3, co2:7.7,  education:0.945, internet:92.2, inflation:8.3  },
  { name:"Philippines",     flag:"https://flagcdn.com/ph.svg", gdp:0.40,  gdpPerCapita:3570,  population:113900000,  area:300000,   lifeExpectancy:72.1, co2:1.5,  education:0.699, internet:67.0, inflation:5.8  },
  { name:"Vietnam",         flag:"https://flagcdn.com/vn.svg", gdp:0.41,  gdpPerCapita:4160,  population:97340000,   area:331212,   lifeExpectancy:73.7, co2:3.7,  education:0.703, internet:73.2, inflation:3.2  },
  { name:"Thailand",        flag:"https://flagcdn.com/th.svg", gdp:0.54,  gdpPerCapita:7590,  population:71600000,   area:513120,   lifeExpectancy:78.0, co2:4.7,  education:0.800, internet:85.3, inflation:1.2  },
  { name:"Malaysia",        flag:"https://flagcdn.com/my.svg", gdp:0.44,  gdpPerCapita:13120, population:33200000,   area:329847,   lifeExpectancy:76.9, co2:8.3,  education:0.803, internet:89.6, inflation:2.8  },
  { name:"New Zealand",     flag:"https://flagcdn.com/nz.svg", gdp:0.25,  gdpPerCapita:47660, population:5100000,    area:268021,   lifeExpectancy:81.9, co2:6.2,  education:0.937, internet:93.6, inflation:7.2  },
  { name:"Kazakhstan",      flag:"https://flagcdn.com/kz.svg", gdp:0.22,  gdpPerCapita:11140, population:19000000,   area:2724900,  lifeExpectancy:73.2, co2:13.2, education:0.802, internet:89.9, inflation:14.8 },
  { name:"Ethiopia",        flag:"https://flagcdn.com/et.svg", gdp:0.13,  gdpPerCapita:1100,  population:123400000,  area:1104300,  lifeExpectancy:67.8, co2:0.1,  education:0.498, internet:22.7, inflation:28.8 },
  { name:"Ghana",           flag:"https://flagcdn.com/gh.svg", gdp:0.08,  gdpPerCapita:2450,  population:33500000,   area:238533,   lifeExpectancy:64.1, co2:0.6,  education:0.602, internet:58.0, inflation:54.1 },
  { name:"Kenya",           flag:"https://flagcdn.com/ke.svg", gdp:0.11,  gdpPerCapita:2050,  population:55000000,   area:580367,   lifeExpectancy:67.5, co2:0.4,  education:0.601, internet:29.0, inflation:7.7  },
  { name:"Morocco",         flag:"https://flagcdn.com/ma.svg", gdp:0.14,  gdpPerCapita:3700,  population:37500000,   area:710850,   lifeExpectancy:74.1, co2:1.8,  education:0.683, internet:88.1, inflation:6.1  },
  { name:"Portugal",        flag:"https://flagcdn.com/pt.svg", gdp:0.26,  gdpPerCapita:24020, population:10200000,   area:92212,    lifeExpectancy:82.0, co2:4.1,  education:0.866, internet:82.7, inflation:7.8  },
  { name:"Czech Republic",  flag:"https://flagcdn.com/cz.svg", gdp:0.31,  gdpPerCapita:28820, population:10900000,   area:78867,    lifeExpectancy:78.6, co2:9.5,  education:0.900, internet:82.5, inflation:15.1 },
  { name:"Greece",          flag:"https://flagcdn.com/gr.svg", gdp:0.22,  gdpPerCapita:20680, population:10700000,   area:131957,   lifeExpectancy:80.4, co2:5.8,  education:0.887, internet:81.0, inflation:9.6   },
  { name:"Romania",         flag:"https://flagcdn.com/ro.svg", gdp:0.30,  gdpPerCapita:15560, population:19300000,   area:238397,   lifeExpectancy:75.7, co2:3.8,  education:0.821, internet:82.6, inflation:13.8  },

  /* ── High-inflation & missing key economies (fixes ranking accuracy) ── */
  { name:"Venezuela",       flag:"https://flagcdn.com/ve.svg", gdp:0.10,  gdpPerCapita:3490,  population:28300000,   area:916445,   lifeExpectancy:72.1, co2:3.2,  education:0.691, internet:72.0, inflation:250.0 },
  { name:"Sudan",           flag:"https://flagcdn.com/sd.svg", gdp:0.16,  gdpPerCapita:3390,  population:46870000,   area:1861484,  lifeExpectancy:65.9, co2:0.4,  education:0.510, internet:26.6, inflation:100.0 },
  { name:"South Sudan",     flag:"https://flagcdn.com/ss.svg", gdp:0.02,  gdpPerCapita:1080,  population:11000000,   area:619745,   lifeExpectancy:55.0, co2:0.1,  education:0.385, internet:8.0,  inflation:97.0  },
  { name:"Zimbabwe",        flag:"https://flagcdn.com/zw.svg", gdp:0.02,  gdpPerCapita:1520,  population:15100000,   area:390757,   lifeExpectancy:61.9, co2:0.7,  education:0.593, internet:27.0, inflation:81.0  },
  { name:"Lebanon",         flag:"https://flagcdn.com/lb.svg", gdp:0.02,  gdpPerCapita:4110,  population:5500000,    area:10452,    lifeExpectancy:78.9, co2:3.6,  education:0.706, internet:78.0, inflation:73.0  },
  { name:"Haiti",           flag:"https://flagcdn.com/ht.svg", gdp:0.02,  gdpPerCapita:1340,  population:11450000,   area:27750,    lifeExpectancy:64.0, co2:0.3,  education:0.535, internet:37.0, inflation:33.0  },
  { name:"Iran",            flag:"https://flagcdn.com/ir.svg", gdp:0.37,  gdpPerCapita:4250,  population:87900000,   area:1648195,  lifeExpectancy:77.3, co2:8.1,  education:0.774, internet:78.6, inflation:40.0  },
  { name:"Myanmar",         flag:"https://flagcdn.com/mm.svg", gdp:0.07,  gdpPerCapita:1300,  population:54400000,   area:676578,   lifeExpectancy:66.0, co2:0.7,  education:0.585, internet:28.0, inflation:26.0  },
  { name:"Colombia",        flag:"https://flagcdn.com/co.svg", gdp:0.34,  gdpPerCapita:6510,  population:51900000,   area:1141748,  lifeExpectancy:77.3, co2:1.7,  education:0.752, internet:73.0, inflation:11.7  },
  { name:"Ukraine",         flag:"https://flagcdn.com/ua.svg", gdp:0.16,  gdpPerCapita:4530,  population:43500000,   area:603550,   lifeExpectancy:71.0, co2:4.0,  education:0.773, internet:79.0, inflation:20.5  },
  { name:"Algeria",         flag:"https://flagcdn.com/dz.svg", gdp:0.19,  gdpPerCapita:4230,  population:45600000,   area:2381741,  lifeExpectancy:77.0, co2:3.8,  education:0.745, internet:71.2, inflation:9.3   },
  { name:"Peru",            flag:"https://flagcdn.com/pe.svg", gdp:0.24,  gdpPerCapita:7120,  population:33200000,   area:1285216,  lifeExpectancy:76.7, co2:1.7,  education:0.762, internet:71.5, inflation:8.5   },
  { name:"Chile",           flag:"https://flagcdn.com/cl.svg", gdp:0.30,  gdpPerCapita:15360, population:19200000,   area:756102,   lifeExpectancy:80.2, co2:4.7,  education:0.855, internet:88.0, inflation:12.8  },
  { name:"Hungary",         flag:"https://flagcdn.com/hu.svg", gdp:0.19,  gdpPerCapita:18820, population:9700000,    area:93028,    lifeExpectancy:76.2, co2:4.1,  education:0.851, internet:86.8, inflation:17.6  },
  { name:"Iraq",            flag:"https://flagcdn.com/iq.svg", gdp:0.26,  gdpPerCapita:6390,  population:41200000,   area:438317,   lifeExpectancy:70.6, co2:4.2,  education:0.686, internet:75.0, inflation:5.1   },
  { name:"Angola",          flag:"https://flagcdn.com/ao.svg", gdp:0.09,  gdpPerCapita:2850,  population:34800000,   area:1246700,  lifeExpectancy:61.6, co2:0.6,  education:0.586, internet:33.0, inflation:24.0  },
  { name:"Cameroon",        flag:"https://flagcdn.com/cm.svg", gdp:0.04,  gdpPerCapita:1640,  population:27200000,   area:475442,   lifeExpectancy:59.3, co2:0.4,  education:0.576, internet:34.0, inflation:6.3   },
  { name:"DR Congo",        flag:"https://flagcdn.com/cd.svg", gdp:0.06,  gdpPerCapita:620,   population:99000000,   area:2344858,  lifeExpectancy:60.4, co2:0.0,  education:0.479, internet:17.4, inflation:41.5  },
  { name:"Tanzania",        flag:"https://flagcdn.com/tz.svg", gdp:0.08,  gdpPerCapita:1120,  population:63300000,   area:945087,   lifeExpectancy:67.2, co2:0.2,  education:0.549, internet:51.0, inflation:4.5   },
  { name:"Uganda",          flag:"https://flagcdn.com/ug.svg", gdp:0.04,  gdpPerCapita:870,   population:47100000,   area:241038,   lifeExpectancy:63.7, co2:0.1,  education:0.544, internet:26.0, inflation:7.2   },
  { name:"Uzbekistan",      flag:"https://flagcdn.com/uz.svg", gdp:0.08,  gdpPerCapita:2310,  population:35300000,   area:448978,   lifeExpectancy:75.8, co2:3.5,  education:0.727, internet:76.0, inflation:11.5  },
  { name:"Sri Lanka",       flag:"https://flagcdn.com/lk.svg", gdp:0.07,  gdpPerCapita:3280,  population:22200000,   area:65610,    lifeExpectancy:77.0, co2:0.8,  education:0.782, internet:56.0, inflation:50.3  },
  { name:"Nepal",           flag:"https://flagcdn.com/np.svg", gdp:0.04,  gdpPerCapita:1360,  population:30000000,   area:147181,   lifeExpectancy:71.9, co2:0.5,  education:0.602, internet:52.0, inflation:8.6   },
  { name:"Bolivia",         flag:"https://flagcdn.com/bo.svg", gdp:0.04,  gdpPerCapita:3330,  population:12100000,   area:1098581,  lifeExpectancy:71.8, co2:1.9,  education:0.698, internet:63.0, inflation:3.7   },
  { name:"Cuba",            flag:"https://flagcdn.com/cu.svg", gdp:0.10,  gdpPerCapita:8920,  population:11200000,   area:109884,   lifeExpectancy:78.4, co2:2.1,  education:0.764, internet:71.6, inflation:45.0  },
  { name:"Libya",           flag:"https://flagcdn.com/ly.svg", gdp:0.05,  gdpPerCapita:7260,  population:7200000,    area:1759540,  lifeExpectancy:73.6, co2:8.3,  education:0.718, internet:46.0, inflation:2.9   },
  { name:"Qatar",           flag:"https://flagcdn.com/qa.svg", gdp:0.22,  gdpPerCapita:78540, population:2900000,    area:11586,    lifeExpectancy:80.2, co2:31.7, education:0.855, internet:99.7, inflation:3.0   },
  { name:"Kuwait",          flag:"https://flagcdn.com/kw.svg", gdp:0.17,  gdpPerCapita:37890, population:4400000,    area:17818,    lifeExpectancy:78.2, co2:24.5, education:0.831, internet:99.2, inflation:4.0   },
  { name:"Bahrain",         flag:"https://flagcdn.com/bh.svg", gdp:0.04,  gdpPerCapita:24750, population:1700000,    area:778,      lifeExpectancy:79.4, co2:21.9, education:0.875, internet:99.7, inflation:3.2   },
  { name:"Luxembourg",      flag:"https://flagcdn.com/lu.svg", gdp:0.08,  gdpPerCapita:127670,population:650000,     area:2586,     lifeExpectancy:82.6, co2:13.7, education:0.930, internet:99.1, inflation:6.4   },
  { name:"Iceland",         flag:"https://flagcdn.com/is.svg", gdp:0.03,  gdpPerCapita:79020, population:370000,     area:103000,   lifeExpectancy:82.7, co2:5.4,  education:0.959, internet:99.0, inflation:8.7   },
];

const VALUE_FORMATTERS = {
  gdp:            v => `$${v.toFixed(2)}T`,
  gdpPerCapita:   v => `$${Math.round(v).toLocaleString()}`,
  population:     v => v >= 1e9 ? `${(v/1e9).toFixed(2)}B` : v >= 1e6 ? `${(v/1e6).toFixed(1)}M` : v.toLocaleString(),
  area:           v => `${v.toLocaleString()} km²`,
  lifeExpectancy: v => `${v.toFixed(1)} yrs`,
  co2:            v => `${v.toFixed(1)} T/cap`,
  education:      v => v.toFixed(3),
  internet:       v => `${v.toFixed(1)}%`,
  inflation:      v => `${v.toFixed(1)}%`,
};

export const fetchAllAndAnalyze = (metricId, direction = "desc") => {
  const metric = availableMetrics.find(m => m.id === metricId);
  const formatter = VALUE_FORMATTERS[metricId];
  if (!formatter || !metric) return [];

  const ageClass = getAgeClass(metric.year);

  const processed = COUNTRY_DATASET
    .filter(c => c[metricId] !== null && c[metricId] !== undefined)
    .map(c => ({
      name:         c.name,
      flag:         c.flag,
      numericValue: c[metricId],
      rawValue:     formatter(c[metricId]),
      source:       metric.source,
      year:         metric.year,
      ageClass,
    }));

  processed.sort((a, b) =>
    direction === "desc" ? b.numericValue - a.numericValue : a.numericValue - b.numericValue
  );

  return processed;
};
