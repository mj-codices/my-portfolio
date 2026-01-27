"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.25,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    x: 160,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      x: {
        type: "spring",
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

type DrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function NavDrawer({ open, onClose }: DrawerProps) {
  return (
    <div>
      {/* Overlay */}
      <motion.div
        className="fixed inset-0 bg-black z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 0.9 : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{ pointerEvents: open ? "auto" : "none" }}
        onClick={onClose}
      />

      {/* Drawer */}
      <motion.aside
        className="fixed top-0 right-0 h-full w-1/3 bg-transparent z-50 overflow-hidden"
        initial={{ x: "100%" }}
        animate={{ x: open ? "0%" : "100%" }}
        transition={{
          duration: open ? 0.4 : 0.4, // slower open, faster close
          ease: "easeOut",
        }}
      >
        {/* Circle inside drawer */}
        <motion.div
          className="absolute bg-[#111111] top-[-33rem] left-2 rounded-full"
          style={{ width: 2000, height: 2000 }}
          initial={{ scale: 1 }}
          animate={{ scale: open ? 1.15 : 1 }}
          transition={{
            duration: open ? 0.55 : 0.3,
            delay: open ? 0.35 : 0,
            ease: "easeOut",
          }}
        />

        {/* Drawer content */}
        <motion.nav
          className="relative z-10 p-6 text-white top-1/3 left-1/3"
          initial="hidden"
          animate={open ? "visible" : "hidden"}
          variants={listVariants}
        >
          <ul className="space-y-6">
            {["Home", "About", "Work", "Contact"].map((label) => (
              <motion.li
                key={label}
                variants={itemVariants}
                className="text-[#b4b4b4] text-4xl cursor-pointer font-bold ease-in-out"
                whileHover={{ x: -6, color: "#fff" }}
                transition={{ type: "tween", duration: 0.2 }}
              >
                {label}
              </motion.li>
            ))}
          </ul>
        </motion.nav>
        <motion.div
          className="absolute bottom-8 right-10"
          whileHover={{
            scale: 1.15,
            opacity: 1,
          }}
          whileTap={{ scale: 0.98 }}
        >
          <Image
            src="/giticon.svg"
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
