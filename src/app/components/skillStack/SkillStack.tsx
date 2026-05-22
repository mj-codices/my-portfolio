import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import SkillTile from "./SkillTile";
import { skillStack } from "../../data/skillStack";

export default function SkillStack({}) {
  const ref = useRef(null);

  const globalDelay = 0.02; // tweak this

  // Track scroll progress relative to this section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"], // trigger animations slightly before fully visible
  });

  // Timing constants for tile animation
  const tileStartBase = 0.001; // start slightly earlier than viewport trigger
  const tileDuration = 0.08; // how fast each tile animates in
  const staggerStep = 0.045; // space between consecutive tiles

  // Define skill sections
  const sections = [
    { title: "front-end", data: skillStack.frontend, offset: "pl-0" },
    { title: "back-end", data: skillStack.backend, offset: "pl-7" },
    { title: "database", data: skillStack.database, offset: "pl-7" },
    { title: "tools", data: skillStack.tools, offset: "pl-28" },
  ];

  // This tells Framer:
  // From 0% to 80% scroll progress, stay at 1 (100% opacity).
  // From 80% to 100% scroll progress, fade down to 0.
  const fadeOut = useTransform(scrollYProgress, [0.75, 1], [1, 0.1]);

  const fadeOutSmooth = useSpring(fadeOut, {
    stiffness: 130,
    damping: 30,
  });

  // 1. Sync the trigger window to the final 20% of the section
  // We'll use -100px for a noticeable but 'premium' lift.
  const launchRaw = useTransform(scrollYProgress, [0.75, 1], [0, -150]);

  // 2. The Launch Spring
  // Since you wanted to avoid the 'tug' when scrolling back, we'll keep
  // the stiffness low. This makes it feel like it's drifting away.
  const launchY = useSpring(launchRaw, {
    stiffness: 50, // Lowered for a more 'weightless' feel
    damping: 10, // High enough to prevent the spring from 'bouncing'
    mass: .3,
    restDelta: 0.01,
  });

  return (
    <motion.div
      style={{
        opacity: fadeOutSmooth,
        y: launchY, // The magic happens here
      }}
    >
      <section ref={ref} id="stack" className="w-[150vw] px-50">
        {/* Section heading */}
        <motion.div className="relative flex">
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
            // Compute when this section's animations start
            const sectionGap = 0.02; // breathing room between sections

            const tilesBefore = sections
              .slice(0, sectionIndex)
              .reduce((acc, s) => acc + s.data.length, 0);

            const sectionStart =
              tileStartBase +
              globalDelay +
              tilesBefore * staggerStep +
              sectionIndex * sectionGap; // 👈 THIS creates spacing between sections

            const titleDelay = 0.002 + sectionIndex * 0.005;

            // Animate section title opacity + vertical slide
            const titleStart = sectionStart + titleDelay;
            const titleEnd = titleStart + 0.1;

            const titleRaw = useTransform(
              scrollYProgress,
              [titleStart, titleEnd],
              [0, 1]
            );

            const titleEased = useTransform(
              titleRaw,
              (v) => 1 - Math.pow(1 - v, 5)
            );

            const titleY = useTransform(titleEased, [0, 1], [30, 0]);

            return (
              <div key={section.title} className="flex">
                {/* Section title */}
                <motion.div style={{ opacity: titleEased, y: titleY }}>
                  <h3 className="ml-21 uppercase text-5xl font-bold tracking-[-.15rem]">
                    {section.title}
                  </h3>
                </motion.div>

                {/* Skill tiles */}
                <div className="pl-30 -translate-y-1">
                  <div
                    className={`${section.offset ?? ""} grid grid-cols-3 gap-x-38 gap-y-10`}
                  >
                    {section.data.map((skill, index) => {
                      // Calculate start + end for tile animation
                      const tileDelay = 0.02; // delay after title
                      const start =
                        sectionStart +
                        titleDelay +
                        tileDelay +
                        index * staggerStep;
                      const end = start + tileDuration;

                      // Opacity + vertical slide per tile
                      const raw = useTransform(
                        scrollYProgress,
                        [start, end],
                        [0, 1]
                      );

                      const eased = useTransform(
                        raw,
                        (v) => 1 - Math.pow(1 - v, 3)
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
      </section>
    </motion.div>
  );
}
