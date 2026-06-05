# Micheau Family Trip Tasks

Product plan: see `product-mvp-and-full-app.md`.

## Beta access

- Host/admin beta login is enabled.
  - Host passcode for local MVP: `luana2026`
  - Host session is stored in local storage.
  - Guest page no longer shows the Host view switch.
  - Full product should replace this with real auth and role permissions.

## API setup

- Restrict the Google Places API key in Google Cloud Console.
  - Enable only the APIs this app needs, starting with Places API.
  - Add website restrictions for the Vercel production domain.
  - Add localhost restrictions for development if Google allows the current setup.
  - Rotate the key if it has been shared anywhere public.
- Confirm `GOOGLE_PLACES_API_KEY` exists in Vercel.
  - Already added for Production and Development.
  - Add it to Preview when a non-production branch exists.
- Add a Gemini API key when ready.
  - Use Gemini for family-fit scoring, itinerary summaries, and child-friendly explanations.
  - Keep the key server-side only, like Google Places.
  - Add `GEMINI_API_KEY` to `.env.local` for local use.
  - Add `GEMINI_API_KEY` to Vercel Production/Development before deploying AI scoring.
- Add OpenRouter for cheaper AI testing.
  - OpenRouter is preferred first in `/api/ai/family-fit`.
  - Gemini remains a fallback provider.
  - Keep the key server-side only.
  - Env vars:
    - `OPENROUTER_API_KEY`
    - `OPENROUTER_MODEL`
- Review Expedia Rapid API as the first real lodging provider.
  - Docs/API Explorer: https://developers.expediagroup.com/rapid/api/explorer
  - Create or confirm an Expedia Group Developer / Rapid account.
  - Check whether the account is approved for Lodging Shopping, Content, and Vacation Rentals/Vrbo inventory.
  - Collect required credentials: API key, shared secret/signature setup, partner point of sale, locale, currency, and test account details.
  - Add credentials to Vercel as server-side environment variables only.
  - Do not put Expedia credentials in `VITE_` variables or frontend code.
  - Start with search/shopping and outbound booking links before handling booking/payment inside the app.

## API checklist

### Required for MVP

- Google Places API.
  - Purpose: nearby amenities around the chosen villa or area.
  - Used for: supermarkets, pharmacies, parks, restaurants, cafes, parking, beach access.
  - Env var: `GOOGLE_PLACES_API_KEY`
  - Status: added locally, added to Vercel Production and Development.
  - Next task: restrict the key in Google Cloud Console.
- Gemini API.
  - Purpose: family-fit intelligence.
  - Used for: toddler-friendly villa scoring, activity matching by name/age, packing suggestions, allergy-aware restaurant/activity notes, itinerary explanations.
  - Env vars:
    - `GEMINI_API_KEY`
    - `GEMINI_MODEL`
  - Status: endpoint and host UI are wired; add a real key to use Gemini instead of local fallback scoring.
  - Recommended model: Gemini Flash or Flash-Lite for cost control.
- OpenRouter API.
  - Purpose: cheaper AI testing through OpenRouter-compatible models.
  - Used for: same family-fit intelligence endpoint as Gemini.
  - Env vars:
    - `OPENROUTER_API_KEY`
    - `OPENROUTER_MODEL`
  - Status: wired as the first AI provider before Gemini; local endpoint tested successfully.
  - Current default model: `google/gemini-2.5-flash-lite`.

## Validated research source of truth

- Keep `validated-algarve-research.md` updated before asking AI to summarize trip plans.
- OpenRouter/Gemini should use validated research plus host-entered villa details.
- AI must not invent:
  - Exact 2026/27 Christmas market dates.
  - Live flight prices or exact Christmas-week schedules.
  - Exact villa-to-amenity distances before Google Places or host confirmation.
  - Opening hours or availability without an API/source.
- Refresh this research again in autumn 2026 when official festive calendars are published.
- Expedia Rapid API.
  - Purpose: real lodging/villa inventory.
  - Used for: lodging content, shopping availability, rates, property details, Vrbo/vacation rental inventory if approved.
  - Docs: https://developers.expediagroup.com/rapid/api/explorer
  - Env vars to add once approved:
    - `EXPEDIA_RAPID_API_KEY`
    - `EXPEDIA_RAPID_SHARED_SECRET`
    - `EXPEDIA_RAPID_BASE_URL`
    - `EXPEDIA_RAPID_PARTNER_POINT_OF_SALE`
  - Status: needs Expedia partner approval and credentials.
- Google Flights search links.
  - Purpose: help guests find flights quickly without handling bookings.
  - Used for: outbound links to Google Flights with origin, destination, dates.
  - Env var: none.
  - Status: already suitable for MVP.
- Host WhatsApp contact.
  - Purpose: guest page opens the family WhatsApp group, or Luana directly if no group link is set.
  - Env vars:
    - `VITE_HOST_WHATSAPP_GROUP_URL`
    - `VITE_HOST_WHATSAPP_NUMBER`
  - Format: country code and number only, for example `353000000000`.
  - Group format: full WhatsApp invite URL, for example `https://chat.whatsapp.com/...`.
  - Status: UI is wired; add the real group URL locally and in Vercel when ready.

### Strong next additions

- Amadeus Flights API.
  - Purpose: real fare search and flight watch.
  - Used for: Dublin to Faro fares, price snapshots, route options, flight alerts.
  - Env vars:
    - `AMADEUS_CLIENT_ID`
    - `AMADEUS_CLIENT_SECRET`
    - `AMADEUS_BASE_URL`
  - Status: not added yet.
  - Recommendation: add when flight watch needs real prices instead of outbound search links.
