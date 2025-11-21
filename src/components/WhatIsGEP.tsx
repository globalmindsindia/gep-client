import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Users, Home, GraduationCap, Briefcase, UserCheck, X, CheckCircle, Building, Shield, Sparkles, DollarSign } from "lucide-react";

export default function WhatIsGEP() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const targetAudience = [
    {
      icon: Home,
      title: "Homemakers",
      description: "Who want to contribute without stepping outside",
    },
    {
      icon: GraduationCap,
      title: "Teachers",
      description: "Who guide hundreds of students every year",
    },
    {
      icon: Briefcase,
      title: "Working Professionals",
      description: "Who inspire their circle",
    },
    {
      icon: UserCheck,
      title: "Retired Individuals",
      description: "Who still want to impact lives",
    },
    {
      icon: Users,
      title: "Young Graduates",
      description: "Seeking income with purpose",
    },
    {
      icon: Users,
      title: "Anyone",
      description: "Who has a network, goodwill, and the heart to help others",
    },
  ];

  return (
    <section id="what-is-gep" ref={ref} className="relative py-8 overflow-hidden">
      <motion.div style={{ y }} className="mx-auto px-6 lg:px-16 xl:px-32 2xl:px-48 relative z-10">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block bg-white/10 backdrop-blur-md rounded-full px-8 py-4 border border-white/20 mb-8"
          >
            <span className="text-white font-semibold text-lg flex items-center gap-2"><Sparkles className="w-4 h-4" /> What Is This Programme?</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white leading-tight">
            The{" "}
            <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
              Global Education Partner
            </span>
            <br />Programme
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20"
            >
              <X className="w-16 h-16 text-red-400 mb-4 mx-auto" />
              <h3 className="text-2xl font-bold mb-4 text-white">NOT Just a Referral System</h3>
              <p className="text-lg text-white/80">This goes beyond simple referrals</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20"
            >
              <Target className="w-16 h-16 text-yellow-300 mb-4 mx-auto" />
              <h3 className="text-2xl font-bold mb-4 text-yellow-300">A Life-Changing Mission</h3>
              <p className="text-lg text-white/90">Help students build global careers while empowering yourself</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Target Audience Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
              className="inline-block bg-white/10 backdrop-blur-md rounded-full px-8 py-4 border border-white/20 mb-6"
            >
              <span className="text-white font-semibold text-lg flex items-center gap-2"><Users className="w-4 h-4" /> Perfect For</span>
            </motion.div>
            <h3 className="text-3xl font-bold text-white mb-4">Who Is This Programme For?</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {targetAudience.map((audience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05, rotateY: 5 }}
                className="group relative"
              >
                <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 overflow-hidden h-full flex flex-col justify-between">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 text-center flex-1 flex flex-col justify-center">
                    <motion.div 
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-300 to-orange-400 flex items-center justify-center mb-6 mx-auto shadow-lg"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <audience.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    <h4 className="text-xl font-bold mb-3 text-white min-h-[3rem] flex items-center justify-center">{audience.title}</h4>
                    <p className="text-white/80 text-center">{audience.description}</p>
                    
                    <div className="absolute top-4 right-4 w-8 h-8 bg-yellow-400/20 rounded-full blur-sm" />
                    <div className="absolute bottom-4 left-4 w-6 h-6 bg-orange-500/20 rounded-full blur-sm" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Key Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mt-20"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 2 }}
                className="inline-block bg-white/10 backdrop-blur-md rounded-full px-8 py-4 border border-white/20 mb-6"
              >
                <span className="text-white font-semibold text-lg flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Zero Requirements</span>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                { icon: Building, title: "No Office", desc: "Work from anywhere" },
                { icon: GraduationCap, title: "No Experience", desc: "We'll train you" },
                { icon: Shield, title: "No Risk", desc: "Zero investment needed" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 2.2 + index * 0.2 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 text-center group"
                >
                  <item.icon className="w-12 h-12 text-yellow-300 mb-4 mx-auto" />
                  <h4 className="text-2xl font-bold mb-2 text-yellow-300">{item.title}</h4>
                  <p className="text-white/80">{item.desc}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 2.8 }}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 text-center"
            >
              <Sparkles className="w-16 h-16 text-yellow-300 mb-6 mx-auto" />
              <h3 className="text-3xl font-bold mb-4 text-white">Simple Success Formula</h3>
              <p className="text-xl text-white/90 mb-6">Just your ability to connect one dream to the right direction</p>
              <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                <p className="text-2xl font-bold text-yellow-300 flex items-center justify-center gap-2">
                  Every Successful Registration = You Earn <DollarSign className="w-6 h-6" />
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
      </motion.div>
    </section>
  );
}