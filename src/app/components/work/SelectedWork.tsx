"use client";

import { useRef } from "react";
import ProjectCard from "./ProjectCard";
import "./ProjectCard.css";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { projects } from "../../data/projects";

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

  // Section-wide opacity interpolation to drop exposure as content recedes upward
  const sectionOpacityRaw = useTransform(lastCardProgress, [0.9, 1], [1, 0.1]);
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
  const launchRaw = useTransform(lastCardProgress, [0.7, 1], [0, -155]);
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
      className="w-full px-65 h-auto pb-40"
    >
      {/* ---------------------------------------------
                    Section Heading
                    - Features a continuous slow-spinning asset
                    - Styled for high-contrast minimalist focus
         --------------------------------------------- */}
      <motion.div className="relative flex -translate-x-15 mb-4">
        <img
          className="spin-slow w-12 h-auto mr-9 -translate-y-4"
          src="/decorations/aster.svg"
          alt="decorative asterisk"
        />
        <h2 className="mb-6 text-3xl uppercase font-bold tracking-wider opacity-80 text-[#ffff]">
          <span className="text-[#a3a2a2] opacity-100">my</span> work
        </h2>
      </motion.div>

      {/* Main Showcase Loop Layer */}
      <motion.div style={{ opacity: sectionOpacity }}>
        <div>
          {projects.map((project, index) => {
            // Evaluates step values sequentially based on map position
            const stagger = index * 0.07;
            const start = cardStart + stagger;
            const end = cardEnd + stagger;

            // Card Opacity Springs
            const opacityRaw = useTransform(
              scrollYProgress,
              [start, end],
              [0, 1]
            );
            const opacity = useSpring(opacityRaw, {
              stiffness: 90,
              damping: 20,
            });

            // Card Translation Springs
            const yRaw = useTransform(scrollYProgress, [start, end], [45, 0]);
            const y = useSpring(yRaw, {
              stiffness: 90,
              damping: 30,
            });

            // Divider Translation Springs (subtle offset to independent velocity)
            const borderYRaw = useTransform(
              scrollYProgress,
              [start, end],
              [35, 0]
            );

            /*
              Divider motion is intentionally slightly overdamped compared
              to the cards so borders settle more subtly during entrance.
            */
            const borderY = useSpring(borderYRaw, {
              stiffness: 90,
              damping: 40,
            });

            return (
              <motion.div
                ref={index === projects.length - 1 ? lastCardRef : null}
                key={project.id}
                style={{ opacity, y }}
              >
                {/* Visual Project Presenter Item */}
                <ProjectCard project={project} />

                {/* Section Separator Rule (Suppressed on absolute last iteration) */}
                {index !== projects.length - 1 && (
                  <motion.div
                    style={{ y: borderY }}
                    className="border-b border-white/20 my-12 -mx-15"
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
