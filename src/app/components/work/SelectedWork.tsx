"use client";

import { useRef } from "react";
import ProjectCard from "./ProjectCard";
import "./ProjectCard.css";
import {
  motion,
  useTransform,
  useScroll,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { projects } from "../../data/projects";
import { useIsDesk } from "@/hooks/useIsDesk";
import Image from "next/image";

/**
 * SelectedWork Component
 *
 * Manages the display and orchestration of the portfolio's project showcase.
 * Employs tight scroll-linked spring mechanics to progressively stagger the reveal
 * of project cards, apply an upward "snap launch" velocity when scrolling past,
 * and execute a smooth section-wide fade out upon exit.
 */
export default function SelectedWork() {
  // Target context container to evaluate primary entry animations
  const ref = useRef<HTMLDivElement | null>(null);

  // Targets the absolute final project card element to trigger section-exit transitions
  const lastCardRef = useRef<HTMLDivElement | null>(null);

  /**
   * Primary Scroll Tracker:
   * Captures scroll progression as the work block enters the lower 90%
   * of the screen and passes up into the upper 20%. Driven by map indexes
   * to stagger individual card entrance ranges.
   */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 20%"],
  });

  /**
   * Entrance Animation Bounds:
   * Defines the baseline normalized window within scrollProgress
   * where individual elements fade and slide into position.
   */
  const cardStart = 0.35;
  const cardEnd = 0.6;

  /**
   * Exit Scroll Tracker:
   * Isolates the movement of the final card relative to the viewport edge.
   * This drives the macro structural exit animations for the entire container.
   */
  const { scrollYProgress: lastCardProgress } = useScroll({
    target: lastCardRef,
    offset: ["start end", "start start"],
  });

  /* Stacked layouts (below `desk`) make the card much taller (screenshot +
     wrapped copy), so timing the exit off the card's top would fade it out
     while its description is still being read. There, the exit tracks the
     card's bottom edge instead: 0 → bottom at viewport bottom, 1 → at top.
  */
  const isDesk = useIsDesk();
  const { scrollYProgress: lastCardEndProgress } = useScroll({
    target: lastCardRef,
    offset: ["end end", "end start"],
  });
  const exitProgress = isDesk ? lastCardProgress : lastCardEndProgress;

  // Section-wide opacity interpolation to drop exposure as content recedes upward
  const sectionOpacityRaw = useTransform(
    exitProgress,
    isDesk ? [0.9, 1] : [0.7, 1],
    [1, 0.1]
  );
  const sectionOpacity = useSpring(sectionOpacityRaw, {
    stiffness: 80,
    damping: 25,
  });

  /**
   * Section Exit "Launch" Velocity:
   * Once the user clears 70% of the last project card, a rapid negative y-translation
   * creates an accelerated upward exit effect. High stiffness combined with low mass
   * yields an energetic, snapping transition into the next layout layer.
   */
  const launchRaw = useTransform(
    exitProgress,
    isDesk ? [0.7, 1] : [0.6, 1],
    [0, -155]
  );
  const launchY = useSpring(launchRaw, {
    stiffness: 130, // High tension for immediate kinetic snap
    damping: 45, // Maintained dampening to cleanly arrest residual oscillation
    mass: 0.5, // Reduced weight allowing the spring engine to react instantly
    restDelta: 0.01,
  });

  return (
    <motion.div
      id="work"
      style={{ y: launchY }}
      ref={ref}
      // Desktop side padding: 260px (the original px-65) from 1440px up, shrinking
      // so the card row stays its 1440px width (920px) down to the `desk` boundary.
      className="w-full px-8 sm:px-12 desk:px-[clamp(6.5rem,calc((100vw-920px)/2),16.25rem)] h-auto pb-24 desk:pb-40"
    >
      {/* ---------------------------------------------
                    Section Heading
                    - Features a continuous slow-spinning asset
                    - Styled for high-contrast minimalist focus
                    - Matches the My Story / My Stack heading treatment
         --------------------------------------------- */}
      <motion.div className="relative flex desk:-translate-x-15 mb-4">
        <Image
          className="spin-slow w-9 desk:w-12 h-auto mr-5 desk:mr-9 -translate-y-3 desk:-translate-y-4"
          src="/decorations/aster.svg"
          width={30}
          height={30}
          alt=""
        />
        <h2 className="mb-6 text-3xl uppercase font-bold tracking-wider opacity-80 text-[#ffff]">
          <span className="text-[#a3a2a2] opacity-100">my</span> work
        </h2>
      </motion.div>

      {/* Main Showcase Loop Layer */}
      <motion.div style={{ opacity: sectionOpacity }}>
        <div>
          {projects.map((project, index) => (
            <ProjectReveal
              key={project.id}
              project={project}
              progress={scrollYProgress}
              start={cardStart + index * 0.07}
              end={cardEnd + index * 0.07}
              isLast={index === projects.length - 1}
              cardRef={index === projects.length - 1 ? lastCardRef : undefined}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

type ProjectRevealProps = {
  project: (typeof projects)[number];
  /** Section entrance progress shared by every card */
  progress: MotionValue<number>;
  /** This card's slice of `progress` (staggered by map position) */
  start: number;
  end: number;
  /** The last card has no divider below it and anchors the section exit */
  isLast: boolean;
  cardRef?: React.RefObject<HTMLDivElement | null>;
};

/**
 * ProjectReveal
 * One project card plus its divider, sliding and fading in over its slice of
 * the section's entrance progress. Lives in its own component so each card's
 * hooks run at the top level of a component rather than inside a loop.
 */
function ProjectReveal({
  project,
  progress,
  start,
  end,
  isLast,
  cardRef,
}: ProjectRevealProps) {
  // Card Opacity Springs
  const opacityRaw = useTransform(progress, [start, end], [0, 1]);
  const opacity = useSpring(opacityRaw, {
    stiffness: 90,
    damping: 20,
  });

  // Card Translation Springs
  const yRaw = useTransform(progress, [start, end], [45, 0]);
  const y = useSpring(yRaw, {
    stiffness: 90,
    damping: 30,
  });

  // Divider Translation Springs (subtle offset to independent velocity)
  const borderYRaw = useTransform(progress, [start, end], [35, 0]);

  /*
    Divider motion is intentionally slightly overdamped compared
    to the cards so borders settle more subtly during entrance.
  */
  const borderY = useSpring(borderYRaw, {
    stiffness: 90,
    damping: 40,
  });

  return (
    <motion.div ref={cardRef} style={{ opacity, y }}>
      {/* Visual Project Presenter Item */}
      <ProjectCard project={project} />

      {/* Section Separator Rule (Suppressed on absolute last iteration) */}
      {!isLast && (
        <motion.div
          style={{ y: borderY }}
          className="border-b border-white/20 my-12 desk:-mx-15"
        />
      )}
    </motion.div>
  );
}
