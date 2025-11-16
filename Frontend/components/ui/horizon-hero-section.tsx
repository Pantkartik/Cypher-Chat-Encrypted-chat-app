"use client";
import React from 'react';
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Zap, ArrowRight } from "lucide-react";
import Scroll3DAnimation from "@/components/scroll-3d-animation";

export const HorizonHeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-card/30 to-background">
      <Scroll3DAnimation />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <Badge variant="secondary" className="mb-6 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 text-primary border-primary/40 backdrop-blur-sm px-6 py-3">
              <Zap className="w-5 h-5 mr-2" />
              Zero-Knowledge Security
            </Badge>
          </motion.div>
          
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent drop-shadow-xl">
              Cypher Chat
            </span>
            <br />
            <span className="text-muted-foreground drop-shadow-lg">
              Where Privacy Meets Innovation
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground/90 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            Experience military-grade encrypted messaging with zero-knowledge architecture. 
            Your conversations stay private with end-to-end encryption, QR code sharing, and decentralized security.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          {/* GitHub Profile Card - Minimal Design */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="relative"
            >
              <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20 bg-slate-800">
                    <img
                      src="/181591353.jpg"
                      alt="Pantkartik"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">Pantkartik</h3>
                    <p className="text-slate-400 text-xs">Full Stack Developer</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center">
                    <div className="text-sm font-medium text-white">42</div>
                    <div className="text-xs text-slate-500">Repos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-white">1.2K</div>
                    <div className="text-xs text-slate-500">Commits</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-white">15</div>
                    <div className="text-xs text-slate-500">Projects</div>
                  </div>
                </div>
                
                <a 
                  href="https://www.github.com/Pantkartik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-slate-800 hover:bg-slate-700 border border-white/10 text-white py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center"
                >
                  View Profile
                </a>
              </div>
            </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-32 text-center"
        >
          <div className="inline-flex flex-col items-center space-y-4">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-muted-foreground/60"
            >
              <ArrowRight className="w-8 h-8 rotate-90" />
            </motion.div>
            <p className="text-muted-foreground/70 text-sm">Start your secure conversation now</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};