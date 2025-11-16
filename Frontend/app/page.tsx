"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield, Zap, Users, Lock, QrCode, MessageSquare, Moon, Sun, CheckCircle, Star, TrendingUp, Network } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { LampDemo } from "@/components/ui/lamp-demo"
import { HorizonHeroSection } from "@/components/ui/horizon-hero-section"
import Footer from "@/components/ui/footer"
import Header from "@/components/ui/header"
import { TestimonialsMarquee } from "@/components/ui/testimonials-marquee"

export default function LandingPage() {
  const { theme, setTheme } = useTheme()
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }
    
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth'
    
    // Use passive event listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Trigger animations on mount
    setIsVisible(true)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  const features = [
    {
      icon: Shield,
      title: "End-to-End Encryption",
      description: "Military-grade encryption ensures your conversations stay private and secure.",
      color: "text-accent",
      gradient: "from-accent/20 to-accent/10",
      stats: "99.9% Secure",
    },
    {
      icon: QrCode,
      title: "QR Code Sharing",
      description: "Share chat sessions instantly with secure QR codes. No complex setup required.",
      color: "text-primary",
      gradient: "from-primary/20 to-primary/10",
      stats: "Instant Setup",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Real-time messaging with smooth animations and instant delivery.",
      color: "text-secondary",
      gradient: "from-secondary/20 to-secondary/10",
      stats: "< 100ms Latency",
    },
    {
      icon: Users,
      title: "Host & Join",
      description: "Create secure chat rooms or join existing ones with a simple token.",
      color: "text-accent",
      gradient: "from-accent/20 to-accent/10",
      stats: "Unlimited Rooms",
    },
  ]



  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card">
      {/* Enhanced Header */}
      <Header scrollY={scrollY} />

      {/* Hero Section with Lamp Effect */}
      <section className="relative overflow-hidden">
        <LampDemo />
      </section>

      {/* Horizon Hero Section with 3D Effects */}
      <HorizonHeroSection />

      {/* Testimonials Section */}
      <TestimonialsMarquee />

      {/* Features Section */}
      <section className="py-32 bg-gradient-to-br from-background via-card/50 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,211,102,0.03)_0%,transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(7,94,84,0.05)_0%,transparent_50%),radial-gradient(circle_at_70%_80%,rgba(52,183,241,0.05)_0%,transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-20"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge variant="secondary" className="mb-6 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 text-primary border-primary/40 backdrop-blur-sm px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                Premium Features
              </Badge>
            </motion.div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent drop-shadow-xl">
                Everything you need
              </span>
              <br />
              <span className="text-muted-foreground drop-shadow-lg">
                for secure communication
              </span>
            </h2>
            <p className="text-xl text-muted-foreground/90 max-w-3xl mx-auto text-pretty leading-relaxed drop-shadow-lg">
              Built with military-grade encryption and designed for seamless user experience. 
              Experience the future of private messaging.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <Card
                  className="group cursor-pointer transition-all duration-700 hover:shadow-2xl hover:shadow-accent/30 border-border/40 hover:border-primary/50 bg-gradient-to-br from-card/60 via-card/40 to-card/20 backdrop-blur-xl h-full"
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <CardContent className="p-8 relative overflow-hidden h-full flex flex-col">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700`}></div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-700"></div>
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <motion.div
                        animate={{ 
                          scale: hoveredFeature === index ? 1.1 : 1,
                          rotate: hoveredFeature === index ? 5 : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-8 shadow-2xl shadow-black/20`}
                      >
                        <feature.icon className={`w-10 h-10 ${feature.color} drop-shadow-lg`} />
                      </motion.div>
                      
                      <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-all duration-300 drop-shadow-lg">
                        {feature.title}
                      </h3>
                      
                      <p className="text-muted-foreground/95 text-base leading-relaxed mb-6 flex-grow drop-shadow-md">
                        {feature.description}
                      </p>
                      
                      <motion.div 
                        className="flex items-center text-sm font-bold text-primary group-hover:text-accent transition-all duration-300"
                        animate={{ x: hoveredFeature === index ? 5 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CheckCircle className="w-5 h-5 mr-3" />
                        <span>{feature.stats}</span>
                        <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-20"
          >
            <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 backdrop-blur-sm rounded-2xl px-8 py-4 border border-border/30">
              <Shield className="w-6 h-6 text-accent drop-shadow-lg" />
              <span className="text-muted-foreground font-medium drop-shadow-lg">
                All features include enterprise-grade security and end-to-end encryption
              </span>
              <Lock className="w-6 h-6 text-primary drop-shadow-lg" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
   

      {/* Footer */}
      <Footer />
    </div>
  )
}