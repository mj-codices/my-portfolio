"use client";

import { useEffect, useState } from "react";

// Mirrors the `desk` breakpoint in globals.css (--breakpoint-desk: 70.8125rem / 1133px).
const DESK_QUERY = "(min-width: 70.8125rem)";

/**
 * useIsDesk
 * True at the `desk` breakpoint and above. Use it when scroll-linked motion
 * needs different timings for the stacked (mobile/tablet) layout than for the
 * desktop layout — layout itself should stay in Tailwind `desk:` classes.
 * Returns false during SSR and the first client render.
 */
export function useIsDesk() {
  const [isDesk, setIsDesk] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(DESK_QUERY);
    const update = () => setIsDesk(mq.matches);

    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isDesk;
}
