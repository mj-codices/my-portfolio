interface MenuProps {
  open: boolean; // Whether the menu is currently open
  onToggle: () => void; // Callback to toggle the menu state
}

export default function Menu({ open, onToggle }: MenuProps) {
  return (
    <div
      className=" fixed
        z-70"
    >
      {/* Logo container, currently empty but reserved for branding */}
      <div className="logo-container w-[80px] h-[80px] relative"></div>

      {/* Hamburger menu input + label */}
      <label
        className="
        menu menu--1 cross
       
        pointer-events-auto
        right-0
        sm:right-2
        -translate-y-3
    
      "
        aria-label="Open menu"
      >
        {/* Hidden checkbox controlling menu open state */}
        <input type="checkbox" checked={open} onChange={onToggle} />
        {/* SVG Hamburger icon with gradient styling */}
        <svg
          className="cursor-pointer opacity-70"
          viewBox="0 0 100 100"
          width="105"
          height="105"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="hamburgerGradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="0"
              x2="100"
              y2="0"
            >
              {/* <stop offset="20%" stopColor="#191919" /> */}
              <stop offset="100%" stopColor="#545454" />
            </linearGradient>
          </defs>

          {/* Menu lines for hamburger animation */}
          <path className="line--1" d="M0 40h62c13 0 6 28-4 18L35 35" />
          <path className="line--2" d="M0 50h70" />
          <path className="line--3" d="M0 60h62c13 0 6-28-4-18L35 65" />
        </svg>
      </label>
    </div>
  );
}
