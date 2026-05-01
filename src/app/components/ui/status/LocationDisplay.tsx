import { useState, useEffect } from "react";

export default function LocationDisplay() {

  const [location, setLocation] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Fetching the user's location based on their IP address
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        // data contains city, region (state/province), and country_name
        if (data.city && data.region_code) {
          setLocation(`${data.city}, ${data.region_code}`);
        }
      })
      .catch((err) => {
        console.error("Location fetch failed:", err);
        setError(true);
      });
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
  if (error) return <span className="text-white/40">Remote</span>;

  return (
    <div className="flex items-center opacity-30">
      <span className="uppercase tracking-[0.05em] text-lg">
        {location}
      </span>
    </div>
  );
}
