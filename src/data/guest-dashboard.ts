import {
  Airplane,
  CalendarBlank,
  CloudSun,
  ForkKnife,
  HouseLine,
  MapPin,
  MapTrifold,
  Package,
  ShoppingBag,
  ShoppingCart,
  Sparkle,
  Suitcase,
  Train,
  Sun,
  UsersThree,
  WifiHigh,
  Wind,
} from "../lib/icons";

export const guestQuickNav = [
  { id: "pinned", label: "Villa reveal", icon: HouseLine, href: "#pinned", tone: "teal" },
  { id: "plan", label: "Itinerary", icon: CalendarBlank, href: "#plan", tone: "sun" },
  { id: "activities", label: "Things to do", icon: MapTrifold, href: "#activitiesTitle", tone: "violet" },
  { id: "amenities", label: "Eat & shop", icon: ForkKnife, href: "#amenities", tone: "coral" },
  { id: "map", label: "Map", icon: MapPin, href: "#overview", tone: "teal" },
  { id: "packing", label: "Packing list", icon: Suitcase, href: "#packing", tone: "brown" },
  { id: "lisbon", label: "Lisbon day", icon: Train, href: "#lisbon-day", tone: "blue" },
  { id: "food", label: "Food & shops", icon: ShoppingCart, href: "#stay-food", tone: "coral" },
  { id: "kids", label: "Kids nearby", icon: UsersThree, href: "#stay-kids", tone: "violet" },
] as const;

export const guestItineraryPreview = [
  { date: "Dec 27", label: "Arrival", sub: "Settle in", icon: Airplane },
  { date: "Dec 28", label: "Beach day", sub: "Praia dos Pescadores", icon: Sun },
  { date: "Dec 29", label: "Market stroll", sub: "Albufeira old town", icon: ShoppingBag },
  { date: "Dec 31", label: "NYE dinner", sub: "Family booking", icon: Sparkle },
  { date: "Jan 5", label: "Coastal walk", sub: "Benagil area", icon: MapPin },
  { date: "Jan 7", label: "Departure", sub: "Head home", icon: Airplane },
];

export const familyGroups = [
  { label: "Luana's family", count: 3, detail: "2 adults + toddler age 2" },
  { label: "Family group 2", count: 4, detail: "2 adults + kids age 7 and 11" },
  { label: "Family group 3", count: 2, detail: "2 adults" },
  { label: "Family group 4", count: 4, detail: "4 travellers" },
];

export const guestHostUpdates = [
  {
    title: "Flight watch is on",
    body: "Direct Dublin to Faro routes are the ones to check first: Aer Lingus and Ryanair.",
    time: "Today",
  },
  {
    title: "Villa reveal soon",
    body: "Luana is comparing child-friendly villas around Albufeira and Olhos de Agua.",
    time: "Pinned by host",
  },
  {
    title: "Bring layers",
    body: "Late December is usually mild in the day, but cool at night for kids.",
    time: "Trip tip",
  },
];

export const guestFlightOptions = [
  {
    airline: "Aer Lingus",
    route: "Dublin (DUB) → Faro (FAO)",
    depart: "Morning / midday direct watch",
    returnTime: "Jan 7 return direct watch",
    bestFor: "Best for the whole group if seats line up together",
    status: "2026 schedule to verify",
  },
  {
    airline: "Ryanair",
    route: "Dublin (DUB) → Faro (FAO)",
    depart: "Early or late direct fare watch",
    returnTime: "Flexible return windows",
    bestFor: "Good for separate family bookings and lower fares",
    status: "Track weekly",
  },
  {
    airline: "Backup route",
    route: "Dublin → Lisbon/Porto → Faro",
    depart: "Only if direct seats jump",
    returnTime: "Longer travel day",
    bestFor: "Fallback for late bookers",
    status: "Keep open",
  },
];

export const nearbyAmenities = [
  { label: "Pharmacy", distance: "8 min walk", icon: Package },
  { label: "Playground", distance: "6 min walk", icon: UsersThree },
  { label: "Café", distance: "5 min walk", icon: ForkKnife },
  { label: "Beach access", distance: "6 min walk", icon: Sun },
  { label: "Parking", distance: "On-site", icon: MapPin },
];

export const weatherForecast = [
  { day: "Sat", high: 17, low: 10, icon: CloudSun },
  { day: "Sun", high: 18, low: 11, icon: Sun },
  { day: "Mon", high: 17, low: 10, icon: CloudSun },
  { day: "Tue", high: 16, low: 9, icon: CloudSun },
  { day: "Wed", high: 17, low: 10, icon: Sun },
];

export const packingTips = [
  { label: "Passports", icon: Package },
  { label: "Toddler essentials", icon: UsersThree },
  { label: "Swimwear & towels", icon: Sun },
  { label: "Light layers", icon: Wind },
  { label: "Chargers & adapters", icon: WifiHigh },
  { label: "Snacks", icon: ForkKnife },
  { label: "For the road", icon: Suitcase },
];

export type FeaturedActivity = {
  name: string;
  meta: string;
  badge?: string;
  image: string;
};

export const featuredActivityImages: Record<string, string> = {
  cave: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&h=280&q=80",
  lights: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=400&h=280&q=80",
  beach: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&h=280&q=80",
  zoomarine: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=400&h=280&q=80",
  cafe: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&h=280&q=80",
};

