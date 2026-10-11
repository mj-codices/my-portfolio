import { type JSX } from "react";

/**
 * Type blueprint matching structural ingestion limits for atomic tech tags.
 */
type SkillTileProps = {
  /** Relative string location routing back to local asset matrices (e.g. '/logos/react.svg') */
  icon: string;
  /** Plain text string presentational tag identifier (e.g. 'Next.JS') */
  label: string;
  /** Optional customized Tailwind utility dimensions overriding baseline bounds (e.g. 'w-10 h-10') */
  size?: string;
};

/**
 * SkillTile Component
 * * An atomic presentational layout piece displaying single framework competencies.
 * Renders a custom 3:1 aspect viewport canvas backplate overlaid with centered
 * vector brand graphics and absolute-positioned text labels.
 */
export default function SkillTile({
  icon,
  label,
  size,
}: SkillTileProps): JSX.Element {
  return (
    /* Below `desk`: icon box + label sit side by side in normal flow, so each grid
       column is exactly as wide as its content (phones use a smaller 48px box).
       At `desk`: the original fixed 70px box with the label floated out to the right.
    */
    <div className="flex items-center gap-3 sm:gap-4 desk:block relative desk:w-[70px] desk:h-[70px]">
      <div className="relative shrink-0 w-12 h-12 sm:w-[70px] sm:h-[70px] desk:absolute desk:inset-0 desk:w-auto desk:h-auto">
      {/* Structural Backplate Overlay:
        Utilizes a scaled 210x210 coordinate map overlaid onto a tight 70x70px
        DOM node wrapper (3:1 scaling matrix). This maintains razor-sharp vector paths
        for border thresholds and light opacity fill levels regardless of screen density.
      */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 210 210"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="210"
          height="210"
          rx="21" // Equalized at 21 units to render a crisp 7px radius at 70px runtime scale
          fill="#D9D9D9"
          fillOpacity="0.02"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2.5"
        />
      </svg>

      {/* Asset Target Zone:
        Centers the incoming corporate logo vector. Defaults to bounded square parameters 
        unless explicitly passed a custom size layout modifier override variable.
      */}
      {/* Icons are sized for the 70px box; scaled down to fit the 48px phone box. */}
      <div className="absolute inset-0 flex items-center justify-center scale-[.7] sm:scale-100">
        <img
          src={icon}
          alt={`${label} technology identifier`}
          className={size ?? "w-12 h-12 opacity-85"}
        />
      </div>
      </div>

      {/* Content Labels:
        In flow beside the icon box below `desk`. At `desk`, shifted laterally out past
        the physical border footprint to float text cleanly.
      */}
      {/* Labels never wrap: their full width sets the tile's minimum width, which
          is what decides whether two tiles can share a row below `desk`. */}
      <div className="text-xl sm:text-2xl desk:absolute desk:left-22 desk:top-5">
        <p className="font-medium tracking-[-.08rem] whitespace-nowrap text-white">
          {label}
        </p>
      </div>
    </div>
  );
}
