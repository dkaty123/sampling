import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import SolutionSection from '@/components/SolutionSection';
import PowerSection from '@/components/PowerSection';
import PlatformSection from '@/components/PlatformSection';
import BenefitsSection from '@/components/BenefitsSection';
import SecuritySection from '@/components/SecuritySection';
import PricingSection from '@/components/PricingSection';
import BlogSection from '@/components/BlogSection';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import ParallaxSection from '@/components/ui/parallax-section';
import useScrollObserver from '@/hooks/use-scroll-observer';
import FloatingActionButton from '@/components/ui/floating-action-button';
import EnhancedAnalyticsDashboard from '@/components/ui/enhanced-analytics-dashboard';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUp, MessageCircle, Mail, Phone } from 'lucide-react';

// Sample chart data for demonstration
const performanceData = [
  { name: 'Jan', value: 65, previous: 50 },
  { name: 'Feb', value: 70, previous: 55 },
  { name: 'Mar', value: 80, previous: 65 },
  { name: 'Apr', value: 81, previous: 77 },
  { name: 'May', value: 85, previous: 71 },
  { name: 'Jun', value: 92, previous: 75 },
  { name: 'Jul', value: 94, previous: 80 },
];

const conversationTypesData = [
  { name: 'Support', value: 65 },
  { name: 'Sales', value: 25 },
  { name: 'Feedback', value: 10 },
];

const weeklyActivityData = [
  { name: 'Mon', value: 420 },
  { name: 'Tue', value: 380 },
  { name: 'Wed', value: 510 },
  { name: 'Thu', value: 470 },
  { name: 'Fri', value: 590 },
  { name: 'Sat', value: 390 },
  { name: 'Sun', value: 320 },
];

// Update response time data format
const responseTimeData = [
  { name: 'Mon', value: 120, humanTime: 120, aiTime: 3 },
  { name: 'Tue', value: 180, humanTime: 180, aiTime: 2 },
  { name: 'Wed', value: 150, humanTime: 150, aiTime: 3 },
  { name: 'Thu', value: 210, humanTime: 210, aiTime: 2 },
  { name: 'Fri', value: 160, humanTime: 160, aiTime: 2 },
  { name: 'Sat', value: 90, humanTime: 90, aiTime: 1 },
  { name: 'Sun', value: 60, humanTime: 60, aiTime: 1 },
];

const customerSatisfactionData = [
  { name: 'Jan', value: 4.2 },
  { name: 'Feb', value: 4.3 },
  { name: 'Mar', value: 4.1 },
  { name: 'Apr', value: 4.4 },
  { name: 'May', value: 4.5 },
  { name: 'Jun', value: 4.7 },
  { name: 'Jul', value: 4.8 },
];

const regionData = [
  { name: 'North America', value: 42 },
  { name: 'Europe', value: 29 },
  { name: 'Asia', value: 18 },
  { name: 'South America', value: 7 },
  { name: 'Africa', value: 3 },
  { name: 'Australia', value: 1 },
];

