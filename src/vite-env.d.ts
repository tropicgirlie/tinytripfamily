/// <reference types="vite/client" />

declare module "@phosphor-icons/react/dist/csr/*" {
  import type { ComponentType, SVGProps } from "react";

  type PhosphorIconProps = SVGProps<SVGSVGElement> & {
    alt?: string;
    color?: string;
    mirrored?: boolean;
    size?: number | string;
    weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  };

  type PhosphorIcon = ComponentType<PhosphorIconProps>;

  export const Airplane: PhosphorIcon;
  export const AirplaneTakeoff: PhosphorIcon;
  export const ArrowRight: PhosphorIcon;
  export const ArrowSquareOut: PhosphorIcon;
  export const Baby: PhosphorIcon;
  export const Bed: PhosphorIcon;
  export const Bell: PhosphorIcon;
  export const BellRinging: PhosphorIcon;
  export const Buildings: PhosphorIcon;
  export const CalendarBlank: PhosphorIcon;
  export const CaretRight: PhosphorIcon;
  export const ChatCircle: PhosphorIcon;
  export const CheckCircle: PhosphorIcon;
  export const ChefHat: PhosphorIcon;
  export const Circle: PhosphorIcon;
  export const CloudRain: PhosphorIcon;
  export const CloudSun: PhosphorIcon;
  export const Confetti: PhosphorIcon;
  export const CookingPot: PhosphorIcon;
  export const DownloadSimple: PhosphorIcon;
  export const FileText: PhosphorIcon;
  export const ForkKnife: PhosphorIcon;
  export const GameController: PhosphorIcon;
  export const Gear: PhosphorIcon;
  export const Gift: PhosphorIcon;
  export const Golf: PhosphorIcon;
  export const Heart: PhosphorIcon;
  export const HouseLine: PhosphorIcon;
  export const MapPin: PhosphorIcon;
  export const MapTrifold: PhosphorIcon;
  export const Moon: PhosphorIcon;
  export const Package: PhosphorIcon;
  export const PaperPlaneTilt: PhosphorIcon;
  export const PencilSimple: PhosphorIcon;
  export const PushPin: PhosphorIcon;
  export const Question: PhosphorIcon;
  export const ShieldCheck: PhosphorIcon;
  export const ShoppingBag: PhosphorIcon;
  export const ShoppingCart: PhosphorIcon;
  export const Shuffle: PhosphorIcon;
  export const SlidersHorizontal: PhosphorIcon;
  export const Sparkle: PhosphorIcon;
  export const SquaresFour: PhosphorIcon;
  export const Star: PhosphorIcon;
  export const Suitcase: PhosphorIcon;
  export const Sun: PhosphorIcon;
  export const SwimmingPool: PhosphorIcon;
  export const Trash: PhosphorIcon;
  export const Tree: PhosphorIcon;
  export const Umbrella: PhosphorIcon;
  export const User: PhosphorIcon;
  export const UserCircle: PhosphorIcon;
  export const UsersThree: PhosphorIcon;
  export const Wallet: PhosphorIcon;
  export const Waves: PhosphorIcon;
  export const WhatsappLogo: PhosphorIcon;
  export const WifiHigh: PhosphorIcon;
  export const Wind: PhosphorIcon;
}
