export type TripDefaults = {
  guests: number;
  checkIn: string;
  checkOut: string;
  nights: number;
};

export type AreaGuide = {
  name: string;
  verdict: string;
  detail: string;
};

export type Villa = {
  destinationId: string;
  name: string;
  area: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  rating: number;
  distance: string;
  fit: number;
  source: string;
  amenities: string[];
  childAmenities: string[];
  bestFor: string[];
  activities: string[];
  bring: string[];
  flights: string;
  note: string;
  image: string;
  imageFallback: string;
};

export type Activity = {
  name: string;
  area: string;
  type: string[];
  status: string;
  ages: string[];
  note: string;
};

export const tripDefaults: TripDefaults = {
  guests: 10,
  checkIn: "2026-12-27",
  checkOut: "2027-01-07",
  nights: 11,
};

export const areas: AreaGuide[] = [
  {
    name: "Carvoeiro / Ferragudo",
    verdict: "Best overall first search",
    detail:
      "Central Algarve base with coves, restaurants, supermarkets, and easy day trips to Lagos, Albufeira, and Faro.",
  },
  {
    name: "Vilamoura / Quarteira",
    verdict: "Best for walkable marina evenings",
    detail:
      "Polished, convenient, and close to golf, beaches, restaurants, pharmacies, and bigger supermarkets.",
  },
  {
    name: "Lagos / Praia da Luz",
    verdict: "Best scenery and town energy",
    detail:
      "Excellent beaches and restaurants, but farther west for Faro airport and eastern Algarve day trips.",
  },
  {
    name: "Vale do Lobo / Quinta do Lago",
    verdict: "Best luxury option",
    detail:
      "High-end villas, resort amenities, golf, beach clubs, and strong services, usually at a higher price.",
  },
  {
    name: "Tavira / Cabanas",
    verdict: "Best quieter suggestion",
    detail:
      "Lovely eastern Algarve towns with a local feel; farther from many classic central/western beach outings.",
  },
  {
    name: "Albufeira / Olhos de Agua",
    verdict: "Best for broad inventory",
    detail:
      "Large supply of villas and restaurants; choose carefully for winter calm and family-friendly surroundings.",
  },
];

