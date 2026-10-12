"use client";

import { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

// App-wide Framer Motion settings.
//
// reducedMotion="user": when the OS "Reduce motion" setting is on, Framer skips
// transform and layout animations (movement) but keeps opacity/color fades, so
// reveals still read without anything sliding or floating. The CSS side of this
// lives in the reduced-motion block at the bottom of globals.css.
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
