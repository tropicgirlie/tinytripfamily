import type { AreaGuide } from "./trip";
import { areas as algarveAreas } from "./trip";

export type DestinationAirport = {
  name: string;
  code: string;
  city: string;
  country: string;
};

export type FlightRouteTemplate = {
  airline: string;
  route: string;
  status: string;
  trend: string;
  action: string;
  nudge: string;
};

export type Destination = {
  id: string;
  label: string;
  country: string;
  displayName: string;
  airport: DestinationAirport;
  areas: AreaGuide[];
  flightRoutes: FlightRouteTemplate[];
  heroImage: string;
  overview: string;
};

export const destinationCatalog: Record<string, Destination> = {
  algarve: {
    id: "algarve",
    label: "Algarve",
    country: "Portugal",
    displayName: "Algarve, Portugal",
    airport: {
      name: "Faro Airport",
      code: "FAO",
      city: "Faro",
      country: "Portugal",
    },
    areas: algarveAreas,
    flightRoutes: [
      {
        airline: "Aer Lingus",
        route: "Dublin to Faro",
        status: "Seats showing",
        trend: "Direct route",
        action: "Book soon",
        nudge: "Book soon for the Christmas week return window.",
      },
      {
        airline: "Ryanair",
        route: "Dublin to Faro",
        status: "Low fare watch",
        trend: "Price watch",
        action: "Track weekly",
        nudge: "Good option for family members booking separately.",
      },
      {
        airline: "TAP / connection",
        route: "Lisbon or Porto to Faro",
        status: "Backup route",
        trend: "Fallback",
        action: "Keep open",
        nudge: "Useful if direct flights get expensive.",
      },
    ],
    heroImage: "./assets/hero-algarve-beach.jpg",
    overview:
      "We couldn't get to Paphos directly, so we've chosen Algarve, Portugal. Central coves, marina evenings, and easy Faro transfers make it a strong Christmas-week base for the whole family.",
  },
  paphos: {
    id: "paphos",
    label: "Paphos",
    country: "Cyprus",
    displayName: "Paphos, Cyprus",
    airport: {
      name: "Paphos International Airport",
      code: "PFO",
      city: "Paphos",
      country: "Cyprus",
    },
    areas: [
      {
        name: "Kato Paphos / harbour",
        verdict: "Best first search for walkable evenings",
        detail:
          "Ruins, harbour restaurants, and easy supermarket runs. Strong for mixed ages when you want less driving after arrival.",
      },
      {
        name: "Coral Bay",
        verdict: "Best beach-first family base",
        detail:
          "Sandy bay, calmer winter walks, and villa inventory geared to groups. Check exact street for evening noise.",
      },
      {
        name: "Tala / hillside villages",
        verdict: "Best views and slower pace",
        detail:
          "Quieter villas with scenery; plan more driving for beaches, groceries, and day trips.",
      },
      {
        name: "Polis / Latchi",
        verdict: "Best quieter north-west option",
        detail:
          "Local tavernas and nature outings. Farther from Paphos airport but good for a relaxed rhythm.",
      },
      {
        name: "Limassol day-trip corridor",
        verdict: "Best for variety",
        detail:
          "Useful for marina lunches and bigger shops, but not ideal as the only base if the goal is minimal driving.",
      },
    ],
    flightRoutes: [
      {
        airline: "Ryanair",
        route: "Dublin to Paphos",
        status: "Seasonal direct watch",
        trend: "Direct route",
        action: "Track weekly",
        nudge: "Direct Dublin to Paphos seats are limited in the Christmas window—watch weekly.",
      },
      {
        airline: "Aegean / via Athens",
        route: "Dublin to Athens to Paphos",
        status: "Connection option",
        trend: "One-stop",
        action: "Compare total time",
        nudge: "Useful when direct seats sell out; allow longer layovers with a toddler.",
      },
      {
        airline: "Larnaca + transfer",
        route: "Dublin to Larnaca",
        status: "Backup airport",
        trend: "Fallback",
        action: "Keep open",
        nudge: "More flight choices into Larnaca, then plan a 60–75 minute transfer to Paphos.",
      },
    ],
    heroImage:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1600&h=900&q=80",
    overview:
      "The original family idea was Paphos, Cyprus—sun, ruins, and harbour dinners. Keep it in the catalog for comparison even though this trip is heading to the Algarve.",
  },
};

export type DestinationId = keyof typeof destinationCatalog;

export function getDestination(destinationId: string): Destination {
  return destinationCatalog[destinationId] ?? destinationCatalog.algarve;
}

export function resolveDestinationFromInput(input: string): Destination {
  const normalized = input.toLowerCase();
  if (normalized.includes("paphos") || normalized.includes("cyprus")) {
    return destinationCatalog.paphos;
  }
  if (normalized.includes("algarve") || normalized.includes("portugal") || normalized.includes("faro")) {
    return destinationCatalog.algarve;
  }
  return destinationCatalog.algarve;
}
