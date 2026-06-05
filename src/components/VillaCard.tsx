import { Box, Button, Flex, Heading, Text } from "@radix-ui/themes";
import { ArrowSquareOut, Bed, PushPin, Question, Sparkle, Star } from "../lib/icons";
import type { Villa } from "../data/trip";
import { currency, placeholderImage } from "../lib/format";
import { Chip } from "./Chip";

type VillaCardProps = {
  villa: Villa;
  nights: number;
  imageSrc: string;
  pricePerNight: number;
  isPinned: boolean;
  onPin: () => void;
  onGuess: () => void;
};

export function VillaCard({
  villa,
  nights,
  imageSrc,
  pricePerNight,
  isPinned,
  onPin,
  onGuess,
}: VillaCardProps) {
  const bookingSearchUrl =
    villa.bookingUrl ||
    `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(`${villa.area} villa ${villa.bedrooms} bedrooms Algarve`)}`;

  return (
    <article className="villa-card">
      <Flex direction={{ initial: "column", sm: "row" }} gap="0">
        <Box className="villa-media" style={{ flex: "0 0 auto", minWidth: 260, maxWidth: 340 }}>
          <img
            src={imageSrc}
            alt={`${villa.name} in ${villa.area}`}
            loading="lazy"
            decoding="async"
            onError={(event) => {
              const target = event.currentTarget;
              const fallback = placeholderImage(villa.imageFallback || "Villa");
              if (target.src !== fallback) target.src = fallback;
            }}
          />
          <span className="villa-source-badge">
            <Sparkle size={14} aria-hidden />
            {villa.source}
          </span>
        </Box>
        <Box className="villa-copy" p="5" style={{ flex: 1, minWidth: 0 }}>
          <Flex justify="between" align="start" gap="3" wrap="wrap" className="villa-head">
            <Box style={{ minWidth: 0, flex: "1 1 12rem" }}>
              <Text size="1" weight="bold" className="eyebrow" as="p">
                {villa.area}
              </Text>
              <Heading size="4" mb="1">
                {villa.name}
              </Heading>
              <Text size="2" color="gray" className="listing-rating" as="p">
                <Star size={14} aria-hidden /> {villa.rating}
                <span className="listing-rating-sep" aria-hidden>
                  {" "}
                  ·{" "}
                </span>
                <Sparkle size={14} aria-hidden /> {villa.fit}% family fit
              </Text>
            </Box>
            <Box className="villa-price-block">
              <Text size="5" weight="bold" className="villa-price">
                {currency.format(pricePerNight)}
                <Text size="2" color="gray" className="villa-price-unit" as="span">
                  / night
                </Text>
              </Text>
              <Text size="1" color="gray" className="villa-price-total" as="p">
                {currency.format(villa.price)} total · {nights} nights
              </Text>
            </Box>
          </Flex>
          <div className="fit-strip" aria-label={`${villa.fit}% family fit`}>
            <span style={{ width: `${villa.fit}%` }} />
          </div>
          <Text size="2" as="p" className="villa-note">
            {villa.note}
          </Text>
          <div className="villa-chips" aria-label="Amenities and child needs">
            {villa.amenities.map((amenity) => (
              <Chip key={amenity} label={amenity} />
            ))}
            {villa.childAmenities.map((amenity) => (
              <Chip key={amenity} label={amenity} className="chip child-chip" />
            ))}
          </div>
          <Flex gap="3" wrap="wrap" className="villa-stats">
            <Box className="stat">
              <Bed size={18} aria-hidden />
              <Text weight="bold">{villa.bedrooms}</Text>
              <Text size="1" color="gray">
                bedrooms
              </Text>
            </Box>
            <Box className="stat">
              <Star size={18} aria-hidden />
              <Text weight="bold">{villa.rating}</Text>
              <Text size="1" color="gray">
                rating
              </Text>
            </Box>
            <Box className="stat">
              <Sparkle size={18} aria-hidden />
              <Text weight="bold">{villa.fit}%</Text>
              <Text size="1" color="gray">
                family fit
              </Text>
            </Box>
          </Flex>
          <Text size="2" as="p" className="villa-distance">
            <Text weight="bold" as="span">
              Nearby:{" "}
            </Text>
            {villa.distance}.
          </Text>
          <Flex gap="3" wrap="wrap" className="villa-actions" pt="1">
            <Button asChild variant="outline" color="gray">
              <a href={bookingSearchUrl} target="_blank" rel="noopener noreferrer">
                <ArrowSquareOut size={18} aria-hidden />
                Check availability
              </a>
            </Button>
            <Button variant="outline" color="gray" onClick={onGuess}>
              <Question size={18} aria-hidden />
              Guess final villa
            </Button>
            <Button variant="solid" color="red" onClick={onPin}>
              <PushPin size={18} aria-hidden />
              {isPinned ? "Pinned as plan" : "Pin as host choice"}
            </Button>
          </Flex>
        </Box>
      </Flex>
    </article>
  );
}
