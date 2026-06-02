import { useCallback, useEffect, useMemo, useState } from "react";
import { getDestination, resolveDestinationFromInput } from "../data/destinations";
import { activities, areas, tripDefaults, villas, type TripDefaults, type Villa } from "../data/trip";
import { buildFlightInsights } from "../lib/flights";
import {
  formatDisplayDate,
  parseDateInputString,
  villaImageSrc,
  villaPricePerNight,
} from "../lib/format";

export type FamilyMember = {
  name: string;
  age: number;
  photo?: string;
  foodPreference?: string;
  allergies?: string;
};
export type BrandState = { name: string; subdomain: string; logo: string };
export type ViewMode = "guest" | "host";
export type ManualVillaInput = {
  name: string;
  area: string;
  price: number;
  bedrooms: number;
  url: string;
  image: string;
};

const pinnedStorageKey = "micheauFamilyTripPinned";
const brandStorageKey = "tinyTripIndexBrand";
const familyStorageKey = "tinyTripFamilyMembers";
const viewStorageKey = "tinyTripViewMode";
const originStorageKey = "tinyTripOriginCity";
const manualVillaStorageKey = "tinyTripManualVillas";

const brandDefaults: BrandState = {
  name: "Micheau Family Trip",
  subdomain: "micheau",
  logo: "./assets/micheau-logo.jpg",
};

function getViewModeFromUrl(): ViewMode {
  const params = new URLSearchParams(window.location.search);
  const requested = params.get("view");
  if (requested === "guest" || requested === "host") return requested;
  return (localStorage.getItem(viewStorageKey) as ViewMode) || "guest";
}

function normalizeSubdomain(value: string) {
  return (
    (value || brandDefaults.subdomain)
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 42) || brandDefaults.subdomain
  );
}

function getAgeGroup(age: number) {
  if (age <= 3) return "toddler";
  if (age <= 12) return "kids";
  if (age <= 17) return "teens";
  if (age >= 65) return "grandparents";
  return "adults";
}

