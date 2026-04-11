"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import "./NavIcon.css";

// ------------------------------
// Motion variants for drawer menu items
// ------------------------------
const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1, // stagger each menu item
      delayChildren: 0.25, // delay first item
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    x: 160, // start off-screen right
  },
  visible: {
    opacity: 1,
    x: 0, // slide into place
    transition: {
      x: {
        type: "spring" as const,
        stiffness: 420,
        damping: 26,
        mass: 0.8,
      },
      opacity: {
        duration: 0.18,
      },
    },
  },
};

const floatVariants = {
  float: (i: number) => ({
    y: [0, -4, 0],
    x: [0, i % 2 === 0 ? 2 : -2, 0],
    transition: {
      duration: 3.5 + i * 0.6,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  }),
};

// ------------------------------
// Props for NavDrawer
// ------------------------------
type DrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function NavDrawer({ open, onClose }: DrawerProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <div>
      {/* --------------------------
          Overlay behind drawer
          -------------------------- */}
      <motion.div
        className="fixed inset-0 bg-black z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 0.65 : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{ pointerEvents: open ? "auto" : "none" }}
        onClick={onClose}
      />

      {/* --------------------------
          Drawer container
          -------------------------- */}
      <motion.aside
        className="fixed top-0 right-0 h-full nav-width expand-nav-lg expand-nav-md expand-nav-sm bg-transparent z-60 overflow-hidden"
        initial={{ x: "100%" }}
        animate={{ x: open ? "0%" : "100%" }}
        transition={{
          duration: open ? 0.4 : 0.4, // slower open, faster close
          ease: "easeOut",
        }}
      >
        {/* --------------------------
            Large background circle
            -------------------------- */}
        <motion.div
          className="absolute bg-[#0d0c0c] top-[-33rem] left-2 rounded-full"
          style={{ width: 2000, height: 2000 }}
          initial={{ scale: 1 }}
          animate={{ scale: open ? 1.15 : 1 }}
          transition={{
            duration: open ? 0.55 : 0.3,
            delay: open ? 0.35 : 0,
            ease: "easeOut",
          }}
        />

        {/* --------------------------
            Drawer menu items
            -------------------------- */}
        <motion.nav
          className="relative z-10 p-6 text-white translate-x-[-1rem] top-1/3 left-1/3 nudge-menu-md "
          initial="hidden"
          animate={open ? "visible" : "hidden"}
          variants={listVariants}
        >
          <ul className="space-y-6">
            {["Home", "About", "Work", "Contact"].map((label, i) => (
              <motion.li
                key={label}
                variants={itemVariants}
                className="flex text-[#b4b4b4] text-4xl shrink-text cursor-pointer font-bold ease-in-out gap-5"
                whileHover={{ x: -9, color: "#fff" }}
                transition={{ type: "tween", duration: 0.2 }}
                onHoverStart={() => setHoveredIndex(i)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                {/* Circle and hover arrow */}
                <motion.div
                  className="relative flex items-center justify-center"
                  custom={i}
                  variants={{
                    float: floatVariants.float(i),
                  }}
                  animate="float"
                >
                  {/* HOVER WRAPPER (only scale happens here) */}
                  <motion.div
                    className="relative flex items-center justify-center"
                    animate={{
                      scale: hoveredIndex === i ? 1.7 : 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 620,
                      damping: 26,
                    }}
                  >
                    {/* Circle */}
                    <Image
                      src={"/ui/nav/navCircle.svg"}
                      width={20}
                      height={20}
                      alt="circle"
                    />

                    {/* Arrow */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{
                        opacity: hoveredIndex === i ? 1 : 0,
                        scale: hoveredIndex === i ? 1 : 0.5,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 20,
                      }}
                    >
                      <Image
                        src="/icons/arrow.svg"
                        width={8}
                        height={8}
                        alt="arrow"
                        className="rotate-320"
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
                {label}
              </motion.li>
            ))}
          </ul>
        </motion.nav>

        {/* --------------------------
            GitHub icon bottom-right
            -------------------------- */}
        <motion.div
          className="absolute bottom-8 right-10"
          whileHover={{
            scale: 1.15,
            opacity: 1,
          }}
          whileTap={{ scale: 0.98 }}
        >
          <Image
            src="/icons/giticon.svg"
            width={40}
            height={40}
            alt="Github logo"
            className="opacity-50 hover:opacity-100 transition duration-200 ease-in cursor-pointer"
          ></Image>
        </motion.div>
      </motion.aside>
    </div>
  );
}
