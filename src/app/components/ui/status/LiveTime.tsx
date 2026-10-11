import { useState, useEffect } from "react";

export default function LiveTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

// Get the 24-hour value, convert 0 to 12, and ensure it wraps at 12
  const rawHours = time.getHours();
  const hours = (rawHours % 12 || 12).toString().padStart(2);
  
  const minutes = time.getMinutes().toString().padStart(2, "0");

  return (
    <div className="flex opacity-60 items-center space-x-2 font-mono text-[17px] text-white">
      {/* Hours */}
      <span className="opacity-60 mr-[.1rem] pt-[1px]">{hours}</span>

      {/* Custom Circular Colon */}
      <div className="flex flex-col space-y-1 animate-pulse opacity-80 pt-[3px]">
        <div className="w-[.15rem] h-[.15rem] bg-white rounded-full"></div>
        <div className="w-[.15rem] h-[.15rem] bg-white rounded-full"></div>
      </div>

      {/* Minutes */}
      <span className="opacity-60 ml-[-.4rem] pt-[1px]">{minutes}</span>
    </div>
  );
}
