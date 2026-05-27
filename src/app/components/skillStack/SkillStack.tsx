"use client";

import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import SkillTile from "./SkillTile";
import { skillStack } from "../../data/skillStack";

/**
 * SkillStack Component
 * * Renders a horizontally-stretching skill matrix. It uses complex, sequential
 * scroll-linked triggers to step through nested data groups (Frontend, Backend, etc.).
 * * Instead of triggering simple intersection entry states, it actively calculates
 * the cumulative density of items across array boundaries to maintain a continuous,
 * un-broken stagger animation sequence across the entire section.
 */
export default function SkillStack() {
  // Primary container target for capturing macro scroll progression coordinates
  const ref = useRef<HTMLDivElement | null>(null);

  // Global fine-tuning modifier to delay the absolute start of the sequence
  const globalDelay = 0.02;

  /**
   * Section Scroll Tracking:
   * Maps scroll context from the moment the element enters the bottom 80%
   * of the viewport until it clears out past the top 20%.
   */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  /**
   * Scroll-Timeline Footprint Consts:
   * Expressed as tiny decimal slices of the global normalized `scrollYProgress` [0, 1].
   */
  const tileStartBase = 0.001; // Tiny head-start offset so pixels aren't choked at bounds
  const tileDuration = 0.08; // Length of scroll-space dedicated to an individual fade/lift
  const staggerStep = 0.045; // The scroll-interval offset between consecutive card reveals

  // Structured iteration manifest containing data layers and alignment offsets
  const sections = [
    { title: "front-end", data: skillStack.frontend, offset: "pl-0" },
    { title: "back-end", data: skillStack.backend, offset: "pl-7" },
    { title: "database", data: skillStack.database, offset: "pl-7" },
    { title: "tools", data: skillStack.tools, offset: "pl-28" },
  ];

  /**
   * Section Exit - Outbound Opacity:
   * Holds standard value distribution until 75% scroll depth is hit,
   * then drops dramatically to create a clean, out-of-focus background fade.
   */
  const fadeOut = useTransform(scrollYProgress, [0.75, 1], [1, 0.1]);
  const fadeOutSmooth = useSpring(fadeOut, {
    stiffness: 130,
    damping: 30,
  });

  /**
   * Section Exit - Weightless Launch:
   * Drives an upward structural shift over the terminal 25% of the viewport scroll.
   * Low stiffness and ultra-light mass simulate a drifting, weightless exit velocity
   * to eliminate sudden, jarring directional snapping when scrolling backward.
   */
  const launchRaw = useTransform(scrollYProgress, [0.75, 1], [0, -150]);
  const launchY = useSpring(launchRaw, {
    stiffness: 50,
    damping: 10,
    mass: 0.3,
    restDelta: 0.01,
  });

  return (
    <motion.div
      style={{
        opacity: fadeOutSmooth,
        y: launchY,
      }}
    >
      <section ref={ref} id="stack" className="w-[150vw] px-50">
        {/* Section Heading Banner Block */}
        <motion.div className="relative flex">
          <img
            className="spin-slow w-12 h-auto mr-9 -translate-y-5"
            src="/decorations/aster.svg"
            alt="decorative asterisk"
          />
          <h2 className="mb-10 text-3xl uppercase font-bold tracking-wider opacity-80 text-[#ffff]">
            <span className="text-[#a3a2a2] opacity-100">my</span> stack
          </h2>
        </motion.div>

        {/* Global Structural Sections Stack */}
        <div className="flex flex-col gap-25">
          {sections.map((section, sectionIndex) => {
            // Buffer spacing coefficient to create visual breathing room between sections
            const sectionGap = 0.02;

            /**
             * Cumulative Array Math:
             * Counts the absolute quantity of items present in all preceding arrays.
             * This ensures that Section 2's stagger timing starts EXACTLY where Section 1's
             * final item finished animating, rather than resetting back to zero.
             */
            const tilesBefore = sections
              .slice(0, sectionIndex)
              .reduce((acc, s) => acc + s.data.length, 0);

            // Establishes the exact entry keyframe anchor point for this specific section block
            const sectionStart =
              tileStartBase +
              globalDelay +
              tilesBefore * staggerStep +
              sectionIndex * sectionGap;

            const titleDelay = 0.002 + sectionIndex * 0.005;
            const titleStart = sectionStart + titleDelay;
            const titleEnd = titleStart + 0.1;

            const titleRaw = useTransform(
              scrollYProgress,
              [titleStart, titleEnd],
              [0, 1]
            );

            /**
             * Quintic Ease-Out Transform Function:
             * Mathematically interpolates raw linear numbers into an exponential curve:
             * f(v) = 1 - (1 - v)^5. This produces a premium, decelerating entrance speed
             * directly calculated from the scroll velocity.
             */
            const titleEased = useTransform(
              titleRaw,
              (v) => 1 - Math.pow(1 - v, 5)
            );

            const titleY = useTransform(titleEased, [0, 1], [30, 0]);

            return (
              <div key={section.title} className="flex">
                {/* Categorical Section Title Presenter */}
                <motion.div style={{ opacity: titleEased, y: titleY }}>
                  <h3 className="ml-21 uppercase text-5xl font-bold tracking-[-.15rem]">
                    {section.title}
                  </h3>
                </motion.div>

                {/* Grid Wrapper Grid Layout Block */}
                <div className="pl-30 -translate-y-1">
                  <div
                    className={`${section.offset ?? ""} grid grid-cols-3 gap-x-38 gap-y-10`}
                  >
                    {section.data.map((skill, index) => {
                      const tileDelay = 0.02; // Static buffer offset injected immediately post-title reveal

                      // Targets the unique scroll progress window allocated for this exact tile
                      const start =
                        sectionStart +
                        titleDelay +
                        tileDelay +
                        index * staggerStep;
                      const end = start + tileDuration;

                      const raw = useTransform(
                        scrollYProgress,
                        [start, end],
                        [0, 1]
                      );

                      /**
                       * Cubic Ease-Out Curve:
                       * f(v) = 1 - (1 - v)^3. Softens the arrival deceleration curve
                       * of individual child nodes to make their snap feel slightly crisper
                       * than the macro section header text.
                       */
                      const eased = useTransform(
                        raw,
                        (v) => 1 - Math.pow(1 - v, 3)
                      );

                      const tileY = useTransform(eased, [0, 1], [30, 0]);

                      return (
                        <motion.div
                          key={skill.id}
                          className={skill.offset ?? ""}
                          style={{
                            opacity: eased,
                            y: tileY,
                          }}
                        >
                          {/* Atomic Presentational Component */}
                          <SkillTile {...skill} />
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </motion.div>
  );
}
