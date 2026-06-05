import type { ComponentType } from "react";
import type { IconProps } from "../lib/icons";
import {
  Baby,
  Buildings,
  CheckCircle,
  ChefHat,
  CloudRain,
  Confetti,
  CookingPot,
  ForkKnife,
  GameController,
  Golf,
  Moon,
  ShieldCheck,
  ShoppingCart,
  SwimmingPool,
  Tree,
  Umbrella,
  User,
  UserCircle,
  UsersThree,
  Waves,
} from "../lib/icons";

const chipIconMap: Record<string, ComponentType<IconProps>> = {
  adults: User,
  "beach nearby": Umbrella,
  "crib available": Baby,
  christmas: Confetti,
  "family kitchen": CookingPot,
  "games room": GameController,
  "golf nearby": Golf,
  "heated pool": SwimmingPool,
  "high chair": Baby,
  "historic town": Buildings,
  kids: UsersThree,
  outdoors: Tree,
  "playground nearby": Baby,
  pool: SwimmingPool,
  "private chef option": ChefHat,
  "quiet area": Moon,
  rainy: CloudRain,
  "sea view": Waves,
  "supermarket nearby": ShoppingCart,
  teens: UserCircle,
  toddler: Baby,
  "toddler-safe pool gate": ShieldCheck,
  "walkable restaurants": ForkKnife,
};

type ChipProps = {
  label: string;
  className?: string;
};

export function Chip({ label, className = "chip" }: ChipProps) {
  const IconComponent = chipIconMap[label] || CheckCircle;
  return (
    <span className={className}>
      <IconComponent size={16} weight="regular" aria-hidden />
      <span className="chip-label">{label}</span>
    </span>
  );
}
