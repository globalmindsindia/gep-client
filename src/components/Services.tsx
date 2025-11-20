import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Globe, FileCheck, CreditCard, Home, Briefcase, DollarSign } from "lucide-react";

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const services = [
    {
      icon: Globe,
      title: "Study Abroad",
      description: "Germany, Europe, USA, UK, Canada, Australia",
    },
    {
      icon: FileCheck,
      title: "APS Certification",
      description: "Essential certification for German universities",
    },
    {
      icon: GraduationCap,
      title: "German Language Training",
      description: "A1–C2 comprehensive language courses",
    },
    {
      icon: CreditCard,
      title: "IELTS Coaching",
      description: "Expert preparation for English proficiency",
    },
    {
      icon: Home,
      title: "Visa & Accommodation Support",
      description: "Complete assistance for travel and housing",
    },
    {
      icon: Briefcase,
      title: "Blocked Account Services",
      description: "Financial requirements made simple",
    },
    {
      icon: FileCheck,
      title: "SOP & LOR Writing by Experts",
      description: "Professional document preparation",
    },
    {
      icon: DollarSign,
      title: "24/7 Student Hotline",
      description: "Round-the-clock support and guidance",
    },
  ];

  return (
    <section id="services" ref={ref} className="relative py-12 overflow-hidden">
      
      <motion.div style={{ y }} className="mx-auto px-6 lg:px-16 xl:px-32 2xl:px-48 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-6 text-white">
            🚀 What You Will Be{" "}
            <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
              Empowering Students With:
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20 h-full">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-300 to-orange-400 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2 text-white">{service.title}</h3>
                  <p className="text-white/80 text-sm">{service.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Key Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 text-white border border-white/20 text-center"
        >
          <p className="text-xl mb-4">These are life-changing services.</p>
          <p className="text-2xl font-bold text-yellow-300">You become the person who helps a student take the right step.</p>
        </motion.div>
      </motion.div>
    </section>
  );
}