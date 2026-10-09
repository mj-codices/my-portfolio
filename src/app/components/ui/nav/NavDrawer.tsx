"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import NavIndicator from "./NavIndicator";
import "./NavIcon.css";

/**
 * Macro List Entrance Variants
 * Handles cascading stagger timings down to children components when the drawer mounts.
 */
const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.10, // Staggers the arrival sequence of individual row anchors
      delayChildren: 0.33, // Injects a deliberate pause allowing the background panel to arrive first
    },
  },
};

/**
 * Individual Row Entrance Variants
 * Employs an aggressive spring push to snap items horizontally into layout constraints.
 */
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
        stiffness: 400,
        damping: 40,
        mass: 0.8,
      },
    },
  },
};

/**
 * Below `desk` the drawer is a full-screen overlay, and its content sits in the
 * same column as the Hero text (see Hero.tsx) so the menu links read as part of the
 * page layout. Keep these in sync if the Hero column changes.
 * `deskReset` hands positioning back to the original desktop side panel.
 */
const heroColumn =
  "w-full px-8 sm:px-10 sm:pl-15 sm:max-w-lg sm:mx-auto md:-translate-x-5 lg:translate-x-0";
const deskReset = "desk:w-auto desk:p-0 desk:mx-0 desk:max-w-none";

type DrawerProps = {
  /** Flag driving visibility parameters of the drawer module container */
  open: boolean;
  /** Callback execution firing on click interception to collapse visible panel footprints */
  onClose: () => void;
};

/**
 * NavDrawer Component
 * * Primary navigation canvas controller for the portfolio. Orchestrates full-screen
 * entry animations, intercepts page scrolling mechanics via Lenis engine listeners,
 * and handles ultra-smooth programmatic layout jumps utilizing a custom ease curve.
 */
