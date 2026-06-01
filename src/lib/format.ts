import type { TripDefaults, Villa } from "../data/trip";

export const currency = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export type PlaceholderTone = "villa" | "activity";

export function placeholderImage(label: string, tone: PlaceholderTone = "villa"): string {
  const palette =
    tone === "activity"
      ? { bg: "#eef6ff", line: "#c9ddff", text: "#315aa8" }
      : { bg: "#f7f7f7", line: "#d8d8d8", text: "#6f6f6f" };
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 650">
      <rect width="900" height="650" rx="32" fill="${palette.bg}"/>
      <path d="M120 462 286 310l116 104 88-82 290 214H120Z" fill="#fff" stroke="${palette.line}" stroke-width="10"/>
      <circle cx="642" cy="188" r="58" fill="#fff" stroke="${palette.line}" stroke-width="10"/>
      <rect x="80" y="78" width="740" height="494" rx="28" fill="none" stroke="${palette.line}" stroke-width="10" stroke-dasharray="18 18"/>
      <text x="450" y="596" text-anchor="middle" font-family="Nunito Sans, sans-serif" font-size="34" font-weight="700" fill="${palette.text}">${label}</text>
    </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export function villaImageSrc(villa: Pick<Villa, "image" | "imageFallback">): string {
  return villa.image || placeholderImage(villa.imageFallback || "Villa");
}

export function villaPricePerNight(villa: Pick<Villa, "price">, nights: number): number {
  return Math.round(villa.price / nights);
}

export type ParsedTripDates = {
  checkIn: Date;
  checkOut: Date;
  nights: number;
};

const millisecondsPerDay = 1000 * 60 * 60 * 24;

export function parseTripDates(trip: Pick<TripDefaults, "checkIn" | "checkOut" | "nights">): ParsedTripDates {
  const checkIn = new Date(`${trip.checkIn}T00:00:00`);
  const checkOut = new Date(`${trip.checkOut}T00:00:00`);
  const computedNights = Math.max(
    1,
    Math.round((checkOut.getTime() - checkIn.getTime()) / millisecondsPerDay),
  );

  return {
    checkIn,
    checkOut,
    nights: trip.nights || computedNights,
  };
}

export function parseDateInputString(input: string): TripDefaults {
  const match = input.match(/(\d{1,2}\s+\w+\s+\d{4})\s*[-–]\s*(\d{1,2}\s+\w+\s+\d{4})/i);
  if (!match) return { guests: 10, checkIn: "2026-12-27", checkOut: "2027-01-07", nights: 11 };

  const checkInDate = new Date(match[1]);
  const checkOutDate = new Date(match[2]);
  const toIso = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const nights = Math.max(
    1,
    Math.round((checkOutDate.getTime() - checkInDate.getTime()) / millisecondsPerDay),
  );

  return {
    guests: 10,
    checkIn: toIso(checkInDate),
    checkOut: toIso(checkOutDate),
    nights,
  };
}

export function formatDisplayDate(isoDate: string | Date): string {
  const date = typeof isoDate === "string" ? new Date(`${isoDate}T00:00:00`) : isoDate;
  return new Intl.DateTimeFormat("en-IE", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
