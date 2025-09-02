const fs = require("fs");

// ====== Non-geo core topics ======
const nonGeo = [
  "what to do after a house fire florida",
  "who to call after house fire florida",
  "after a fire checklist florida",
  "replace documents after fire florida",
  "red cross help after fire florida",
  "is it safe to stay in house after small fire florida",
  "emergency housing after fire florida",
  "hotel tonight after house fire florida",
  "how to file a fire insurance claim florida",
  "fire insurance claim process florida",
  "first notice of loss fire claim florida",
  "how long do insurance companies have to pay a fire claim florida",
  "fire claim timeline florida",
  "denied fire claim what now florida",
  "underpaid fire claim florida",
  "how to talk to insurance adjuster after fire florida",
  "public adjuster fire claim near me"
];

// ====== Geo and carrier info ======
const cities = [
  "orlando","miami","tampa","jacksonville","fort lauderdale","st petersburg",
  "west palm beach","fort myers","clearwater","pensacola","daytona beach",
  "kissimmee","gainesville","sarasota","ocala","lakeland","tallahassee",
  "palm bay","port st lucie","cape coral"
];

const baseCityPatterns = [
  "house fire insurance claim {city} florida",
  "public adjuster fire claim {city} florida",
  "apartment fire hotel coverage {city} florida",
  "smoke damage insurance claim {city} florida",
  "fire claim denied {city} florida",
  "does insurance pay for hotel after fire {city} florida",
  "how to file a fire insurance claim {city} florida",
  "appraisal clause fire claim {city} florida"
];

const modifiers = ["near me","today","checklist","timeline","how long","sample letter","form"];
const carriers = ["citizens","state farm","universal property and casualty","slide insurance","tower hill"];

// ---------- Expanders ----------
function expandCities(patterns, cityList) {
  return patterns.flatMap(p => cityList.map(c => p.replace("{city}", c)));
}

function addModifiers(baseList, mods) {
  return baseList.flatMap(b => mods.map(m => `${b} ${m}`));
}

function carrierCityCombos(cityList, brands) {
  return cityList.flatMap(c => brands.map(brand => `${brand} fire claim ${c} florida`));
}

// ---------- Build the full list ----------
const geoExpanded = expandCities(baseCityPatterns, cities);
const geoWithModifiers = addModifiers(geoExpanded, modifiers);
const carrierGeo = carrierCityCombos(cities, carriers);

// Merge & de-duplicate
const topics = Array.from(new Set([
  ...nonGeo,
  ...geoExpanded,
  ...geoWithModifiers,
  ...carrierGeo
]));

// Write to keywords.json
fs.writeFileSync("keywords.json", JSON.stringify(topics, null, 2));
console.log(`✅ Generated ${topics.length} keywords`);
