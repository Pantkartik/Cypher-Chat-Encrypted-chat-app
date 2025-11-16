"use client"

import { motion } from "framer-motion"
import { ArrowUp, Shield, Lock, CheckCircle, Mail, Phone, MapPin, Github, Twitter, Linkedin, Instagram } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { Button } from "@/components/ui/button"

function handleScrollTop() {
  window.scroll({
    top: 0,
    behavior: "smooth",
  })
}

const Footer = () => {
  const { theme, setTheme } = useTheme()

  const footerLinks = {
    product: [
      { name: "Features", href: "#features" },
      { name: "Security", href: "#security" },
      { name: "Pricing", href: "#pricing" },
      { name: "API", href: "/api" },
    ],
    company: [
      { name: "About", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Contact Us", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
    social: [
      { name: "Twitter", href: "https://twitter.com", icon: Twitter },
      { name: "LinkedIn", href: "https://linkedin.com/in/pantkartik", icon: Linkedin },
      { name: "Github", href: "https://github.com/Pantkartik", icon: Github },
      { name: "Instagram", href: "https://instagram.com", icon: Instagram },
    ],
  }

  return (
    <footer className="border-t border-border/40 bg-gradient-to-br from-card/30 via-background/90 to-card/30 backdrop-blur-xl relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(37,211,102,0.03)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(52,183,241,0.03)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 flex flex-col space-y-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="w-12 h-12 bg-gradient-to-br from-primary via-accent to-secondary rounded-xl flex items-center justify-center shadow-lg shadow-black/20"
              >
                <Lock className="w-6 h-6 text-white" />
              </motion.div>
              <div className="relative">
                <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Cypher Chat
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full"></div>
              </div>
            </Link>
            
            <p className="text-muted-foreground/90 leading-relaxed max-w-md">
              Premium encrypted messaging with modern design and unparalleled security. 
              Built with military-grade encryption for your privacy.
            </p>
            
            <div className="flex items-center space-x-2 text-sm">
              <div className="flex items-center space-x-1 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full px-3 py-1">
                <Shield className="w-4 h-4 text-accent" />
                <span className="text-muted-foreground">End-to-End Encrypted</span>
              </div>
              <div className="flex items-center space-x-1 bg-gradient-to-r from-accent/10 to-secondary/10 rounded-full px-3 py-1">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">GDPR Compliant</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/40 mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
          {/* Copyright */}
          <div className="text-center lg:text-left">
            <p className="text-muted-foreground/80 text-sm">
              © 2025 Cypher Chat. Built with security and privacy in mind.
            </p>
            <p className="text-muted-foreground/60 text-xs mt-1">
              All rights reserved. Protected by end-to-end encryption.
            </p>
          </div>

          {/* Social Links & Scroll Top */}
          <div className="flex items-center space-x-6">
            {/* Social Icons */}
            <div className="flex items-center space-x-3">
              {footerLinks.social.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm rounded-lg flex items-center justify-center border border-border/30 hover:border-primary/50 transition-all duration-300 group"
                  >
                    <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  </motion.a>
                )
              })}
            </div>

            {/* Scroll to Top Button */}
            <motion.button
              onClick={handleScrollTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-primary/30 hover:border-primary/50 transition-all duration-300 group"
            >
              <ArrowUp className="w-4 h-4 text-primary group-hover:scale-110 transition-transform duration-300" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer