"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface FloatingParticlesProps {
  className?: string;
}

export default function FloatingParticles({ className = "" }: FloatingParticlesProps) {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 3,
    color: i % 3 === 0 ? 'from-gray-400/10 to-transparent' : i % 3 === 1 ? 'from-blue-400/10 to-transparent' : 'from-purple-400/10 to-transparent',
  }));

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [-10, 10, -10],
            x: [-5, 5, -5],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className={`w-full h-full rounded-full bg-gradient-to-r ${particle.color}`} />
        </motion.div>
      ))}
    </div>
  );
}