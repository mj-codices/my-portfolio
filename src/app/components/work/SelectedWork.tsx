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
    offset: ["start 90%", "start 20%"], // enters → mid viewport
  });

  const cardStart = 0.25; // wait for heading to move first
  const cardEnd = 0.5;
  return (
    <div ref={ref} className="w-full px-65 h-auto">
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
        <h2 className="mb-8 text-3xl uppercase font-bold tracking-wider opacity-80 text-[#ffff]">
          <span className="text-[#a3a2a2] opacity-100">my</span> work
        </h2>
      </motion.div>

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
          const yRaw = useTransform(scrollYProgress, [start, end], [40, 0]);

          // 👇 THIS is what makes it feel premium
          const opacity = useSpring(opacityRaw, {
            stiffness: 90,
            damping: 20,
          });

          const y = useSpring(yRaw, {
            stiffness: 90,
            damping: 20,
          });

          const borderYRaw = useTransform(
            scrollYProgress,
            [start, end],
            [25, 0] // 👈 subtle upward push
          );
          const borderY = useSpring(borderYRaw, {
            stiffness: 90,
            damping: 20,
          });

          return (
            <motion.div key={project.id} style={{ opacity, y }}>
              <ProjectCard project={project} />

              {
                index !== projects.length - 1 &&
                <motion.div
                  style={{ y: borderY }}
                  className="border-b border-white/20 my-6"
                />
              }
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
