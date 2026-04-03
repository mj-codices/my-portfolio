import JsIcon from "../assets/icons/JsIcon.svg";
import TsIcon from "../assets/icons/TsIcon.svg";
import ReactIcon from "../assets/icons/ReactIcon.svg";
import NextIcon from "../assets/icons/NextIcon.svg";
import FramerIcon from "../assets/icons/FramerIcon.svg";
import TailwindIcon from "../assets/icons/TailwindIcon.svg";
import BootstrapIcon from "../assets/icons/BootstrapIcon.svg";
import HtmlIcon from "../assets/icons/HtmlIcon.svg";
import CssIcon from "../assets/icons/CssIcon.svg";
import NodeIcon from "../assets/icons/NodeIcon.svg";
import ExpressIcon from "../assets/icons/ExpressIcon.svg";
import GitIcon from "../assets/icons/GitIcon.svg";
import VercelIcon from "../assets/icons/VercelIcon.svg";
import MongoDBIcon from "../assets/icons/MongoDBIcon.svg";

// ---------------------------
// SkillStack Data
// ---------------------------

// Each skill tile has:
// - id: unique string
// - icon: path to imported SVG
// - label: text to display
// - size: Tailwind width/height
// - offset (optional): for fine-grained positioning tweaks

type Skill = {
  id: string;
  icon: string;
  label: string;
  size: string;
  offset?: string; // optional position adjustment
};

type SkillStack = {
  frontend: Skill[];
  backend: Skill[];
  tools: Skill[];
  database: Skill[];
};

// ---------------------------
// Skill tiles for each section
// The 'offset' property allows staggered / shifted placement
// useful for design aesthetics without changing grid layout.
// ---------------------------
export const skillStack: SkillStack = {
  frontend: [
    {
      id: "html",
      icon: HtmlIcon.src,
      label: "HTML",
      size: "w-12 h-12 mt-[-.5rem]",
    },
    {
      id: "css",
      icon: CssIcon.src,
      label: "CSS",
      size: "w-10 h-10",
      offset: "-translate-x-12",
    },
    {
      id: "js",
      icon: JsIcon.src,
      label: "JavaScript",
      size: "w-10 h-10",
      offset: "-translate-x-27",
    },
    { id: "ts", icon: TsIcon.src, label: "TypeScript", size: "w-10 h-10" },
    { id: "react", icon: ReactIcon.src, label: "React", size: "w-10 h-10" },
    {
      id: "next",
      icon: NextIcon.src,
      label: "Next.Js",
      size: "w-12 h-12",
      offset: "-translate-x-12",
    },
    {
      id: "framer",
      icon: FramerIcon.src,
      label: "Framer Motion",
      size: "w-10 h-10",
    },

    {
      id: "tail",
      icon: TailwindIcon.src,
      label: "Tailwind",
      size: "w-10 h-10",
      offset: "translate-x-10",
    },
    {
      id: "boot",
      icon: BootstrapIcon.src,
      label: "Bootstrap",
      size: "w-11 h-8",
      offset: "translate-x-4",
    },
  ],
  backend: [
    {
      id: "node",
      icon: NodeIcon.src,
      label: "Node.Js",
      size: "w-10 h-10",
    },
    {
      id: "express",
      icon: ExpressIcon.src,
      label: "Express.Js",
      size: "w-10 h-10",
      offset: "-translate-x-4",
    },
  ],
  database: [
    {
      id: "mongo",
      icon: MongoDBIcon.src,
      label: "MongoDB",
      size: "w-10 h-10",
    },
  ],
  tools: [
    {
      id: "git",
      icon: GitIcon.src,
      label: "Git",
      size: "w-10 h-10",
    },
    {
      id: "vercel",
      icon: VercelIcon.src,
      label: "Vercel",
      size: "w-10 h-10",
      offset: "-translate-x-18",
    },
  ],
};
