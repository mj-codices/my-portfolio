"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

// Scroll distance (px) before the scrim fades in — avoids flicker on tiny nudges.
const SCROLL_THRESHOLD = 16;

/**
 * NavScrim
 * Below `desk` the floating menu icon has no gutter to sit in, so page content
 * can scroll underneath it. Once the page is scrolled, this fades in a short
 * gradient behind the icon that dissolves content as it passes under.
 *
 * Color matches the edge of `.animated-bg` (#010207), not the theme tokens —
 * a lighter tone would read as a visible bar against the near-black top edge.
 * Sits above page content (z-30) but below the drawer backdrop (z-40).
 */
export default function NavScrim() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  // Sync on mount in case the page loads already scrolled (e.g. refresh mid-page)
  useEffect(() => {
    setScrolled(scrollY.get() > SCROLL_THRESHOLD);
  }, [scrollY]);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > SCROLL_THRESHOLD);
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 h-28 z-30 pointer-events-none desk:hidden bg-linear-to-b from-[#010207]/90 from-30% via-[#010207]/60 via-60% to-transparent"
      initial={false}
      animate={{ opacity: scrolled ? 1 : 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    />
  );
}
