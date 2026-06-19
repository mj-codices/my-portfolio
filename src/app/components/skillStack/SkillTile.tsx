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
    <div className="relative w-[70px] h-[70px]">
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
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={icon}
          alt={`${label} technology identifier`}
          className={size ?? "w-12 h-12 opacity-85"}
        />
      </div>

      {/* Absolute Content Labels:
        Shifted laterally out past the physical border footprint to float text cleanly.
        Uses structural markdown rules to preserve consistent typographical hierarchy across grids.
      */}
      <div className="absolute left-22 top-5 text-2xl">
        <p className="font-medium tracking-[-.08rem] whitespace-nowrap text-white">
          {label}
        </p>
      </div>
    </div>
  );
}
