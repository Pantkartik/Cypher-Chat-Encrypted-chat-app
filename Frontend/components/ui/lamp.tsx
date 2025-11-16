"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BackgroundShaderSimple } from "@/components/ui/background-shader-simple";

export function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.7, y: 200 }}
        whileInView={{ opacity: 1, y: 100 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-16 bg-gradient-to-br from-slate-100 to-slate-300 py-4 bg-clip-text text-center text-4xl font-extrabold tracking-tight text-transparent md:text-8xl drop-shadow-2xl"
        style={{ 
          transform: "translateZ(0px)", 
          backfaceVisibility: "hidden", 
          willChange: "filter, opacity",
          filter: "blur(0px) brightness(1.2)",
          opacity: 1
        }}
      >
        Encrypted Messages
      </motion.h1>
    </LampContainer>
  );
}

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 w-full rounded-md z-0",
        className
      )}
    >
      {/* Background Image */}
      <div 
          className="absolute inset-0 z-0 opacity-70"
          style={{
            backgroundImage: "url('/sliding-parallax.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "blur(0px) grayscale(20%) brightness(0.8) contrast(1.1) saturate(0.8)"
          }}
        />
      {/* Gradient Overlay - dark at top, visible at bottom */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.05) 50%, transparent 100%)"
        }}
      />
      {/* Gradient Overlay - dark from top-left corner */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: "radial-gradient(ellipse at top left, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 25%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 75%, transparent 100%)"
        }}
      />
      {/* Gradient Overlay - additional left-side darkening */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, transparent 70%)"
        }}
      />
      {/* Gradient Overlay - more darkening at bottom */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.6) 100%)"
        }}
      />
      {/* Background Shader */}
      <BackgroundShaderSimple />
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-10">
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-slate-950 blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-25 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-[20rem] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 opacity-45 blur-3xl"></div>
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[22rem] rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 blur-2xl opacity-55"
        ></motion.div>
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-1 w-[30rem] -translate-y-[24rem] bg-gradient-to-r from-blue-600 to-cyan-500 opacity-65"
        ></motion.div>

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[28rem] bg-slate-950 "></div>
      </div>

      <div className="relative z-20 flex -translate-y-[36rem] flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};