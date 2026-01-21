"use client";

import { ReactNode, useEffect, useState } from "react";

interface FadeInWrapperProps {
    children: ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
}

export default function FadeInWrapper({
    children, 
    delay = 0,
    duration = 500, 
    className = "",
}: FadeInWrapperProps) {
    const [isVisible, setIsVisible] = useState(false);

   useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <div
      className={`${className} transition-opacity transform`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0px)" : "translateY(20px)",
        transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
      }}
    >
      {children}
    </div>
  );
}
