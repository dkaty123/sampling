
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, MessageCircle, Star, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import useScrollObserver from '@/hooks/use-scroll-observer';
import NeumorphicButton from '@/components/ui/neumorphic-button';

const CTA = () => {
  const { ref, isInView, scrollPercentage } = useScrollObserver({ threshold: 0 });
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };
  
  const buttonVariants = {
    initial: { 
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      y: 0
    },
    hover: { 
      boxShadow: "0px 10px 25px rgba(14, 165, 233, 0.3)",
      y: -5,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    tap: { 
      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
      y: 0,
      scale: 0.98,
      transition: { duration: 0.1, ease: "easeIn" }
    }
  };

  // Features list for enhanced appeal
  const features = [
    "AI-powered chat support 24/7",
    "Seamless human handoff",
    "Multi-language support",
    "Custom branding options",
    "Detailed analytics dashboard",
    "Easy integration with existing tools"
  ];

  return (
    <section ref={ref} className="py-20 md:py-32 bg-black text-white overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="max-w-xl"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium text-white/90 border border-white/20 w-fit"
            >
              <Sparkles className="h-3.5 w-3.5 text-brand-pink animate-pulse-slow" />
              <span>Start Your AI Journey</span>
            </motion.div>
            
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-300"
            >
              Ready to transform your customer experience?
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-300 mb-8"
            >
              Join thousands of businesses already using Sampling Labs to deliver exceptional AI-powered support that scales with your growth.
            </motion.p>
            
            <motion.div variants={itemVariants} className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.3 + (index * 0.1) }}
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-blue/20 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-brand-blue" />
                  </div>
                  <span className="text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <motion.div
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                <Button size="lg" className="bg-brand-blue hover:bg-brand-blue/90 text-white transform transition-all hover:scale-105 shadow-lg hover:shadow-brand-blue/20 group w-full sm:w-auto">
                  <span>Get started for free</span>
                  <div className="relative ml-2 w-4 h-4">
                    <ArrowRight className="absolute inset-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-0" />
                    <Sparkles className="absolute inset-0 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                  </div>
                </Button>
              </motion.div>
              
              <motion.div 
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                <NeumorphicButton 
                  variant="dark" 
                  size="lg" 
                  rounded="md" 
                  depth="medium"
                  icon={<MessageCircle className="h-4 w-4" />}
                  iconPosition="left"
                  className="group w-full sm:w-auto"
                >
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">Book a demo</span>
                </NeumorphicButton>
              </motion.div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="mt-6 flex items-center space-x-4"
            >
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-xs font-semibold">
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500" fill="currentColor" />
                  ))}
                </div>
                <span className="text-sm text-gray-400">From 2,800+ reviews</span>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-gray-800 shadow-2xl">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-blue via-brand-purple to-brand-pink rounded-t-2xl"></div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="text-lg font-semibold text-white">Pricing Plans</div>
                  <div className="text-xs bg-brand-blue/20 text-brand-blue px-2 py-1 rounded-full">Save 20%</div>
                </div>
                
                {["Starter", "Pro", "Enterprise"].map((plan, i) => (
                  <motion.div
                    key={plan}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                    className={`p-4 rounded-xl ${i === 1 ? 'bg-gradient-to-br from-brand-blue/20 to-brand-purple/20 border border-brand-blue/30' : 'bg-gray-800/50 border border-gray-700'}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className={`text-sm font-medium ${i === 1 ? 'text-brand-blue' : 'text-gray-300'}`}>{plan}</div>
                        <div className="text-2xl font-bold text-white mt-1">
                          ${i === 0 ? '29' : i === 1 ? '79' : '199'}
                          <span className="text-sm text-gray-400">/mo</span>
                        </div>
                      </div>
                      {i === 1 && (
                        <div className="px-2 py-1 bg-brand-blue/30 text-brand-blue text-xs font-medium rounded-full">
                          Most Popular
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 mt-3">
                      {[...Array(3)].map((_, j) => (
                        <div key={j} className="flex items-center text-sm text-gray-400">
                          <Check className="w-4 h-4 mr-2 text-green-500" />
                          <span>{["5k messages", "24/7 support", "Analytics"][j]}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-center text-sm text-gray-400 mt-2"
                >
                  No credit card required. 14-day free trial.
                </motion.div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-5 -right-5 w-20 h-20 bg-brand-blue/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-5 -left-5 w-20 h-20 bg-brand-purple/20 rounded-full blur-xl"></div>
          </motion.div>
        </div>
      </div>
      
      {/* Enhanced background decorative elements */}
      <div className="absolute top-0 left-0 right-0 bottom-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-brand-purple blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-brand-blue blur-3xl animate-pulse-slow animation-delay-300"></div>
        <div className="absolute top-1/2 right-1/3 w-40 h-40 rounded-full bg-brand-pink blur-3xl animate-pulse-slow animation-delay-500"></div>
      </div>
      
      {/* Enhanced glow effect based on scroll */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-blue/20 via-transparent to-transparent opacity-70 animate-pulse-slow"
        style={{
          opacity: isInView ? 0.3 + (scrollPercentage / 200) : 0.3,
          transition: 'opacity 0.3s ease-out'
        }}
      ></div>
      
      {/* Animated particles with 3D effect */}
      <div className="absolute inset-0 overflow-hidden perspective-[1000px]">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.1 + Math.random() * 0.4,
              zIndex: Math.floor(Math.random() * 10),
            }}
            animate={{
              y: [0, -15, 0],
              x: [0, Math.random() * 10 - 5, 0],
              rotateX: [0, 180, 360],
              rotateY: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      {/* Animated grid background with mouse movement effect */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_0.1px,transparent_0.1px),linear-gradient(to_right,rgba(255,255,255,0.05)_0.1px,transparent_0.1px)] bg-[size:20px_20px] opacity-30"
        style={{
          transform: `perspective(1000px) rotateX(${isInView ? scrollPercentage / 50 - 1 : 0}deg)`,
          transition: 'transform 0.3s ease-out'
        }}
      ></div>
      
      {/* Animated blobs */}
      <svg 
        className="absolute w-full h-full top-0 left-0 pointer-events-none opacity-10"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M437.4,244.9c52.2-41.8,115.1-54.7,177.9-52c62.8,2.6,125.6,20.9,178.3,58.5c52.7,
          37.7,95.3,94.8,107,161.2c11.7,66.3-7.5,142-54.5,201c-47,59-121.9,101.1-196.2,
          121.1c-74.3,20-148.1,18-214.6-8.2c-66.5-26.2-125.8-76.8-147.6-139.7c-21.8-63-6.2-138.4,
          24.4-200.6C335.4,323.9,385.2,286.7,437.4,244.9"
          fill="url(#gradient1)"
          animate={{
            d: [
              "M437.4,244.9c52.2-41.8,115.1-54.7,177.9-52c62.8,2.6,125.6,20.9,178.3,58.5c52.7,37.7,95.3,94.8,107,161.2c11.7,66.3-7.5,142-54.5,201c-47,59-121.9,101.1-196.2,121.1c-74.3,20-148.1,18-214.6-8.2c-66.5-26.2-125.8-76.8-147.6-139.7c-21.8-63-6.2-138.4,24.4-200.6C335.4,323.9,385.2,286.7,437.4,244.9",
              "M427.4,270.9c46.2-47.8,125.1-60.7,187.9-48c62.8,12.6,115.6,30.9,158.3,88.5c42.7,57.7,75.3,124.8,67,181.2c-8.3,56.3-57.5,102-104.5,151c-47,49-91.9,101.1-156.2,101.1c-64.3,0-148.1-52-214.6-78.2c-66.5-26.2-115.8-26.8-137.6-79.7c-21.8-53-16.2-158.4,14.4-210.6C265.4,323.9,381.2,318.7,427.4,270.9",
              "M437.4,244.9c52.2-41.8,115.1-54.7,177.9-52c62.8,2.6,125.6,20.9,178.3,58.5c52.7,37.7,95.3,94.8,107,161.2c11.7,66.3-7.5,142-54.5,201c-47,59-121.9,101.1-196.2,121.1c-74.3,20-148.1,18-214.6-8.2c-66.5-26.2-125.8-76.8-147.6-139.7c-21.8-63-6.2-138.4,24.4-200.6C335.4,323.9,385.2,286.7,437.4,244.9"
            ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>
    </section>
  );
};

export default CTA;
