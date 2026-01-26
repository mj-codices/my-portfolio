"use client";

import { motion } from "framer-motion";

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
            duration: open ? 0.55 : 0.30,
            delay: open ? 0.35 : 0,
            ease: "easeOut",
          }}
        />

        {/* Drawer content */}
        <nav className="relative z-10 p-6 text-white top-1/3 left-1/3">
          <ul className="space-y-2">
            <li>Home</li>
            <li>About</li>
            <li>Work</li>
            <li>Contact</li>
          </ul>
        </nav>
      </motion.aside>
    </div>
  );
}
