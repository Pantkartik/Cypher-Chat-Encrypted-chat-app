"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function BackgroundShaderSimple() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 80%, rgba(37, 211, 102, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(52, 183, 241, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 80%, rgba(37, 211, 102, 0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Animated orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-3xl"
        animate={{
          x: ["-50%", "50%", "-50%"],
          y: ["-50%", "50%", "-50%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-emerald-500/15 to-teal-500/15 blur-2xl"
        animate={{
          x: ["50%", "-50%", "50%"],
          y: ["50%", "-50%", "50%"],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(37, 211, 102, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37, 211, 102, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
          animate={{
            y: ["-100vh", "100vh"],
            x: [Math.random() * 100 + "%", (Math.random() * 100) + "%"],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
          style={{
            left: Math.random() * 100 + "%",
            top: "-10px",
          }}
        />
      ))}
    </div>
  )
}