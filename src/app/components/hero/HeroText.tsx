import { motion, MotionValue } from "framer-motion";

type HeroTextProps = {
  pushSpace: MotionValue<number>;
  pushSpaceBtm: MotionValue<number>;
};

export default function HeroText({ pushSpace, pushSpaceBtm}: HeroTextProps){
    return (
         <div className="shrink-para-wrapper mb-10 max-w-lg">
            <motion.div
              style={{
                marginTop: pushSpace,
                marginBottom: pushSpaceBtm,
              }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
                delay: 0, // small delay in seconds
              }}
              viewport={{ once: false, amount: 0.4 }}
            >
              <motion.div
                // style={{ y: pushSpring }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-lg leading-[2.3rem] tracking-[.06rem]">
                  Hello! I’m <span className="text-white">Michael White</span>{" "}
                  (most people call me Julian). I build thoughtful, scalable,
                  and production-ready web apps.
                </p>
              </motion.div>
            </motion.div>
          </div>
    )
}