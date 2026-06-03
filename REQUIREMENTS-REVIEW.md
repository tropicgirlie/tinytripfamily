# Requirements review — Micheau Family Trip

**Current release:** Beta MVP (v1.0) — see [product-mvp-and-full-app.md](product-mvp-and-full-app.md).

## MVP definition of done

| Criterion | Status |
|-----------|--------|
| Guest page has no visible host controls | **Done** |
| Host page requires passcode | **Done** |
| Host can add manual villa options | **Done** |
| Host can manage guest profiles | **Done** |
| Host can pin final villa | **Done** |
| Guest page reflects chosen villa | **Done** |
| AI family-fit panel with Gemini + fallback | **Done** (needs `GEMINI_API_KEY` for live AI) |
| API setup visible to host only | **Done** |
| App builds locally | **Done** (`npm run build`) |
| Deploy to Vercel | **Ready** (env vars per `tasks.md`) |

## Original brief (first message)

| Requirement | Status | Notes |
|-------------|--------|-------|
| Keep existing functionality | **Met** | Host/guest, pin, mystery reveal, family roster, activities, flights, brand |
| Airbnb-level polish | **Met (MVP)** | Host + guest dashboard shells; deep sections use shared card styles |
| Change colour palette | **Met** | Teal/coral/sand + dashboard tokens |
| Document every step | **Met** | README, PRODUCT, product plan, tasks, this file |
| UI/UX + animations | **Partial** | Hover, wheel spin, reduced-motion; not full motion system |
| TinyTripIndex sub-product | **Met** | Attribution + subdomain preview |
| Europe / family-with-kids | **Met** | Toddler filters, age-based activities, Algarve focus |
| Path to Android/iOS | **Partial** | React SPA; PWA/native shell backlog |

## Follow-up UI requests

| Request | Status |
|---------|--------|
| Guest / host dashboard mockups | **Done** |
| Hero, shortlist photos, host workspace | **Done** |
| Radix + Phosphor + Material | **Done** |
| Date icons, countdown whitespace, member photo placeholder | **Done** |

## Product principles (`PRODUCT.md`)

| Principle | Status |
|-----------|--------|
| Host work separate from guest view | **Met** |
| Pinned decision feels official | **Met** |
| Personalize by family ages | **Met** |
| Playful reveal | **Met** |
| TinyTripIndex attribution | **Met** |
| WCAG-minded UX | **Partial** |

## Post-MVP backlog

1. Connect Places API fully to guest amenities card (live fetch vs static fallback).
2. Restyle guest “deep” sections to match dashboard cards.
3. Real auth (Clerk / Supabase Auth) replacing passcode.
4. Expedia Rapid lodging search after partner approval.
5. PWA manifest for installable mobile web.
6. Map component for quick-nav “Map”.

## Verify

```bash
npm run dev
```

- Guest: http://localhost:8080/?view=guest  
- Host: http://localhost:8080/?view=host  

## Key files

| Area | Files |
|------|--------|
| Guest UI | `src/components/dashboard/GuestDashboard.tsx`, `src/theme/guest-dashboard.css` |
| Host UI | `src/components/dashboard/HostDashboard.tsx`, `src/theme/dashboard.css` |
| State | `src/hooks/useTripPlanner.ts` |
| APIs | `api/places/nearby.js`, `api/ai/family-fit.js` |
| Data | `src/data/trip.ts`, `src/data/destinations.ts` |
