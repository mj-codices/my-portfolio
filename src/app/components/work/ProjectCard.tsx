import "./ProjectCard.css";
import ExternalLinkIcon from "../ui/icons/ExternalLinkIcon";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

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
      {/* Layout: phones/small tablets stack everything in one column with a single
          screenshot; from `md` (iPad Air / Pro) the copy and the floating image
          stack sit side by side; `desk` restores the original fixed layout. */}
      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        className="desk:pl-6 mb-10 flex flex-col md:flex-row cursor-pointer group"
      >
        {/* Context Information Area */}
        <div className="min-w-0 md:flex-1 desk:flex-initial">
          {/* Row Identifier, Title Masking & Status Markers
              Below `desk` this is plain inline flow: the number sits on its own
              line, and the link icon trails the title's last word as it wraps. */}
          {/* Desktop: number, title and icon share one line. The title is 56px so
              the line fits the card's 706px text column at every desktop width
              (60px wrapped below ~1900px, stranding the number beside two lines).
              Baseline alignment keeps the number on the title's first line even
              if a longer project title ever wraps; the icon stays centered. */}
          <div className="mb-3 desk:flex desk:items-baseline">
            <span className="block mb-1 desk:mb-0 text-xl desk:text-2xl font-bold text-white opacity-80">
              _{project.number}.
            </span>
            <span className="desk:ml-3 text-4xl sm:text-5xl desk:text-[3.5rem] leading-[1.15] font-bold title-fill">
              {project.title}
            </span>
            <span className="inline-block align-middle ml-3 desk:ml-5 desk:self-center">
              <ExternalLinkIcon />
            </span>
          </div>

          {/* Chronology & Technological Footprint Elements */}
          <div className="flex flex-wrap mb-2">
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

          {/* Single Screenshot (below `md`):
            The floating stack needs side room and hover, so phones get one
            full-width, full-brightness shot of the home page instead —
            cropped to 4:3 from the top so it shows the site's hero. */}
          <Image
            src={project.images[0]}
            alt=""
            width={800}
            height={935}
            sizes="(min-width: 640px) 512px, 100vw"
            className="md:hidden w-full sm:max-w-lg aspect-[4/3] object-cover object-top border-4 border-gray-600 rounded-lg mt-4 mb-5"
          />

          {/* Formatted Copy Summary Block */}
          <p className="md:max-w-170 desk:w-170 desk:pl-4 leading-8 desk:leading-9 text-base">
            {project.description}
          </p>
        </div>

        {/* Stacked Thumbnail Component (from `md`):
          Acts as a bounded 3D layout container. Standardizes optimization layers
          via native lazy loading and processing optimizations.
          Touch screens can't hover, so their resting brightness is raised
          (hover:none) — the important flag beats Framer's inline filter.
        */}
        {/* md:mr-8 absorbs the back image's right overhang (right-[-1.3rem], 21px)
            plus its 3° tilt (~4px), so the stack stays inside the page's right
            content edge like every other section — keeping the right gutter clear
            for the fixed scroll-progress bar on tablets (~13px clearance).
            Desktop has room to spare, so it keeps the overhang. */}
        <div className="hidden md:block md:mr-8 desk:mr-0 md:shrink-0 desk:shrink mt-12 md:ml-10 desk:ml-15 relative w-[135px] h-[135px]">
          {/* Back Asset Layer */}
          <motion.img
            src={project.images[1]}
            alt=""
            className="absolute top-0 right-[-1.3rem] border-4 border-gray-600 z-0 rounded-lg [@media(hover:none)]:[filter:brightness(0.75)]!"
            variants={backImage}
            decoding="async"
            loading="lazy"
          />

          {/* Front Asset Layer */}
          <motion.img
            src={project.images[0]}
            alt=""
            className="absolute top-4 left-0 border-4 border-gray-600 z-10 rounded-lg [@media(hover:none)]:[filter:brightness(1)]!"
            variants={frontImage}
            decoding="async"
            loading="lazy"
          />
        </div>
      </motion.div>
    </Link>
  );
}