export const villas: Villa[] = [
  {
    destinationId: "algarve",
    name: "Cove House for a Christmas Crew",
    area: "Carvoeiro / Ferragudo",
    price: 9800,
    bedrooms: 6,
    bathrooms: 5,
    rating: 4.9,
    distance: "8 min drive to Carvoeiro beach",
    fit: 96,
    source: "Booking.com / Vrbo style match",
    amenities: ["heated pool", "beach nearby", "supermarket nearby", "games room"],
    childAmenities: ["crib available", "high chair", "toddler-safe pool gate", "playground nearby"],
    bestFor: ["toddler", "balanced base", "short drives"],
    activities: [
      "Benagil and Carvoeiro coastal walk",
      "Ferragudo lunch and marina stroll",
      "Slide & Splash or Zoomarine if open for the season",
    ],
    bring: ["warm layers for evenings", "pool towels", "walking shoes", "family board games"],
    flights: "Fly into Faro Airport, then plan a 45-55 minute transfer or hire cars for day trips.",
    note:
      "The strongest first pick: central, practical for groceries and restaurants, and friendly for mixed ages.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&h=650&q=80",
    imageFallback: "Villa placeholder 1",
  },
  {
    destinationId: "algarve",
    name: "Marina Walk Villa",
    area: "Vilamoura / Quarteira",
    price: 11200,
    bedrooms: 6,
    bathrooms: 6,
    rating: 4.8,
    distance: "12 min walk to marina restaurants",
    fit: 92,
    source: "Expedia Rapid / Vrbo style match",
    amenities: ["heated pool", "walkable restaurants", "supermarket nearby", "golf nearby"],
    childAmenities: ["crib available", "high chair", "playground nearby"],
    bestFor: ["toddler", "walkable dinners", "easy airport transfer"],
    activities: [
      "Vilamoura marina dinners",
      "Quarteira promenade walk",
      "Golf lesson or spa afternoon",
    ],
    bring: ["smart-casual dinner clothes", "swimwear", "light rain jackets", "golf gear if needed"],
    flights: "Fly into Faro Airport, then plan a 25-35 minute transfer. Cars are still useful for beaches.",
    note:
      "Great if the family wants easy dinners without driving. Usually more polished, sometimes less characterful.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&h=650&q=80",
    imageFallback: "Villa placeholder 2",
  },
  {
    destinationId: "algarve",
    name: "Praia da Luz Long Table Villa",
    area: "Lagos / Praia da Luz",
    price: 8700,
    bedrooms: 5,
    bathrooms: 4,
    rating: 4.7,
    distance: "10 min drive to Lagos old town",
    fit: 88,
    source: "Booking.com / direct villa agency style match",
    amenities: ["beach nearby", "walkable restaurants", "family kitchen", "sea view"],
    childAmenities: ["crib available", "high chair"],
    bestFor: ["scenery", "older kids", "beach walks"],
    activities: [
      "Lagos old town and marina",
      "Ponta da Piedade viewpoints",
      "Praia da Luz beach walks",
    ],
    bring: ["windbreakers", "walking shoes", "binoculars for viewpoints", "car seats if hiring cars"],
    flights: "Fly into Faro Airport, then plan a 60-75 minute transfer. This base benefits from car hire.",
    note:
      "A scenic western option with excellent beaches nearby, but it is a longer run from Faro airport.",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6a3?auto=format&fit=crop&w=900&h=650&q=80",
    imageFallback: "Villa placeholder 3",
  },
  {
    destinationId: "algarve",
    name: "Golden Triangle Resort Villa",
    area: "Vale do Lobo / Quinta do Lago",
    price: 16500,
    bedrooms: 7,
    bathrooms: 7,
    rating: 4.9,
    distance: "6 min drive to beach clubs",
    fit: 86,
    source: "Vrbo / luxury villa partner style match",
    amenities: ["heated pool", "golf nearby", "private chef option", "supermarket nearby"],
    childAmenities: ["crib available", "high chair", "toddler-safe pool gate"],
    bestFor: ["luxury", "toddler", "resort services"],
    activities: [
      "Quinta do Lago nature trail",
      "Vale do Lobo beach afternoon",
      "Private chef dinner at the villa",
    ],
    bring: ["restaurant outfits", "trainers for resort paths", "swimwear", "booking confirmations"],
    flights: "Fly into Faro Airport, then plan a 20-30 minute transfer. Private transfers work well here.",
    note:
      "Excellent for comfort and services, but it pushes the budget and may need cars for most outings.",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&h=650&q=80",
    imageFallback: "Villa placeholder 4",
  },
  {
    destinationId: "algarve",
    name: "Olhos de Agua Family Base",
    area: "Albufeira / Olhos de Agua",
    price: 7600,
    bedrooms: 5,
    bathrooms: 4,
    rating: 4.6,
    distance: "15 min walk to local beach",
    fit: 84,
    source: "Booking.com / Expedia style match",
    amenities: ["walkable restaurants", "beach nearby", "supermarket nearby", "pool"],
    childAmenities: ["high chair", "playground nearby"],
    bestFor: ["value", "walkable basics", "broad inventory"],
    activities: [
      "Olhos de Agua beach",
      "Albufeira old town lunch",
      "Clifftop walks toward Falesia",
    ],
    bring: ["comfortable shoes", "beach layers", "shared grocery list", "portable chargers"],
    flights: "Fly into Faro Airport, then plan a 35-45 minute transfer. Check the exact street for calm.",
    note:
      "Good value and broad inventory. Best when the exact street is calm and away from late-night zones.",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&h=650&q=80",
    imageFallback: "Villa placeholder 5",
  },
  {
    destinationId: "algarve",
    name: "Tavira Slow Winter House",
    area: "Tavira / Cabanas",
    price: 6900,
    bedrooms: 5,
    bathrooms: 4,
    rating: 4.8,
    distance: "9 min drive to Tavira centre",
    fit: 78,
    source: "Direct villa agency style match",
    amenities: ["supermarket nearby", "quiet area", "heated pool", "historic town"],
    childAmenities: ["crib available", "high chair"],
    bestFor: ["quiet stay", "slow travel", "winter town walks"],
    activities: [
      "Tavira historic centre",
      "Ria Formosa boat trip",
      "Cabanas waterfront lunch",
    ],
    bring: ["warm layers", "books", "walking shoes", "birdwatching or camera gear"],
    flights: "Fly into Faro Airport, then plan a 35-45 minute transfer. Cars help for wider Algarve outings.",
    note:
      "A beautiful quieter suggestion if the family wants slower days. Less central for classic Algarve touring.",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cd7a?auto=format&fit=crop&w=900&h=650&q=80",
    imageFallback: "Villa placeholder 6",
  },
];

