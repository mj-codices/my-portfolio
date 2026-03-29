import {
  motion,
  useTransform,
  useScroll,
  spring,
  animate,
} from "framer-motion";
import { useMotionValue } from "framer-motion";
import { useRef } from "react";
import SkillTile from "./SkillTile";
import { skillStack } from "./data/skillStack";

export default function SkillStack({}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "start 70%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [20, 0]);

  // Global page scroll for tiles
  const { scrollYProgress: globalScroll } = useScroll(); // entire page scroll

  const tileStartBase = 0.52; // start slightly earlier
  const tileDuration = 0.026; // faster animation
  const staggerStep = 0.018; // tighter stagger

  const sections = [
    { title: "front-end", data: skillStack.frontend, offset: "pl-0" },
    { title: "back-end", data: skillStack.backend, offset: "pl-7" },
    { title: "database", data: skillStack.database, offset: "pl-7" },
    { title: "tools", data: skillStack.tools, offset: "pl-28" },
  ];

  return (
    <section ref={ref} className="w-[150vw] px-50">
      <motion.div style={{ opacity, y }} className="rela tive flex">
        <img
          className="spin-slow w-12 h-auto mr-9 -translate-y-5"
          src={"/decorations/aster.svg"}
        ></img>
        <h2 className="mb-10 text-3xl uppercase font-bold tracking-wider opacity-80 text-[#ffff]">
          <span className="text-[#a3a2a2] opacity-100">my</span> stack
        </h2>
      </motion.div>
      <div className="flex flex-col gap-25">
        {sections.map((section, sectionIndex) => {
          // ✅ SECTION-LEVEL LOGIC (belongs here)

          const sectionGap = 0.04; // 👈 NEW: breathing room between sections

          const tilesBefore = sections
            .slice(0, sectionIndex)
            .reduce((acc, s) => acc + s.data.length, 0);

          const sectionStart =
            tileStartBase +
            tilesBefore * staggerStep +
            sectionIndex * sectionGap; // 👈 THIS creates spacing between sections

          const titleDelay = 0.04 + sectionIndex * 0.005;

          // Title animation
          const titleStart = sectionStart + titleDelay;
          const titleEnd = titleStart + 0.04;

          const titleRaw = useTransform(
            globalScroll,
            [titleStart, titleEnd],
            [0, 1],
          );

          const titleEased = useTransform(
            titleRaw,
            (v) => 1 - Math.pow(1 - v, 5),
          );

          const titleY = useTransform(titleEased, [0, 1], [30, 0]);

          return (
            <div key={section.title} className="flex">
              {/* ✅ TITLE NOW WORKS */}
              <motion.div style={{ opacity: titleEased, y: titleY }}>
                <h3 className="ml-21 uppercase text-5xl font-bold tracking-[-.15rem]">
                  {section.title}
                </h3>
              </motion.div>

              {/* Tiles */}
              <div className="pl-30 -translate-y-1">
                <div
                  className={`${section.offset ?? ""} grid grid-cols-3 gap-x-38 gap-y-10`}
                >
                  {section.data.map((skill, index) => {
                    // ✅ TILE-LEVEL LOGIC
                    const tileDelay = 0.05; // 👈 THIS is your spacing knob

                    const start =
                      sectionStart +
                      titleDelay + // wait for title to begin
                      tileDelay + // 👈 WAIT AFTER TITLE
                      index * staggerStep;

                    const end = start + tileDuration;

                    const raw = useTransform(
                      globalScroll,
                      [start, end],
                      [0, 1],
                    );

                    const eased = useTransform(
                      raw,
                      (v) => 1 - Math.pow(1 - v, 7),
                    );

                    const tileY = useTransform(eased, [0, 1], [30, 0]);

                    return (
                      <motion.div
                        key={skill.id}
                        className={skill.offset ?? ""}
                        style={{
                          opacity: eased,
                          y: tileY,
                        }}
                      >
                        <SkillTile {...skill} />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="h-[500px] w-full"></div>
    </section>
  );
}