export function NavDrawer({ open, onClose }: DrawerProps) {
  // Local state pipeline indicating which individual link index has focus
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  /**
   * LENIS & CSS SCROLL LOCK INTERCEPTOR
   * * Monitors modal presence states to toggle programmatic document scroll barriers.
   * Prevents double-scrolling bugs by locking background viewport tracking while
   * the menu sits active, gracefully re-initializing default settings on destruction.
   */
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (open) {
      html.classList.add("no-scroll");
      body.classList.add("no-scroll");
      if (window.lenis) window.lenis.stop(); // Ceases Lenis loop event handlers entirely
    } else {
      html.classList.remove("no-scroll");
      body.classList.remove("no-scroll");
      if (window.lenis) window.lenis.start();
    }

    // Safety Cleanup Lifecycle Rule
    return () => {
      html.classList.remove("no-scroll");
      body.classList.remove("no-scroll");
      if (window.lenis) window.lenis.start(); // Guaranteed fallback recovery state
    };
  }, [open]);

  /**
   * LENIS ANCHOR SCROLL CLICK HANDLER
   * * Programmatically navigates the global scroll viewport layout stream.
   * Integrates an exponential base-2 easing function curve `f(t) = 1 - 2^(-10t)`
   * to mimic luxury, slow-decelerating cinematic transitions.
   */
  const handleNavLinkClick = (label: string) => {
    // 1. Instantly wake up the Lenis engine loop so it can accept scroll inputs immediately
    if (window.lenis) {
      window.lenis.start();
    }

    // 2. Trigger state update to slide the drawer out of view
    onClose();

    const lowerLabel = label.toLowerCase();

    // 3. Orchestrate smooth transition paths
    if (window.lenis) {
      if (lowerLabel === "start") {
        // Absolute top layout bounds jump
        window.lenis.scrollTo(0, {
          duration: 1.4,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else if (lowerLabel === "contact") {
        // Absolute bottom layout bounds jump
        window.lenis.scrollTo("bottom", {
          duration: 1.5, // Extended travel time allocated for long page sweeps
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        // Target element string mapping fallback pointer selection matches (#stack, #work)
        const targetId = `#${lowerLabel}`;
        window.lenis.scrollTo(targetId, {
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          offset: -100, // Offset allowance preserving breathing room under fixed layouts
        });
      }
    } else {
      // 4. Native Browser Engine Fallbacks (Used if Lenis instances are unmounted/loading)
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
      {/* Dimming Backing Backdrop Layer:
        Fades in structural dark blocks behind the navdrawer overlay boundary panel area. 
      */}
      <motion.div
        className="fixed inset-0 bg-black z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 0.65 : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{ pointerEvents: open ? "auto" : "none" }}
        onClick={onClose}
      />

      {/* Main Panel Sliding Flyout Layer
        Full-screen overlay on phones and tablets; a 33% side panel on desktop.
      */}
      <motion.aside
        className="fixed top-0 right-0 h-full w-full desk:w-[33%] bg-transparent z-60 overflow-hidden"
        initial={{ x: "100%" }}
        animate={{ x: open ? "0%" : "100%" }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
      >
        {/* Giant Decorative Circle Mask:
          Scales dynamically relative to structural menu opening sequences 
          to present an elegant curving aesthetic container envelope framework look.
          Below `desk` it's centered and sized to ≥2× the viewport height so the
          open (1.15×) curve fully covers tall tablet screens.
        */}
        <motion.div
          className="absolute bg-[#0d0c0c] size-[max(2000px,200vh)] top-1/2 -translate-y-1/2 desk:size-[2000px] desk:top-[-33rem] desk:translate-y-0 left-2 rounded-full"
          initial={{ scale: 1 }}
          animate={{ scale: open ? 1.15 : 1 }}
          transition={{
            duration: open ? 0.55 : 0.3,
            delay: open ? 0.35 : 0,
            ease: "easeOut",
          }}
        />

        {/* Dynamic Mapping Stream Menu Container */}
        <motion.nav
          className="relative z-10 flex h-full items-center text-white desk:block desk:h-auto desk:p-6 desk:translate-x-[-1rem] desk:top-1/3 desk:left-1/3"
          initial="hidden"
          animate={open ? "visible" : "hidden"}
          variants={listVariants}
        >
          <ul
            className={`${heroColumn} ${deskReset} space-y-7 [@media(max-height:500px)]:space-y-4`}
          >
            {["Start", "Stack", "Work", "Contact"].map((label, i) => (
              <motion.li
                key={label}
                variants={itemVariants}
                className="flex items-center text-[#b4b4b4] text-5xl sm:text-6xl [@media(max-height:500px)]:text-3xl desk:text-4xl cursor-pointer font-bold ease-in-out gap-5"
                whileHover={{ x: -9, color: "#fff" }}
                transition={{ type: "tween", duration: 0.2 }}
                onHoverStart={() => setHoveredIndex(i)}
                onHoverEnd={() => setHoveredIndex(null)}
                onClick={() => handleNavLinkClick(label)}
              >
                {/* Clean Abstracted Indicator Subcomponent Block */}
                <NavIndicator index={i} isActive={hoveredIndex === i} />
                {label}
              </motion.li>
            ))}
          </ul>
        </motion.nav>

        {/* Global External Link Platforms Anchor Footer Panel
          Phones: left edge aligned with the links (matches heroColumn's px-8).
          Tablets + desktop: anchored to the bottom-right corner.
        */}
        <div className="absolute bottom-8 left-8 sm:left-auto sm:right-10 flex gap-5 items-center">
          <motion.div
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
                alt="Github project portal resource link"
                className="opacity-50 hover:opacity-100 transition duration-200 ease-in cursor-pointer"
              />
            </a>
          </motion.div>

          <motion.div
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
                alt="Instagram profile media platform link"
                className="opacity-47 hover:opacity-100 transition duration-200 ease-in cursor-pointer"
              />
            </a>
          </motion.div>
        </div>
      </motion.aside>
    </div>
  );
}
