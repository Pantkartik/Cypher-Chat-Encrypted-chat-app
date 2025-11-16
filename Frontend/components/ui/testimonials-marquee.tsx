"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Senior Security Analyst",
    company: "Tata Consultancy Services",
    content: "Finally found a chat app that takes privacy seriously! The encryption is solid and the interface is clean. Had some minor sync issues initially but support team resolved it quickly. Perfect for our team's confidential discussions.",
    rating: 4,
    avatar: "PS"
  },
  {
    id: 2,
    name: "Arjun Patel",
    role: "Product Manager",
    company: "Swiggy",
    content: "The QR code room sharing is genius! Makes onboarding new team members so much easier. Love that there are no ads or data tracking. Only wish the mobile app was available sooner.",
    rating: 5,
    avatar: "AP"
  },
  {
    id: 3,
    name: "Ananya Iyer",
    role: "Healthcare IT Consultant",
    company: "Self Employed",
    content: "As someone working with sensitive patient data, this app is a lifesaver. The zero-knowledge architecture gives me confidence that client information stays private. Interface could be more intuitive but security makes up for it.",
    rating: 4,
    avatar: "AI"
  },
  {
    id: 4,
    name: "Vikram Singh",
    role: "Startup Founder",
    company: "FinTech Startup",
    content: "Exactly what we needed for discussing confidential business strategies. The unlimited rooms feature is perfect for different projects. Customer support is responsive and helpful. Highly recommend for any business dealing with sensitive info.",
    rating: 5,
    avatar: "VS"
  },
  {
    id: 5,
    name: "Neha Gupta",
    role: "Project Coordinator",
    company: "Infosys",
    content: "Great app for team collaboration! The encryption gives us peace of mind when sharing project details. File sharing works smoothly. Took a day to get used to the interface but now it's second nature.",
    rating: 4,
    avatar: "NG"
  },
  {
    id: 6,
    name: "Rahul Mehta",
    role: "Software Developer",
    company: "Freshworks",
    content: "Love the simplicity and focus on privacy. No phone number required is a huge plus! The real-time messaging is fast and reliable. Been using it for 3 months now with zero issues. Waiting for the mobile version!",
    rating: 5,
    avatar: "RM"
  },
  {
    id: 7,
    name: "Sneha Reddy",
    role: "Business Analyst",
    company: "Deloitte",
    content: "Perfect for client communications. The professional look and feel impresses our clients. Love that conversations are truly private. Setup was straightforward and the team picked it up quickly.",
    rating: 5,
    avatar: "SR"
  },
  {
    id: 8,
    name: "Amit Kumar",
    role: "IT Administrator",
    company: "Wipro",
    content: "Solid encryption and reliable performance. The fact that even the company can't access our data is exactly what we need. Some team members found the initial setup slightly confusing but documentation helped.",
    rating: 4,
    avatar: "AK"
  }
]

// Duplicate testimonials for seamless loop
const duplicatedTestimonials = [...testimonials, ...testimonials]

