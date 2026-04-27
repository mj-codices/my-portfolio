import { motion, MotionValue, Variants } from "framer-motion";
import { FadeSection } from "../wrappers/FadeSection";
import logo from "../../assets/images/aphex.png";

type AboutTextProps = {
  headingY: MotionValue<number>; // controls vertical motion of the section heading
  p1Y: MotionValue<number>; // controls first paragraph scroll movement
  p2Y: MotionValue<number>;
  p2Ref: React.RefObject<HTMLDivElement | null>;
};

const text = "Aphex Twin".split("");

const waveVariants: Variants = {
  initial: { y: 0 },
  hover: (i: number) => ({
    y: [0, -6, 0],
    transition: {
      delay: i * 0.04,
      duration: 0.4,
      ease: "easeInOut",
    },
  }),
};

export default function AboutMe({ headingY, p1Y, p2Y, p2Ref }: AboutTextProps) {
  return (
    <div className="mt-20 flex relative">
      {/* ---------------------------------------------
          FadeSection
          - Handles section-level fade-in when entering viewport
          - Keeps animation concerns separated from content
      --------------------------------------------- */}
      <div className="ml-15 relative z-10 pt-10">
        
          {/* ---------------------------------------------
              Section Heading
              - Scroll-linked vertical movement via `headingY`
              - Includes decorative spinning icon
          --------------------------------------------- */}
          <motion.div
            className="relative flex -translate-x-15"
            style={{ y: headingY }}
          >
            <img
              className="spin-slow w-12 h-auto mr-9 -translate-y-5"
              src={"/decorations/aster.svg"}
              alt="decorative asterisk"
            />
            <h2 className="mb-10 text-3xl uppercase font-bold tracking-wider opacity-80 text-[#ffff]">
              <span className="text-[#a3a2a2] opacity-100">my</span> story
            </h2>
          </motion.div>
       

        {/* ---------------------------------------------
              Paragraph 1
              - Slight upward motion tied to scroll (`p1Y`)
              - Introduces background and focus
          --------------------------------------------- */}
        <FadeSection>
          <motion.div style={{ y: p1Y }}>
            <p className="text-lg w-95 leading-11 ml-7 mb-5 tracking-wide opacity-85">
              I’m a full-stack software developer based in Southern California.
              My passion for programming stems from a love of polished,
              intuitive user experiences, and this is why I thrive at the
              intersection of design and engineering.
            </p>
          </motion.div>
        </FadeSection>
        {/* ---------------------------------------------
              Paragraph 2
              - Continues scroll motion (`p2Y`)
              - `p2Ref` can be used for intersection/scroll triggers
          --------------------------------------------- */}
        <FadeSection>
          <motion.div style={{ y: p2Y }} ref={p2Ref} className="relative">
            <p className="text-lg w-148 leading-11 ml-7 tracking-wide opacity-85 translate-y-[-.5rem]">
              When I’m not pushing pixels, you can find me jamming to{" "}
              {/* Wrap letters + logo together for a unified hover */}
              <motion.span
                className="inline-flex items-center relative cursor-none"
                initial="initial"
                whileHover="hover"
              >
                {/* Wrap letters + logo together for a unified hover
    - Cursor hidden to rely on custom interaction feel */}
                <motion.img
                  src={logo.src}
                  alt="Logo"
                  className="w-15 h-auto absolute -left-24 top-4/5 -translate-y-1/2 pointer-events-none"
                  initial={{ opacity: 0, x: 0, y: 0 }}
                  variants={{
                    hover: {
                      opacity: 0.8,
                      x: 5, // move toward the letters
                      y: -6,
                      transition: {
                        type: "spring",
                        stiffness: 120,
                        damping: 15,
                      },
                    },
                  }}
                />

                {/* Letters with wave animation */}
                {text.map((char, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={waveVariants}
                    className="inline-block font-bold text-white opacity-90"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.span>
              , cheering for my hometown Lakers, or camping along the Pacific
              Coast with my wife, our dog, and our old VW wagon. 
            </p>
          </motion.div>
        </FadeSection>
      </div>
    </div>
  );
}
