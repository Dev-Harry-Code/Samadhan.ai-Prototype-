import { CATEGORY_MAP } from "@/lib/data/mock-data";
import type { CategoryId } from "@/lib/types";

import type { ClassificationResult } from "./types";

interface Hint {
  word: string;
  weight: number;
}

const KEYWORDS: Record<CategoryId, Hint[]> = {
  water: [
    { word: "drinking water", weight: 4 },
    { word: "clean water", weight: 4 },
    { word: "water supply", weight: 4 },
    { word: "municipal water", weight: 3 },
    { word: "village water", weight: 3 },
    { word: "pond water", weight: 3 },
    { word: "well water", weight: 3 },
    { word: "hand pump", weight: 3 },
    { word: "handpump", weight: 3 },
    { word: "no water", weight: 3 },
    { word: "water quality", weight: 3 },
    { word: "water tank", weight: 2 },
    { word: "water logging", weight: 2 },
    { word: "waterlogging", weight: 2 },
    { word: "tap", weight: 3 },
    { word: "pipeline", weight: 3 },
    { word: "pipe", weight: 2 },
    { word: "kiosk", weight: 3 },
    { word: "aquifer", weight: 3 },
    { word: "potable", weight: 3 },
    { word: "leak", weight: 2 },
    { word: "leaking", weight: 2 },
    { word: "chlorinated", weight: 2 },
    { word: "chlorination", weight: 2 },
    { word: "untreated", weight: 2 },
    { word: "groundwater", weight: 3 },
    { word: "water", weight: 1 },
    { word: "borewell", weight: 1 },
  ],
  sanitation: [
    { word: "open drain", weight: 4 },
    { word: "drain", weight: 3 },
    { word: "drainage", weight: 3 },
    { word: "sewage", weight: 4 },
    { word: "sewer", weight: 3 },
    { word: "toilet", weight: 4 },
    { word: "latrine", weight: 4 },
    { word: "open defecation", weight: 4 },
    { word: "defecation", weight: 4 },
    { word: "solid waste", weight: 3 },
    { word: "garbage", weight: 3 },
    { word: "waste dumping", weight: 3 },
    { word: "waste", weight: 2 },
    { word: "litter", weight: 2 },
    { word: "overflowing", weight: 2 },
    { word: "stagnant water", weight: 2 },
    { word: "swachh", weight: 3 },
    { word: "silt", weight: 3 },
    { word: "faecal", weight: 4 },
  ],
  health: [
    { word: "primary health", weight: 4 },
    { word: "phc", weight: 4 },
    { word: "hospital", weight: 4 },
    { word: "clinic", weight: 4 },
    { word: "medicine", weight: 3 },
    { word: "doctor", weight: 3 },
    { word: "health centre", weight: 3 },
    { word: "healthcare", weight: 3 },
    { word: "disease", weight: 4 },
    { word: "outbreak", weight: 4 },
    { word: "immunization", weight: 4 },
    { word: "vaccine", weight: 4 },
    { word: "malaria", weight: 4 },
    { word: "dengue", weight: 4 },
    { word: "tuberculosis", weight: 4 },
    { word: "maternal", weight: 3 },
    { word: "pregnant", weight: 3 },
    { word: "infant", weight: 3 },
    { word: "ambulance", weight: 4 },
    { word: "pharmacy", weight: 3 },
    { word: "nurse", weight: 2 },
  ],
  education: [
    { word: "school", weight: 4 },
    { word: "college", weight: 3 },
    { word: "classroom", weight: 3 },
    { word: "teacher", weight: 3 },
    { word: "student", weight: 3 },
    { word: "book", weight: 2 },
    { word: "mid day meal", weight: 3 },
    { word: "mid-day meal", weight: 3 },
    { word: "dropout", weight: 3 },
    { word: "literacy", weight: 3 },
    { word: "library", weight: 2 },
    { word: "tuition", weight: 2 },
    { word: "scholarship", weight: 2 },
  ],
  agriculture: [
    { word: "farm", weight: 3 },
    { word: "farmer", weight: 3 },
    { word: "crop", weight: 4 },
    { word: "irrigation", weight: 4 },
    { word: "rain fed", weight: 3 },
    { word: "rain-fed", weight: 3 },
    { word: "monsoon", weight: 3 },
    { word: "acres", weight: 3 },
    { word: "field", weight: 2 },
    { word: "livestock", weight: 4 },
    { word: "cattle", weight: 3 },
    { word: "poultry", weight: 3 },
    { word: "pond", weight: 2 },
    { word: "fish farm", weight: 3 },
    { word: "husbandry", weight: 3 },
    { word: "fertilizer", weight: 2 },
    { word: "seed", weight: 2 },
    { word: "harvest", weight: 3 },
    { word: "pesticide", weight: 2 },
    { word: "borewell", weight: 2 },
    { word: "dried up", weight: 2 },
    { word: "drought", weight: 3 },
  ],
  environment: [
    { word: "pollution", weight: 4 },
    { word: "forest", weight: 4 },
    { word: "deforestation", weight: 4 },
    { word: "tree", weight: 3 },
    { word: "plantation", weight: 3 },
    { word: "air quality", weight: 4 },
    { word: "smoke", weight: 3 },
    { word: "effluent", weight: 4 },
    { word: "toxic", weight: 4 },
    { word: "cutting trees", weight: 4 },
    { word: "wetland", weight: 3 },
    { word: "shoreline", weight: 3 },
    { word: "water body", weight: 3 },
    { word: "water bodies", weight: 3 },
    { word: "pond polluted", weight: 3 },
    { word: "stubble", weight: 3 },
    { word: "noise", weight: 2 },
    { word: "flora", weight: 3 },
    { word: "fauna", weight: 3 },
  ],
  energy: [
    { word: "electricity", weight: 4 },
    { word: "power cut", weight: 4 },
    { word: "power supply", weight: 3 },
    { word: "streetlight", weight: 3 },
    { word: "street light", weight: 3 },
    { word: "solar", weight: 3 },
    { word: "transformer", weight: 4 },
    { word: "voltage", weight: 3 },
    { word: "electric pole", weight: 3 },
    { word: "energy", weight: 3 },
    { word: "biogas", weight: 3 },
    { word: "battery", weight: 2 },
    { word: "lpg", weight: 2 },
    { word: "cooking gas", weight: 3 },
    { word: "non-functional", weight: 2 },
    { word: "outage", weight: 3 },
    { word: "power", weight: 2 },
  ],
  urban: [
    { word: "streetlight", weight: 3 },
    { word: "street light", weight: 3 },
    { word: "road", weight: 3 },
    { word: "footpath", weight: 3 },
    { word: "pothole", weight: 3 },
    { word: "traffic", weight: 3 },
    { word: "street", weight: 2 },
    { word: "market", weight: 2 },
    { word: "encroachment", weight: 3 },
    { word: "park", weight: 2 },
    { word: "public toilet", weight: 2 },
    { word: "housing", weight: 2 },
    { word: "building", weight: 2 },
    { word: "urban", weight: 2 },
    { word: "ward", weight: 2 },
    { word: "lighting", weight: 2 },
    { word: "night safety", weight: 2 },
    { word: "lane", weight: 2 },
    { word: "bridge", weight: 3 },
    { word: "flyover", weight: 3 },
    { word: "mohalla", weight: 2 },
    { word: "basti", weight: 2 },
    { word: "non-functional", weight: 2 },
    { word: "after dark", weight: 2 },
    { word: "unsafe conditions", weight: 2 },
  ],
  accessibility: [
    { word: "ramp", weight: 4 },
    { word: "wheelchair", weight: 4 },
    { word: "accessible", weight: 4 },
    { word: "accessibility", weight: 4 },
    { word: "disability", weight: 4 },
    { word: "disabled", weight: 3 },
    { word: "differently abled", weight: 3 },
    { word: "tactile", weight: 3 },
    { word: "braille", weight: 4 },
    { word: "hearing impaired", weight: 3 },
    { word: "handrail", weight: 3 },
    { word: "step free", weight: 3 },
    { word: "elderly access", weight: 2 },
    { word: "elevator", weight: 2 },
    { word: "walking stick", weight: 2 },
  ],
  livelihoods: [
    { word: "job", weight: 3 },
    { word: "employment", weight: 4 },
    { word: "livelihood", weight: 4 },
    { word: "income", weight: 3 },
    { word: "wage", weight: 3 },
    { word: "skill training", weight: 3 },
    { word: "skilling", weight: 3 },
    { word: "handicraft", weight: 2 },
    { word: "artisan", weight: 3 },
    { word: "weaver", weight: 3 },
    { word: "msme", weight: 3 },
    { word: "self help group", weight: 3 },
    { word: "shg", weight: 2 },
    { word: "vendor", weight: 2 },
    { word: "earning", weight: 2 },
    { word: "unemployed", weight: 3 },
    { word: "apprenticeship", weight: 3 },
  ],
};

