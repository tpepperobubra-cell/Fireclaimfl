const fs = require("fs");
const path = require("path");
const OpenAI = require("openai");

// ==== CONFIG ====
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const KEYWORDS_FILE = path.join(__dirname, "../keywords.json");
const POSTS_DIR = path.join(__dirname, "../posts");

// ==== Ensure posts directory exists ====
if (!fs.existsSync(POSTS_DIR)) fs.mkdirSync(POSTS_DIR);

// ==== Generate keywords if missing ====
if (!fs.existsSync(KEYWORDS_FILE)) {
  console.log("⚠️ keywords.json missing — generating automatically...");

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

  const expandCities = (patterns, cityList) => patterns.flatMap(p => cityList.map(c => p.replace("{city}", c)));
  const addModifiers = (baseList, mods) => baseList.flatMap(b => mods.map(m => `${b} ${m}`));
  const carrierCityCombos = (cityList, brands) => cityList.flatMap(c => brands.map(brand => `${brand} fire claim ${c} florida`));

  const geoExpanded = expandCities(baseCityPatterns, cities);
  const geoWithModifiers = addModifiers(geoExpanded, modifiers);
  const carrierGeo = carrierCityCombos(cities, carriers);

  const topics = Array.from(new Set([
    ...nonGeo,
    ...geoExpanded,
    ...geoWithModifiers,
    ...carrierGeo
  ]));

  fs.writeFileSync(KEYWORDS_FILE, JSON.stringify(topics, null, 2));
  console.log(`✅ Generated ${topics.length} keywords`);
}

// ==== Load keywords ====
const topics = JSON.parse(fs.readFileSync(KEYWORDS_FILE, "utf-8"));

// ==== Pick a random topic ====
const topic = topics[Math.floor(Math.random() * topics.length)];
console.log(`📝 Generating blog for topic: "${topic}"`);

// ==== Generate post content via OpenAI ====
async function generatePost() {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: "You are a professional content writer creating informative blog posts for homeowners in Florida about fire insurance claims and safety."
        },
        {
          role: "user",
          content: `Write a 600-800 word blog post about: "${topic}". Use headings, subheadings, and a professional but approachable tone. Include SEO-friendly keywords naturally.`
        }
      ],
      temperature: 0.7,
    });

    const postContent = response.choices[0].message.content;

    // ==== Save to Markdown ====
    const slug = topic
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const filename = path.join(POSTS_DIR, `${slug}.md`);

    const frontMatter = `---
title: "${topic}"
slug: "${slug}"
date: "${new Date().toISOString()}"
---

`;

    fs.writeFileSync(filename, frontMatter + postContent);
    console.log(`✅ Blog post saved: ${filename}`);
  } catch (err) {
    console.error("❌ Error generating post:", err);
  }
}

// ==== Run ====
generatePost();
