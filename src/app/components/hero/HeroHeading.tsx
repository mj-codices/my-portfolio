"use client";

import "./HeroHeading.css";
import { useEffect, useState } from "react";

// ---------------------------
// HeroHeading
// ---------------------------
// Purpose:
// Renders animated hero heading with staggered letter reveal.
//
// Behavior:
// - Splits each line into individual characters
// - Applies incremental delay for a "wave" animation
// - Uses requestAnimationFrame to trigger animation after mount
// ---------------------------
export default function HeroHeading() {
  const [animate, setAnimate] = useState(false);

  // Trigger animation on next frame after mount
  // (ensures CSS transitions apply correctly)
  useEffect(() => {
    requestAnimationFrame(() => setAnimate(true));
  }, []);

  const line1 = "Full-stack";
  const line2 = "Developer";

  // ---------------------------
  // Helper: renders a line of text
  // - Splits text into characters
  // - Applies staggered delay per character
  // - Optional line-level delay + styling
  // ---------------------------
  const renderLine = (text: string, lineDelay = 0, lineClass = "") => (
    <span className={`block ${lineClass}`}>
      <span className="inline-block">
        <span className={`text-anim ${animate ? "animate" : ""}`}>
          {text.split("").map((char, i) => (
            <span
              key={i}
              className="inline-block"
              style={{
                // stagger each letter slightly after the previous
                transitionDelay: `${lineDelay + i * 75}ms`,
              }}
            >
              {/* Preserve spaces in split text */}
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </span>
      </span>
    </span>
  );

  return (
    <h1 className="text-7xl shrink-heading font-bold mt-15 mb-6 uppercase leading-[3.9rem] tracking-[-.2rem]">
      {/* First line (no delay, gradient styling) */}
      {renderLine(line1, 0, "gradient-text")}

      {/* Second line (delayed to start after first finishes) */}
      {renderLine(line2, 1300, "text-white max-[1060px]:pl-0 pl-4")}
    </h1>
  );
}
