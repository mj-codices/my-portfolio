import { useState, useEffect } from "react";

export default function LocationDisplay() {
  const [location, setLocation] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");

        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }

        const data = await res.json();

        setLocation(`${data.city}, ${data.region}`);
      } catch (err) {
        console.error("Location fetch failed:", err);
        setError(true);
      }
    };

    fetchLocation();
  }, []);

  // While loading, we show a subtle "Locating..." or a shimmer
  if (!location && !error) {
    return (
      <span className="animate-pulse text-white/40 uppercase tracking-[0.2em] text-[10px]">
        Locating...
      </span>
    );
  }

  // Fallback if the API fails or is blocked by an ad-blocker
  if (error) return <span className="pt-1 text-white/40">Riverside, CA</span>;

  return (
    <div className="flex items-center opacity-30">
      <span className="uppercase tracking-[0.05em] text-lg">{location}</span>
    </div>
  );
}
