import type { Icon } from "@phosphor-icons/react";
import {
  Airplane,
  CalendarBlank,
  ChatCircle,
  FileText,
  Gear,
  HouseLine,
  MapTrifold,
  Gift,
  PaperPlaneTilt,
  Sparkle,
  SquaresFour,
  UsersThree,
  Wallet,
} from "@phosphor-icons/react";

export type NavItem = {
  id: string;
  label: string;
  icon: Icon;
  href: string;
  badge?: number;
  active?: boolean;
};

/** Guest-only sections deep-link from host dashboard */
export const guestSection = (hash: string) => `?view=guest${hash.startsWith("#") ? hash : `#${hash}`}`;

export const dashboardNav: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: SquaresFour, href: "#dashboard", active: true },
  { id: "villas", label: "Villa shortlist", icon: HouseLine, href: "#results" },
  { id: "guests", label: "Guest profile", icon: UsersThree, href: "#family" },
  { id: "reco", label: "Recommendations", icon: Sparkle, href: guestSection("activitiesTitle") },
  { id: "flights", label: "Flight watch", icon: Airplane, href: "#flights" },
  { id: "itinerary", label: "Itinerary builder", icon: MapTrifold, href: guestSection("plan") },
  { id: "reveal", label: "Villa reveal", icon: Gift, href: "#pinned" },
  { id: "messages", label: "Messages", icon: ChatCircle, href: "#messages", badge: 2 },
  { id: "budget", label: "Budget & payments", icon: Wallet, href: "#budget" },
  { id: "documents", label: "Documents", icon: FileText, href: "#documents" },
  { id: "settings", label: "Settings", icon: Gear, href: "#host-planning" },
];

export const quickActions = [
  {
    id: "villas",
    label: "Manage villa shortlist",
    meta: "5 villas shortlisted",
    icon: HouseLine,
    tone: "teal",
    href: "#results",
  },
  {
    id: "itinerary",
    label: "Plan itinerary",
    meta: "Build day-by-day plan",
    icon: CalendarBlank,
    tone: "sun",
    href: guestSection("plan"),
  },
  {
    id: "flights",
    label: "Flight watch",
    meta: "Track prices & alerts",
    icon: Airplane,
    tone: "violet",
    href: "#flights",
  },
  {
    id: "guests",
    label: "Guest profile",
    meta: "5 travelers added",
    icon: UsersThree,
    tone: "blue",
    href: "#family",
  },
  {
    id: "share",
    label: "Share with guests",
    meta: "Control what they see",
    icon: PaperPlaneTilt,
    tone: "coral",
    href: guestSection("overview"),
  },
] as const;

export const hostTasks = [
  { id: "villa", label: "Confirm villa", done: true },
  { id: "flights", label: "Lock flights", done: true },
  { id: "reveal", label: "Share reveal date with guests", done: false },
  { id: "itinerary", label: "Build itinerary", done: true },
  { id: "activities", label: "Add activities", done: false },
  { id: "budget", label: "Review budget", done: false },
  { id: "plan", label: "Share final plan", done: false },
];

export const travelPreferences = [
  "Family friendly",
  "Beach time",
  "Good restaurants",
  "Relaxed pace",
];

export const settingsRows = [
  { label: "Mystery villa reveal", value: "Set reveal date", href: "#pinned" },
  { label: "What guests can see", value: "Custom", href: "?view=guest" },
  { label: "Budget range", value: "€4,000 – €5,500", href: "#budget" },
  { label: "Booking permissions", value: "Host only", href: "#host-planning" },
  { label: "Private notes", value: "12 notes", href: "#messages" },
];

export const recentActivity = [
  { title: "You updated the villa shortlist", when: "Today, 10:24 AM" },
  { title: "Flight price dropped: LGW → FAO", when: "Yesterday, 4:32 PM" },
  { title: "Added Zoomarine tickets to itinerary", when: "Yesterday, 11:15 AM" },
  { title: "You set villa reveal for Dec 15", when: "Dec 8, 8:40 PM" },
  { title: "Shared itinerary preview with guests", when: "Dec 7, 6:20 PM" },
];

export const itineraryHighlights = [
  "Consider booking Benagil Cave tour (filling up)",
  "Zoomarine tickets available with 15% off",
  "Check weather for New Year's Eve dinner",
];

export const budgetBreakdown = [
  { label: "Villas", amount: "€1,140", pct: 73, tone: "teal" },
  { label: "Flights", amount: "€0", pct: 0, tone: "blue" },
  { label: "Activities", amount: "€100", pct: 6, tone: "sun" },
  { label: "Other", amount: "€0", pct: 0, tone: "gray" },
];

export const documents = [
  { label: "Travel insurance", status: "Uploaded" },
  { label: "Passports", status: "Uploaded" },
  { label: "Villa rules & info", status: "Uploaded" },
  { label: "Packing list", status: "View" },
];

export const demoTravelers = [
  {
    name: "Michelle",
    role: "Host",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80",
  },
  {
    name: "Jason",
    role: "Adult",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
  },
  {
    name: "Sienna",
    role: "Age 11",
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80",
  },
  {
    name: "Luca",
    role: "Age 7",
    photo:
      "https://images.unsplash.com/photo-1503454537845-ef8e4c4d2f45?auto=format&fit=crop&w=120&h=120&q=80",
  },
  {
    name: "Noah",
    role: "Age 2",
    photo:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=120&h=120&q=80",
  },
];

export const itineraryDays = [
  { date: "Dec 27", icon: Airplane },
  { date: "Dec 28", icon: Sparkle },
  { date: "Dec 29", icon: CalendarBlank },
  { date: "Dec 30", icon: HouseLine },
  { date: "Dec 31", icon: Sparkle },
  { date: "Jan 1", icon: CalendarBlank },
  { date: "Jan 2", icon: MapTrifold },
  { date: "Jan 3", icon: Sparkle },
  { date: "Jan 4", icon: HouseLine },
  { date: "Jan 5", icon: MapTrifold },
  { date: "Jan 6", icon: CalendarBlank },
  { date: "Jan 7", icon: Airplane },
];
