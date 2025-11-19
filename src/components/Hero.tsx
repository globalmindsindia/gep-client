"use client";

import { motion } from "framer-motion";
import { Award, Users, GraduationCap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Image from "next/image";
import GEPHeroImage from "@/assets/GEP_Hero.png";

interface HeroProps {
  onRegisterClick: () => void;
}

export default function Hero({ onRegisterClick }: HeroProps) {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Column: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center space-y-4"
          >
            {/* Top Row: Badge and Heading */}
            <div className="space-y-3">
              <motion.div
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 w-fit"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Award className="w-3 h-3 text-yellow-300" />
                <span className="text-xs font-medium text-white">Global Education Excellence</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <h1 className="text-2xl lg:text-4xl xl:text-5xl font-bold leading-tight text-white">
                  Want to Become a{" "}
                  <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                    Global Education Partner
                  </span>{" "}
                  with Global Minds India?
                </h1>
              </motion.div>
            </div>

            {/* Key Message Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="bg-gradient-to-r from-white/15 to-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-lg"
            >
              <div className="text-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                    Your Time, Your Trust, Your Talent
                  </h2>
                  <p className="text-lg lg:text-xl font-semibold text-white">
                    Now Has the Power to Change Someone's Life
                  </p>
                </div>
                
                {/* Trust Points - Elegant Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                  {[
                    { icon: "✨", text: "People ask you for guidance" },
                    { icon: "👨👩👧👦", text: "Parents seek your opinion" },
                    { icon: "🎓", text: "Students look to you for direction" },
                    { icon: "🏠", text: "Neighbours value your advice" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="bg-white/10 rounded-2xl p-4 text-center space-y-2 hover:bg-white/20 transition-all duration-300 border border-white/10"
                    >
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <p className="text-sm text-white/90 leading-tight font-medium">{item.text}</p>
                    </motion.div>
                  ))}
                </div>
                
                {/* Call to Action Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="mt-6 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-2xl p-4 border border-yellow-300/30"
                >
                  <p className="text-lg font-bold text-yellow-300 mb-2">
                    If you are that trusted person —
                  </p>
                  <p className="text-base text-white font-medium">
                    It's time to turn your goodness into a meaningful opportunity
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Bottom Row: Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  onClick={onRegisterClick}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold px-6 py-3 text-base rounded-full shadow-2xl w-full sm:w-auto"
                >
                  Register Now
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 px-6 py-3 text-base rounded-full w-full sm:w-auto"
                >
                  <a href="https://www.globalmindsindia.com/global-educational-partner/" target="_blank" rel="noopener noreferrer">
                    Learn More
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column: Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="flex justify-center items-center"
          >
            <div className="relative">
              {/* Decorative background circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl scale-110"></div>
              
              {/* Image without container */}
              <Image
                src={GEPHeroImage}
                alt="Global Education Partner Hero"
                width={500}
                height={600}
                className="relative rounded-2xl object-contain w-full h-auto max-w-md mx-auto"
                priority
              />
            </div>
          </motion.div>
        </div>
        
        {/* Stats Section - Moved outside grid for better positioning */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {[
            { icon: Users, label: "Active Partners", value: "500+", description: "Trusted educators worldwide" },
            { icon: GraduationCap, label: "Students Placed", value: "10,000+", description: "Dreams fulfilled globally" },
            { icon: Users, label: "Countries", value: "25+", description: "International presence" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 text-center shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-2xl p-4 w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-10 h-10 text-yellow-300" />
              </div>
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-white mb-2">{stat.label}</div>
              <div className="text-sm text-white/70">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}