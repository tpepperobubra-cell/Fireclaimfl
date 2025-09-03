// scripts/generate-blog.js
const fs = require("fs");
const path = require("path");
const OpenAI = require("openai");

// ==== CONFIG ====
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // store securely in GitHub Secrets
});

const POSTS_DIR = path.join(__dirname, "../posts");

// Ensure posts directory exists
if (!fs.existsSync(POSTS_DIR)) {
  fs.mkdirSync(POSTS_DIR, { recursive: true });
  console.log(`📁 Created posts directory: ${POSTS_DIR}`);
}

// ==== Load keywords ====
const KEYWORDS_FILE = path.join(__dirname, "../keywords.json");
if (!fs.existsSync(KEYWORDS_FILE)) {
  console.error(`❌ Keywords file not found: ${KEYWORDS_FILE}`);
  process.exit(1);
}

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

    console.log(`✅ Blog post saved at: ${filename}`);
  } catch (err) {
    console.error("❌ Error generating post:", err);
  }
}

// ==== Run ====
generatePost();
