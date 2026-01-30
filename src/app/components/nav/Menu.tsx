import Image from "next/image";

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
      <div className="logo-container w-[80px] h-[80px] relative">
      {/* <Image
        src={"/logo.svg"}
        
        width={70}
        height={70}
        alt="my logo"
        className="ml-15 mt-10 z-20 top-0 left-0 absolute w-full h-full transition-opacity duration-500 hover:opacity-0"
        >
      </Image> */}
      </div>
      
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
            <defs>
    <linearGradient
      id="hamburgerGradient"
      gradientUnits="userSpaceOnUse"
      x1="0"
      y1="0"
      x2="100"
      y2="0"
    >
      <stop offset="20%" stopColor="#191919" />
      <stop offset="100%" stopColor="#706f6f" />
    </linearGradient>
  </defs>

          {/* Menu lines */}

          <path className="line--1" d="M0 40h62c13 0 6 28-4 18L35 35" />
          <path className="line--2" d="M0 50h70" />
          <path className="line--3" d="M0 60h62c13 0 6-28-4-18L35 65" />
        </svg>
      </label>
    </div>
  );
}
