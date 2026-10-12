"use client";

import { useEffect } from "react";

/**
 * Pauses the CSS animations inside any `[data-pause-offscreen]` element while
 * it is scrolled out of view, by toggling a `data-offscreen` attribute (see the
 * matching rule in globals.css). A small margin resumes loops just before the
 * section scrolls back in, so nothing visibly restarts.
 */
export function usePauseOffscreen() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(
      "[data-pause-offscreen]"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.toggleAttribute("data-offscreen", !entry.isIntersecting);
        }
      },
      { rootMargin: "200px 0px" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
