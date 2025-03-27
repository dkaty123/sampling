
import { ArrowRight, MessageSquare, Check, Star, BarChart2, Users, Bell, Clock, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [metrics, setMetrics] = useState({
    satisfaction: 96,
    responseTime: 34,
    resolution: 92,
    activeChats: 142,
  });

  const textOptions = [
    "I'd like to upgrade my plan",
    "How do I connect to my CRM?",
    "Can you help with API integration?",
    "What's the pricing for Enterprise?",
  ];

  useEffect(() => {
    // Live metrics animation
    const interval = setInterval(() => {
      setMetrics(prev => ({
        satisfaction: Math.min(98, prev.satisfaction + (Math.random() > 0.5 ? 1 : -1)),
        responseTime: Math.max(20, Math.min(60, prev.responseTime + (Math.random() > 0.5 ? 2 : -2))),
        resolution: Math.min(98, prev.resolution + (Math.random() > 0.5 ? 1 : -1)),
        activeChats: Math.max(100, Math.min(200, prev.activeChats + (Math.random() > 0.5 ? 5 : -5))),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Text typing animation effect
  useEffect(() => {
    if (isTyping) {
      if (typingText.length < textOptions[currentTextIndex].length) {
        const timeoutId = setTimeout(() => {
          setTypingText(textOptions[currentTextIndex].slice(0, typingText.length + 1));
        }, 100);
        return () => clearTimeout(timeoutId);
      } else {
        setIsTyping(false);
        const timeoutId = setTimeout(() => {
          setIsTyping(true);
          setTypingText('');
          setCurrentTextIndex((currentTextIndex + 1) % textOptions.length);
        }, 3000);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [typingText, isTyping, currentTextIndex]);

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden relative">
      {/* Enhanced background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-1/3 h-80 bg-gradient-to-l from-brand-blue/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-40 -left-20 w-80 h-80 bg-gradient-to-r from-brand-pink/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-l from-brand-purple/5 to-transparent rounded-full blur-3xl"></div>
        
        {/* Animated floating elements */}
        <div className="absolute top-40 right-1/4 w-6 h-6 rounded-full bg-brand-blue/10 animate-float"></div>
        <div className="absolute top-60 left-1/3 w-4 h-4 rounded-full bg-brand-pink/10 animate-float animation-delay-200"></div>
        <div className="absolute bottom-40 right-1/3 w-8 h-8 rounded-full bg-brand-purple/10 animate-float animation-delay-400"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-sm font-medium text-gray-800 mb-2 animate-pulse-slow w-fit">
              <span className="flex h-2 w-2 rounded-full bg-brand-blue"></span>
              New AI Agents Platform
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-balance">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-black via-gray-800 to-gray-700">AI Agents for</span>
              <span className="block mt-2 relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue via-brand-purple to-brand-pink">magical customer</span>
                <svg className="absolute -bottom-2 left-0 w-full h-2 text-brand-pink" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,5 C25,0 75,10 100,5 L100,10 L0,10 Z" fill="currentColor" />
                </svg>
              </span>
              <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-black via-gray-800 to-gray-700">experiences</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-md">
              Sampling Labs is the complete platform for building & deploying AI Agents 
              for your business to handle customer support & drive more revenue.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button className="bg-brand-blue hover:bg-brand-blue/90 text-white h-12 px-6 shadow-lg hover:shadow-brand-blue/20 transform transition-all duration-300 hover:scale-105 hover:translate-y-[-2px] group">
                Build your agent
                <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <div className="text-sm text-muted-foreground flex items-center">
                <svg className="h-4 w-4 mr-2 text-brand-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 12.5L11 15.5L16 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                </svg>
                No credit card required
              </div>
            </div>
            
            <div className="pt-8">
              <p className="text-sm text-muted-foreground mb-4">Trusted by 9000+ businesses worldwide</p>
              <div className="flex flex-wrap gap-8 items-center opacity-80 hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm font-semibold text-gray-800">SIEMENS</span>
                <span className="text-sm font-semibold text-gray-800">POSTMAN</span>
                <span className="text-sm font-semibold text-gray-800">alpian</span>
                <span className="text-sm font-semibold text-gray-800">Opal</span>
              </div>
            </div>
          </div>
          
          <div className="relative animate-fade-in animation-delay-300">
            <div className="glass-morphism p-6 rounded-2xl max-w-md mx-auto shadow-xl border border-white/30 backdrop-blur-lg hover:shadow-2xl transition-all duration-500 group">
              {/* Dashboard Tab Navigation */}
              <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-brand-pink to-brand-purple flex items-center justify-center transform group-hover:rotate-12 transition-transform">
                    <span className="text-white font-medium">AI</span>
                  </div>
                  <span className="font-medium">AI Assistant Dashboard</span>
                </div>
                <div className="flex space-x-2">
                  <Bell className="h-5 w-5 text-gray-500 hover:text-brand-blue transition-colors cursor-pointer" />
                  <Users className="h-5 w-5 text-gray-500 hover:text-brand-blue transition-colors cursor-pointer" />
                </div>
              </div>
              
              {/* Dashboard Tabs */}
              <div className="flex space-x-1 bg-gray-50 p-1 rounded-lg mb-4">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`text-xs px-3 py-1.5 rounded-md flex items-center gap-1 transition-all ${
                    activeTab === 'overview' 
                      ? 'bg-white text-brand-blue shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <BarChart2 className="h-3 w-3" />
                  <span>Overview</span>
                </button>
                <button 
                  onClick={() => setActiveTab('satisfaction')}
                  className={`text-xs px-3 py-1.5 rounded-md flex items-center gap-1 transition-all ${
                    activeTab === 'satisfaction' 
                      ? 'bg-white text-brand-blue shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Star className="h-3 w-3" />
                  <span>Satisfaction</span>
                </button>
                <button 
                  onClick={() => setActiveTab('security')}
                  className={`text-xs px-3 py-1.5 rounded-md flex items-center gap-1 transition-all ${
                    activeTab === 'security' 
                      ? 'bg-white text-brand-blue shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <ShieldCheck className="h-3 w-3" />
                  <span>Security</span>
                </button>
              </div>
              
              {/* Dashboard Content Area */}
              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Overview Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                        <div className="text-xs text-gray-500 mb-1">Active Chats</div>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold">{metrics.activeChats}</span>
                          <MessageSquare className="h-4 w-4 text-brand-blue" />
                        </div>
                        <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-brand-blue rounded-full"
                            initial={{ width: '70%' }}
                            animate={{ width: `${(metrics.activeChats / 200) * 100}%` }}
                            transition={{ duration: 1 }}
                          />
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                        <div className="text-xs text-gray-500 mb-1">Response Time</div>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold">{metrics.responseTime}s</span>
                          <Clock className="h-4 w-4 text-brand-purple" />
                        </div>
                        <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-brand-purple rounded-full"
                            initial={{ width: '50%' }}
                            animate={{ width: `${100 - ((metrics.responseTime / 60) * 100)}%` }}
                            transition={{ duration: 1 }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Chat Simulation */}
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4 transform hover:-translate-y-1 transition-all duration-300 hover:shadow-md">
                      <div className="flex items-start gap-2">
                        <div className="h-6 w-6 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                          <Users className="h-3 w-3 text-brand-blue" />
                        </div>
                        <div>
                          <p className="text-sm">
                            Hi! I am Sampling Labs AI, ask me anything about our platform!
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm transform hover:-translate-y-1 transition-all duration-300 hover:shadow-md">
                      <div className="flex items-start gap-2">
                        <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-medium">U</span>
                        </div>
                        <div>
                          <p className="text-sm min-h-[20px]">
                            {typingText}
                            {isTyping && typingText.length < textOptions[currentTextIndex].length && (
                              <span className="inline-block w-1 h-4 ml-0.5 bg-gray-400 animate-pulse"></span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'satisfaction' && (
                  <motion.div
                    key="satisfaction"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center mb-4">
                      <div className="inline-block p-4 rounded-full bg-gradient-to-r from-brand-green/10 to-brand-blue/10 mb-2">
                        <div className="text-3xl font-bold text-brand-blue">{metrics.satisfaction}%</div>
                      </div>
                      <div className="text-sm font-medium">Customer Satisfaction</div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-gray-500">Issue Resolution Rate</span>
                          <span className="text-xs font-medium">{metrics.resolution}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-green-500 rounded-full"
                            initial={{ width: '80%' }}
                            animate={{ width: `${metrics.resolution}%` }}
                            transition={{ duration: 1 }}
                          />
                        </div>
                      </div>
                      
                      <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-gray-500">Customer Ratings</span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className={`h-3 w-3 ${star <= Math.round(metrics.satisfaction / 20) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <motion.div 
                                key={i}
                                className="h-8 w-2 bg-gray-100 rounded-full overflow-hidden"
                                animate={{ 
                                  height: [8, 12 + Math.random() * 20, 8],
                                }}
                                transition={{ 
                                  repeat: Infinity, 
                                  duration: 2, 
                                  delay: i * 0.2,
                                  repeatType: 'reverse'
                                }}
                              >
                                <motion.div 
                                  className="h-full w-full bg-brand-blue rounded-full"
                                  animate={{ 
                                    opacity: [0.4, 0.8, 0.4]
                                  }}
                                  transition={{ 
                                    repeat: Infinity, 
                                    duration: 2, 
                                    delay: i * 0.2,
                                    repeatType: 'reverse'
                                  }}
                                />
                              </motion.div>
                            ))}
                          </div>
                          <div className="text-xs text-gray-500">Last 7 days</div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                        <div className="text-xs text-gray-500 mb-2">Recent Feedback</div>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <Check className="h-3 w-3 text-green-500 mt-0.5" />
                            <span className="text-xs">"Fast and accurate responses!"</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Check className="h-3 w-3 text-green-500 mt-0.5" />
                            <span className="text-xs">"Solved my issue in under a minute."</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'security' && (
                  <motion.div
                    key="security"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm mb-3">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="h-5 w-5 text-green-500" />
                          <span className="font-medium text-sm">Security Status</span>
                        </div>
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Protected</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Data Encryption</span>
                          <Check className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">GDPR Compliance</span>
                          <Check className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Access Control</span>
                          <Check className="h-4 w-4 text-green-500" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                      <div className="text-xs text-gray-500 mb-3">Real-time monitoring</div>
                      <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                          <motion.div 
                            key={i}
                            className="h-1 bg-gray-100 rounded-full overflow-hidden"
                            animate={{ 
                              opacity: [0.7, 1, 0.7],
                            }}
                            transition={{ 
                              repeat: Infinity, 
                              duration: 3, 
                              delay: i * 0.5,
                              repeatType: 'reverse'
                            }}
                          >
                            <motion.div 
                              className="h-full bg-brand-blue rounded-full"
                              initial={{ width: '10%' }}
                              animate={{ 
                                width: ['10%', '70%', '30%', '90%', '10%'],
                              }}
                              transition={{ 
                                repeat: Infinity, 
                                duration: 8, 
                                delay: i * 0.5,
                              }}
                            />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Input Area */}
              <div className="w-full relative mt-4">
                <input 
                  type="text" 
                  placeholder="Type your question..." 
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 shadow-sm pl-10"
                />
                <MessageSquare className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                <Button className="absolute right-1 top-1 rounded-full w-8 h-8 p-0 bg-brand-blue hover:bg-brand-blue/90 shadow-md group-hover:shadow-lg transition-all duration-300">
                  <ArrowRight className="h-4 w-4 text-white" />
                </Button>
              </div>
              
              {/* Progress Indicator */}
              <div className="w-full mt-4">
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full rounded-full bg-gradient-to-r from-brand-blue via-brand-purple to-brand-pink"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ 
                      duration: 15, 
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </div>
              </div>
            </div>
            
            {/* Enhanced floating elements for decoration */}
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-brand-blue/10 rounded-full animate-float"></div>
            <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-brand-pink/10 rounded-full animate-float animation-delay-300"></div>
            <div className="absolute top-1/2 -right-8 w-12 h-12 bg-brand-purple/10 rounded-full animate-float animation-delay-500"></div>
            
            {/* Add glowing effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-blue/0 via-brand-pink/10 to-brand-purple/0 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 animate-pulse-slow"></div>
          </div>
        </div>
      </div>
      
      {/* Decorative shapes */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50/80 to-transparent -z-10"></div>
    </section>
  );
};

export default HeroSection;
