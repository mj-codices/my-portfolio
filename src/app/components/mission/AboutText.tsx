import { motion, type MotionValue, type Variants } from "framer-motion";
import logo from "../../assets/images/aphex.png";

type AboutTextProps = {
  /** Vertically displaces the layout heading node during scroll progression milestones */
  headingY: MotionValue<number>;

  /** Displacement trajectory applied directly to the body narrative container 1 */
  p1Y: MotionValue<number>;

  /** Continuation displacement trajectory applied to container 2 to simulate trailing separation */
  p2Y: MotionValue<number>;

  /** Master opacity alpha-multiplier mapped across scroll visibility thresholds */
  p1Opacity: MotionValue<number>;

  /** Layout element DOM node target tracker used to register visibility checkpoints */
  p1Ref: React.RefObject<HTMLDivElement | null>;
};

const text = "Aphex Twin".split("");

/** Kinetic text wave translation configuration custom-mapped to character index nodes */
const waveVariants: Variants = {
  initial: { y: 0 },
  hover: (i: number) => ({
    y: [0, -6, 0],
    transition: {
      delay: i * 0.04, // Generates sequential cascading ripple displacement
      duration: 0.4,
      ease: "easeInOut",
    },
  }),
};

export default function AboutMe({
  headingY,
  p1Y,
  p2Y,
  p1Ref,
  p1Opacity,
}: AboutTextProps) {
  return (
    <div className="mt-5 flex relative">
      <div className="ml-15 relative z-10 pt-10">
        {/* ===========================================================
            SECTION HEADING
            - Translates along vertical tracking path headingY.
            - Features custom CSS rotation matrix driving continuous spin.
            =========================================================== */}
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
            <span className="text-[#a3a2a2]">my</span> story
          </h2>
        </motion.div>

        {/* ===========================================================
            PARAGRAPH NARRATIVE TIER 1
            - Synchronizes vertical offset (p1Y) and visibility fading (p1Opacity).
            =========================================================== */}
        <motion.div style={{ y: p1Y, opacity: p1Opacity }} ref={p1Ref}>
          <p className="text-lg w-120 leading-9 ml-7 mb-3 tracking-wide">
            I’m a full-stack software developer based in Southern California. My
            passion for programming stems from a love of polished, intuitive
            user experiences, and this is why I thrive at the intersection of
            design and engineering.
          </p>
        </motion.div>

        {/* ===========================================================
            PARAGRAPH NARRATIVE TIER 2 (EASTER EGG HOVER MODULE)
            - Continues kinetic tracking flow via independent offset y bounds.
            - Shares root narrative opacity values to preserve visual continuity.
            =========================================================== */}
        <motion.div style={{ y: p2Y, opacity: p1Opacity }} className="relative">
          <p className="text-lg w-120 leading-9 ml-7 tracking-wide">
            When I’m not pushing pixels, you can find me jamming to{" "}
            {/* HOVER HIT-BOX BOUNDARY CAPTURE BLOCK
                Wraps hidden graphic configurations and character mapping 
                together inside a unified gesture detection grid.
            */}
            <motion.span
              className="inline-flex items-center relative cursor-none"
              initial="initial"
              whileHover="hover"
            >
              {/* HIDDEN BRAND ASSET VECTOR
                  - Uses high-tension spring trajectories to break from hiding bounds.
                  - FIXED: Replaced invalid 'top: 4/5' string syntax with explicit 
                    80% position configuration to restore cross-browser anchoring.
              */}
              <motion.img
                src={logo.src}
                alt="Logo"
                className="w-12 h-auto absolute -left-48 top-[80%] -translate-y-1/4 pointer-events-none"
                initial={{ opacity: 0, x: 0, y: 0 }}
                variants={{
                  hover: {
                    opacity: 0.9,
                    x: 10,
                    y: -2,
                    transition: {
                      type: "spring",
                      stiffness: 120,
                      damping: 15,
                    },
                  },
                }}
              />

              {/* STAGGERED CHARACTER WAVE MAP */}
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
            Coast with my wife and our dog.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
