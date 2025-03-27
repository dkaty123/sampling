
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Micro-interaction animation variants
  const buttonVariants = {
    initial: { 
      scale: 1, 
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)" 
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 20px rgba(14, 165, 233, 0.2)",
      transition: { duration: 0.3, ease: "easeOut" }
    },
    tap: { 
      scale: 0.95,
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.1, ease: "easeIn" }
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? 'py-3 bg-white/95 backdrop-blur-md shadow-md' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
            <img src="/lovable-uploads/7d2d91f8-8656-4416-a4e3-6a7ef5b91181.png" alt="Sampling Labs Logo" className="h-8 md:h-10" />
          </a>
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-8">
            {["features", "testimonials", "platform", "pricing"].map((item) => (
              <a 
                key={item}
                href={`#${item}`} 
                className="group text-sm font-medium text-foreground/80 hover:text-foreground transition-colors relative overflow-hidden"
              >
                <span className="relative z-10">{item.charAt(0).toUpperCase() + item.slice(1)}</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-blue transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
              </a>
            ))}
          </nav>
        )}

        <div className="flex items-center space-x-4">
          <motion.div
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="hidden md:block"
          >
            <Button 
              variant="outline" 
              size="sm" 
              className="border-brand-blue/30 hover:border-brand-blue/60 hover:bg-brand-blue/5 transition-all duration-300"
            >
              Sign in
            </Button>
          </motion.div>
          
          <motion.div
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="hidden md:block"
          >
            <Button 
              variant="default" 
              size="sm" 
              className="bg-brand-blue hover:bg-brand-blue/90 shadow-md hover:shadow-brand-blue/20 transition-all duration-300 group"
            >
              <span>Try for Free</span>
              <ChevronRight className="h-4 w-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </motion.div>
          
          {/* Mobile menu button */}
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="md:hidden">
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md transition-all duration-200 ease-in-out animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a href="#features" className="text-sm font-medium py-2 text-foreground/80 hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#testimonials" className="text-sm font-medium py-2 text-foreground/80 hover:text-foreground transition-colors">
              Testimonials
            </a>
            <a href="#platform" className="text-sm font-medium py-2 text-foreground/80 hover:text-foreground transition-colors">
              Platform
            </a>
            <a href="#pricing" className="text-sm font-medium py-2 text-foreground/80 hover:text-foreground transition-colors">
              Pricing
            </a>
            <div className="flex flex-col space-y-2 pt-2">
              <Button variant="outline" size="sm" className="w-full">
                Sign in
              </Button>
              <Button variant="default" size="sm" className="w-full bg-brand-blue hover:bg-brand-blue/90">
                Try for Free
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
