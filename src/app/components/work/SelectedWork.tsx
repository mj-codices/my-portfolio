"use client";
import { useRef } from "react";
import ProjectCard from "./ProjectCard";
import "./ProjectCard.css";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { projects } from "../../data/projects";

export default function SelectedWork() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 20%"],
  });

  /*
  Stagger timing base for project card reveals.

  Each card offsets its animation range slightly using the index
  so cards enter sequentially instead of simultaneously.
*/
  const cardStart = 0.25;
  const cardEnd = 0.5;

  const lastCardRef = useRef(null);

  /*
  Tracks the final project card separately so the entire section
  can fade as the user scrolls beyond the work section.
*/
  const { scrollYProgress: lastCardProgress } = useScroll({
    target: lastCardRef,
    offset: ["start end", "start start"],
  });

  const sectionOpacityRaw = useTransform(lastCardProgress, [0.8, 1], [1, 0.2]);

  const sectionOpacity = useSpring(sectionOpacityRaw, {
    stiffness: 80,
    damping: 25,
  });

  return (
    <div ref={ref} className="w-full px-65 h-auto pb-130">
      {/* ---------------------------------------------
                    Section Heading
                    - Scroll-linked vertical movement via `headingY`
                    - Includes decorative spinning icon
                --------------------------------------------- */}
      <motion.div className="relative flex -translate-x-15 mb-4">
        <img
          className="spin-slow w-12 h-auto mr-9 -translate-y-5"
          src={"/decorations/aster.svg"}
          alt="decorative asterisk"
        />
        <h2 className="mb-6 text-3xl uppercase font-bold tracking-wider opacity-80 text-[#ffff]">
          <span className="text-[#a3a2a2] opacity-100">my</span> work
        </h2>
      </motion.div>
      <motion.div style={{ opacity: sectionOpacity }}>
        <div>
          {projects.map((project, index) => {
            const stagger = index * 0.08;

            const start = cardStart + stagger;
            const end = cardEnd + stagger;

            const opacityRaw = useTransform(
              scrollYProgress,
              [start, end],
              [0, 1]
            );

            /*
  Raw transforms are wrapped in springs to soften scroll-linked
  motion and avoid rigid 1:1 tracking during fast scrolling.
*/
            const opacity = useSpring(opacityRaw, {
              stiffness: 90,
              damping: 20,
            });

            const yRaw = useTransform(scrollYProgress, [start, end], [30, 0]);
            const y = useSpring(yRaw, {
              stiffness: 90,
              damping: 20,
            });

            const borderYRaw = useTransform(
              scrollYProgress,
              [start, end],
              [35, 0] // 👈 subtle upward push
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
                <ProjectCard project={project} />

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
    </div>
  );
}
