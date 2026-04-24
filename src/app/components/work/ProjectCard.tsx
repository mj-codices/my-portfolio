import "./ProjectCard.css";
import ExternalLinkIcon from "../ui/icons/ExternalLinkIcon";
import { motion, Variants } from "framer-motion";

interface Project {
  id: number;
  number: string;
  title: string;
  year: string;
  description: string;
  stack: string[];
  images: string[];
}

export default function ProjectCard({ project }: { project: Project }) {
  const frontImage: Variants = {
    rest: {
      x: 0,
      y: 0,
      rotate: 357,
      filter: "brightness(0.93)",
    },
    hover: {
      x: -6,
      y: -20,
      rotate: 350,
      filter: "brightness(1)",
      transition: {
        delay: 0.16,
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const backImage: Variants = {
    rest: {
      x: 0,
      y: 0,
      rotate: 3,
      filter: "brightness(0.6)",
    },
    hover: {
      x: 18,
      y: -25,
      rotate: 9,
      filter: "brightness(.93)",
      transition: {
        delay: 0.16,
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="pl-6 mb-10 pt-2 flex cursor-pointer group"
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

        <p className="w-170 pl-2 leading-9 text-lg opacity-90">
          {project.description}
        </p>
      </div>
      <div className="mt-12 ml-20 relative w-[135px] h-[135px]">
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
  );
}
