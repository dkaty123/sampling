
import { ArrowRight, Check, ChevronRight, Computer, Database, Lock, Server, Shield, Users, Gauge, BarChart3, LineChart, Filter, Settings, Layers, Copy, PanelLeft, ArrowUpRight, Clipboard, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useHoverParallax from '@/hooks/use-hover-parallax';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import InteractiveChart from '@/components/ui/interactive-chart';

// Sample data for charts and visualizations
const performanceData = [
  { name: 'Jan', value: 65, previous: 50 },
  { name: 'Feb', value: 59, previous: 55 },
  { name: 'Mar', value: 80, previous: 65 },
  { name: 'Apr', value: 81, previous: 77 },
  { name: 'May', value: 76, previous: 71 },
  { name: 'Jun', value: 85, previous: 75 },
];

const usageData = [
  { name: 'Mon', value: 420 },
  { name: 'Tue', value: 380 },
  { name: 'Wed', value: 510 },
  { name: 'Thu', value: 470 },
  { name: 'Fri', value: 590 },
  { name: 'Sat', value: 390 },
  { name: 'Sun', value: 320 },
];

const distributionData = [
  { name: 'North America', value: 42 },
  { name: 'Europe', value: 29 },
  { name: 'Asia', value: 18 },
  { name: 'Others', value: 11 },
];

const PlatformSection = () => {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [containerRef, addElement] = useHoverParallax<HTMLElement>();
  const [kpiData, setKpiData] = useState({
    users: 12847,
    growth: 23.5,
    uptime: 99.98,
    responseTime: 186,
    transactions: 5462,
    dataProcessed: 3.8,
  });
  const [showTooltip, setShowTooltip] = useState('');
  const [animateKpi, setAnimateKpi] = useState('');

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setKpiData(prev => ({
        users: prev.users + Math.floor(Math.random() * 10),
        growth: +(prev.growth + (Math.random() * 0.4 - 0.2)).toFixed(1),
        uptime: Math.min(100, +(prev.uptime + (Math.random() * 0.02 - 0.01)).toFixed(2)),
        responseTime: Math.max(100, prev.responseTime + Math.floor(Math.random() * 5 - 2)),
        transactions: prev.transactions + Math.floor(Math.random() * 20),
        dataProcessed: +(prev.dataProcessed + Math.random() * 0.1).toFixed(1),
      }));
      
      // Trigger animation for a random KPI
      const kpis = ['users', 'growth', 'uptime', 'responseTime', 'transactions', 'dataProcessed'];
      setAnimateKpi(kpis[Math.floor(Math.random() * kpis.length)]);
      setTimeout(() => setAnimateKpi(''), 1000);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      id: 'scalability',
      title: 'Scalability & Reliability',
      description: 'Our platform is designed to scale with your business, ensuring high availability and reliability even during peak usage.',
      icon: Server,
      details: [
        'Auto-scaling infrastructure',
        '99.99% uptime guarantee',
        'Global content delivery network (CDN)',
        'Real-time monitoring and alerts',
      ],
    },
    {
      id: 'security',
      title: 'Advanced Security',
      description: 'We employ industry-leading security measures to protect your data and ensure compliance with global standards.',
      icon: Shield,
      details: [
        'End-to-end encryption',
        'Multi-factor authentication (MFA)',
        'Regular security audits and penetration testing',
        'Compliance with GDPR, HIPAA, and SOC 2',
      ],
    },
    {
      id: 'integration',
      title: 'Seamless Integration',
      description: 'Easily integrate our platform with your existing tools and workflows, enhancing productivity and streamlining operations.',
      icon: Database,
      details: [
        'RESTful API for custom integrations',
        'Pre-built integrations with popular CRM, ERP, and marketing automation systems',
        'Webhooks for real-time data synchronization',
        'Support for multiple data formats (JSON, XML, CSV)',
      ],
    },
    {
      id: 'user-management',
      title: 'User Management',
      description: 'Manage users and permissions with ease, ensuring secure access and control over your platform resources.',
      icon: Users,
      details: [
        'Role-based access control (RBAC)',
        'Single sign-on (SSO) support',
        'User activity tracking and audit logs',
        'Automated user provisioning and deprovisioning',
      ],
    },
    {
      id: 'cross-platform',
      title: 'Cross-Platform Compatibility',
      description: 'Access our platform from any device, ensuring a consistent experience across desktop, mobile, and tablet.',
      icon: Computer,
      details: [
        'Responsive web design',
        'Native mobile apps for iOS and Android',
        'Support for multiple browsers (Chrome, Firefox, Safari, Edge)',
        'Offline access and data synchronization',
      ],
    },
    {
      id: 'data-privacy',
      title: 'Data Privacy & Compliance',
      description: 'We are committed to protecting your data and ensuring compliance with global privacy regulations.',
      icon: Lock,
      details: [
        'Data anonymization and pseudonymization',
        'Data residency options',
        'Transparent data processing policies',
        'Regular privacy impact assessments',
      ],
    },
  ];

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };

  const detailsVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: 'auto',
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  const kpiCardVariants = {
    pulse: {
      scale: [1, 1.02, 1],
      boxShadow: [
        '0 4px 6px rgba(0, 0, 0, 0.1)',
        '0 10px 15px rgba(14, 165, 233, 0.2)',
        '0 4px 6px rgba(0, 0, 0, 0.1)',
      ],
      transition: { duration: 0.5 }
    }
  };

  // Format numbers with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50 overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-black via-gray-800 to-gray-700">
            Built for scale, secured for trust
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform is engineered to meet the demands of modern businesses, with a focus on security, reliability, and scalability.
          </p>
        </div>

        {/* Advanced KPI Dashboard */}
        <div className="mb-16">
          <div className="flex flex-col">
            <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
              <Gauge className="h-5 w-5 text-brand-blue" />
              <span>Real-time Platform Metrics</span>
              <span className="text-sm font-normal bg-brand-blue/10 text-brand-blue px-2 py-0.5 rounded-full ml-2">Live</span>
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div 
                      className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
                      variants={kpiCardVariants}
                      animate={animateKpi === 'users' ? 'pulse' : 'initial'}
                      onMouseEnter={() => setShowTooltip('users')}
                      onMouseLeave={() => setShowTooltip('')}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm text-gray-500">Active Users</span>
                        <Users className="h-4 w-4 text-brand-blue" />
                      </div>
                      <div className="flex items-baseline">
                        <span className="text-2xl font-bold">{formatNumber(kpiData.users)}</span>
                        <span className="ml-2 text-xs px-1.5 py-0.5 rounded-full bg-green-100 text-green-800">+{kpiData.growth}%</span>
                      </div>
                      <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-brand-blue rounded-full"
                          initial={{ width: '70%' }}
                          animate={{ width: `${70 + (kpiData.growth / 2)}%` }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-xs">
                    <p className="font-semibold">Active Users</p>
                    <p className="text-xs text-gray-500">Users currently active on the platform in real-time</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div 
                      className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
                      variants={kpiCardVariants}
                      animate={animateKpi === 'growth' ? 'pulse' : 'initial'}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm text-gray-500">Growth Rate</span>
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="flex items-baseline">
                        <span className="text-2xl font-bold">{kpiData.growth}%</span>
                        <span className="ml-2 text-xs text-gray-500">MoM</span>
                      </div>
                      <div className="mt-2 flex items-center">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, kpiData.growth * 2)}%` }}
                          transition={{ duration: 0.8 }}
                          className="h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                        />
                      </div>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-xs">
                    <p className="font-semibold">Month-over-Month Growth</p>
                    <p className="text-xs text-gray-500">Platform usage growth compared to previous month</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div 
                      className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
                      variants={kpiCardVariants}
                      animate={animateKpi === 'uptime' ? 'pulse' : 'initial'}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm text-gray-500">Uptime</span>
                        <Server className="h-4 w-4 text-brand-blue" />
                      </div>
                      <div className="flex items-baseline">
                        <span className="text-2xl font-bold">{kpiData.uptime}%</span>
                        <span className="ml-2 text-xs px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-800">SLA: 99.9%</span>
                      </div>
                      <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-blue-500 rounded-full"
                          initial={{ width: '99.9%' }}
                          animate={{ width: `${kpiData.uptime}%` }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-xs">
                    <p className="font-semibold">System Uptime</p>
                    <p className="text-xs text-gray-500">Percentage of time the platform is operational and accessible</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div 
                      className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
                      variants={kpiCardVariants}
                      animate={animateKpi === 'responseTime' ? 'pulse' : 'initial'}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm text-gray-500">Response Time</span>
                        <LineChart className="h-4 w-4 text-brand-purple" />
                      </div>
                      <div className="flex items-baseline">
                        <span className="text-2xl font-bold">{kpiData.responseTime}</span>
                        <span className="ml-2 text-xs text-gray-500">ms</span>
                      </div>
                      <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-brand-purple rounded-full"
                          initial={{ width: '70%' }}
                          animate={{ width: `${100 - (kpiData.responseTime/3)}%` }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-xs">
                    <p className="font-semibold">Average Response Time</p>
                    <p className="text-xs text-gray-500">The average time it takes for the system to respond to requests</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div 
                      className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
                      variants={kpiCardVariants}
                      animate={animateKpi === 'transactions' ? 'pulse' : 'initial'}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm text-gray-500">Transactions</span>
                        <Clipboard className="h-4 w-4 text-brand-orange" />
                      </div>
                      <div className="flex items-baseline">
                        <span className="text-2xl font-bold">{formatNumber(kpiData.transactions)}</span>
                        <span className="ml-2 text-xs text-gray-500">today</span>
                      </div>
                      <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-brand-orange rounded-full"
                          initial={{ width: '65%' }}
                          animate={{ width: `${65 + (kpiData.transactions % 10)}%` }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-xs">
                    <p className="font-semibold">Daily Transactions</p>
                    <p className="text-xs text-gray-500">Number of transactions processed today</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div 
                      className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
                      variants={kpiCardVariants}
                      animate={animateKpi === 'dataProcessed' ? 'pulse' : 'initial'}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm text-gray-500">Data Processed</span>
                        <Database className="h-4 w-4 text-brand-cyan" />
                      </div>
                      <div className="flex items-baseline">
                        <span className="text-2xl font-bold">{kpiData.dataProcessed}</span>
                        <span className="ml-2 text-xs text-gray-500">TB</span>
                      </div>
                      <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-brand-cyan rounded-full"
                          initial={{ width: '60%' }}
                          animate={{ width: `${60 + (kpiData.dataProcessed * 5)}%` }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-xs">
                    <p className="font-semibold">Data Processed</p>
                    <p className="text-xs text-gray-500">Total volume of data processed today</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        {/* Advanced Dashboard & Charts Section */}
        <div className="mb-16">
          <div className="flex flex-col">
            <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-brand-blue" />
              <span>Advanced Analytics Dashboard</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium text-gray-800">Performance Metrics</h4>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <Filter className="h-3.5 w-3.5" />
                        <span className="text-xs">Filter</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <Download className="h-3.5 w-3.5" />
                        <span className="text-xs">Export</span>
                      </Button>
                    </div>
                  </div>
                  
                  <InteractiveChart
                    data={performanceData}
                    type="line"
                    height={260}
                    title="Monthly Performance"
                  />
                </div>
              </div>
              
              <div>
                <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium text-gray-800">Usage Distribution</h4>
                    <Settings className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
                  </div>
                  
                  <InteractiveChart
                    data={distributionData}
                    type="pie"
                    height={260}
                    title="Regional Distribution"
                  />
                </div>
              </div>
              
              <div>
                <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium text-gray-800">Weekly Activity</h4>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <PanelLeft className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                  
                  <InteractiveChart
                    data={usageData}
                    type="bar"
                    height={260}
                    title="Daily Usage"
                  />
                </div>
              </div>
              
              <div className="md:col-span-2">
                <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium text-gray-800">Recent Activity</h4>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <Filter className="h-3.5 w-3.5" />
                      <span className="text-xs">Filter</span>
                    </Button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Event</TableHead>
                          <TableHead>User</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[...Array(5)].map((_, i) => (
                          <TableRow key={i} className="hover:bg-gray-50/50">
                            <TableCell className="font-medium">API Integration {50 + i}</TableCell>
                            <TableCell>user{100 + i}@example.com</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                i % 3 === 0 ? 'bg-green-100 text-green-800' : 
                                i % 3 === 1 ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-blue-100 text-blue-800'
                              }`}>
                                {i % 3 === 0 ? 'Completed' : i % 3 === 1 ? 'Pending' : 'In Progress'}
                              </span>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {new Date(Date.now() - i * 3600000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" className="h-8">
                                <span className="text-xs text-brand-blue">Details</span>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Features Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              className="relative group bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              variants={featureVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              onClick={() => setActiveFeature(feature.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <feature.icon className="h-6 w-6 text-brand-blue" />
                  <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                </div>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>

              <AnimatePresence>
                {activeFeature === feature.id && (
                  <motion.div
                    className="absolute top-0 left-0 w-full h-full bg-brand-blue/95 backdrop-blur-md text-white p-6 flex flex-col justify-center"
                    variants={detailsVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <h4 className="text-xl font-bold mb-4">{feature.title}</h4>
                    <ul className="space-y-2">
                      {feature.details.map((detail, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-brand-pink" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                    <Button variant="secondary" size="sm" className="mt-6 w-fit self-start">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="absolute top-2 right-2 text-gray-400 group-hover:text-gray-500 transition-colors duration-300">
                <ChevronRight className="h-5 w-5" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Animated background shapes */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-brand-blue/5 to-transparent -z-10"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-purple/5 to-transparent -z-10"></div>
    </section>
  );
};

export default PlatformSection;
