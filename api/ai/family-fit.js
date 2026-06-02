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
      "Gemini is not configured yet, so this is a local rules-based score. Add GEMINI_API_KEY for richer explanations.",
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

async function readBody(request) {
  if (request.body && typeof request.body === "object") return request.body;
  if (typeof request.json === "function") return request.json();
  return {};
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  const payload = await readBody(request);
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";

  if (!apiKey) {
    response.status(200).json(fallbackScore(payload));
    return;
  }

  const prompt = [
    "You are the planning intelligence for Micheau Family Trip.",
    "Score villas for a large family holiday with children, including a 2-year-old when present.",
    "Prioritize child safety, crib/high-chair availability, short drives, walkable essentials, budget, winter practicality, and family activities.",
    "Return only JSON with this shape:",
    '{"provider":"gemini","summary":"string","results":[{"villaName":"string","score":90,"verdict":"string","reasons":["string"],"childNotes":"string","budgetNote":"string","questions":["string"]}]}',
    `Trip data: ${JSON.stringify(payload)}`,
  ].join("\n\n");

  try {
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

    response.status(200).json(extractJson(text));
  } catch (error) {
    response.status(200).json({
      ...fallbackScore(payload),
      provider: "local fallback after Gemini error",
      error:
        error instanceof Error && error.message.includes("API_KEY_INVALID")
          ? "Gemini key is not valid yet. Add a valid GEMINI_API_KEY to use AI scoring."
          : error instanceof Error && error.message.includes("RESOURCE_EXHAUSTED")
            ? "Gemini key is valid, but billing/prepayment credits are depleted in Google AI Studio."
          : "Gemini was unavailable, so local scoring was used.",
    });
  }
}