export function useTripPlanner() {
  const [viewMode, setViewMode] = useState<ViewMode>(getViewModeFromUrl);
  const [brand, setBrand] = useState<BrandState>(() => {
    const stored = {
      ...brandDefaults,
      ...(JSON.parse(localStorage.getItem(brandStorageKey) || "null") || {}),
    };
    if (stored.logo === "./assets/micheau-logo.svg") {
      stored.logo = brandDefaults.logo;
    }
    return stored;
  });
  const [destinationInput, setDestinationInput] = useState("Algarve, Portugal");
  const [dateInput, setDateInput] = useState("27 Dec 2026 - 7 Jan 2027");
  const [originCity, setOriginCity] = useState(() => localStorage.getItem(originStorageKey) || "Dublin");
  const [trip, setTrip] = useState<TripDefaults>(tripDefaults);
  const [maxPrice, setMaxPrice] = useState(12000);
  const [areaFilter, setAreaFilter] = useState("all");
  const [bedFilter, setBedFilter] = useState(0);
  const [amenityFilter, setAmenityFilter] = useState("all");
  const [childFilter, setChildFilter] = useState("all");
  const [activityFilter, setActivityFilter] = useState("all");
  const [pinnedVillaName, setPinnedVillaName] = useState(() => localStorage.getItem(pinnedStorageKey) || "");
  const [selectedGuessName, setSelectedGuessName] = useState("");
  const [manualVillas, setManualVillas] = useState<Villa[]>(
    () => JSON.parse(localStorage.getItem(manualVillaStorageKey) || "null") || [],
  );
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(
    () =>
      JSON.parse(localStorage.getItem(familyStorageKey) || "null") || [
        { name: "Toddler", age: 2 },
        { name: "Luana", age: 36 },
      ],
  );

  const destination = useMemo(() => resolveDestinationFromInput(destinationInput), [destinationInput]);

  useEffect(() => {
    document.body.classList.toggle("guest-view", viewMode === "guest");
    document.body.classList.toggle("host-view", viewMode === "host");
    localStorage.setItem(viewStorageKey, viewMode);
  }, [viewMode]);

  useEffect(() => {
    localStorage.setItem(brandStorageKey, JSON.stringify(brand));
  }, [brand]);

  useEffect(() => {
    localStorage.setItem(originStorageKey, originCity);
  }, [originCity]);

  useEffect(() => {
    setTrip(parseDateInputString(dateInput));
  }, [dateInput]);

  const switchView = useCallback((mode: ViewMode) => {
    setViewMode(mode);
    const url = new URL(window.location.href);
    url.searchParams.set("view", mode);
    window.history.replaceState({}, "", url);
  }, []);

  const villaMatches = useCallback(
    (villa: Villa) =>
      villa.destinationId === destination.id &&
      villa.price <= maxPrice &&
      villa.bedrooms >= bedFilter &&
      (amenityFilter === "all" || villa.amenities.includes(amenityFilter)) &&
      (childFilter === "all" || villa.childAmenities.includes(childFilter)) &&
      (areaFilter === "all" || villa.area === areaFilter),
    [destination.id, maxPrice, bedFilter, amenityFilter, childFilter, areaFilter],
  );

  const matchedVillas = useMemo(
    () =>
      [...villas, ...manualVillas]
        .filter(villaMatches)
        .sort((a, b) => b.fit - a.fit || b.rating - a.rating),
    [manualVillas, villaMatches],
  );

  const flightInsights = useMemo(
    () =>
      buildFlightInsights(
        { destinationId: destination.id },
        trip,
        { city: originCity, airportCode: "DUB" },
      ),
    [destination.id, trip, originCity],
  );

  const countdownDays = useMemo(() => {
    const today = new Date();
    const start = new Date(`${trip.checkIn}T00:00:00`);
    return Math.max(0, Math.ceil((start.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
  }, [trip.checkIn]);

  const pinVilla = useCallback((name: string) => {
    setPinnedVillaName(name);
    localStorage.setItem(pinnedStorageKey, name);
  }, []);

  const addManualVilla = useCallback(
    (input: ManualVillaInput) => {
      const villa: Villa = {
        destinationId: destination.id,
        name: input.name.trim(),
        area: input.area.trim() || destination.areas[0]?.name || destination.label,
        price: input.price,
        bedrooms: input.bedrooms,
        bathrooms: Math.max(2, Math.round(input.bedrooms * 0.8)),
        rating: 0,
        distance: "Manual pick - verify exact address before sharing",
        fit: 82,
        source: input.url.includes("airbnb") ? "Manual Airbnb pick" : "Manual host pick",
        amenities: ["manual pick", "host reviewed"],
        childAmenities: ["verify crib", "verify high chair", "verify child safety"],
        bestFor: ["host pick", "needs verification"],
        activities: ["Check exact address", "Confirm family amenities", "Review cancellation policy"],
        bring: ["booking link", "house rules", "host contact", "child amenity confirmation"],
        flights: `Fly into ${destination.airport.name}, then confirm transfer time after exact address is known.`,
        note:
          "Manually added listing. Use this to compare Airbnb or direct villa options while live partner APIs are being connected.",
        image: input.image,
        imageFallback: input.name.trim() || "Manual villa",
        bookingUrl: input.url,
      };

      setManualVillas((current) => {
        const next = [villa, ...current.filter((item) => item.name !== villa.name)];
        localStorage.setItem(manualVillaStorageKey, JSON.stringify(next));
        return next;
      });
    },
    [destination],
  );

  const clearManualVillas = useCallback(() => {
    setManualVillas([]);
    localStorage.removeItem(manualVillaStorageKey);
  }, []);

  const resetMystery = useCallback(() => {
    setPinnedVillaName("");
    setSelectedGuessName("");
    localStorage.removeItem(pinnedStorageKey);
  }, []);

  const addMember = useCallback((member: FamilyMember) => {
    setFamilyMembers((current) => {
      const next = [...current, member];
      localStorage.setItem(familyStorageKey, JSON.stringify(next));
      return next;
    });
  }, []);

  const updateMember = useCallback((index: number, patch: Partial<FamilyMember>) => {
    setFamilyMembers((current) => {
      const next = current.map((member, memberIndex) =>
        memberIndex === index ? { ...member, ...patch } : member,
      );
      localStorage.setItem(familyStorageKey, JSON.stringify(next));
      return next;
    });
  }, []);

  const removeMember = useCallback((index: number) => {
    setFamilyMembers((current) => {
      const next = current.filter((_, i) => i !== index);
      localStorage.setItem(familyStorageKey, JSON.stringify(next));
      return next;
    });
  }, []);

  const activeAreas = destination.areas.length ? destination.areas : areas;

  return {
    viewMode,
    switchView,
    brand,
    setBrand,
    destination,
    destinationInput,
    setDestinationInput,
    dateInput,
    setDateInput,
    originCity,
    setOriginCity,
    trip,
    maxPrice,
    setMaxPrice,
    areaFilter,
    setAreaFilter,
    bedFilter,
    setBedFilter,
    amenityFilter,
    setAmenityFilter,
    childFilter,
    setChildFilter,
    activityFilter,
    setActivityFilter,
    pinnedVillaName,
    selectedGuessName,
    setSelectedGuessName,
    pinVilla,
    addManualVilla,
    clearManualVillas,
    resetMystery,
    familyMembers,
    addMember,
    updateMember,
    removeMember,
    matchedVillas,
    flightInsights,
    countdownDays,
    activities,
    activeAreas,
    getAgeGroup,
    formatDisplayDate,
    villaImageSrc,
    villaPricePerNight: (villa: Villa) => villaPricePerNight(villa, trip.nights),
    normalizeSubdomain,
    getDestination,
  };
}