const CATEGORY_IDS = Object.keys(KEYWORDS) as CategoryId[];

const USER_CATEGORY_BONUS = 0.75;

function normalizePlain(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildTokenSet(text: string): Set<string> {
  const tokens = new Set<string>();
  for (const token of text.split(" ")) {
    if (!token) continue;
    tokens.add(token);
    if (token.length > 3 && token.endsWith("s") && !token.endsWith("ss")) {
      tokens.add(token.slice(0, -1));
    }
  }
  return tokens;
}

export function classifyKeywords(
  description: string,
  userCategory?: CategoryId,
): ClassificationResult {
  const plain = normalizePlain(description);
  const tokens = buildTokenSet(plain);

  const scores: Record<CategoryId, number> = {
    water: 0,
    sanitation: 0,
    health: 0,
    education: 0,
    agriculture: 0,
    environment: 0,
    energy: 0,
    urban: 0,
    accessibility: 0,
    livelihoods: 0,
  };
  const matched: Record<CategoryId, string[]> = {
    water: [],
    sanitation: [],
    health: [],
    education: [],
    agriculture: [],
    environment: [],
    energy: [],
    urban: [],
    accessibility: [],
    livelihoods: [],
  };

  for (const cat of CATEGORY_IDS) {
    for (const hint of KEYWORDS[cat]) {
      const hit = hint.word.includes(" ")
        ? plain.includes(hint.word)
        : tokens.has(hint.word);
      if (!hit) continue;
      scores[cat] += hint.weight;
      matched[cat].push(hint.word);
    }
  }

  let topScore = 0;
  for (const cat of CATEGORY_IDS) topScore = Math.max(topScore, scores[cat]);

  let userProvided = false;
  if (userCategory && topScore > 0) {
    scores[userCategory] += topScore * USER_CATEGORY_BONUS;
    userProvided = true;
  }

  let category: CategoryId = "urban";
  let best = -1;
  for (const cat of CATEGORY_IDS) {
    if (scores[cat] > best) {
      best = scores[cat];
      category = cat;
    }
  }

  if (!userCategory && best <= 0) {
    return {
      category: "urban",
      label: CATEGORY_MAP.urban.label,
      confidence: 0.42,
      keywords: [],
      method: "keyword",
    };
  }

  const sorted = [...CATEGORY_IDS].sort((a, b) => scores[b] - scores[a]);
  const second = scores[sorted[1]] ?? 0;
  const ratio = second > 0 ? best / (best + second) : 1;
  const magnitude = Math.min(1, best / 16);
  let confidence = Math.min(0.99, 0.45 + 0.5 * ratio + 0.15 * magnitude);
  if (best < 4) confidence = Math.min(confidence, 0.6);
  confidence = Math.round(confidence * 1000) / 1000;

  return {
    category,
    label: CATEGORY_MAP[category].label,
    confidence,
    keywords: matched[category].slice(0, 5),
    method: "keyword",
    userProvided,
  };
}

const LLM_BASE = (process.env.AI_BASE_URL ?? "https://api.openai.com/v1").replace(/\/+$/, "");

function parseLlmCategory(content: string): { category: CategoryId; confidence?: number } | null {
  const cleaned = content.replace(/```json/gi, "").replace(/```/g, "").trim();
  const match = cleaned.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    const parsed = JSON.parse(match[0]) as { category?: string; confidence?: number };
    if (!parsed.category || !CATEGORY_IDS.includes(parsed.category as CategoryId)) return null;
    const confidence = Number(parsed.confidence);
    return {
      category: parsed.category as CategoryId,
      confidence: Number.isFinite(confidence) ? confidence : undefined,
    };
  } catch {
    return null;
  }
}