export const defaultFeaturedActivities: FeaturedActivity[] = [
  {
    name: "Benagil Cave boat tour",
    meta: "2.5 hrs · From €35",
    badge: "Top pick",
    image: featuredActivityImages.cave,
  },
  {
    name: "Albufeira old town lights",
    meta: "Evening stroll",
    image: featuredActivityImages.lights,
  },
  {
    name: "Praia do Camilo walk",
    meta: "1 hr · Easy",
    image: featuredActivityImages.beach,
  },
  {
    name: "Zoomarine Algarve",
    meta: "Half day · From €32",
    image: featuredActivityImages.zoomarine,
  },
  {
    name: "Cafés & restaurants",
    meta: "Local picks",
    image: featuredActivityImages.cafe,
  },
];

export const activityBoards = [
  {
    title: "Best with the toddler",
    intro: "Short, flexible ideas where the 2-year-old can nap, snack or leave early.",
    items: [
      {
        name: "Praia dos Pescadores or Olhos de Agua beach pause",
        meta: "Easy daylight outing",
        note: "Pick a calm, dry day and keep it short.",
        tag: "Age 2+",
        image: featuredActivityImages.beach,
      },
      {
        name: "Albufeira old town lights",
        meta: "Early evening",
        note: "Good for pram-friendly strolling before dinner.",
        tag: "Family stroll",
        image: featuredActivityImages.lights,
      },
      {
        name: "Villa play + private dinner",
        meta: "Low-stress night",
        note: "Best option when adults want dinner and the toddler needs bedtime.",
        tag: "Host pick",
        image: featuredActivityImages.cafe,
      },
    ],
  },
  {
    title: "For the 7 and 11 year olds",
    intro: "A bit more adventure, still manageable for adults and grandparents.",
    items: [
      {
        name: "Benagil cave boat tour",
        meta: "Weather dependent",
        note: "Use a reputable operator and verify sea conditions in winter.",
        tag: "Top pick",
        image: featuredActivityImages.cave,
      },
      {
        name: "Ponta da Piedade viewpoints",
        meta: "Scenic walk",
        note: "Better than a long cliff walk if the mixed-age group is tired.",
        tag: "Kids 7+",
        image: featuredActivityImages.beach,
      },
      {
        name: "Zoomarine / indoor backup",
        meta: "Seasonal opening to verify",
        note: "Keep as a rainy-day candidate until opening calendars are published.",
        tag: "Backup",
        image: featuredActivityImages.zoomarine,
      },
    ],
  },
  {
    title: "Christmas & New Year",
    intro: "Festive ideas that usually publish final dates closer to winter.",
    items: [
      {
        name: "Vila Real de Santo Antonio Vila Natal",
        meta: "Often late Nov into Jan",
        note: "Strong festive candidate if the group wants a Christmas village atmosphere.",
        tag: "Verify dates",
        image: featuredActivityImages.lights,
      },
      {
        name: "Portimao Christmas village",
        meta: "Family lights and stalls",
        note: "Good practical festive option if running for 2026/27.",
        tag: "Festive",
        image: featuredActivityImages.cafe,
      },
      {
        name: "Albufeira NYE fireworks",
        meta: "Dec 31",
        note: "Best as an optional adult/older-kid outing after an early family dinner.",
        tag: "New Year's Eve",
        image: featuredActivityImages.lights,
      },
    ],
  },
];

export const guestFullItinerary = [
  {
    date: "Dec 27",
    title: "Arrival in Faro",
    plan: "Land, collect cars or transfer, supermarket stop, settle into the villa.",
    familyNote: "Keep dinner simple and make the toddler bedtime easy.",
  },
  {
    date: "Dec 28",
    title: "Beach reset day",
    plan: "Short beach walk, villa lunch, marina or old-town lights before dinner.",
    familyNote: "Good first full day for everyone to recover from travel.",
  },
  {
    date: "Dec 29",
    title: "Albufeira old town lights",
    plan: "Early festive stroll near Albufeira old town, then dinner before the kids get tired.",
    familyNote: "Pram-friendly and easy to leave early.",
  },
  {
    date: "Dec 30",
    title: "Coastal viewpoints",
    plan: "Ponta da Piedade or a gentler local viewpoint depending on weather.",
    familyNote: "Better for the 7 and 11 year olds than the toddler.",
  },
  {
    date: "Dec 31",
    title: "New Year's Eve",
    plan: "Family dinner booking, then optional fireworks for whoever wants a later night.",
    familyNote: "Albufeira is lively, so plan an early dinner and make fireworks optional.",
  },
  {
    date: "Jan 1",
    title: "Slow villa day",
    plan: "Late breakfast, pool if heated, games, leftovers and relaxed family time.",
    familyNote: "Protect this day from too much planning.",
  },
  {
    date: "Jan 2",
    title: "Guia shopping or rainy-day backup",
    plan: "Algarve Shopping in Guia first, with Designer Outlet Algarve or MAR Shopping as a longer-drive backup.",
    familyNote: "Useful if the Algarve feels quiet after New Year or the group needs supplies.",
  },
  {
    date: "Jan 3",
    title: "Benagil or boat candidate",
    plan: "Only book if operators are running and sea conditions are safe.",
    familyNote: "Keep this flexible for the older kids and adults.",
  },
  {
    date: "Jan 5",
    title: "Family dinner night",
    plan: "Private chef, BBQ or easy restaurant booking near the villa.",
    familyNote: "Good night for photos and everyone together.",
  },
  {
    date: "Jan 7",
    title: "Return home",
    plan: "Pack, check passports, leave enough time for Faro Airport.",
    familyNote: "Keep snacks and toddler essentials separate from suitcases.",
  },
];

export const villaAmenityIcons = [
  { label: "Pool", icon: Sun },
  { label: "Sea view", icon: MapPin },
  { label: "Wi-Fi", icon: WifiHigh },
  { label: "BBQ", icon: ForkKnife },
  { label: "A/C", icon: Wind },
] as const;
