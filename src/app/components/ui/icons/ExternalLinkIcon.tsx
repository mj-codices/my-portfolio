import { motion, Variants } from "framer-motion";

export default function ExternalLinkIcon() {
  const arrowVariants: Variants = {
    rest: { x: 0, y: 0 },
    hover: {
      x: 30,
      y: -30,
      transition: {
        delay: 0.15,
        duration: 1,
  ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.svg
      width="30"
      height="30"
      viewBox="0 0 241 245"
      className="overflow-visible"
    >
      {/* static box */}
      <path
        d="M40 37C17.9 37 0 54.9 0 77V205C0 227.1 17.9 245 40 245H168C190.1 245 208 227.1 208 205V165C208 156.15 200.85 149 192 149C183.15 149 176 156.15 176 165V205C176 209.4 172.4 213 168 213H40C35.6 213 32 209.4 32 205V77C32 72.6 35.6 69 40 69H80C88.85 69 96 61.85 96 53C96 44.15 88.85 37 80 37H40Z"
        fill="#b4b4b4"
      />

      {/* arrow reacts to parent hover */}
      <motion.path
        d="M128.037 16C128.037 7.15 135.188 0 144.037 0H224.038C232.888 0 240.038 7.15 240.038 16V96C240.038 104.85 232.888 112 224.038 112C215.188 112 208.038 104.85 208.038 96V54.65L107.338 155.35C101.088 161.6 90.9375 161.6 84.6875 155.35C78.4375 149.1 78.4375 138.95 84.6875 132.7L185.388 32H144.037C135.188 32 128.037 24.85 128.037 16Z"
        fill="#b4b4b4"
        variants={arrowVariants}
      />
    </motion.svg>
  );
}
