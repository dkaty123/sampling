import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import InteractiveChart from './interactive-chart';
import useScrollObserver from '@/hooks/use-scroll-observer';
import {
  LineChart, BarChart3, PieChart, Activity, Zap, Users, Clock,
  ArrowUp, ArrowDown, TrendingUp, Award, Target, Globe, Laptop,
  ShieldCheck, MessageCircle, CheckCircle, AlertTriangle, Download,
  ThumbsUp, Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DataPoint {
  name: string;
  value: number;
  [key: string]: any;
}

// Animated counter component
const AnimatedCounter = ({ value, duration = 2, formatter = (val: number) => val.toLocaleString() }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const counterRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (counterRef.current) clearInterval(counterRef.current);
    
    const stepTime = Math.abs(Math.floor(duration * 1000 / value));
    const startValue = 0;
    let currentValue = startValue;
    
    counterRef.current = setInterval(() => {
      currentValue += 1;
      setDisplayValue(currentValue);
      
      if (currentValue >= value) {
        if (counterRef.current) clearInterval(counterRef.current);
      }
    }, stepTime);
    
    return () => {
      if (counterRef.current) clearInterval(counterRef.current);
    };
  }, [value, duration]);
  
  return <span>{formatter(displayValue)}</span>;
};

// KPI Card component
const KpiCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  color = 'blue',
  suffix = '',
  valueFormatter = (val: number) => val.toLocaleString(),
  animate = true,
  delay = 0
}) => {
  const { ref, isInView } = useScrollObserver({ threshold: 0.1, once: true });
  const [hasAnimated, setHasAnimated] = useState(false);
  
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);
  
  const getColorClass = () => {
    switch(color) {
      case 'blue': return 'from-brand-blue/20 to-brand-blue/5 text-brand-blue';
      case 'purple': return 'from-brand-purple/20 to-brand-purple/5 text-brand-purple';
      case 'pink': return 'from-brand-pink/20 to-brand-pink/5 text-brand-pink';
      case 'green': return 'from-green-500/20 to-green-500/5 text-green-500';
      case 'orange': return 'from-orange-500/20 to-orange-500/5 text-orange-500';
      case 'cyan': return 'from-cyan-500/20 to-cyan-500/5 text-cyan-500';
      default: return 'from-gray-200 to-gray-100 text-gray-700';
    }
  };
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.5, delay }}
      className={`p-5 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 bg-gradient-to-br ${getColorClass()}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium opacity-80">{title}</p>
          <h3 className="text-2xl font-bold mt-1">
            {animate && hasAnimated ? (
              <AnimatedCounter value={value} formatter={valueFormatter} />
            ) : (
              valueFormatter(value)
            )}
            {suffix && <span className="text-base ml-1">{suffix}</span>}
          </h3>
          
          {change !== undefined && (
            <div className={`flex items-center mt-2 text-xs font-medium ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {change >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
              <span>{Math.abs(change)}% vs previous period</span>
            </div>
          )}
        </div>
        
        <div className="p-2 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm">
          <Icon className={`h-5 w-5`} />
        </div>
      </div>
      
      {/* Animated progress bar */}
      <div className="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden">
        <motion.div 
          className="h-full rounded-full"
          style={{ backgroundColor: 'currentColor' }}
          initial={{ width: '0%' }}
          animate={isInView ? { width: `${Math.min(100, value / 2)}%` } : { width: '0%' }}
          transition={{ duration: 1, delay: delay + 0.3 }}
        />
      </div>
    </motion.div>
  );
};

