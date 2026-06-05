# Micheau Family Trip (Beta MVP)

A **TinyTripIndex** sub-product for host-led family holidays. Luana plans privately; the family gets a calm guest trip page with countdown, villa reveal, flights, itinerary, activities, amenities, and packing guidance.

**Product plan:** [product-mvp-and-full-app.md](product-mvp-and-full-app.md)  
**API costs & setup (read this):** [API-GUIDE.md](API-GUIDE.md)
**Tasks & APIs:** [tasks.md](tasks.md)  
**Requirements map:** [REQUIREMENTS-REVIEW.md](REQUIREMENTS-REVIEW.md)

## MVP status (v1.0)

| Area | What works today |
|------|------------------|
| **Guest page** | Dashboard mockup: hero, countdown, trip facts, quick nav, villa reveal, itinerary, activities, amenities, weather, packing, footer CTA. No host switch. |
| **Host page** | Passcode gate, dashboard mockup, villa filters, manual Airbnb/direct picks, pin final villa, guest profiles (name, age, food, allergies, photo URL), API status panel, sign out. |
| **Data** | Local storage for brand, family, pinned villa, manual picks, host session. Curated Algarve trip + destination catalog. |
| **Flights** | Google Flights deep links (no public API). |
| **Places** | Host clicks **Refresh for guests** → Google Places once → saved locally; guest page reads cache (**no per-visit API cost**). |
| **AI** | Host clicks **Score with Gemini** only; guest page never calls Gemini. Fallback scoring if key/billing missing. |

### Out of scope for this MVP

- Real auth (passcode + localStorage only)
- Live Expedia/Booking inventory
- In-app payments
- Multi-trip accounts

## Run locally

```bash
npm install
cp .env.example .env.local   # optional: Places + Gemini
npm run dev
```

| URL | Purpose |
|-----|---------|
| http://localhost:8080/?view=guest | Family trip page (default) |
| http://localhost:8080/?view=host | Host workspace (passcode required) |

Production build: `npm run build` then `npm run preview`.

## Stack

- **Vite 6** + **React 19** + **TypeScript**
- **Radix UI Themes**, **Phosphor Icons**, MD3 tokens (`src/theme/material-radix.css`)
- **Vercel** serverless routes in `api/` for Places and Gemini

Legacy static files (`app.js`, older HTML flow) remain for reference; entry point is `src/main.tsx`.

## Environment variables

See [.env.example](.env.example). Server-side only (never `VITE_` prefix for secrets):

- `GOOGLE_PLACES_API_KEY` — nearby amenities
- `GEMINI_API_KEY` — family-fit scoring
- `GEMINI_MODEL` — optional (default `gemini-2.5-flash-lite`)

Pull from Vercel when needed: `vercel env pull`.

## Deploy

Deploy to **Vercel** after `npm run build` succeeds. Configure env vars in the Vercel project (Production + Preview). Restrict Google API keys to your domains in Google Cloud Console.

## API roadmap (post-MVP)

Documented in [tasks.md](tasks.md): Expedia Rapid (lodging), Amadeus (fares), Viator (activities), Postgres/Supabase (shared trips), Stripe (optional).

The UI model in `src/data/trip.ts` is shaped for normalized provider responses when adapters are added.
