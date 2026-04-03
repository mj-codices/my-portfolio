type SkillTileProps = {
  icon: string; // path to icon image
  label: string; // skill name
  size?: string; // optional icon size (defaults to 3rem x 3rem)
};

export default function SkillTile({ icon, label, size }: SkillTileProps) {
  return (
    <div className="relative w-[70px] h-[70px]">
      {/* Background SVG with rounded corners */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 210 210"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="210"
          height="210"
          rx="21" // rounded corners
          fill="#D9D9D9"
          fillOpacity="0.02"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2.5"
        />
      </svg>

      {/* Icon in the center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={icon}
          alt={label}
          className={`${size ?? "w-12 h-12 opacity-85"}`} // default size if not provided
        />
      </div>

      {/* Skill label */}
      <div className="absolute left-22 top-5 text-2xl">
        <h1 className="tracking-[-.08rem] whitespace-nowrap">{label}</h1>
      </div>
    </div>
  );
}
