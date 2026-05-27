import "./ProjectCard.css";
import ExternalLinkIcon from "../ui/icons/ExternalLinkIcon";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

/**
 * Interface representing the strict structure of a Project item.
 */
interface Project {
  id: number;
  number: string;
  title: string;
  year: string;
  description: string;
  stack: string[];
  images: string[];
  link: string;
}

/**
 * ProjectCard Component
 * * Renders an individual project row showcasing typography fills, technology tags,
 * and an interactive double-stacked thumbnail layout. Leverages Framer Motion's
 * inherited hover states to trigger an out-of-phase floating parallax animation.
 */
export default function ProjectCard({ project }: { project: Project }) {
  /**
   * Front Image Motion Variants:
   * Sets up an asymmetric, organic bobbing motion.
   * Idle state sits at a lower exposure (`brightness(0.7)`) and shifts
   * into a sharp, glowing focus upon parent card hover.
   */
  const frontImage: Variants = {
    rest: {
      x: 0,
      y: 0,
      rotate: 357,
      filter: "brightness(0.7)",
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    hover: {
      x: -12,
      y: -25,
      rotate: 348,
      filter: "brightness(1.1)",
      transition: {
        duration: 1.3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
      },
    },
  };

  /**
   * Back Image Motion Variants:
   * Translates in the opposite diagonal direction of the front card.
   * Stays slightly darker to establish a pseudo-3D parallax background field,
   * utilizing a minor time offset (`delay: 0.1`) to avoid synchronized stiffness.
   */
  const backImage: Variants = {
    rest: {
      x: 0,
      y: 0,
      rotate: 3,
      filter: "brightness(0.4)",
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    hover: {
      x: 24,
      y: -35,
      rotate: 12,
      filter: "brightness(0.9)",
      transition: {
        duration: 1.3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
        delay: 0.1,
      },
    },
  };

  return (
    <Link
      href={project.link}
      target="_blank" // Opens live project endpoints in a separate browser context
      rel="noopener noreferrer" // Mitigates reverse tab-nabbing security vectors
      className="block" // Ensures semantic block formatting completely bounds layout hits
    >
      {/* Parent Interactivity Wrapper:
        Propagates 'hover' and 'rest' keys down to child Framer Motion configurations
        without managing heavy independent state monitors.
      */}
      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        className="pl-6 mb-10 flex cursor-pointer group"
      >
        {/* Context Information Area */}
        <div>
          {/* Row Identifier, Title Masking & Status Markers */}
          <div className="mb-3 flex items-center">
            <span className="text-2xl font-bold text-white opacity-80 translate-y-3">
              _{project.number}.
            </span>
            <span className="ml-3 text-6xl font-bold title-fill">
              {project.title}
            </span>
            <span className="ml-5">
              <ExternalLinkIcon />
            </span>
          </div>

          {/* Chronology & Technological Footprint Elements */}
          <div className="flex row mb-2">
            <p className="mr-6 text-lg font-bold text-[#545454]">
              {project.year}
            </p>

            {project.stack.map((tech, index) => (
              <span className="text-xs pt-[.30rem] text-white" key={tech}>
                {/* Visual Interpunct Divider Insertion */}
                {index !== 0 && <span className="mx-2 text-[#ff5757]">•</span>}
                {tech}
              </span>
            ))}
          </div>

          {/* Formatted Copy Summary Block */}
          <p className="w-170 pl-4 leading-9 text-base">
            {project.description}
          </p>
        </div>

        {/* Stacked Thumbnail Component:
          Acts as a bounded 3D layout container. Standardizes optimization layers
          via native lazy loading and processing optimizations.
        */}
        <div className="mt-12 ml-15 relative w-[135px] h-[135px]">
          {/* Back Asset Layer */}
          <motion.img
            src={project.images[1]}
            alt=""
            className="absolute top-0 right-[-1.3rem] border-4 border-gray-600 z-0 rounded-lg"
            variants={backImage}
            decoding="async"
            loading="lazy"
          />

          {/* Front Asset Layer */}
          <motion.img
            src={project.images[0]}
            alt=""
            className="absolute top-4 left-0 border-4 border-gray-600 z-10 rounded-lg"
            variants={frontImage}
            decoding="async"
            loading="lazy"
          />
        </div>
      </motion.div>
    </Link>
  );
}
