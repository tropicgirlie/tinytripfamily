# Micheau Family Trip

A first-version family villa planning web app for Algarve trips of 10+ people.

The app is currently a static prototype focused on:

- Algarve only
- 27 December 2026 to 7 January 2027
- 10+ guests
- Villa-style stays with price, bedroom, area, rating, and amenity filters
- Admin-pinned family choice with confirmed location, amenities, activities, packing notes, and flight guidance
- Toddler-friendly filtering for cribs, high chairs, pool safety, and nearby playgrounds
- Seasonal activity suggestions for Christmas/New Year, rainy days, and gentle outdoor days
- Countdown, sample flight-watch nudges, and a mystery-villa guessing game before the organizer reveals the pinned choice
- White-label branding controls for trip name, subdomain preview, logo URL, and uploaded logo/photo
- Parent product attribution as "Powered by TinyTripIndex"
- Family roster with names and ages, personalized activity matching, and light room preference planning after a villa is pinned
- Notes on which supplier APIs can later provide live pricing and availability

## Run

```bash
npm install
npm run dev
```

Opens at [http://localhost:8080](http://localhost:8080) with React, Radix UI Themes, Phosphor icons, and Material Design 3 styling.

Production build: `npm run build` then `npm run preview`.

Legacy static files (`app.js`, old flow) are kept for reference; the app entry is `src/main.tsx`.

## API Direction

Airbnb does not provide a simple public search API for general-purpose apps. For a production version, build a backend provider layer with adapters for approved supplier APIs:

- Booking.com Demand API for search, availability, pricing, details, and reviews
- Expedia Rapid API / Vrbo inventory for lodging rates, availability, content, and reviews
- Airbnb only through approved partner or channel-manager access
- Google Flights: no public API — use dated deep links in the UI; add Amadeus, Duffel, or SerpApi on a server for live fares
- Google Places, Viator, or GetYourGuide partner feeds for activities, amenities, and opening-hour context
- OpenAI Responses API for structured villa scoring, family-fit explanations, and itinerary JSON
- Gemini API with Google Search grounding if the product needs Google-grounded answers for live/opening-hour style questions

The UI data model in `src/data/trip.ts` is shaped like normalized provider results so sample records can be replaced by API responses later.

## Backlog

- Family member profile photos: allow each person to upload a picture/avatar.
- Activity attendee bubbles: show small overlapping profile circles on activity cards for people interested in or joining that activity.
- Social activity animations: animate avatar bubbles when someone joins, guesses the villa, or reacts to a pinned plan.
