import { motion, MotionValue } from "framer-motion";
import SkillTile from "./SkillTile";

export default function SkillStack({}) {
  return (
    <section className="w-[100vw] px-50">
      <div className="relative flex">
        <img
          className="spin-slow w-12 h-auto mr-9 -translate-y-5"
          src={"/decorations/aster.svg"}
        ></img>
        <h2 className="mb-10 text-3xl uppercase font-bold tracking-wider opacity-80 text-[#ffff]">
          <span className="text-[#a3a2a2] opacity-100">my</span> stack
        </h2>
      </div>
      <div className="flex">
        <h3 className="ml-21 uppercase text-5xl font-bold tracking-[-.15rem]">
          front-end
        </h3>
        <SkillTile/>
      </div>
    </section>
  );
}
