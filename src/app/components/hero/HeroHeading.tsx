"use client";

import { useEffect, useState } from "react";

export default function HeroHeading() {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => setAnimate(true));
    }, []);

  const line1 = "Full-stack";
  const line2 = "Developer";
  
  const renderLine = (
    text: string, 
    lineDelay = 0,
    lineClass = ""
  ) => (
    <span className={`block ${lineClass}`}>
        <span className="inline-block">
    <span className={`text-anim ${animate ? "animate" : ""}`}>

            {text.split("").map((char, i) => (
                <span
                    key={i}
                    className="inline-block"
                    style={{ transitionDelay: `${lineDelay + i * 75}ms`,
                }}
                >
                    {char === " " ? "\u00A0" : char}                    
                </span>
            ))}
            </span>
        </span>
    </span>
  );

  return (
    <h1 className="text-7xl shrink-heading font-bold mt-10 mb-6 uppercase leading-[3.9rem] tracking-[-.2rem]">
        {renderLine(line1, 0, "gradient-text")}
        {renderLine(line2, 1300, "text-white max-[1060px]:pl-0 pl-4")}
    </h1>
  );
}