- Viator Partner API.
  - Purpose: bookable tours and family activities.
  - Used for: Benagil cave tours, boat trips, day trips, family-friendly experiences.
  - Env vars:
    - `VIATOR_API_KEY`
    - `VIATOR_BASE_URL`
  - Status: not added yet.
  - Recommendation: add after villa and amenities are working.
- OpenWeather or WeatherAPI.
  - Purpose: real weather forecast and historical climate norms.
  - Used for: late December weather cards, packing suggestions, rainy-day planning.
  - Env vars:
    - `OPENWEATHER_API_KEY` or `WEATHERAPI_KEY`
  - Status: not added yet.
  - Recommendation: optional, because static late-December climate guidance is enough for MVP.
- Google Maps Embed or Static Maps.
  - Purpose: show family-friendly area map without building a full map product.
  - Used for: villa location preview, nearby amenities map.
  - Env var: can use `GOOGLE_PLACES_API_KEY` only if restricted correctly, or a separate maps key.
  - Status: not added yet.

### Useful later

- Booking.com Demand API.
  - Purpose: backup lodging inventory if Expedia is not approved or not enough villa inventory.
  - Used for: accommodation search, rates, availability, booking links.
  - Env vars:
    - `BOOKING_API_KEY`
    - `BOOKING_AFFILIATE_ID`
    - `BOOKING_BASE_URL`
  - Status: not added yet; requires partner/affiliate access.
- Duffel API.
  - Purpose: full flight booking flow if the product later handles flight purchase.
  - Used for: flight offers, booking, passengers, payments.
  - Env vars:
    - `DUFFEL_ACCESS_TOKEN`
    - `DUFFEL_BASE_URL`
  - Status: not needed for MVP.
- Stripe.
  - Purpose: collect family contributions or paid trip-planning product subscriptions.
  - Used for: budget contributions, premium TinyTripIndex plans, host subscriptions.
  - Env vars:
    - `STRIPE_SECRET_KEY`
    - `STRIPE_WEBHOOK_SECRET`
    - `VITE_STRIPE_PUBLISHABLE_KEY`
  - Status: backlog.
- Supabase or Neon/Postgres.
  - Purpose: save trips, guests, pinned villas, budgets, uploaded photos, and shared guest links.
  - Used for: real multi-user product instead of local storage.
  - Env vars:
    - `DATABASE_URL` for Neon/Postgres, or
    - `SUPABASE_URL`
    - `SUPABASE_SERVICE_ROLE_KEY`
    - `VITE_SUPABASE_ANON_KEY`
  - Status: needed before this becomes a real shared app.
- Upload provider.
  - Purpose: guest photos and villa images.
  - Options: Cloudinary, UploadThing, or Supabase Storage.
  - Env vars depend on provider.
  - Status: backlog.

### Avoid for now

- Airbnb API.
  - Reason: no simple public search API for this use case.
  - MVP approach: manual Airbnb listing paste with image URL and outbound listing link.
- Full in-app booking/payment for villas.
  - Reason: more compliance, cancellation, payment, and support risk.
  - MVP approach: send users to approved partner booking pages.

## Product decisions

- Decide which booking providers to support first.
  - MVP: manual Airbnb/direct listing paste plus outbound booking links.
  - Next: Expedia Rapid API for lodging and Vrbo-style vacation rental inventory after partner approval.
  - Backup: Booking.com Demand API if Expedia approval or villa inventory is not a fit.
  - Flights: use Google Flights links first; use Amadeus later for real fare data.
- Define the host vs guest permissions clearly.
  - Host: villa search, manual picks, pin final villa, guest profiles, budget, API setup.
  - Guest: countdown, chosen villa, flights link, itinerary, amenities, packing, activities.
- Decide if room booking is in scope.
  - Recommendation: backlog for now. Keep MVP focused on planning and sharing.

## App features to finish

- Connect the Places API endpoint to the guest nearby amenities card.
- Add Gemini family-fit scoring for villas.
  - Inputs: traveller ages, toddler needs, allergies, budget, villa amenities, nearby places.
  - Output: score, explanation, warnings, suggested questions to ask host/listing owner.
  - Status: wired through `/api/ai/family-fit`; needs `GEMINI_API_KEY`.
- Add child-needs filters.
  - Crib
  - High chair
  - Stair gates
  - Pool fence
  - Playground nearby
  - Walkable supermarket/pharmacy
  - Short airport transfer
- Improve manual Airbnb pick flow.
  - Allow image URL paste.
  - Allow removing one manual pick, not only all manual picks.
  - Add fields for exact address, notes, cancellation policy, and child amenities verified.
- Add budget tracker.
  - Villa estimate
  - Flights
  - Activities
  - Food/groceries
  - Transfers/car rental
  - Paid by Luana vs shared
- Add guest profile details.
  - Name
  - Age
  - Photo placeholder/upload
  - Food preferences
  - Allergies
  - Activity pace
  - Child needs

## Testing checklist

- Test host view at `http://localhost:8080/?view=host`.
- Test guest view at `http://localhost:8080/?view=guest`.
- Add a manual Airbnb sample, confirm the image appears, then remove it.
- Confirm the pinned villa updates the guest hero/reveal.
- Confirm the app still works if Google Places fails or the API key is missing.
- Run `npm run build` before deploying.

## Deployment

- Deploy to Vercel after each stable milestone.
- Pull Vercel env vars locally when needed with `vercel env pull`.
- Do not commit `.env.local`.
- Commit `.env.example` so future setup is clear.
