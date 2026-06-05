import { Box, Button, Heading, Text } from "@radix-ui/themes";
import { Shuffle } from "../lib/icons";
import { Chip } from "./Chip";
import { currency } from "../lib/format";
import type { Villa } from "../data/trip";

export type PinnedSectionProps = {
  hasPinnedVilla: boolean;
  pinnedVilla: Villa | null;
  pinnedVillaName: string;
  selectedGuessName: string;
  setSelectedGuessName: (name: string) => void;
  matchedVillas: Villa[];
  resetMystery: () => void;
  spinning: boolean;
  setSpinning: (v: boolean) => void;
  villaImageSrc: (villa: Villa) => string;
  className?: string;
};

export function PinnedSection({
  hasPinnedVilla,
  pinnedVilla,
  pinnedVillaName,
  selectedGuessName,
  setSelectedGuessName,
  matchedVillas,
  resetMystery,
  spinning,
  setSpinning,
  villaImageSrc,
  className = "pinned-plan",
}: PinnedSectionProps) {
  if (!pinnedVilla) return null;

  return (
    <section className={className} id="pinned" aria-live="polite">
      <div className="pinned-topline">
        <Box>
          <Text size="1" weight="bold" className="eyebrow" as="p">
            Admin pinned choice
          </Text>
          <Heading size="6">{hasPinnedVilla ? pinnedVillaName : "Mystery villa reveal"}</Heading>
        </Box>
        <span className="admin-badge">Shared family view</span>
      </div>
      {!hasPinnedVilla ? (
        <div className="mystery-board">
          <div className="mystery-copy-panel">
            <span className="status-pill">Not revealed yet</span>
            <Text size="3" className="mystery-copy" as="p">
              Luana is still holding the final choice. Pick which villa you think will win, then spin
              the reveal.
            </Text>
            <div className="guess-grid">
              {matchedVillas.slice(0, 3).map((option, index) => (
                <button
                  key={option.name}
                  type="button"
                  className={`guess-card ${selectedGuessName === option.name ? "selected" : ""}`}
                  onClick={() => setSelectedGuessName(option.name)}
                >
                  <span>Option {index + 1}</span>
                  <img src={villaImageSrc(option)} alt="" />
                  <strong>{option.area}</strong>
                  <small>
                    {currency.format(option.price)} estimate — {option.bedrooms} bedrooms
                  </small>
                </button>
              ))}
            </div>
          </div>
          <div className="reveal-wheel">
            <div className={`wheel ${spinning ? "spinning" : ""}`}>?</div>
            <Button
              color="red"
              radius="full"
              onClick={() => {
                setSpinning(true);
                setTimeout(() => setSpinning(false), 900);
              }}
            >
              <Shuffle size={18} aria-hidden />
              Spin the reveal
            </Button>
            <Text size="2" color="gray" id="revealResult" as="p">
              {selectedGuessName
                ? "Guess locked. Luana has not revealed the answer yet."
                : "Pick villa 1, 2, or 3 first, then spin again."}
            </Text>
          </div>
        </div>
      ) : (
        <Box>
          <div className="pinned-layout">
            <img src={villaImageSrc(pinnedVilla)} alt={pinnedVilla.area} />
            <div className="pinned-summary">
              <span className="status-pill">Final villa pinned</span>
              <div className="pinned-meta">
                <span>{pinnedVilla.area}</span>
                <span>{currency.format(pinnedVilla.price)} total estimate</span>
                <span>{pinnedVilla.bedrooms} bedrooms</span>
                <span>{pinnedVilla.rating} rating</span>
              </div>
              <Text size="2" as="p">
                {pinnedVilla.note}
              </Text>
              <div className="chips">
                {pinnedVilla.amenities.map((a) => (
                  <Chip key={a} label={a} />
                ))}
              </div>
            </div>
          </div>
          <Button variant="outline" mt="4" onClick={resetMystery}>
            Reset to mystery mode
          </Button>
        </Box>
      )}
    </section>
  );
}