async function classifyWithLlm(description: string): Promise<ClassificationResult | null> {
  if (!process.env.AI_API_KEY) return null;
  try {
    const res = await fetch(`${LLM_BASE}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.AI_MODEL ?? "gpt-4o-mini",
        temperature: 0,
        messages: [
          {
            role: "system",
            content:
              "You classify civic complaints in India into exactly one of these categories, returning JSON: {\"category\": string, \"confidence\": number}. Allowed categories: water, sanitation, health, education, agriculture, environment, energy, urban, accessibility, livelihoods.",
          },
          {
            role: "user",
            content: `Classify this civic issue report:\n${description}`,
          },
        ],
      }),
      signal: AbortSignal.timeout(1500),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = data.choices?.[0]?.message?.content;
    if (!content) return null;
    const parsed = parseLlmCategory(content);
    if (!parsed) return null;
    const confidence = parsed.confidence ?? 0.9;
    return {
      category: parsed.category,
      label: CATEGORY_MAP[parsed.category].label,
      confidence: Math.min(0.99, Math.max(0.4, confidence)),
      keywords: ["llm-classification"],
      method: "llm",
    };
  } catch {
    return null;
  }
}

export async function classify(
  description: string,
  userCategory?: CategoryId,
): Promise<ClassificationResult> {
  const keywordResult = classifyKeywords(description, userCategory);
  const llmResult = await classifyWithLlm(description);
  return llmResult ?? keywordResult;
}

export function isValidCategory(category: string): category is CategoryId {
  return CATEGORY_IDS.includes(category as CategoryId);
}