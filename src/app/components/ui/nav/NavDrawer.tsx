"use client";
import { useState, useEffect } from "react";
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
      staggerChildren: 0.125, // stagger each menu item
      delayChildren: 0.25, // delay first item
    },
  },
};

// ------------------------------
// Individual nav item entrance animation
// ------------------------------
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
        type: "spring" as const,
        stiffness: 420,
        damping: 36,
        mass: 0.8,
      },
      opacity: {
        duration: 0.35,
      },
    },
  },
};

// ------------------------------
// FLOAT animation (idle motion)
// ------------------------------
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
  // Tracks which nav item is hovered
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  /* ---------------------------------------------
     LENIS & CSS SCROLL LOCK INTERCEPTOR
  --------------------------------------------- */
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (open) {
      html.classList.add("no-scroll");
      body.classList.add("no-scroll");
      if (window.lenis) window.lenis.stop();
    } else {
      html.classList.remove("no-scroll");
      body.classList.remove("no-scroll");
      if (window.lenis) window.lenis.start();
    }

    return () => {
      html.classList.remove("no-scroll");
      body.classList.remove("no-scroll");
      if (window.lenis) window.lenis.start();
    };
  }, [open]);

  /* ---------------------------------------------
     NEW: LENIS ANCHOR SCROLL CLICK HANDLER
  --------------------------------------------- */
  const handleNavLinkClick = (label: string) => {
    // 1. Instantly wake up the Lenis engine loop so it can accept scroll inputs immediately
    if (window.lenis) {
      window.lenis.start();
    }

    // 2. Trigger your state update to slide the drawer out of view
    onClose();

    const lowerLabel = label.toLowerCase();

    // 3. Orchestrate the silky-smooth transition
    if (window.lenis) {
      if (lowerLabel === "start") {
        // Scroll to absolute topmost pixel coordinate boundary
        window.lenis.scrollTo(0, {
          duration: 1.4,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else if (lowerLabel === "contact") {
        // SCROLL TO ABSOLUTE BOTTOM: Lenis accepts the 'bottom' keyword natively!
        window.lenis.scrollTo("bottom", {
          duration: 1.5, // Giving long vertical journeys a slightly longer, luxurious time to slide
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        // Dynamic fallback targeting standard section components (#stack, #work)
        const targetId = `#${lowerLabel}`;
        window.lenis.scrollTo(targetId, {
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          offset: -100,
        });
      }
    } else {
      // 4. Solid native fallback chains if Lenis hasn't booted up yet
      if (lowerLabel === "start") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (lowerLabel === "contact") {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      } else {
        const targetElement = document.querySelector(`#${lowerLabel}`);
        targetElement?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

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
          duration: 0.4,
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
          <ul className="space-y-7">
            {["Start", "Stack", "Work", "Contact"].map((label, i) => (
              <motion.li
                key={label}
                variants={itemVariants}
                className="flex text-[#b4b4b4] text-4xl shrink-text cursor-pointer font-bold ease-in-out gap-5"
                whileHover={{ x: -9, color: "#fff" }}
                transition={{ type: "tween", duration: 0.2 }}
                onHoverStart={() => setHoveredIndex(i)}
                onHoverEnd={() => setHoveredIndex(null)}
                // CONNECT THE SCROLL ACTION HANDLER HERE
                onClick={() => handleNavLinkClick(label)}
              >
                {/* FLOAT LAYER */}
                <motion.div
                  className="relative flex items-center justify-center"
                  custom={i}
                  variants={{
                    float: floatVariants.float(i),
                  }}
                  animate="float"
                >
                  {/* HOVER LAYER */}
                  <motion.div
                    className="relative flex items-center justify-center"
                    animate={{
                      scale: hoveredIndex === i ? 2 : 1,
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

                    {/* ARROW VIEWPORT CONTAINER (With your new diagonal sliding arrow logic) */}
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full">
                      <motion.div
                        className="absolute flex items-center justify-center w-full h-full"
                        initial={{ opacity: 0, x: -8, y: 8, scale: 0.5 }}
                        animate={{
                          x: hoveredIndex === i ? 0 : -8,
                          y: hoveredIndex === i ? 0 : 8,
                          scale: hoveredIndex === i ? 1 : 0.7,
                          opacity: hoveredIndex === i ? [0, 0, 1] : 0,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 18,
                          delay: hoveredIndex === i ? 0.04 : 0,
                          opacity: {
                            duration: hoveredIndex === i ? 0.32 : 0.1,
                            ease: "easeOut",
                          },
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
                    </div>
                  </motion.div>
                </motion.div>
                {label}
              </motion.li>
            ))}
          </ul>
        </motion.nav>

        {/* --------------------------
            Icons bottom-right
            -------------------------- */}
        <motion.div
          className="absolute bottom-8 right-10"
          whileHover={{ scale: 1.25, opacity: 1 }}
          whileTap={{ scale: 0.98 }}
        >
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/mj-codices"
          >
            <Image
              src="/icons/giticon.svg"
              width={40}
              height={40}
              alt="Github logo"
              className="opacity-50 hover:opacity-100 transition duration-200 ease-in cursor-pointer"
            />
          </a>
        </motion.div>

        <motion.div
          className="absolute bottom-[2.35rem] right-25"
          whileHover={{ scale: 1.15, opacity: 1 }}
          whileTap={{ scale: 0.98 }}
        >
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/casa_junbubby"
          >
            <Image
              src="/icons/instagram.svg"
              width={29}
              height={29}
              alt="Instagram logo"
              className="opacity-47 hover:opacity-100 transition duration-200 ease-in cursor-pointer"
            />
          </a>
        </motion.div>
      </motion.aside>
    </div>
  );
}
