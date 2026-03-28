import JsIcon from "../icons/JsIcon.svg";
import TsIcon from "../icons/TsIcon.svg";
import ReactIcon from "../icons/ReactIcon.svg";
import NextIcon from "../icons/NextIcon.svg";
import FramerIcon from "../icons/FramerIcon.svg";
import TailwindIcon from "../icons/TailwindIcon.svg";
import BootstrapIcon from "../icons/BootstrapIcon.svg";
import HtmlIcon from "../icons/HtmlIcon.svg";
import CssIcon from "../icons/CssIcon.svg";
import NodeIcon from "../icons/NodeIcon.svg";
import ExpressIcon from "../icons/ExpressIcon.svg";
import GitIcon from "../icons/GitIcon.svg";
import VercelIcon from "../icons/VercelIcon.svg";
import MongoDBIcon from "../icons/MongoDBIcon.svg";

type Skill = {
  id: string;
  icon: string;
  label: string;
  size: string;
  offset?: string; // optional
};

type SkillStack = {
  frontend: Skill[];
  backend: Skill[];
  tools: Skill[];
  database: Skill[];
};

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
