"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { GooeyText } from "@/components/ui/gooey-text-morphing";

export function LampDemo() {
  return (
    <LampContainer>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeOut"
        }}
        className="max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          transition={{
            delay: 0.5,
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          <GooeyText
            texts={["Cypher Chat", "Encrypted Messages", "Secure Communication", "Private Conversations"]}
            morphTime={2.0}
            cooldownTime={0.8}
            className="font-bold"
            textClassName="text-4xl md:text-7xl font-extrabold bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-transparent tracking-tight"
          />
        </motion.div>
      </motion.div>
    </LampContainer>
  );
}