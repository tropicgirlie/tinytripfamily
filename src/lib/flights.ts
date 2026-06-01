import { getDestination } from "../data/destinations";
import type { TripDefaults } from "../data/trip";
import { parseTripDates } from "./format";

export type FlightSearchOrigin = {
  city: string;
  airportCode?: string;
};

export type TripProfile = {
  destinationId: string;
};

export type FlightInsight = {
  airline: string;
  route: string;
  status: string;
  trend: string;
  action: string;
  nudge: string;
  searchUrl: string;
};

type GoogleFlightsParams = {
  originCity: string;
  originCode?: string;
  destinationCity: string;
  destinationCode: string;
  departDate: string;
  returnDate: string;
};

export function buildGoogleFlightsUrl(params: GoogleFlightsParams): string {
  const origin = params.originCode ?? params.originCity;
  const destination = params.destinationCode;
  const query = [
    "Flights",
    `from ${origin}`,
    `to ${destination}`,
    `on ${params.departDate}`,
    `through ${params.returnDate}`,
  ].join(" ");

  return `https://www.google.com/travel/flights?q=${encodeURIComponent(query)}`;
}

function overlapsChristmasWindow(checkIn: Date, checkOut: Date): boolean {
  const windowStart = new Date(checkIn.getFullYear(), 11, 20);
  const windowEnd = new Date(checkOut.getFullYear(), 0, 8);
  return checkIn <= windowEnd && checkOut >= windowStart;
}

function christmasNudge(baseNudge: string, inChristmasWindow: boolean): string {
  if (!inChristmasWindow) return baseNudge;

  if (baseNudge.includes("Christmas")) return baseNudge;

  return `${baseNudge} Peak Christmas travel—confirm outbound and return before fares jump.`;
}

export function buildFlightInsights(
  profile: TripProfile,
  trip: TripDefaults,
  origin: FlightSearchOrigin = { city: "Dublin", airportCode: "DUB" },
): FlightInsight[] {
  const destination = getDestination(profile.destinationId);
  const { checkIn, checkOut } = parseTripDates(trip);
  const inChristmasWindow = overlapsChristmasWindow(checkIn, checkOut);

  const searchUrl = buildGoogleFlightsUrl({
    originCity: origin.city,
    originCode: origin.airportCode,
    destinationCity: destination.airport.city,
    destinationCode: destination.airport.code,
    departDate: trip.checkIn,
    returnDate: trip.checkOut,
  });

  return destination.flightRoutes.map((route) => ({
    airline: route.airline,
    route: route.route,
    status: route.status,
    trend: route.trend,
    action: route.action,
    nudge: christmasNudge(route.nudge, inChristmasWindow),
    searchUrl,
  }));
}
