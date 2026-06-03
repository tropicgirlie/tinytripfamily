# Micheau Family Trip Product Plan

## Product idea

Micheau Family Trip is a host-led planning app for big family holidays. One person, Luana in this trip, does the planning work: villa research, guest details, flights, activities, budget and final reveal. Guests receive a calm shared trip page with the chosen villa, countdown, travel tips, activities, amenities and packing guidance.

This can become a TinyTripIndex sub-product for families, groups and special trips.

## Beta MVP

The MVP should help Luana plan and share the Algarve 2026/27 trip quickly, without waiting for every external API partnership.

### MVP goals

- Make the trip page useful for the family now.
- Keep host planning private.
- Let Luana manually add Airbnb/direct villa options.
- Pin the final villa and show it on the guest page.
- Use AI for planning intelligence when Gemini credits are active.
- Use manually curated Algarve content plus Google Places for nearby factual amenities.

### MVP user roles

- Host/admin: Luana.
  - Logs in with a host passcode.
  - Manages villa shortlist, family profiles, trip details and API setup.
  - Pins the chosen villa.
  - Decides what guests see.
- Guest/family member.
  - Sees only the guest trip page.
  - Does not see the host view switch.
  - Uses the page for countdown, flights, itinerary, villa reveal, activities, amenities and packing.

### MVP host features

- Host login gate.
- Beta label.
- Trip settings: name, logo, destination, dates, origin airport.
- Villa shortlist filters: price, area, bedrooms, amenities and child needs.
- Manual Airbnb/direct listing add form.
- Manual pick image URL support.
- Remove manual picks.
- Pin final villa.
- Guest profile management:
  - name
  - age
  - food preferences
  - allergies
  - photo placeholder
- AI family-fit scoring:
  - toddler-friendly notes
  - budget notes
  - questions to ask the listing owner
  - fallback scoring when Gemini is unavailable
- API setup panel:
  - Google Places
  - Gemini
  - Expedia Rapid
  - Google Flights links

### MVP guest features

- Guest-only page with no host switch.
- Countdown.
- Destination and dates.
- Flight search link.
- Late December Algarve weather guidance.
- Chosen villa/reveal.
- Itinerary overview.
- Things to do.
- Nearby amenities.
- Packing and practical tips.
- Footer powered by TinyTripIndex.

### MVP content strategy

The fastest useful approach is not to wait for all APIs. Use:

- Host-provided villa/location details.
- Manual Algarve research for activities, packing, and family recommendations.
- Google Places for nearby factual amenities when the exact area/address is known.
- Gemini for rewriting, ranking and explaining choices.

Gemini should not be the only source for exact opening hours, distances, prices or availability. Use it as the planner and travel guide voice, not as the booking database.

### MVP API strategy

- Google Places:
  - Use for nearby supermarkets, pharmacies, parks, cafes, restaurants and parking.
  - Cache results.
  - Keep key server-side.
- Gemini:
  - Use for family-fit scoring and content generation.
  - Current blocker: Google AI Studio credits/spend cap.
  - Keep key server-side.
- Expedia Rapid:
  - Prepare integration, but do not block MVP on partner approval.
- Google Flights:
  - Use outbound search links for MVP.

### MVP security

Current beta:

- Host passcode gate in the app.
- Guest UI does not expose host mode.
- Local storage remembers host session.

Full product upgrade:

- Real authentication.
- Role-based permissions.
- Private host invite link.
- Guest invite links.
- Server-side session checks.

## Full App Vision

The full app is a reusable TinyTripIndex product where anyone can create a branded family/group trip planner.

### Full app host workflow

1. Create a trip.
2. Add destination and dates.
3. Add traveller names, ages, allergies and preferences.
4. Search lodging inventory through approved partners.
5. Add manual listings from Airbnb/direct agencies.
6. Compare villas using AI family-fit scores.
7. Review nearby amenities and activities.
8. Pin final villa.
9. Build itinerary.
10. Share guest page.
11. Track budget and flight prices.

### Full app guest workflow

1. Open guest link.
2. See countdown and chosen villa.
3. Review flights and arrival notes.
4. See itinerary.
5. Save activities or ideas.
6. View packing list.
7. Add preferences if allowed.
8. Receive updates from host.

### Full app feature set

- Multi-trip accounts.
- Host and guest authentication.
- Custom branding and subdomain.
- Villa search from Expedia Rapid/Booking.com/Vrbo-style inventory.
- Manual Airbnb/direct listing import.
- Google Places/Maps nearby amenities.
- AI family-fit scoring.
- AI itinerary builder.
- Family profile engine.
- Child-needs filters:
  - crib
  - high chair
  - pool fence
  - stair gates
  - blackout curtains
  - playground nearby
  - pharmacy nearby
  - short airport transfer
- Activity recommendations.
- Flight watch.
- Budget tracker.
- Documents and packing list.
- Photo/avatar uploads.
- Share permissions.
- Notifications and updates.

### Full app API roadmap

- Database:
  - Supabase, Neon or Postgres.
  - Store trips, users, villas, profiles, preferences, budgets and pinned choices.
- Auth:
  - Supabase Auth, Clerk or Auth.js.
- Google Places/Maps:
  - factual nearby data and maps.
- Gemini:
  - summaries, family-fit scoring, recommendations and itinerary generation.
- Expedia Rapid:
  - lodging content, availability and rates after approval.
- Booking.com Demand API:
  - backup lodging provider if approved.
- Amadeus:
  - flight fare search and route watch.
- Viator/GetYourGuide:
  - bookable activities.
- Weather API:
  - live forecast and climate guidance.
- Upload provider:
  - guest photos and villa images.
- Stripe:
  - paid TinyTripIndex product plans or family contribution tracking.

## Definition of Done for Beta

- Guest page has no visible host controls.
- Host page requires passcode.
- Luana can add manual villa options.
- Luana can manage guest profiles.
- Luana can pin final villa.
- Guest page reflects chosen villa.
- AI family-fit panel works with fallback and is ready for Gemini credits.
- API setup is documented and visible only to host.
- App builds locally.
- App deploys to Vercel.
