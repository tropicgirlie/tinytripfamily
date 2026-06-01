# Requirements review — Micheau Family Trip

This document maps your **original brief** and follow-up requests to what is implemented today (Vite + React 19 + Radix Themes + Phosphor + MD3 tokens).

## Original brief (first message)

| Requirement | Status | Notes |
|-------------|--------|-------|
| Keep existing functionality | **Met** | Host/guest modes, filters, pin villa, mystery reveal, family roster, activities, amenities, flight nudges, white-label brand fields |
| Airbnb-level polish | **Partial** | New host + guest dashboards align with mockups; some legacy sections remain below the fold on guest |
| Change colour palette | **Met** | Teal/coral/sand system in `styles.css` + dashboard tokens in `src/theme/dashboard.css` |
| Document every step | **Partial** | This file + `README.md` + `PRODUCT.md`; no full design changelog yet |
| UI/UX changes + animations | **Partial** | Hover lifts, wheel spin, reduced-motion respected; no broad motion system |
| TinyTripIndex sub-product | **Met** | Footer + host sidebar subdomain + brand controls |
| Europe / family-with-kids positioning | **Met** | Copy, toddler filters, age-based activity matching |
| Path to Android/iOS | **Partial** | React SPA is embeddable; no PWA manifest or native shell yet |

## Follow-up requests (conversation)

| Request | Status | Notes |
|---------|--------|-------|
| Hero mockup (beach, script tagline, date strip, countdown) | **Met (guest)** | Guest hero matches mockup: title, Caveat tagline, inline dates, countdown card |
| Host workspace padding/layout | **Met** | Form grid in host dashboard `#host-planning` |
| Shortlist real photos + padding | **Met** | Unsplash on villas; host shortlist + full list in dashboard |
| Destination-aware host + flights | **Met** | `destinations.ts`, `buildFlightInsights`, Google Flights deep links |
| Radix + Phosphor + Material | **Met** | `src/main.tsx`, `material-radix.css` |
| Logo asset | **Met** | `assets/micheau-logo.jpg` |
| Top nav single row | **Met (guest shell)** | Guest top bar: logo, view toggle, actions |
| Date icon red boxes fix | **Met** | White Phosphor icons on coral tiles (legacy hero CSS still in `styles.css` if old markup used) |
| Countdown card whitespace | **Met** | Trip-pulse card no longer stretches to flight column height |
| Member card photo placeholder | **Met** | `member-photo-placeholder` in family section |
| Host dashboard mockup | **Met** | `HostDashboard` — sidebar, hero, quick actions, grids, planning workspace |
| Guest dashboard mockup | **Met** | `GuestDashboard` — info strip, quick nav, villa reveal, itinerary, activities scroll, amenities/weather/packing, footer CTA |

## Product principles (`PRODUCT.md`)

| Principle | Status |
|-----------|--------|
| Host work separate from guest view | **Met** — `?view=host` vs `?view=guest` |
| Pinned decision feels official | **Met** — pin + guest villa panel |
| Personalize by family ages | **Met** — roster + activity scores |
| Playful reveal | **Met** — mystery board when not pinned |
| TinyTripIndex attribution | **Met** |
| WCAG-minded UX | **Partial** — labels/focus exist; full audit not run |

## Gaps / backlog (recommended next)

1. **Single shell consistency** — Guest deep sections (family form, full activity list) still use older card styles below the new dashboard; restyle or collapse into panels.
2. **Live APIs** — Still prototype data; backend adapters per `README.md`.
3. **Map** — Quick nav “Map” links to `#overview`; no map component yet.
4. **Messages / budget** — Host UI placeholders; no real messaging or payments.
5. **Design changelog** — Optional `DESIGN-CHANGELOG.md` for step-by-step UX iterations.
6. **PWA** — `manifest.json` + service worker for installable mobile web.
7. **Next.js** — Optional migration for SSR/SEO; not required for private family links.

## How to verify

```bash
npm run dev
```

- Guest: http://localhost:8080/?view=guest  
- Host: http://localhost:8080/?view=host  

## Key files

| Area | Files |
|------|--------|
| Guest UI | `src/components/dashboard/GuestDashboard.tsx`, `src/theme/guest-dashboard.css`, `src/data/guest-dashboard.ts` |
| Host UI | `src/components/dashboard/HostDashboard.tsx`, `src/theme/dashboard.css`, `src/data/dashboard.ts` |
| Shared logic | `src/hooks/useTripPlanner.ts`, `src/data/trip.ts`, `src/data/destinations.ts` |
| Deep sections | `src/AppSections.tsx` (`sectionsOnly` on guest) |
