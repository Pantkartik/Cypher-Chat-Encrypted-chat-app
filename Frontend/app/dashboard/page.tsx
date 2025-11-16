"use client"

export const dynamic = 'force-dynamic';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Plus, MessageSquare, TrendingUp, Shield, Clock, Sparkles } from "lucide-react"
import Link from "next/link"
import React, { useEffect, useState } from "react";
import { UserMenu } from "@/components/user-menu";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [users, setUsers] = useState<Array<{id: string, name: string}>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Create an AbortController to timeout the request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    fetch("http://localhost:3000/api/users", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => {
        clearTimeout(timeoutId);
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        clearTimeout(timeoutId);
        // Silently handle errors during build or when backend is not available
        setError(err.name === 'AbortError' ? 'Request timeout' : err.message);
        setLoading(false);
      });

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/50 to-muted/30">
      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="border-b border-border/20 backdrop-blur-xl bg-background/60 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary via-primary/80 to-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Cypher Chat
                </span>
                <p className="text-xs text-muted-foreground">Secure • Private • Encrypted</p>
              </div>
            </motion.div>

            <div className="flex items-center space-x-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <UserMenu />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1 
            className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Welcome to Cypher Chat
          </motion.h1>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Start a secure conversation or join an existing chat session with end-to-end encryption
          </motion.p>
          <motion.div 
            className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Shield className="w-4 h-4 text-primary" />
            <span>100% Private • Zero Data Storage</span>
            <span className="text-border">•</span>
            <Sparkles className="w-4 h-4 text-accent" />
            <span>Quantum-Resistant Encryption</span>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ y: -5 }}
            className="group"
          >
            <Card className="border-border/30 hover:border-primary/50 transition-all duration-300 cursor-pointer group h-full bg-gradient-to-br from-card via-card/90 to-muted/20 shadow-lg hover:shadow-xl hover:shadow-primary/10">
              <CardHeader className="pb-6">
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-br from-primary via-primary/90 to-accent rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary/20 group-hover:shadow-xl group-hover:shadow-primary/30 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Plus className="w-8 h-8 text-white" />
                </motion.div>
                <CardTitle className="text-2xl mb-3 group-hover:text-primary transition-colors duration-300">
                  Host a Chat
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Create a new secure chat session and invite others with a QR code or token
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/session/host">
                  <Button className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-accent text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 group-hover:scale-105">
                    Create Session
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ y: -5 }}
            className="group"
          >
            <Card className="border-border/30 hover:border-accent/50 transition-all duration-300 cursor-pointer group h-full bg-gradient-to-br from-card via-card/90 to-muted/20 shadow-lg hover:shadow-xl hover:shadow-accent/10">
              <CardHeader className="pb-6">
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-br from-accent via-accent/90 to-secondary rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-accent/20 group-hover:shadow-xl group-hover:shadow-accent/30 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                >
                  <Users className="w-8 h-8 text-white" />
                </motion.div>
                <CardTitle className="text-2xl mb-3 group-hover:text-accent transition-colors duration-300">
                  Join a Chat
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Enter a session token or scan a QR code to join an existing chat
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/session/join">
                  <Button variant="outline" className="w-full bg-transparent border-2 hover:bg-gradient-to-r hover:from-accent hover:to-secondary hover:text-white hover:border-transparent transition-all duration-300 group-hover:scale-105">
                    Join Session
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <Card className="border-border/30 bg-gradient-to-br from-card via-card/90 to-muted/10 shadow-xl shadow-primary/5">
            <CardHeader className="border-b border-border/20 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <Clock className="w-6 h-6 text-primary" />
                    Recent Sessions
                  </CardTitle>
                  <CardDescription className="text-base mt-1">
                    Your recent chat sessions and activity history
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  Coming Soon
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-8">
              <motion.div 
                className="text-center py-12 text-muted-foreground"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center"
                >
                  <MessageSquare className="w-8 h-8 text-primary" />
                </motion.div>
                <p className="text-lg font-medium mb-2">No recent sessions</p>
                <p className="text-sm max-w-md mx-auto leading-relaxed">
                  Your secure chat history will appear here once you start your first encrypted conversation
                </p>
                <motion.div
                  className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8 }}
                >
                  <Shield className="w-4 h-4 text-primary" />
                  <span>All conversations are end-to-end encrypted</span>
                </motion.div>
              </motion.div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 rounded-xl border border-border/30">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Backend Connection Status</h3>
                </div>
                {loading ? (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full"
                    />
                    <span>Connecting to secure servers...</span>
                  </div>
                ) : error ? (
                  <div className="flex items-center gap-3 text-destructive">
                    <Shield className="w-4 h-4" />
                    <span>Connection issue: {error}</span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-primary">
                      <Shield className="w-4 h-4" />
                      <span className="font-medium">Secure connection established</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                      {users.map((user) => (
                        <motion.div
                          key={user.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center gap-2 p-2 bg-card/50 rounded-lg border border-border/20"
                        >
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <span className="text-sm font-medium">{user.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-secondary/5 rounded-full blur-3xl opacity-50"></div>
      </div>
    </div>
  )
}