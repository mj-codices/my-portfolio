import { CONTACT_DATA } from "@/app/data/contact";

export default function LocationDisplay() {
  return (
    <div className="flex items-center opacity-35">
      {/* Stepped down below desktop so "CITY, REGION" stays on one line beside
          the globe and clock in the stacked phone/tablet footer. */}
      <span className="uppercase tracking-[0.05em] whitespace-nowrap text-sm sm:text-base desk:text-lg">
        {CONTACT_DATA.location.label}
      </span>
    </div>
  );
}