const EnhancedAnalyticsDashboard = ({
  performanceData,
  conversationTypesData,
  weeklyActivityData,
  responseTimeData,
  customerSatisfactionData,
  regionData
}: EnhancedAnalyticsDashboardProps) => {
  const { ref, isInView } = useScrollObserver({ threshold: 0.1 });
  const [activeTab, setActiveTab] = useState('overview');
  const [hoveredRegion, setHoveredRegion] = useState<number | null>(null);
  
  // Parallax scrolling effect
  const { scrollYProgress } = useScroll();
  const springScrollYProgress = useSpring(scrollYProgress, { stiffness: 400, damping: 90 });
  const scale = useTransform(springScrollYProgress, [0, 0.5], [1, 1.05]);
  
  // Simulate real-time data updates
  const [kpiData, setKpiData] = useState({
    successRate: 94.2,
    avgResponseTime: 1.8,
    activeConversations: 428,
    satisfactionScore: 4.7,
    totalUsers: 12847,
    resolvedIssues: 5932
  });
  
  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setKpiData(prev => ({
        successRate: +(prev.successRate + (Math.random() * 0.4 - 0.2)).toFixed(1),
        avgResponseTime: +(prev.avgResponseTime + (Math.random() * 0.2 - 0.1)).toFixed(1),
        activeConversations: prev.activeConversations + Math.floor(Math.random() * 5 - 2),
        satisfactionScore: +(Math.min(5, prev.satisfactionScore + (Math.random() * 0.1 - 0.05))).toFixed(1),
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 10),
        resolvedIssues: prev.resolvedIssues + Math.floor(Math.random() * 10),
      }));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const worldMapRegions = [
    { id: 0, name: 'North America', value: 42, x: '20%', y: '30%' },
    { id: 1, name: 'Europe', value: 29, x: '45%', y: '25%' },
    { id: 2, name: 'Asia', value: 18, x: '65%', y: '35%' },
    { id: 3, name: 'South America', value: 7, x: '30%', y: '60%' },
    { id: 4, name: 'Africa', value: 3, x: '45%', y: '50%' },
    { id: 5, name: 'Australia', value: 1, x: '75%', y: '65%' }
  ];
  
  const getTabClass = (tabName: string) => {
    return activeTab === tabName
      ? 'bg-gradient-to-r from-brand-blue to-brand-purple text-white shadow-md'
      : 'bg-white text-gray-700 hover:bg-gray-50';
  };
  
  return (
    <motion.section 
      ref={ref}
      style={{ scale }}
      className="py-16 md:py-24 relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-blue/5 blur-3xl opacity-70"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-brand-purple/5 blur-3xl opacity-70"></div>
      <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-brand-pink/5 blur-3xl opacity-50"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center bg-gradient-to-r from-brand-blue/10 to-brand-purple/10 text-brand-purple px-4 py-2 rounded-full text-sm font-semibold mb-4"
          >
            <Activity className="w-4 h-4 mr-2" />
            <span>Live Analytics Dashboard</span>
            <div className="ml-2 w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-blue via-brand-purple to-brand-pink"
          >
            Real-time Customer Insights
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Monitor your AI support performance in real-time with comprehensive analytics and actionable insights to optimize your customer experience.
          </motion.p>
        </motion.div>
        
        {/* Dashboard tabs */}
        <div className="mb-8 flex justify-center">
          <div className="bg-gray-100 p-1 rounded-full flex space-x-1">
            {['overview', 'performance', 'geography', 'satisfaction'].map((tab) => (
              <motion.button
                key={tab}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${getTabClass(tab)}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* KPI cards row */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8"
        >
          <KpiCard
            title="Success Rate"
            value={kpiData.successRate}
            change={2.3}
            icon={CheckCircle}
            color="green"
            suffix="%"
            valueFormatter={(val) => val.toFixed(1)}
            delay={0}
          />
          
          <KpiCard
            title="Avg Response Time"
            value={kpiData.avgResponseTime}
            change={-12.5}
            icon={Clock}
            color="purple"
            suffix="s"
            valueFormatter={(val) => val.toFixed(1)}
            delay={0.1}
          />
          
          <KpiCard
            title="Active Conversations"
            value={kpiData.activeConversations}
            change={8.7}
            icon={MessageCircle}
            color="blue"
            delay={0.2}
          />
          
          <KpiCard
            title="Satisfaction Score"
            value={kpiData.satisfactionScore}
            change={1.2}
            icon={Award}
            color="orange"
            suffix="/5"
            valueFormatter={(val) => val.toFixed(1)}
            delay={0.3}
          />
          
          <KpiCard
            title="Total Users"
            value={kpiData.totalUsers}
            change={15.8}
            icon={Users}
            color="cyan"
            delay={0.4}
          />
          
          <KpiCard
            title="Issues Resolved"
            value={kpiData.resolvedIssues}
            change={5.2}
            icon={ShieldCheck}
            color="pink"
            delay={0.5}
          />
        </motion.div>
        
        {/* Main dashboard content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <InteractiveChart
                    data={performanceData}
                    type="line"
                    title="Performance Metrics"
                    subtitle="Success rate over time compared to industry average"
                    height={350}
                    animated={true}
                    className="shadow-lg hover:shadow-xl transition-all duration-300"
                    yAxisLabel="Success (%)"
                    xAxisLabel=""
                  />
                </div>
                
                <div>
                  <InteractiveChart
                    data={conversationTypesData}
                    type="pie"
                    title="Conversation Types"
                    subtitle="Distribution by category"
                    height={350}
                    animated={true}
                    className="shadow-lg hover:shadow-xl transition-all duration-300"
                  />
                </div>
                
                <div className="lg:col-span-3">
                  <InteractiveChart
                    data={responseTimeData}
                    type="area"
                    title="Response Time Analysis"
                    subtitle="AI vs Human Agent Response Time (seconds)"
                    height={300}
                    animated={true}
                    className="shadow-lg hover:shadow-xl transition-all duration-300"
                    yAxisLabel="Time (s)"
                    xAxisLabel=""
                  />
                </div>
              </div>
            )}
            
            {activeTab === 'performance' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <InteractiveChart
                  data={weeklyActivityData}
                  type="bar"
                  title="Weekly Conversation Volume"
                  subtitle="Number of conversations by day of week"
                  height={350}
                  animated={true}
                  className="shadow-lg hover:shadow-xl transition-all duration-300"
                  yAxisLabel="Conversations"
                  xAxisLabel=""
                />
                
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-base font-semibold text-gray-800 flex items-center mb-4">
                    <TrendingUp className="h-5 w-5 mr-2 text-brand-blue" />
                    <span>Performance Indicators</span>
                  </h3>
                  
                  <div className="space-y-5">
                    {[
                      { name: 'Resolution Rate', value: 94.8, target: 90, color: 'bg-green-500' },
                      { name: 'First Contact Resolution', value: 82.3, target: 75, color: 'bg-brand-blue' },
                      { name: 'Customer Retention', value: 97.2, target: 95, color: 'bg-brand-purple' },
                      { name: 'Sentiment Score', value: 89.5, target: 85, color: 'bg-brand-pink' },
                      { name: 'Agent Efficiency', value: 91.7, target: 80, color: 'bg-orange-500' },
                    ].map((metric, index) => (
                      <motion.div 
                        key={metric.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                        className="space-y-2"
                      >
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-medium">{metric.name}</span>
                          <div className="flex items-center">
                            <span className="font-semibold">{metric.value}%</span>
                            <span className="text-xs text-gray-500 ml-2">Target: {metric.target}%</span>
                          </div>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div 
                            className={`h-full ${metric.color}`}
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${metric.value}%` } : { width: 0 }}
                            transition={{ duration: 1, delay: 0.4 + (index * 0.1) }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'geography' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-100 p-6 relative min-h-[400px]">
                  <h3 className="text-base font-semibold text-gray-800 flex items-center mb-6">
                    <Globe className="h-5 w-5 mr-2 text-brand-blue" />
                    <span>Global Distribution</span>
                  </h3>
                  
                  {/* Simple world map visualization with hotspots */}
                  <div className="relative w-full h-[300px] bg-gray-50 rounded-lg overflow-hidden">
                    {/* World map background - simplified representation */}
                    <div className="absolute inset-0 border-2 border-gray-200 rounded-lg">
                      <svg viewBox="0 0 100 60" className="w-full h-full opacity-20">
                        <path d="M10,20 Q30,10 50,15 T90,20 M5,30 Q25,25 50,30 T95,30 M10,40 Q30,45 50,40 T90,40" 
                          stroke="currentColor" 
                          strokeWidth="1" 
                          fill="none" 
                          className="text-gray-400" />
                      </svg>
                    </div>
                    
                    {/* Region hotspots */}
                    {worldMapRegions.map((region) => (
                      <motion.div
                        key={region.id}
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : { scale: 0 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 260, 
                          damping: 20, 
                          delay: 0.3 + (region.id * 0.1) 
                        }}
                        style={{ 
                          left: region.x, 
                          top: region.y, 
                          width: `${Math.max(16, region.value / 2)}px`,
                          height: `${Math.max(16, region.value / 2)}px`,
                        }}
                        className={`absolute rounded-full bg-brand-blue cursor-pointer`}
                        onMouseEnter={() => setHoveredRegion(region.id)}
                        onMouseLeave={() => setHoveredRegion(null)}
                        whileHover={{ scale: 1.2 }}
                      >
                        {(hoveredRegion === region.id) && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 bg-white px-3 py-1.5 rounded shadow-lg whitespace-nowrap z-10 border border-gray-200"
                          >
                            <div className="text-sm font-medium">{region.name}</div>
                            <div className="text-xs text-gray-500">{region.value}% of users</div>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-6 grid grid-cols-3 gap-4">
                    {[
                      { label: 'Countries', value: '140+', icon: Globe, color: 'text-brand-blue' },
                      { label: 'Languages', value: '35', icon: MessageCircle, color: 'text-brand-purple' },
                      { label: 'Timezones', value: '24', icon: Clock, color: 'text-brand-pink' }
                    ].map((stat, i) => (
                      <motion.div 
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: 0.5 + (i * 0.1) }}
                        className="bg-gray-50 rounded-lg p-3 text-center"
                      >
                        <stat.icon className={`h-5 w-5 mx-auto mb-2 ${stat.color}`} />
                        <div className="font-semibold">{stat.value}</div>
                        <div className="text-xs text-gray-500">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <InteractiveChart
                    data={regionData}
                    type="pie"
                    title="Regional Distribution"
                    subtitle="User base by region"
                    height={400}
                    animated={true}
                    className="shadow-lg hover:shadow-xl transition-all duration-300"
                  />
                </div>
              </div>
            )}
            
            {activeTab === 'satisfaction' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <InteractiveChart
                  data={customerSatisfactionData}
                  type="area"
                  title="Customer Satisfaction Trend"
                  subtitle="CSAT score over time"
                  height={350}
                  animated={true}
                  className="shadow-lg hover:shadow-xl transition-all duration-300"
                  yAxisLabel="CSAT Score"
                  xAxisLabel=""
                />
                
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-base font-semibold text-gray-800 flex items-center mb-6">
                    <ThumbsUp className="h-5 w-5 mr-2 text-brand-green" />
                    <span>Sentiment Analysis</span>
                  </h3>
                  
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {[
                      { label: 'Positive', value: 72, color: 'bg-green-500', icon: CheckCircle },
                      { label: 'Neutral', value: 21, color: 'bg-gray-400', icon: Target },
                      { label: 'Negative', value: 7, color: 'bg-red-500', icon: AlertTriangle }
                    ].map((sentiment, i) => (
                      <motion.div 
                        key={sentiment.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5, delay: 0.3 + (i * 0.1) }}
                        className="bg-gray-50 rounded-xl p-4 text-center relative overflow-hidden"
                      >
                        <div className="relative z-10">
                          <sentiment.icon className={`h-6 w-6 mx-auto mb-2 ${
                            sentiment.label === 'Positive' ? 'text-green-500' : 
                            sentiment.label === 'Neutral' ? 'text-gray-500' : 'text-red-500'
                          }`} />
                          <div className="text-2xl font-bold">{sentiment.value}%</div>
                          <div className="text-sm text-gray-500">{sentiment.label}</div>
                        </div>
                        <motion.div 
                          className={`absolute bottom-0 left-0 w-full ${sentiment.color}`}
                          initial={{ height: 0 }}
                          animate={isInView ? { height: `${sentiment.value/2}%` } : { height: 0 }}
                          transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                          style={{ opacity: 0.2 }}
                        />
                      </motion.div>
                    ))}
                  </div>
                  
                  <h4 className="text-sm font-medium text-gray-700 mb-4">Top Feedback Themes</h4>
                  <div className="space-y-4">
                    {[
                      { theme: 'Response Speed', score: 4.8, mentions: 542 },
                      { theme: 'Accuracy of Information', score: 4.6, mentions: 423 },
                      { theme: 'Problem Resolution', score: 4.3, mentions: 387 },
                      { theme: 'Ease of Use', score: 4.7, mentions: 356 },
                      { theme: 'Agent Helpfulness', score: 4.9, mentions: 298 }
                    ].map((theme, i) => (
                      <motion.div 
                        key={theme.theme}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) }}
                      >
                        <div className="flex justify-between items-center text-sm mb-1">
                          <div className="font-medium">{theme.theme}</div>
                          <div className="flex items-center space-x-2">
                            <div className="flex">
                              {[...Array(5)].map((_, starIndex) => (
                                <Star 
                                  key={starIndex} 
                                  size={12} 
                                  className={starIndex < Math.floor(theme.score) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">{theme.mentions} mentions</span>
                          </div>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-gradient-to-r from-brand-blue to-brand-purple"
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${(theme.score/5) * 100}%` } : { width: 0 }}
                            transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        
        {/* Action buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-center mt-8"
        >
          <Button
            className="bg-gradient-to-r from-brand-blue to-brand-purple text-white gap-2 hover:shadow-lg shadow-brand-purple/20 mr-4"
            size="lg"
          >
            <Laptop className="h-4 w-4" />
            <span>Schedule Demo</span>
          </Button>
          
          <Button
            variant="outline"
            className="border-gray-300 gap-2"
            size="lg"
          >
            <Download className="h-4 w-4" />
            <span>Download Report</span>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default EnhancedAnalyticsDashboard;
