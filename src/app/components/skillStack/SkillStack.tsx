"use client";

import {
  motion,
  useTransform,
  useScroll,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import SkillTile from "./SkillTile";
import { skillStack } from "../../data/skillStack";
import { useIsDesk } from "@/hooks/useIsDesk";
import Image from "next/image";

/**
 * SkillStack Component
 * * Renders a horizontally-stretching skill matrix. It uses complex, sequential
 * scroll-linked triggers to step through nested data groups (Frontend, Backend, etc.).
 * * Instead of triggering simple intersection entry states, it actively calculates
 * the cumulative density of items across array boundaries to maintain a continuous,
 * un-broken stagger animation sequence across the entire section.
 * * Below `desk` the tiles wrap two-per-row only where a pair fits, so row
 * membership depends on label widths — each title/tile there reveals off its
 * own viewport position instead of the section-wide stagger (see ScrollReveal).
 */
export default function SkillStack() {
  // Primary container target for capturing macro scroll progression coordinates
  const ref = useRef<HTMLDivElement | null>(null);
  const isDesk = useIsDesk();

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
  // (offsets are tuned for the desktop 3-column grid, so they're `desk:`-only)
  const sections = [
    { title: "front-end", data: skillStack.frontend, offset: "desk:pl-0" },
    { title: "back-end", data: skillStack.backend, offset: "desk:pl-7" },
    { title: "database", data: skillStack.database, offset: "desk:pl-7" },
    { title: "tools", data: skillStack.tools, offset: "desk:pl-28" },
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
      {/* Desktop horizontal spacing (side padding, title indent, title→grid gap)
          scales linearly from its original values at 1440px+ (200 / 84 / 120px)
          down to 48 / 24 / 80px at the `desk` boundary (1133px), so the fixed
          3-column grid — whose gaps and per-tile nudges are tuned together —
          always fits on screen. 307px = 1440 − 1133. From 1440px (`wide`) the
          padding keeps growing by half the extra width, centering the layout. */}
      <section
        ref={ref}
        id="stack"
        className="w-full px-8 sm:px-12 desk:w-[150vw] desk:px-[clamp(3rem,calc(3rem+(100vw-1133px)*152/307),12.5rem)] wide:px-[calc(12.5rem+(100vw-1440px)/2)]"
      >
        {/* Section Heading Banner Block (matches the My Story heading treatment) */}
        <motion.div className="relative flex">
          <Image
            className="spin-slow w-9 desk:w-12 h-auto mr-5 desk:mr-9 -translate-y-3 desk:-translate-y-5"
            src="/decorations/aster.svg"
            width={30}
            height={30}
            alt=""
          />
          <h2 className="mb-10 text-3xl uppercase font-bold tracking-wider opacity-80 text-[#ffff]">
            <span className="text-[#a3a2a2] opacity-100">my</span> stack
          </h2>
        </motion.div>

        {/* Global Structural Sections Stack */}
        <div className="flex flex-col gap-16 sm:gap-20 desk:gap-25">
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

            const tileDelay = 0.02; // Static buffer offset injected immediately post-title reveal

            return (
              // Phones/smaller tablets: title stacked above the tiles.
              // `lg` (1024px+, e.g. iPad Pro 12.9"): title beside the tiles in a
              // fixed-width column (fits the widest title, "FRONT-END" at 265px)
              // so every section's tiles start at the same x — echoing desktop.
              // At `desk`: title beside a 3-column grid (original layout).
              <div
                key={section.title}
                className="flex flex-col lg:flex-row"
              >
                {/* Categorical Section Title Presenter
                    Quintic ease-out (power 5) for a premium, decelerating entrance. */}
                <ScrollReveal
                  isDesk={isDesk}
                  sectionProgress={scrollYProgress}
                  deskRange={[titleStart, titleEnd]}
                  easePower={5}
                  className="lg:w-[19.5rem] lg:shrink-0 desk:w-auto desk:shrink"
                >
                  {/* lg:mt centers the 48px title on the 70px first tile row */}
                  <h3 className="mb-6 sm:mb-8 lg:mb-0 lg:mt-[0.6875rem] desk:mt-0 desk:ml-[clamp(1.5rem,calc(1.5rem+(100vw-1133px)*60/307),5.25rem)] uppercase text-4xl sm:text-5xl font-bold tracking-[-.15rem]">
                    {section.title}
                  </h3>
                </ScrollReveal>

                {/* Grid Wrapper Grid Layout Block */}
                <div className="desk:pl-[clamp(5rem,calc(5rem+(100vw-1133px)*40/307),7.5rem)] desk:-translate-y-1">
                  {/* Phones: a wrapping row. Each tile is half the row (minus half
                      the gap) but never narrower than its own content, so two tiles
                      share a row only when both fit — otherwise the next one wraps
                      and a lone tile fills its row. Three can never fit.
                      Tablets (sm→desk): a tight 2-column grid — a fixed 15rem first
                      column (fits the widest tile, "Framer Motion") so the second
                      column lines up across every section, then auto width.
                      At `desk`: the original fixed 3-column grid. */}
                  <div
                    className={`${section.offset ?? ""} flex flex-wrap gap-x-4 gap-y-6 sm:grid sm:grid-cols-[15rem_auto] sm:gap-x-8 sm:gap-y-8 desk:grid-cols-3 desk:gap-x-38 desk:gap-y-10`}
                  >
                    {section.data.map((skill, index) => {
                      // Targets the unique scroll progress window allocated for this exact tile
                      const start =
                        sectionStart +
                        titleDelay +
                        tileDelay +
                        index * staggerStep;
                      const end = start + tileDuration;

                      return (
                        // Cubic ease-out (power 3): a slightly crisper snap than the titles.
                        <ScrollReveal
                          key={skill.id}
                          isDesk={isDesk}
                          sectionProgress={scrollYProgress}
                          deskRange={[start, end]}
                          easePower={3}
                          className={`grow shrink-0 basis-[calc(50%-0.5rem)] ${skill.offset ?? ""}`}
                        >
                          {/* Atomic Presentational Component */}
                          <SkillTile {...skill} />
                        </ScrollReveal>
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

type ScrollRevealProps = {
  isDesk: boolean;
  /** Section-wide scroll progress driving the desktop stagger */
  sectionProgress: MotionValue<number>;
  /** This element's slice of `sectionProgress` on desktop */
  deskRange: [number, number];
  /** Ease-out exponent: f(v) = 1 - (1 - v)^power */
  easePower: number;
  className?: string;
  children: React.ReactNode;
};

/**
 * ScrollReveal
 * Fades and lifts (30px → 0) a title or tile into place.
 * - Desktop: its own slice of the section-wide progress (the original stagger).
 * - Below `desk`: its own viewport position — from its top crossing 95% of the
 *   viewport to 72% — so reveals track rows regardless of how tiles wrap.
 */
function ScrollReveal({
  isDesk,
  sectionProgress,
  deskRange,
  easePower,
  className,
  children,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: ownProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "start 72%"],
  });

  const raw = useTransform(
    isDesk ? sectionProgress : ownProgress,
    isDesk ? deskRange : [0, 1],
    [0, 1]
  );
  const eased = useTransform(raw, (v) => 1 - Math.pow(1 - v, easePower));
  const y = useTransform(eased, [0, 1], [30, 0]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ opacity: eased, y }}
    >
      {children}
    </motion.div>
  );
}
