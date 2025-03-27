
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, BarChart, Bar, ScatterChart, Scatter, ZAxis, Legend,
  PieChart, Pie, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ComposedChart, Brush
} from 'recharts';
import { ArrowUp, ArrowDown, TrendingUp, Users, Clock, Zap, Award, Target } from 'lucide-react';

interface CustomerData {
  name: string;
  queries: number;
  resolved: number;
}

interface ResponseTimeData {
  name: string;
  humanTime: number;
  aiTime: number;
}

interface BubbleData {
  name: string;
  value: number;
  size: number;
  category: string;
}

interface AdvancedDashboardProps {
  customerData: CustomerData[];
  responseTimeData: ResponseTimeData[];
  bubbleData: BubbleData[];
  isVisible: boolean;
}

const COLORS = ['#0EA5E9', '#8B5CF6', '#FF5CAA', '#10B981', '#F97316', '#06B6D4'];
const RADIAN = Math.PI / 180;

// Custom label for pie chart with animation
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      className="text-xs font-medium"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// Sample data for the radar chart
const performanceData = [
  { subject: 'Speed', A: 120, B: 110, fullMark: 150 },
  { subject: 'Accuracy', A: 98, B: 80, fullMark: 150 },
  { subject: 'Satisfaction', A: 86, B: 70, fullMark: 150 },
  { subject: 'Resolution', A: 99, B: 90, fullMark: 150 },
  { subject: 'Intelligence', A: 85, B: 65, fullMark: 150 },
  { subject: 'Personalization', A: 65, B: 35, fullMark: 150 },
];

// Custom animated stat card
const StatCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  delay = 0,
  color = 'blue' 
}: { 
  title: string; 
  value: string | number; 
  change?: number; 
  icon: React.ElementType; 
  delay?: number;
  color?: 'blue' | 'purple' | 'pink' | 'green' | 'orange';
}) => {
  const colorClasses = {
    blue: 'from-brand-blue/20 to-brand-blue/5 text-brand-blue',
    purple: 'from-brand-purple/20 to-brand-purple/5 text-brand-purple',
    pink: 'from-brand-pink/20 to-brand-pink/5 text-brand-pink',
    green: 'from-brand-green/20 to-brand-green/5 text-brand-green',
    orange: 'from-brand-orange/20 to-brand-orange/5 text-brand-orange',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`p-5 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 bg-gradient-to-br ${colorClasses[color]}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium opacity-80">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          
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
    </motion.div>
  );
};

const AdvancedDashboard = ({ customerData, responseTimeData, bubbleData, isVisible }: AdvancedDashboardProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const resolutionRate = customerData.reduce((acc, item) => acc + item.resolved, 0) / 
                        customerData.reduce((acc, item) => acc + item.queries, 0) * 100;
  
  const averageHumanTime = responseTimeData.reduce((acc, item) => acc + item.humanTime, 0) / responseTimeData.length;
  const averageAITime = responseTimeData.reduce((acc, item) => acc + item.aiTime, 0) / responseTimeData.length;
  const timeSavingPercent = ((averageHumanTime - averageAITime) / averageHumanTime * 100).toFixed(0);
  
  // Create data for the donut chart
  const sentimentData = [
    { name: 'Positive', value: 68 },
    { name: 'Neutral', value: 22 },
    { name: 'Negative', value: 10 },
  ];
  
  return (
    <div className={`transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Resolution Rate" 
          value={`${resolutionRate.toFixed(1)}%`}
          change={2.5}
          icon={Award}
          color="blue"
        />
        
        <StatCard 
          title="Avg. Response Time" 
          value={`${averageAITime.toFixed(1)} sec`}
          change={-18.3}
          icon={Clock}
          delay={0.1}
          color="purple"
        />
        
        <StatCard 
          title="Time Saved" 
          value={`${timeSavingPercent}%`}
          icon={Zap}
          delay={0.2}
          color="green"
        />
        
        <StatCard 
          title="Active Users" 
          value="4,827"
          change={12.7}
          icon={Users}
          delay={0.3}
          color="pink"
        />
      </div>
      
      {/* Main charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Area chart for customer queries and resolution */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 col-span-1 lg:col-span-2 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold">Customer Support Volume</h3>
              <p className="text-sm text-gray-500">Queries vs. Resolutions</p>
            </div>
            <div className="flex space-x-2">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-brand-blue mr-2"></div>
                <span className="text-xs">Queries</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-brand-green mr-2"></div>
                <span className="text-xs">Resolved</span>
              </div>
            </div>
          </div>
          
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={customerData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #F3F4F6",
                  }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="queries" 
                  fill="#0EA5E9" 
                  stroke="#0EA5E9" 
                  fillOpacity={0.2} 
                  animationDuration={1500}
                  activeDot={{ r: 8, strokeWidth: 2, stroke: 'white' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="resolved" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ r: 5, strokeWidth: 2, stroke: 'white', fill: '#10B981' }}
                  activeDot={{ r: 8, strokeWidth: 2, stroke: 'white' }}
                  animationDuration={1500}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        {/* Radar chart for performance comparison */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
        >
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Performance Comparison</h3>
            <p className="text-sm text-gray-500">AI vs Human Agents</p>
          </div>
          
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performanceData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" stroke="#64748b" />
                <PolarRadiusAxis angle={30} domain={[0, 150]} stroke="#94a3b8" />
                <Radar 
                  name="AI Agent" 
                  dataKey="A" 
                  stroke="#8B5CF6" 
                  fill="#8B5CF6" 
                  fillOpacity={0.6} 
                  animationDuration={1500}
                  animationBegin={300}
                />
                <Radar 
                  name="Human Agent" 
                  dataKey="B" 
                  stroke="#94a3b8" 
                  fill="#94a3b8" 
                  fillOpacity={0.3}
                  animationDuration={1500}
                  animationBegin={600}
                />
                <Legend />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #F3F4F6",
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
      
      {/* Second row of charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Response time comparison chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 col-span-1 lg:col-span-2 hover:shadow-xl transition-all duration-300"
        >
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Response Time Comparison</h3>
            <p className="text-sm text-gray-500">Human vs AI Response Times (seconds)</p>
          </div>
          
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={responseTimeData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #F3F4F6",
                  }}
                  formatter={(value) => [`${value} sec`, '']}
                />
                <Legend />
                <Bar 
                  dataKey="humanTime" 
                  name="Human Response" 
                  fill="#94a3b8" 
                  animationBegin={300}
                  animationDuration={1200}
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="aiTime" 
                  name="AI Response" 
                  fill="#0EA5E9"
                  animationBegin={600}
                  animationDuration={1200}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        {/* Customer sentiment donut chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
        >
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Customer Sentiment</h3>
            <p className="text-sm text-gray-500">Post-interaction feedback</p>
          </div>
          
          <div className="h-[280px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  animationBegin={300}
                  animationDuration={1500}
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {sentimentData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={index === 0 ? '#10B981' : index === 1 ? '#94a3b8' : '#ef4444'} 
                      stroke="#fff"
                      strokeWidth={activeIndex === index ? 2 : 1}
                      style={{
                        filter: activeIndex === index ? 'drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.2))' : 'none',
                        transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)',
                        transformOrigin: 'center',
                        transition: 'transform 0.3s, filter 0.3s',
                      }}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #F3F4F6",
                  }}
                />
                <Legend 
                  formatter={(value, entry, index) => (
                    <span style={{ color: index === 0 ? '#10B981' : index === 1 ? '#94a3b8' : '#ef4444' }}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdvancedDashboard;
