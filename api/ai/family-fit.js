function fallbackScore(payload) {
  const travellers = Array.isArray(payload.travellers) ? payload.travellers : [];
  const hasToddler = travellers.some((traveller) => Number(traveller.age) <= 3);
  const allergyNotes = travellers
    .map((traveller) => traveller.allergies)
    .filter(Boolean)
    .join(", ");

  const results = (payload.villas || []).map((villa) => {
    const childAmenities = villa.childAmenities || [];
    const amenities = villa.amenities || [];
    const childBoost =
      (childAmenities.includes("crib available") ? 8 : 0) +
      (childAmenities.includes("high chair") ? 7 : 0) +
      (childAmenities.includes("toddler-safe pool gate") ? 10 : 0) +
      (childAmenities.includes("playground nearby") ? 5 : 0);
    const practicalBoost =
      (amenities.includes("supermarket nearby") ? 6 : 0) +
      (amenities.includes("walkable restaurants") ? 5 : 0) +
      (amenities.includes("heated pool") ? 4 : 0);
    const score = Math.min(98, Math.round((villa.fit || 70) * 0.72 + childBoost + practicalBoost));

    return {
      villaName: villa.name,
      score,
      verdict: score >= 90 ? "Strong family match" : score >= 82 ? "Good contender" : "Needs checks",
      reasons: [
        `${villa.area} gives this option a practical base for the group.`,
        hasToddler
          ? `Toddler checks: ${childAmenities.length ? childAmenities.join(", ") : "confirm crib, high chair and pool safety before booking"}.`
          : "Family amenities should still be confirmed before booking.",
        amenities.includes("supermarket nearby")
          ? "Nearby supermarket support makes group meals easier."
          : "Check grocery distance before committing.",
      ],
      childNotes: hasToddler
        ? "Ask the owner to confirm crib, high chair, stairs, pool access and blackout curtains."
        : "Confirm bedroom layout and bathroom access for the full group.",
      budgetNote: `Estimated total is ${villa.price ? `€${villa.price.toLocaleString("en-IE")}` : "not set"}.`,
      questions: [
        "Can the host confirm child equipment in writing?",
        "What is the exact walking distance to pharmacy and supermarket?",
        allergyNotes ? `Can nearby restaurants handle ${allergyNotes}?` : "Which nearby restaurants are family-friendly in winter?",
      ],
    };
  });

  return {
    provider: "local fallback",
    summary:
      "AI is not configured yet, so this is a local rules-based score. Add OPENROUTER_API_KEY or GEMINI_API_KEY for richer explanations.",
    results,
  };
}

function extractJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("Gemini did not return JSON");
    return JSON.parse(match[0]);
  }
}

const validatedAlgarveContext = [
  "Validated Algarve MVP context:",
  "- Trip dates are 27 December 2026 to 7 January 2027 for 13 travellers.",
  "- Confirmed MVP base is Albufeira, Algarve, Portugal.",
  "- Prioritize Albufeira and Olhos de Agua villas unless the host explicitly asks for a backup area.",
  "- Vilamoura, Lagos and Carvoeiro are optional day-trip or backup suggestions, not the primary base.",
  "- Albufeira has more winter resort infrastructure and is the strongest New Year's Eve candidate.",
  "- Dublin to Faro is a direct route currently operated by Aer Lingus and Ryanair, with about 3 hours flight time.",
  "- Christmas 2026/27 markets, New Year events, exact flight times, fares, opening hours and live availability must be verified closer to travel.",
  "- Shopping/rainy-day candidates should start with Algarve Shopping Guia, then Designer Outlet Algarve/MAR Shopping as longer-drive backups.",
  "- Toddler-friendly recommendations should favor short outings, playground/park checks, pharmacy/supermarket proximity, nap timing and villa-based dinners.",
  "- Older-kid recommendations can include Benagil, Ponta da Piedade, festive lights and Zoomarine only when opening/sea conditions are verified.",
].join("\n");

async function readBody(request) {
  if (request.body && typeof request.body === "object") return request.body;
  if (typeof request.json === "function") return request.json();
  return {};
}

function buildPrompt(payload, provider) {
  return [
    "You are the planning intelligence for Micheau Family Trip.",
    "Score villas for a large family holiday with children, including a 2-year-old when present.",
    "Prioritize child safety, crib/high-chair availability, short drives, walkable essentials, budget, winter practicality, and family activities.",
    validatedAlgarveContext,
    "Use the validated context and the trip payload as your source of truth.",
    "Do not invent exact 2026/27 event dates, live flight prices, live villa availability, restaurant opening hours, or exact distances unless those facts are in the payload.",
    "When a detail is uncertain, say what to verify instead of pretending it is confirmed.",
    "Return only JSON with this shape:",
    `{"provider":"${provider}","summary":"string","results":[{"villaName":"string","score":90,"verdict":"string","reasons":["string"],"childNotes":"string","budgetNote":"string","questions":["string"]}]}`,
    `Trip data: ${JSON.stringify(payload)}`,
  ].join("\n\n");
}

async function scoreWithOpenRouter(payload) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return null;

  const model = process.env.OPENROUTER_MODEL || "google/gemini-2.5-flash-lite";
  const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://familytrip-six.vercel.app",
      "X-Title": "Micheau Family Trip",
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content: "You are a concise family travel planner. Return valid JSON only.",
        },
        {
          role: "user",
          content: buildPrompt(payload, "openrouter"),
        },
      ],
      temperature: 0.35,
      response_format: { type: "json_object" },
    }),
  });

  if (!openRouterResponse.ok) {
    const detail = await openRouterResponse.text();
    throw new Error(`OpenRouter ${openRouterResponse.status}: ${detail}`);
  }

  const data = await openRouterResponse.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error("OpenRouter returned no content");
  return extractJson(text);
}

async function scoreWithGemini(payload) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const model = process.env.GEMINI_MODEL || "gemini-2.0-flash";
  const prompt = buildPrompt(payload, "gemini");
  const geminiResponse = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.35,
          responseMimeType: "application/json",
        },
      }),
    },
  );

  if (!geminiResponse.ok) {
    const detail = await geminiResponse.text();
    throw new Error(`Gemini ${geminiResponse.status}: ${detail}`);
  }

  const data = await geminiResponse.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Gemini returned no text");
  return extractJson(text);
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  const payload = await readBody(request);
  const fallback = fallbackScore(payload);

  try {
    const openRouterResult = await scoreWithOpenRouter(payload);
    if (openRouterResult) {
      response.status(200).json(openRouterResult);
      return;
    }
  } catch (openRouterError) {
    fallback.openRouterError =
      openRouterError instanceof Error ? openRouterError.message : "OpenRouter was unavailable.";
  }

  try {
    const geminiResult = await scoreWithGemini(payload);
    if (geminiResult) {
      response.status(200).json(geminiResult);
      return;
    }
  } catch (geminiError) {
    fallback.geminiError =
      geminiError instanceof Error && geminiError.message.includes("API_KEY_INVALID")
        ? "Gemini key is not valid yet. Add a valid GEMINI_API_KEY to use AI scoring."
        : geminiError instanceof Error && geminiError.message.includes("RESOURCE_EXHAUSTED")
          ? "Gemini key is valid, but billing/prepayment credits are depleted in Google AI Studio."
        : "Gemini was unavailable, so local scoring was used.";
  }

  response.status(200).json(fallback);
}