export const activities: Activity[] = [
  {
    name: "Lagos Christmas market and old town lights",
    area: "Lagos",
    type: ["christmas", "toddler", "rainy"],
    status: "2026 dates to verify",
    ages: ["toddler", "kids", "adults"],
    note:
      "Good family evening option if the market returns in late December. Keep this as a festive candidate until official 2026 dates are published.",
  },
  {
    name: "Vila Real de Santo Antonio Vila Natal",
    area: "Eastern Algarve",
    type: ["christmas", "toddler"],
    status: "Likely seasonal pattern",
    ages: ["toddler", "kids", "adults", "grandparents"],
    note:
      "Past editions have run from late November into early January, which makes it useful for the 27 Dec to 7 Jan trip window.",
  },
  {
    name: "Portimao Christmas village",
    area: "Portimao",
    type: ["christmas", "toddler", "rainy"],
    status: "2026 dates to verify",
    ages: ["toddler", "kids", "adults"],
    note:
      "A practical family option when running, with Santa-style programming, lights, and simple child-friendly entertainment.",
  },
  {
    name: "Benagil or Carvoeiro coastal viewpoint",
    area: "Carvoeiro",
    type: ["outdoors"],
    status: "Weather dependent",
    ages: ["kids", "adults", "grandparents"],
    note:
      "Best for calm dry days. With a 2-year-old, plan a short viewpoint stop rather than a long cliff walk.",
  },
  {
    name: "Zoomarine or indoor play backup",
    area: "Albufeira / Guia",
    type: ["toddler", "rainy"],
    status: "Seasonal opening to verify",
    ages: ["toddler", "kids"],
    note:
      "Keep as a rainy-day candidate, but opening calendars should be checked close to travel.",
  },
  {
    name: "Supermarket and pharmacy setup run",
    area: "Pinned villa area",
    type: ["toddler", "rainy"],
    status: "Day-one essential",
    ages: ["toddler", "adults"],
    note:
      "Add nappies, snacks, milk, wipes, child medicine basics, and breakfast food before everyone arrives.",
  },
  {
    name: "Private chef and early family dinner",
    area: "Pinned villa",
    type: ["rainy"],
    status: "Book after villa is final",
    ages: ["toddler", "kids", "adults", "grandparents"],
    note:
      "Best for a mixed-age group because the toddler can sleep while adults still get a proper dinner.",
  },
  {
    name: "Older kids beach photo challenge",
    area: "Nearest beach",
    type: ["outdoors"],
    status: "Low-cost idea",
    ages: ["kids", "teens"],
    note:
      "Give children and teens a scavenger list: shells, cliffs, funny family photo, sunset, and best snack.",
  },
];
