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
  Sparkle,
  Suitcase,
  Sun,
  UsersThree,
  WifiHigh,
  Wind,
} from "@phosphor-icons/react";

export const guestQuickNav = [
  { id: "pinned", label: "Villa reveal", icon: HouseLine, href: "#pinned", tone: "teal" },
  { id: "plan", label: "Itinerary", icon: CalendarBlank, href: "#plan", tone: "sun" },
  { id: "activities", label: "Things to do", icon: MapTrifold, href: "#activitiesTitle", tone: "violet" },
  { id: "amenities", label: "Eat & shop", icon: ForkKnife, href: "#amenities", tone: "coral" },
  { id: "map", label: "Map", icon: MapPin, href: "#overview", tone: "teal" },
  { id: "packing", label: "Packing list", icon: Suitcase, href: "#packing", tone: "brown" },
] as const;

export const guestItineraryPreview = [
  { date: "Dec 27", label: "Arrival", sub: "Settle in", icon: Airplane },
  { date: "Dec 28", label: "Beach day", sub: "Praia do Luz", icon: Sun },
  { date: "Dec 29", label: "Market stroll", sub: "Lagos old town", icon: ShoppingBag },
  { date: "Dec 31", label: "NYE dinner", sub: "Family booking", icon: Sparkle },
  { date: "Jan 5", label: "Coastal walk", sub: "Benagil area", icon: MapPin },
  { date: "Jan 7", label: "Departure", sub: "Head home", icon: Airplane },
];

export const nearbyAmenities = [
  { label: "Supermarket", distance: "7 min walk", icon: ShoppingBag },
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
  zoomarine: "https://images.unsplash.com/photo-1544551763-77ef1a8e78d7?auto=format&fit=crop&w=400&h=280&q=80",
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
    name: "Lagos old town lights",
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

export const villaAmenityIcons = [
  { label: "Pool", icon: Sun },
  { label: "Sea view", icon: MapPin },
  { label: "Wi-Fi", icon: WifiHigh },
  { label: "BBQ", icon: ForkKnife },
  { label: "A/C", icon: Wind },
] as const;
