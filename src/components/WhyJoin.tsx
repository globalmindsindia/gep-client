import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { DollarSign, HeadphonesIcon, TrendingUp, Users, Clock, Home, Compass, GraduationCap } from "lucide-react";

export default function WhyJoin() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const benefits = [
    {
      icon: Clock,
      title: "Work Your Way",
      description: "From home, after office, on weekends — or full-time. Your schedule, your choice.",
      stats: "✔ Flexible timing",
    },
    {
      icon: DollarSign,
      title: "Zero Investment, Zero Pressure",
      description: "No joining fee. No targets. No marketing cost.",
      stats: "✔ No upfront costs",
    },
    {
      icon: Users,
      title: "Earn for Every Referral",
      description: "A lifetime earning opportunity — as long as your students succeed, you benefit.",
      stats: "✔ Lifetime earnings",
    },
    {
      icon: HeadphonesIcon,
      title: "We Handle Everything",
      description: "Counselling → Admissions → APS → Visa → Accommodation → Hotline. You just connect the students.",
      stats: "✔ Full support",
    },
    {
      icon: Home,
      title: "A Perfect Fit for Homemakers",
      description: "Who want to be financially independent",
      stats: "✔ Financial freedom",
    },
    {
      icon: Users,
      title: "Perfect for Everyone",
      description: "Teachers, graduates, retirees, working employees wanting meaningful engagement",
      stats: "✔ Purpose-driven work",
    },
  ];

  return (
    <section id="why-join" ref={ref} className="relative py-12 overflow-hidden">

      <motion.div style={{ y }} className="mx-auto px-6 lg:px-16 xl:px-32 2xl:px-48 relative z-10">
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
            <span className="text-white font-semibold text-lg">❤️ Why People Love It</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-white leading-tight">
            Why Become a{" "}
            <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
              GEP Partner?
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, rotateX: 15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.15 }}
              whileHover={{ y: -10, scale: 1.02, rotateY: 5 }}
              className="group perspective-1000"
            >
              <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:border-white/30 transition-all duration-500 h-full overflow-hidden flex flex-col">
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex-1 flex flex-col">
                  <motion.div 
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-300 to-orange-400 flex items-center justify-center mb-6 shadow-lg"
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <benefit.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-yellow-300 transition-colors duration-300 min-h-[4rem] flex items-center">{benefit.title}</h3>
                  <p className="text-white/80 mb-6 leading-relaxed flex-1">{benefit.description}</p>
                  
                  <motion.div 
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 text-yellow-200 px-4 py-2 rounded-full text-sm font-semibold border border-yellow-400/30"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-lg">✨</span>
                    {benefit.stats}
                  </motion.div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute bottom-4 left-4 w-8 h-8 bg-yellow-400/10 rounded-full blur-sm" />
                <div className="absolute top-1/2 right-4 w-6 h-6 bg-orange-500/10 rounded-full blur-sm" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Inspirational Message */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-center"
        >
          <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-12 relative overflow-hidden">
            {/* Background decoration */}


            
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.7 }}
                className="text-6xl mb-6"
              >
                🌟
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.9 }}
                className="space-y-6"
              >
                <h3 className="text-3xl font-bold text-white mb-4">You're Not Just a Salesperson</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xl">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white/10 rounded-2xl p-6 border border-white/20"
                  >
                    <Compass className="w-8 h-8 text-yellow-300 mb-3 mx-auto" />
                    <p className="font-semibold text-yellow-300">You're a Guide</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white/10 rounded-2xl p-6 border border-white/20"
                  >
                    <GraduationCap className="w-8 h-8 text-yellow-300 mb-3 mx-auto" />
                    <p className="font-semibold text-yellow-300">You're a Mentor</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white/10 rounded-2xl p-6 border border-white/20"
                  >
                    <TrendingUp className="w-8 h-8 text-yellow-300 mb-3 mx-auto" />
                    <p className="font-semibold text-yellow-300">You're a Bridge</p>
                  </motion.div>
                </div>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 2.3 }}
                  className="text-2xl font-bold text-white mt-8"
                >
                  A bridge to a brighter future 🌅
                </motion.p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}