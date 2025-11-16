"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GooeyTextProps {
  texts: string[];
  morphTime?: number;
  cooldownTime?: number;
  className?: string;
  textClassName?: string;
}

export function GooeyText({
  texts,
  morphTime = 1,
  cooldownTime = 0.25,
  className,
  textClassName
}: GooeyTextProps) {
  const text1Ref = React.useRef<HTMLSpanElement>(null);
  const text2Ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    let textIndex = texts.length - 1;
    let time = new Date();
    let morph = 0;
    let cooldown = cooldownTime;
    let animationId: number;

    // Smooth easing function (ease-in-out-cubic)
    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const setMorph = (fraction: number) => {
      if (text1Ref.current && text2Ref.current) {
        // Apply easing for smoother transitions
        const easedFraction = easeInOutCubic(fraction);
        
        // Smoother blur calculation with easing
        const blur2 = Math.min(8 / Math.max(easedFraction, 0.01) - 8, 100);
        const opacity2 = Math.pow(easedFraction, 0.4) * 100;
        
        text2Ref.current.style.filter = `blur(${blur2}px)`;
        text2Ref.current.style.opacity = `${opacity2}%`;

        const easedFraction1 = easeInOutCubic(1 - fraction);
        const blur1 = Math.min(8 / Math.max(easedFraction1, 0.01) - 8, 100);
        const opacity1 = Math.pow(easedFraction1, 0.4) * 100;
        
        text1Ref.current.style.filter = `blur(${blur1}px)`;
        text1Ref.current.style.opacity = `${opacity1}%`;
      }
    };

    const doCooldown = () => {
      morph = 0;
      if (text1Ref.current && text2Ref.current) {
        // Smooth transition to final state
        text2Ref.current.style.transition = "filter 0.3s ease-out, opacity 0.3s ease-out";
        text2Ref.current.style.filter = "";
        text2Ref.current.style.opacity = "100%";
        text1Ref.current.style.transition = "filter 0.3s ease-out, opacity 0.3s ease-out";
        text1Ref.current.style.filter = "";
        text1Ref.current.style.opacity = "0%";
        
        // Reset transitions after animation
        setTimeout(() => {
          if (text1Ref.current && text2Ref.current) {
            text1Ref.current.style.transition = "";
            text2Ref.current.style.transition = "";
          }
        }, 300);
      }
    };

    const doMorph = () => {
      morph -= cooldown;
      cooldown = 0;
      let fraction = morph / morphTime;

      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }

      setMorph(fraction);
    };

    function animate() {
      animationId = requestAnimationFrame(animate);
      const newTime = new Date();
      const shouldIncrementIndex = cooldown > 0;
      const dt = (newTime.getTime() - time.getTime()) / 1000;
      time = newTime;

      cooldown -= dt;

      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex = (textIndex + 1) % texts.length;
          if (text1Ref.current && text2Ref.current) {
            text1Ref.current.textContent = texts[textIndex % texts.length];
            text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];
          }
        }
        doMorph();
      } else {
        doCooldown();
      }
    }

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [texts, morphTime, cooldownTime]);

  return (
    <div className={cn("relative", className)}>
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      <div
        className="flex items-center justify-center"
        style={{ 
          filter: "url(#threshold)",
          transform: "translateZ(0)", // Hardware acceleration
          backfaceVisibility: "hidden", // Prevent flickering
          willChange: "transform, opacity" // Optimize for animations
        }}
      >
        <span
          ref={text1Ref}
          className={cn(
            "absolute inline-block select-none text-center text-6xl md:text-[60pt]",
            "text-foreground",
            "antialiased", // Better text rendering
            textClassName
          )}
          style={{
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
            willChange: "filter, opacity"
          }}
        />
        <span
          ref={text2Ref}
          className={cn(
            "absolute inline-block select-none text-center text-6xl md:text-[60pt]",
            "text-foreground",
            "antialiased", // Better text rendering
            textClassName
          )}
          style={{
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
            willChange: "filter, opacity"
          }}
        />
      </div>
    </div>
  );
}