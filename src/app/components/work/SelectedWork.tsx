"use client";
import { useRef } from "react";
import ProjectCard from "./ProjectCard";
import { motion, useTransform, useScroll } from "framer-motion";


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
  return (
    <div ref={ref} className="w-full h-[500px]">
      <ProjectCard />
    </div>
  );
}