export function TestimonialsMarquee() {
  return (
    <section className="py-20 bg-gradient-to-br from-background via-card/30 to-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(37,211,102,0.05)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(52,183,241,0.05)_0%,transparent_50%)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent drop-shadow-xl">
              Trusted by Professionals
            </span>
          </h2>
          <p className="text-xl text-muted-foreground/90 max-w-2xl mx-auto drop-shadow-lg">
            See what industry leaders are saying about their secure communication experience
          </p>
        </motion.div>

        {/* Marquee Container */}
        <div className="relative overflow-hidden">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10"></div>

          {/* Animated marquee */}
          <motion.div
            className="flex gap-8 py-4"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="flex-shrink-0 w-80"
              >
                <Card className="h-full bg-gradient-to-br from-card/80 via-card/60 to-card/40 backdrop-blur-xl border-border/40 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/20 group">
                  <CardContent className="p-8 h-full flex flex-col">
                    {/* Quote icon */}
                    <div className="mb-6">
                      <Quote className="w-8 h-8 text-primary/50 rotate-180" />
                    </div>

                    {/* Rating */}
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-accent text-accent"
                        />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-muted-foreground leading-relaxed mb-6 flex-grow drop-shadow-md">
                      {testimonial.content}
                    </p>

                    {/* Author info */}
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary via-accent to-secondary rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-bold text-sm">
                          {testimonial.avatar}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground drop-shadow-md">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-muted-foreground drop-shadow-sm">
                          {testimonial.role} at {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </motion.div>

          {/* Second row moving in opposite direction */}
          <motion.div
            className="flex gap-8 py-4 mt-8"
            animate={{
              x: ["-50%", "0%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 35,
                ease: "linear",
              },
            }}
          >
            {duplicatedTestimonials.slice().reverse().map((testimonial, index) => (
              <div
                key={`${testimonial.id}-reverse-${index}`}
                className="flex-shrink-0 w-80"
              >
                <Card className="h-full bg-gradient-to-br from-card/80 via-card/60 to-card/40 backdrop-blur-xl border-border/40 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/20 group">
                  <CardContent className="p-8 h-full flex flex-col">
                    {/* Quote icon */}
                    <div className="mb-6">
                      <Quote className="w-8 h-8 text-primary/50 rotate-180" />
                    </div>

                    {/* Rating */}
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-accent text-accent"
                        />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                      {testimonial.content}
                    </p>

                    {/* Author info */}
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary via-accent to-secondary rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-bold text-sm">
                          {testimonial.avatar}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role} at {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mobile App Announcement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 mb-12"
        >
          <div className="bg-gradient-to-br from-slate-900/50 via-slate-800/40 to-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(37,211,102,0.05)_0%,transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(52,183,241,0.05)_0%,transparent_50%)]"></div>
            
            <div className="relative z-10">
              <div className="flex justify-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 20.5v-17c0-.8.7-1.5 1.5-1.5h15c.8 0 1.5.7 1.5 1.5v17c0 .8-.7 1.5-1.5 1.5h-15c-.8 0-1.5-.7-1.5-1.5zM16.5 8l-4.5 4.5-2-2-5.5 5.5 1.5 1.5 4-4 2 2 4.5-4.5z"/>
                  </svg>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-gray-500/20 to-gray-600/20 border border-gray-500/30 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.5-3.05 2.5h-4.62c-1.34 0-2.22-1.26-3.05-2.5 0 0-1.24-2.5-2.83-2.5s-2.83 2.5-2.83 2.5c-.83 1.24-1.71 2.5-3.05 2.5h-1.38v-14c0-1.38 1.12-2.5 2.5-2.5h15c1.38 0 2.5 1.12 2.5 2.5v14h-1.29zM16.5 8l-4.5 4.5-2-2-5.5 5.5 1.5 1.5 4-4 2 2 4.5-4.5z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Mobile Apps Coming Soon</h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto mb-6">
                Take your secure conversations anywhere. Native Android and iOS apps launching soon on Play Store and App Store.
              </p>
              <div className="flex justify-center gap-3">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2 flex items-center gap-2 hover:bg-white/10 transition-colors">
                  <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
                    <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.2 15.2c.5-.5.5-1.3 0-1.8l-8.5-8.5c-.5-.5-1.3-.5-1.8 0l-8.5 8.5c-.5.5-.5 1.3 0 1.8l8.5 8.5c.5.5 1.3.5 1.8 0l8.5-8.5z"/>
                    </svg>
                  </div>
                  <span className="text-xs text-slate-200 font-medium">Google Play</span>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2 flex items-center gap-2 hover:bg-white/10 transition-colors">
                  <div className="w-4 h-4 bg-gray-800 rounded flex items-center justify-center">
                    <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.5-3.05 2.5h-4.62c-1.34 0-2.22-1.26-3.05-2.5 0 0-1.24-2.5-2.83-2.5s-2.83 2.5-2.83 2.5c-.83 1.24-1.71 2.5-3.05 2.5h-1.38v-14c0-1.38 1.12-2.5 2.5-2.5h15c1.38 0 2.5 1.12 2.5 2.5v14h-1.29zM16.5 8l-4.5 4.5-2-2-5.5 5.5 1.5 1.5 4-4 2 2 4.5-4.5z"/>
                    </svg>
                  </div>
                  <span className="text-xs text-slate-200 font-medium">App Store</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: "2,847", label: "Active Users" },
            { number: "4.7★", label: "Average Rating" },
            { number: "156K+", label: "Messages Encrypted" },
            { number: "99.8%", label: "Uptime" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}