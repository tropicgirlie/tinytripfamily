export type CachedNearbyAmenity = {
  label: string;
  name: string;
  distance: string;
  address?: string;
  mapsUrl?: string;
  source?: string;
};

export type TripContentCache = {
  area: string;
  nearbyAmenities: CachedNearbyAmenity[];
  resolvedAddress?: string;
  updatedAt: string;
  source: string;
};

const storageKey = "tinyTripGuestContentCache";

export function readTripContentCache(): TripContentCache | null {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return null;
    return JSON.parse(raw) as TripContentCache;
  } catch {
    return null;
  }
}

export function writeTripContentCache(cache: TripContentCache) {
  localStorage.setItem(storageKey, JSON.stringify(cache));
}

export async function fetchNearbyPlacesForArea(area: string): Promise<TripContentCache> {
  const response = await fetch(`/api/places/nearby?area=${encodeURIComponent(area)}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || data.error || "Could not load nearby places");
  }
  return {
    area: data.area,
    nearbyAmenities: data.amenities ?? [],
    resolvedAddress: data.resolvedAddress,
    updatedAt: data.updatedAt ?? new Date().toISOString(),
    source: "Google Places",
  };
}
