"use client";

import { useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import ScrollIndicator from "./components/ui/nav/ScrollIndicator";
import Hero from "./components/hero/Hero";
import Mission from "./components/mission/Mission";
import SkillStack from "./components/skillStack/SkillStack";
import FadeInDirectionalWrapper from "./components/wrappers/FadeInDirectionalWrapper";
import { FadeSection } from "./components/wrappers/FadeSection";

// Home page orchestrates scroll-driven storytelling between sections.
// Controls:
// - global scroll progress (passed into Hero)
// - visibility of the scroll indicator
// - sequencing between Hero → Mission → SkillStack
//
// Safe to modify:
// - section order and spacing
// - scroll-trigger thresholds
// Be careful:
// - scrollYProgress is shared across multiple animations
export default function Home() {
  const missionRef = useRef<HTMLDivElement>(null);
  const [showIndicator, setShowIndicator] = useState(true);
  // Global page scroll progress (0 → 1 across entire page)
  // Used to drive Hero animations
  const { scrollYProgress } = useScroll();

  // 2️⃣ Observer setup
  useEffect(() => {
    if (!missionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // IntersectionObserver controls visibility of the scroll indicator.
        // When Mission enters the viewport, we hide the indicator to avoid UI clutter.
        // This creates a clean transition from Hero → content.
        setShowIndicator(!entry.isIntersecting);
      },
      {
        root: null, // viewport
        threshold: 0.2, // Trigger when ~20% of Mission is visible
      },
    );

    observer.observe(missionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative">
      {/* Hero section (scroll-driven via global scrollYProgress) */}
      <div className="hero relative">
        {/* 
  FadeSection provides localized scroll progress for entrance animations.
  It wraps Hero to control when it fades into view independently of global scroll.
*/}
        <FadeSection>
          {(scrollYProgress) => <Hero scrollYProgress={scrollYProgress} />}
        </FadeSection>

        {/* 
  Scroll indicator (only visible during Hero).
  Fades out once Mission section enters viewport.
*/}
        <div
          className={`absolute bottom-30 left-1/2 transform -translate-x-1/2 transition-opacity duration-800 ${
            showIndicator ? "opacity-30" : "opacity-0"
          }`}
        >
          <FadeInDirectionalWrapper delay={2.1} duration={0.7} direction="down">
            <ScrollIndicator></ScrollIndicator>
          </FadeInDirectionalWrapper>
        </div>
      </div>
      {/* Mission section (used as trigger point for scroll indicator visibility) */}
      <div ref={missionRef}>
        {/* Spacer to control vertical rhythm between Hero and Mission */}
        <div className="pt-50"></div>
        <Mission />
      </div>
      {/* SkillStack section (independent scroll animation system) */}
      <div>
        <SkillStack />
      </div>
    </div>
  );
}