const Index = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { ref: dashboardRef, isInView: isDashboardInView } = useScrollObserver({ threshold: 0.1 });
  
  // For showing scroll-to-top button
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // For advanced animations
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.3, 0.4], [1, 0.8, 0.9, 1]);
  
  // Track scroll for various scroll-based effects
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide/show header based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
      
      // Show scroll to top button when user scrolls down enough
      setShowScrollTop(currentScrollY > 500);
      
      // Add parallax effect to background elements
      document.querySelectorAll('.parallax-bg').forEach((elem, i) => {
        const speed = 0.2 + (i * 0.05);
        const yPos = -(currentScrollY * speed);
        const element = elem as HTMLElement;
        element.style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced smooth scroll effect with easing
  useEffect(() => {
    // Smooth scroll to anchor with easing
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          // Use smooth scroll with easing
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    // Handle both initial load and hash changes
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    
    // Add smooth scroll to all anchor links with enhanced behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector((this as HTMLAnchorElement).getAttribute('href') || '');
        if (target) {
          // Add a small delay to make the transition feel more natural
          setTimeout(() => {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
            // Update URL hash without jumping
            window.history.pushState(null, '', (this as HTMLAnchorElement).getAttribute('href') || '');
          }, 50);
        }
      });
    });

    // Add intersection observer for section animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all major sections
    document.querySelectorAll('section').forEach(section => {
      // Remove the animation class first to prevent pre-animation
      section.classList.remove('animate-fade-in');
      observer.observe(section);
    });

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      observer.disconnect();
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Enhanced background with parallax effect */}
      <div className="fixed inset-0 -z-50 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-100 via-white to-white opacity-80"></div>
      <div className="fixed top-40 right-10 w-64 h-64 rounded-full bg-brand-blue/5 blur-3xl parallax-bg -z-40"></div>
      <div className="fixed top-80 left-10 w-80 h-80 rounded-full bg-brand-purple/5 blur-3xl parallax-bg -z-40"></div>
      <div className="fixed bottom-40 right-40 w-72 h-72 rounded-full bg-brand-pink/5 blur-3xl parallax-bg -z-40"></div>

      {/* Sticky navbar with show/hide on scroll */}
      <div 
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <Navbar />
      </div>
      
      <main>
        {/* Hero section with enhanced parallax */}
        <ParallaxSection 
          backgroundSpeed={0.05}
          contentSpeed={-0.02} 
          className="relative"
        >
          <HeroSection />
        </ParallaxSection>
        
        {/* Features section */}
        <div id="features">
          <FeaturesSection />
        </div>
        
        {/* Enhanced Analytics Dashboard */}
        <div ref={dashboardRef}>
          <EnhancedAnalyticsDashboard 
            performanceData={performanceData}
            conversationTypesData={conversationTypesData}
            weeklyActivityData={weeklyActivityData}
            responseTimeData={responseTimeData}
            customerSatisfactionData={customerSatisfactionData}
            regionData={regionData}
          />
        </div>
        
        {/* Testimonials with parallax effect */}
        <div id="testimonials" className="relative">
          <TestimonialsSection />
        </div>
        
        <SolutionSection />
        <PowerSection />
        
        <div id="platform">
          <PlatformSection />
        </div>
        
        <BenefitsSection />
        <SecuritySection />
        
        <div id="pricing">
          <PricingSection />
        </div>
        
        {/* Blog Section */}
        <BlogSection />
        
        <ParallaxSection 
          backgroundSpeed={0.03}
          contentSpeed={-0.01}
        >
          <CTA />
        </ParallaxSection>
      </main>
      
      <Footer />

      {/* Floating action button */}
      <FloatingActionButton
        position="bottom-right"
        mainIcon={<MessageCircle className="h-6 w-6" />}
        variant="primary"
        actions={[
          {
            icon: <Mail className="h-4 w-4" />,
            label: "Email Us",
            onClick: () => window.open('mailto:contact@samplinglabs.com', '_blank')
          },
          {
            icon: <Phone className="h-4 w-4" />,
            label: "Call Us",
            onClick: () => window.open('tel:+1234567890', '_blank')
          }
        ]}
      />

      {/* Scroll to top button with enhanced animation */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full glass-card flex items-center justify-center text-brand-blue hover:bg-brand-blue hover:text-white transition-colors duration-300"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}

      {/* Animated corner decoration */}
      <div className="fixed top-0 right-0 w-64 h-64 bg-gradient-to-b from-brand-blue/5 to-transparent rounded-full blur-3xl -z-10"></div>
      <div className="fixed bottom-0 left-0 w-64 h-64 bg-gradient-to-t from-brand-purple/5 to-transparent rounded-full blur-3xl -z-10"></div>
    </>
  );
};

export default Index;
