import { useState, useEffect } from "react";
import { CONTACT_DATA } from "@/app/data/contact";

// Formats the clock in my local time zone so every visitor sees my time
const clockFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: CONTACT_DATA.location.timeZone,
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

export default function LiveTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Read hours/minutes in my time zone (not the visitor's), as a 12-hour clock
  const parts = clockFormat.formatToParts(time);
  const hours = (parts.find((p) => p.type === "hour")?.value ?? "").padStart(2);
  const minutes = parts.find((p) => p.type === "minute")?.value ?? "00";

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
