import "./ProjectCard.css";
import ExternalLinkIcon from "../ui/icons/ExternalLinkIcon";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

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

export default function ProjectCard({ project }: { project: Project }) {
  const frontImage: Variants = {
    rest: {
      x: 0,
      y: 0,
      rotate: 357,
      filter: "brightness(0.7)", // Lower idle brightness
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    hover: {
      x: -12,
      y: -25,
      rotate: 348,
      filter: "brightness(1.1)", // Subtle "over-brightness" for the glow effect
      transition: {
        duration: 1.3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
      },
    },
  };

  const backImage: Variants = {
    rest: {
      x: 0,
      y: 0,
      rotate: 3,
      filter: "brightness(0.4)", // Even darker to create depth
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    hover: {
      x: 24,
      y: -35,
      rotate: 12,
      filter: "brightness(0.9)", // Brightens but stays slightly darker than the front
      transition: {
        duration: 1.3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
        delay: 0.1, // Maintains that organic "out of phase" drift
      },
    },
  };
  return (
    <Link 
      href={project.link} 
      target="_blank"             // Opens your live project site in a clean new browser tab
      rel="noopener noreferrer"   // Security best-practice flag for external tab targeting
      className="block"           // Ensures the link layout stretches over the entire card area
    >
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="pl-6 mb-10 flex cursor-pointer group"
    >
      <div>
        <div className="mb-3 flex items-center">
          <span className="text-2xl font-bold text-white opacity-80 translate-y-3">
            {" "}
            _{project.number}.
          </span>
          <span className="ml-3 text-6xl font-bold title-fill">
            {project.title}
          </span>
          <span className="ml-5">
            <ExternalLinkIcon />
          </span>
        </div>

        <div className="flex row mb-2">
          <p className="mr-6 text-lg font-bold text-[#545454]">
            {project.year}
          </p>

          {project.stack.map((tech, index) => (
            <span className="text-xs pt-[.30rem] text-white" key={tech}>
              {" "}
              {index !== 0 && <span className="mx-2 text-[#ff5757]">•</span>}
              {tech}
            </span>
          ))}
        </div>

        <p className="w-170 pl-4 leading-9 text-base">{project.description}</p>
      </div>
      <div className="mt-12 ml-15 relative w-[135px] h-[135px]">
        {/* Back image */}
        <motion.img
          src={project.images[1]}
          alt=""
          className="absolute top-0 right-[-1.3rem] border-4 border-gray-600 z-0 rounded-lg"
          variants={backImage}
          decoding="async"
          loading="lazy"
        />

        {/* Front image */}
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
