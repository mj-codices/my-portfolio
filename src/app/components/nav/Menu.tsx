interface MenuProps {
  open: boolean;
  onToggle: () => void;
}

export default function Menu({ open, onToggle }: MenuProps) {
  return (
    <div
      className=" fixed
        z-60"
    >
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
        <input 
          type="checkbox"
          checked={open}
          onChange={onToggle}
        />

        <svg
          className="cursor-pointer"
          viewBox="0 0 100 100"
          width="105"
          height="105"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Menu lines */}

          <path className="line--1" d="M0 40h62c13 0 6 28-4 18L35 35" />
          <path className="line--2" d="M0 50h70" />
          <path className="line--3" d="M0 60h62c13 0 6-28-4-18L35 65" />
        </svg>
      </label>
    </div>
  );
}
