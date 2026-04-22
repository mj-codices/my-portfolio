"use client";
import { useRef } from "react";
import ProjectCard from "./ProjectCard";
import "./ProjectCard.css";
import { motion, useTransform, useScroll } from "framer-motion";
import { FadeSection } from "../wrappers/FadeSection";
import { projects } from "../../data/projects";

export default function WorkCited() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const headingY = useTransform(scrollYProgress, [0.2, 1], [0, 200]);

  return (
    <div ref={ref} className="w-full px-65">
      <FadeSection>
        {/* ---------------------------------------------
                    Section Heading
                    - Scroll-linked vertical movement via `headingY`
                    - Includes decorative spinning icon
                --------------------------------------------- */}
        <motion.div
          className="relative flex -translate-x-15 mb-8"
          // style={{ y: headingY }}
        >
          <img
            className="spin-slow w-12 h-auto mr-9 -translate-y-5"
            src={"/decorations/aster.svg"}
            alt="decorative asterisk"
          />
          <h2 className="mb-8 text-3xl uppercase font-bold tracking-wider opacity-80 text-[#ffff]">
            <span className="text-[#a3a2a2] opacity-100">my</span> work
          </h2>
        </motion.div>
      </FadeSection>
      <div>
        {projects.map((project, index) => (
          <div key={project.id}>
            <ProjectCard project={project} />

            {index !== projects.length - 1 && (
              <div className="border-b border-white/20 my-6" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
