"use client";

import { useEffect, useState, ReactNode } from "react";

interface FadeLeftWrapperProps {
  children: ReactNode;
  delay?: number;    // in milliseconds
  duration?: number; // in milliseconds
}

export default function FadeLeftWrapper({
  children,
  delay = 0,
  duration = 500,
}: FadeLeftWrapperProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      style={{
        transform: mounted ? "translateX(0)" : "translateX(50px)",
        opacity: mounted ? 1 : 0,
        transition: `transform ${duration}ms ease-out ${delay}ms, opacity ${duration}ms ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
