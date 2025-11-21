import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Award, Shield, Star, TrendingUp, Users, CheckCircle } from "lucide-react";

function CountUp({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return <span ref={ref}>{count}</span>;
}

export default function Trust() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const stats = [
    { icon: Users, value: 500, suffix: "+", label: "Students Guided", color: "from-yellow-300 to-orange-400" },
    { icon: TrendingUp, value: 10, suffix: "+", label: "Years of Expert Counsellors", color: "from-yellow-300 to-orange-400" },
    { icon: Award, value: 100, suffix: "%", label: "Transparent Support", color: "from-yellow-300 to-orange-400" },
    { icon: Star, value: 1, suffix: "", label: "Strong Reputation Across Karnataka", color: "from-yellow-300 to-orange-400" },
  ];

  const trustFactors = [
    {
      icon: Shield,
      title: "Transparent, Step-by-Step Support",
      description: "Clear guidance throughout the entire process",
    },
    {
      icon: Award,
      title: "Local + Overseas Assistance",
      description: "Support both in India and at destination countries",
    },
    {
      icon: Star,
      title: "Strong Reputation",
      description: "Trusted across Karnataka for quality service",
    },
    {
      icon: CheckCircle,
      title: "Respectful Care",
      description: "Your referrals treated with the same respect you would give",
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
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-6 text-white">
            💙 Why Students Trust{" "}
            <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
              Global Minds India?
            </span>
          </h2>
        </motion.div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300 text-center">
                <div className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-4xl font-bold mb-2 text-white">
                  <CountUp end={stat.value} />
                  {stat.suffix}
                </div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Factors */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
          {trustFactors.map((factor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300 h-full">
                <factor.icon className="w-10 h-10 text-yellow-300 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-lg font-bold mb-2 text-white">{factor.title}</h3>
                <p className="text-sm text-white/80">{factor.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Final Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
            <h3 className="text-3xl font-bold mb-6 text-white">This Could Be Your Turning Point</h3>
            <div className="space-y-4 text-lg text-white/90 mb-8">
              <p>In every family, every community, every circle there is one person who guides others.</p>
              <p>One person people trust. One person who makes things happen.</p>
              <p className="text-2xl font-bold text-yellow-300">Maybe… that person is you.</p>
            </div>
            <div className="space-y-3 text-lg text-white/90 mb-8">
              <p>You have the power to change the direction of someone's life.</p>
              <p>To give them an opportunity they never knew existed.</p>
              <p>To help a student take their first step abroad.</p>
              <p>To make parents feel confident in their child's future.</p>
            </div>
            <p className="text-xl font-semibold text-yellow-300 mb-8">
              And in the journey of lighting someone else's path… your path also lights up.
            </p>
            
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h4 className="text-2xl font-bold mb-4 text-white">Join the Global Education Partner Programme Today</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white/90">
                <div>👉 Register now</div>
                <div>👉 Start referring</div>
                <div>👉 Start earning</div>
                <div>👉 Start transforming lives</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}