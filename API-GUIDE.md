# API guide — who pays, what to use, MVP setup

## The idea you described (correct for MVP)

You want **you (the host)** to run APIs once while setting up the Micheau trip. The **family guest page** should then show that information **without calling paid APIs on every visit**.

That is how the app is designed:

| Feature | API needed | Who triggers it | Guest page cost |
|---------|------------|-----------------|-----------------|
| Nearby supermarket, pharmacy, café… | **Google Places** | Host: “Refresh nearby places” | **$0** (reads saved cache) |
| Villa family-fit scores & notes | **Gemini** (optional) | Host: “Score with Gemini” | **$0** |
| Flights | **None** | Built-in links to Google Flights | **$0** |
| Activities, packing, weather tips | **None** for MVP | Curated + static ranges in app | **$0** |
| Villa photos & shortlist | **None** | Your manual picks + sample data | **$0** |

You do **not** need ChatGPT or Claude for nearby places. **Google Places** is the right product for factual “what is near this villa/area”. Gemini is only for **writing/scoring** (explanations, questions to ask the owner), not for maps.

## Cost comparison (rough)

| Provider | Use in this app | Typical MVP cost |
|----------|-----------------|------------------|
| **Google Places** | Nearby amenities (factual) | Low if you refresh **per area** only when planning (cents per refresh, not per guest view) |
| **Gemini Flash / Flash-Lite** | Optional villa scoring | Very low per host click (fractions of a cent to a few cents) |
| **ChatGPT (OpenAI)** | Not wired | N/A |
| **Claude** | Not wired | N/A |
| **Google Flights links** | Free deep links | $0 |

Gemini is usually **cheaper than GPT-4 class models** for short JSON scoring. Claude is strong but not needed for this MVP unless you prefer its API.

## Why Gemini might say “not working”

Common causes:

1. **No billing / credits** in [Google AI Studio](https://aistudio.google.com/) — error often says `RESOURCE_EXHAUSTED` or quota. The app still shows **local fallback scoring**.
2. **Key in wrong place** — must be server-side:
   - Local: `.env.local` as `GEMINI_API_KEY=...` (restart `npm run dev` after saving)
   - Vercel: Project → Settings → Environment Variables (not `VITE_` prefix)
3. **Invalid or restricted key** — create a new key in AI Studio, enable Generative Language API.
4. **Model name** — default is `gemini-2.0-flash`. Override with `GEMINI_MODEL` if your project supports another Flash model.

The host panel shows the **exact message** returned (billing, invalid key, or fallback).

## Google Places setup

1. [Google Cloud Console](https://console.cloud.google.com/) → enable **Places API (New)**.
2. Create an API key → restrict to Places + your domains (`localhost`, Vercel URL).
3. Set `GOOGLE_PLACES_API_KEY` in `.env.local` and Vercel.

**Local dev:** `npm run dev` loads `.env.local` and serves `/api/places/nearby` and `/api/ai/family-fit` via Vite (no separate server).

## Recommended host workflow (one trip, minimal API spend)

1. Log in as host (`?view=host` + passcode).
2. Set destination, dates, origin, add family members.
3. Add manual Airbnb picks / pin final villa.
4. Click **Refresh nearby places for guests** (once per villa area) → saves to browser storage, guests see it.
5. Optionally click **Score with Gemini** once for shortlist notes.
6. Share **guest link only**: `?view=guest` (no host switch).

Family opening the guest link **does not** call Gemini or Places unless you add future “live refresh” buttons on the guest side (we did not).

## Production note

Today, cache lives in **localStorage on the host browser**. For a real multi-device guest link, next step is saving trip content once to a database (Supabase/Neon) when the host refreshes — guests still read stored JSON, APIs still run only on host action.

## Env vars (server only)

```bash
GOOGLE_PLACES_API_KEY=...
GEMINI_API_KEY=...          # optional
GEMINI_MODEL=gemini-2.0-flash
```

Never put these in `VITE_*` variables (that would expose keys in the browser).
