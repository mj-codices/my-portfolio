"use client";
import { FadeSection } from "./components/wrappers/FadeSection";
import Hero from "./components/hero/Hero";
import Mission from "./components/mission/Mission";

export default function Home() {
  return (
    <>
      <FadeSection>
        <Hero></Hero>
      </FadeSection>

      <FadeSection>
        <Mission></Mission>
      </FadeSection>
    </>
  );
}
