"use client";
import { useRef, useState, useEffect } from "react";
import ScrollIndicator from "./components/ui/nav/ScrollIndicator";
import Hero from "./components/hero/Hero";
import Mission from "./components/about/Mission";
import SkillStack from "./components/stack/SkillStack";
import FadeInDirectionalWrapper from "./components/wrappers/FadeInDirectionalWrapper";
import { FadeSection } from "./components/wrappers/FadeSection";

export default function Home() {
  const missionRef = useRef<HTMLDivElement>(null);
  const [showIndicator, setShowIndicator] = useState(true);

  // 2️⃣ Observer setup
  useEffect(() => {
    if (!missionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // entry.isIntersecting === true when Mission starts entering viewport
        setShowIndicator(!entry.isIntersecting);
      },
      {
        root: null, // viewport
        threshold: 0.2, // 10% of Mission visible
      },
    );

    observer.observe(missionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative">
      <div className="hero relative">
        <FadeSection>
          {(scrollYProgress) => <Hero scrollYProgress={scrollYProgress} />}
        </FadeSection>

        {/* Mouse indicator */}
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

      <div ref={missionRef}>
        <div className="pt-50"></div>

        <Mission />
      </div>
      <div>
        <SkillStack />
      </div>
    </div>
  );
}
