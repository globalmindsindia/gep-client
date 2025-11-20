import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { UserCheck, FileText, MessageSquare, Plane, DollarSign, Heart, Compass, HandHeart } from "lucide-react";

export default function YourRole() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const simpleSteps = [
    {
      icon: UserCheck,
      title: "Talk to students & parents",
      description: "Connect with families who trust your guidance",
    },
    {
      icon: FileText,
      title: "Share our services and guide them",
      description: "Show them the opportunities available",
    },
    {
      icon: MessageSquare,
      title: "Connect them to the Global Minds India team",
      description: "Make the introduction to our experts",
    },
    {
      icon: Plane,
      title: "We support, counsel, and convert",
      description: "Our team handles all the technical work",
    },
    {
      icon: DollarSign,
      title: "You receive earnings for every successful student",
      description: "Get rewarded for making a difference",
    },
  ];

  return (
    <section ref={ref} className="relative py-12 overflow-hidden">

      <motion.div style={{ y }} className="mx-auto px-6 lg:px-16 xl:px-32 2xl:px-48 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
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
              <span className="text-white font-semibold text-lg">🎯 Your Simple Role</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
              Your Role Is{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                Beautifully Simple
              </span>
            </h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-white/80 max-w-3xl mx-auto"
            >
              Just 5 easy steps to start making a difference and earning
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Process Flow */}
        <div className="max-w-7xl mx-auto mb-20">
          <div className="relative">
            {/* Single Continuous Line */}
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 2, delay: 1.4, ease: "easeInOut" }}
              className="hidden lg:block absolute top-1/2 h-0.5 bg-yellow-400 origin-left z-0"
              style={{
                left: '18%',
                width: '64%',
                transform: 'translateY(-50%)'
              }}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative z-20">
              {simpleSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
                  whileHover={{ y: -15, scale: 1.05 }}
                  className="group relative"
                >
                  {/* Step Number */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                    className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black font-bold text-lg shadow-lg z-20"
                  >
                    {index + 1}
                  </motion.div>
                  
                  <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:border-white/30 transition-all duration-500 h-full overflow-hidden group-hover:shadow-2xl">
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10 text-center">
                      <motion.div 
                        className="w-20 h-20 rounded-3xl bg-gradient-to-br from-yellow-300 to-orange-400 flex items-center justify-center mb-6 mx-auto shadow-xl"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.8 }}
                      >
                        <step.icon className="w-10 h-10 text-white" />
                      </motion.div>
                      
                      <div className="text-4xl mb-4">👉</div>
                      <h3 className="text-lg font-bold mb-4 text-white leading-tight">{step.title}</h3>
                      <p className="text-white/80 text-sm leading-relaxed">{step.description}</p>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-6 h-6 bg-yellow-400/20 rounded-full blur-sm" />
                    <div className="absolute bottom-4 left-4 w-4 h-4 bg-orange-500/20 rounded-full blur-sm" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Philosophy Section */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 2.6 }}
          className="text-center"
        >
          <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 relative overflow-hidden">
            {/* Background effects */}

            
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 2.8 }}
                className="text-6xl mb-8 flex justify-center"
              >
                <Heart className="w-16 h-16 text-yellow-300" />
              </motion.div>
              
              <h3 className="text-4xl font-bold text-white mb-12">Our Philosophy</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { negative: "You don't sell", positive: "You uplift", icon: Compass },
                  { negative: "You don't push", positive: "You guide", icon: HandHeart },
                  { negative: "You don't convince", positive: "You support", icon: Heart }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 3 + index * 0.2 }}
                    whileHover={{ scale: 1.05, y: -10 }}
                    className="bg-white/10 rounded-3xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300"
                  >
                    <item.icon className="w-12 h-12 text-yellow-300 mb-4 mx-auto" />
                    <div className="space-y-3">
                      <p className="text-lg text-white/70 line-through">{item.negative}</p>
                      <div className="text-2xl font-bold text-yellow-300">{item.positive}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section> );
}