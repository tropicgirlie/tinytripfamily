const areaCoordinates = {
  "Carvoeiro / Ferragudo": { lat: 37.0976, lng: -8.4701 },
  "Vilamoura / Quarteira": { lat: 37.0774, lng: -8.1179 },
  "Lagos / Praia da Luz": { lat: 37.1028, lng: -8.6726 },
  "Vale do Lobo / Quinta do Lago": { lat: 37.0513, lng: -8.0274 },
  "Albufeira / Olhos de Agua": { lat: 37.0922, lng: -8.1918 },
  "Tavira / Cabanas": { lat: 37.1256, lng: -7.6499 },
  Algarve: { lat: 37.1028, lng: -8.6726 },
};

const categoryRequests = [
  { label: "Supermarket", type: "supermarket" },
  { label: "Pharmacy", type: "pharmacy" },
  { label: "Park", type: "park" },
  { label: "Cafe", type: "cafe" },
  { label: "Restaurant", type: "restaurant" },
  { label: "Parking", type: "parking" },
];

const responseCache = new Map();
const cacheTtlMs = 1000 * 60 * 60 * 12;

function getCoordinates(area) {
  if (areaCoordinates[area]) return areaCoordinates[area];
  const match = Object.entries(areaCoordinates).find(([name]) => area?.includes(name.split(" / ")[0]));
  return match?.[1] ?? areaCoordinates.Algarve;
}

function distanceInMeters(from, to) {
  const earthRadius = 6371000;
  const lat1 = (from.lat * Math.PI) / 180;
  const lat2 = (to.lat * Math.PI) / 180;
  const deltaLat = ((to.lat - from.lat) * Math.PI) / 180;
  const deltaLng = ((to.lng - from.lng) * Math.PI) / 180;
  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
  return Math.round(earthRadius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

function formatDistance(meters) {
  if (!meters) return "Nearby";
  if (meters < 1000) return `${meters} m`;
  return `${(meters / 1000).toFixed(1)} km`;
}

async function fetchCategory(apiKey, origin, category) {
  const response = await fetch("https://places.googleapis.com/v1/places:searchNearby", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask":
        "places.displayName,places.formattedAddress,places.location,places.googleMapsUri,places.rating,places.primaryType",
    },
    body: JSON.stringify({
      includedTypes: [category.type],
      maxResultCount: 1,
      rankPreference: "DISTANCE",
      locationRestriction: {
        circle: {
          center: { latitude: origin.lat, longitude: origin.lng },
          radius: 2500,
        },
      },
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Google Places ${response.status}: ${detail}`);
  }

  const data = await response.json();
  const place = data.places?.[0];
  if (!place) {
    return {
      label: category.label,
      name: "Not found nearby",
      distance: "Check exact villa address",
      source: "Google Places",
    };
  }

  const placeLocation = place.location
    ? { lat: place.location.latitude, lng: place.location.longitude }
    : null;
  const meters = placeLocation ? distanceInMeters(origin, placeLocation) : null;

  return {
    label: category.label,
    name: place.displayName?.text ?? category.label,
    distance: formatDistance(meters),
    address: place.formattedAddress,
    rating: place.rating,
    mapsUrl: place.googleMapsUri,
    source: "Google Places",
  };
}

export default async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    response.status(500).json({ error: "GOOGLE_PLACES_API_KEY is not configured" });
    return;
  }

  const area = String(request.query.area || "Algarve").slice(0, 80);
  const origin = getCoordinates(area);
  const cacheKey = `${area}:${origin.lat},${origin.lng}`;
  const cached = responseCache.get(cacheKey);

  if (cached && Date.now() - cached.createdAt < cacheTtlMs) {
    response.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    response.status(200).json(cached.payload);
    return;
  }

  try {
    const amenities = await Promise.all(
      categoryRequests.map((category) => fetchCategory(apiKey, origin, category)),
    );
    const payload = { area, origin, amenities, updatedAt: new Date().toISOString() };
    responseCache.set(cacheKey, { createdAt: Date.now(), payload });
    response.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    response.status(200).json(payload);
  } catch (error) {
    response.status(502).json({
      error: "Google Places request failed",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
