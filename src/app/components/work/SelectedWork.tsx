"use client";
import { useRef } from "react";
import ProjectCard from "./ProjectCard";
import { motion, useTransform, useScroll } from "framer-motion";
import { FadeSection } from "../wrappers/FadeSection";
import { head } from "framer-motion/client";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function WorkCited() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const headingY = useTransform(scrollYProgress, [0, .6], [0, 100]);
  return (
    <div ref={ref} className="w-full h-auto px-60">
      <FadeSection>
        {/* ---------------------------------------------
                    Section Heading
                    - Scroll-linked vertical movement via `headingY`
                    - Includes decorative spinning icon
                --------------------------------------------- */}
        <motion.div
          className="relative flex -translate-x-15"
          style={{ y: headingY }}
        >
          <img
            className="spin-slow w-12 h-auto mr-9 -translate-y-5"
            src={"/decorations/aster.svg"}
            alt="decorative asterisk"
          />
          <h2 className="mb-10 text-3xl uppercase font-bold tracking-wider opacity-80 text-[#ffff]">
            <span className="text-[#a3a2a2] opacity-100">my</span> work
          </h2>
        </motion.div>
      </FadeSection>
      <ProjectCard />
    </div>
  );
}
