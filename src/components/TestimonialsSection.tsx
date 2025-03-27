
import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowLeft, Quote, Star, Award, Shield, BadgeCheck, ThumbsUp, Users, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useScrollObserver from '@/hooks/use-scroll-observer';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import NeumorphicButton from './ui/neumorphic-button';

// Testimonial data
const testimonials = [
  {
    quote: "Sampling Labs is a strong signal of how customer support will evolve. It is an early adopter of the agentic approach, which will become increasingly effective, trusted, and prominent.",
    author: "Marc Manara",
    company: "OpenAI",
    initial: "M",
    rating: 5,
    position: "Chief Product Officer",
    image: "/placeholder.svg"
  },
  {
    quote: "We've seen a 42% reduction in support response time and a 37% increase in customer satisfaction since implementing Sampling Labs' AI solution.",
    author: "Samantha Reeves",
    company: "Salesforce",
    initial: "S",
    rating: 5,
    position: "VP of Customer Success",
    image: "/placeholder.svg"
  },
  {
    quote: "I want to express how impressed we are with the talent behind such an excellent product like Sampling Labs. We at Zain Cash truly appreciate and enjoy using your platform.",
    author: "Yazen Altimimi",
    company: "Zain Cash",
    initial: "Y",
    rating: 4,
    position: "Head of Technology",
    image: "/placeholder.svg"
  },
  {
    quote: "Our chatbot has been great. Answers questions it knows, delegates to our talent when its stuck, knows how to push clients to the funnel. Sampling Labs is what we use, 10/10 recommend.",
    author: "Martin Terskin",
    company: "OfferMarket",
    initial: "M",
    rating: 5,
    position: "CTO",
    image: "/placeholder.svg"
  },
  {
    quote: "The integration of Sampling Labs into our support workflow has transformed our customer service operations. The adaptive learning capabilities are impressive.",
    author: "Jessica Wong",
    company: "Adobe",
    initial: "J",
    rating: 5,
    position: "Director of Customer Experience",
    image: "/placeholder.svg"
  },
  {
    quote: "After evaluating several AI support platforms, Sampling Labs stood out for its balance of automation and human oversight. Our ROI has been substantial.",
    author: "Robert Chen",
    company: "Shopify",
    initial: "R",
    rating: 4,
    position: "Head of Support Operations",
    image: "/placeholder.svg"
  },
  {
    quote: "The ability to customize AI responses while maintaining our brand voice has made Sampling Labs an invaluable asset to our customer engagement strategy.",
    author: "Emma Collins",
    company: "Stripe",
    initial: "E",
    rating: 5,
    position: "Customer Success Lead",
    image: "/placeholder.svg"
  },
  {
    quote: "We've been able to scale our customer support globally without sacrificing quality, thanks to Sampling Labs' multilingual capabilities and seamless handoff to human agents.",
    author: "Carlos Rodriguez",
    company: "Twilio",
    initial: "C",
    rating: 5,
    position: "Global Support Director",
    image: "/placeholder.svg"
  }
];

const ratingColors = {
  1: 'text-red-500',
  2: 'text-orange-500',
  3: 'text-yellow-500',
  4: 'text-brand-blue',
  5: 'text-brand-purple'
};

interface TestimonialCardProps {
  testimonial: {
    quote: string;
    author: string;
    company: string;
    initial: string;
    rating: number;
    position: string;
    image: string;
  };
  index: number;
}

const TestimonialCard = ({ testimonial, index }: TestimonialCardProps) => {
  const { ref, isInView } = useScrollObserver({ threshold: 0.1, once: true });
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 relative overflow-hidden h-full flex flex-col"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-blue/5 to-brand-purple/5 rounded-bl-full -z-10"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-brand-pink/5 to-transparent rounded-tr-full -z-10"></div>
      
      {/* Quote icon */}
      <div className="mb-6 relative">
        <div className="absolute -top-3 -left-3 text-brand-purple/10">
          <Quote size={60} />
        </div>
        <div className="relative z-10">
          <div className="flex space-x-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={16} 
                className={i < testimonial.rating ? ratingColors[testimonial.rating as keyof typeof ratingColors] : 'text-gray-200'}
                fill={i < testimonial.rating ? 'currentColor' : 'none'}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Quote text */}
      <blockquote className="mb-6 text-gray-700 leading-relaxed flex-grow relative z-10">
        <p className="italic">"{testimonial.quote}"</p>
      </blockquote>
      
      {/* Author info */}
      <div className="flex items-center mt-auto">
        <motion.div 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center text-white font-medium mr-4 shadow-lg"
        >
          <span className="text-lg">{testimonial.initial}</span>
        </motion.div>
        <div>
          <div className="font-semibold text-gray-800">{testimonial.author}</div>
          <div className="text-sm text-gray-500 flex items-center">
            <span className="mr-2">{testimonial.position}</span>
            <span className="w-1 h-1 bg-gray-400 rounded-full inline-block"></span>
            <span className="ml-2">{testimonial.company}</span>
          </div>
        </div>
      </div>
      
      {/* Badge */}
      <div className="absolute top-4 right-4">
        <motion.div 
          initial={{ rotate: -15, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10, delay: index * 0.2 + 0.3 }}
        >
          <BadgeCheck size={20} className="text-brand-purple" />
        </motion.div>
      </div>
    </motion.div>
  );
};

const TestimonialsSection = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const { ref, isInView } = useScrollObserver({ threshold: 0.1 });
  
  // Determine testimonials per page based on screen width
  const getTestimonialsPerPage = (width: number) => {
    if (width >= 1280) return 3;
    if (width >= 768) return 2;
    return 1;
  };
  
  const testimonialsPerPage = getTestimonialsPerPage(width);
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);
  
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const goToNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };
  
  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section ref={ref} id="testimonials" className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute top-40 right-10 w-64 h-64 rounded-full bg-brand-blue/5 blur-3xl"></div>
      <div className="absolute bottom-40 left-10 w-80 h-80 rounded-full bg-brand-purple/5 blur-3xl"></div>
      
      {/* Animated particles background */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-gradient-to-br from-brand-blue/20 to-brand-purple/20 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 50 + 10}px`,
            height: `${Math.random() * 50 + 10}px`,
          }}
          animate={{
            y: [0, Math.random() * 30 - 15, 0],
            x: [0, Math.random() * 30 - 15, 0],
            scale: [1, Math.random() * 0.5 + 0.8, 1],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div 
            initial={{ scale: 0, rotate: -10 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -10 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="inline-flex items-center bg-brand-purple/10 text-brand-purple px-4 py-2 rounded-full text-sm font-medium mb-5"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            <span>Client Success Stories</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-blue via-brand-purple to-brand-pink">
            What our clients are saying
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            With over 9000 clients across 140+ countries, here's what industry leaders think about our platform
          </p>
        </motion.div>
        
        {/* Testimonial Cards - Desktop View with Carousel */}
        <div className="hidden md:block mb-12">
          <Carousel className="w-full">
            <CarouselContent>
              {[...Array(Math.ceil(testimonials.length / testimonialsPerPage))].map((_, pageIndex) => (
                <CarouselItem key={pageIndex} className="md:basis-full">
                  <div className={`grid grid-cols-1 md:grid-cols-${testimonialsPerPage} gap-8`}>
                    {testimonials
                      .slice(pageIndex * testimonialsPerPage, (pageIndex + 1) * testimonialsPerPage)
                      .map((testimonial, index) => (
                        <TestimonialCard
                          key={testimonial.author}
                          testimonial={testimonial}
                          index={index}
                        />
                      ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 md:-left-12" />
            <CarouselNext className="right-0 md:-right-12" />
          </Carousel>
        </div>

        {/* Testimonial Cards - Mobile View with Manual Navigation */}
        <div className="md:hidden mb-12">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 gap-8"
            >
              {testimonials
                .slice(currentPage * testimonialsPerPage, (currentPage + 1) * testimonialsPerPage)
                .map((testimonial, index) => (
                  <TestimonialCard
                    key={testimonial.author}
                    testimonial={testimonial}
                    index={index}
                  />
                ))}
            </motion.div>
          </AnimatePresence>

          {/* Mobile navigation controls */}
          <div className="flex justify-center space-x-6 items-center mt-8">
            <NeumorphicButton 
              onClick={goToPrevPage}
              size="sm"
              rounded="full"
              className="w-10 h-10 flex items-center justify-center"
            >
              <ArrowLeft className="h-4 w-4" />
            </NeumorphicButton>
            
            <div className="flex space-x-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentPage === i 
                      ? 'bg-brand-purple w-6' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            
            <NeumorphicButton 
              onClick={goToNextPage}
              size="sm"
              rounded="full"
              className="w-10 h-10 flex items-center justify-center"
            >
              <ArrowRight className="h-4 w-4" />
            </NeumorphicButton>
          </div>
        </div>
        
        {/* Stats */}
        <div className="mt-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center"
          >
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <motion.div 
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.4 }}
                className="w-16 h-16 bg-gradient-to-br from-brand-blue/10 to-brand-blue/5 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Users className="h-8 w-8 text-brand-blue" />
              </motion.div>
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="text-4xl md:text-5xl font-bold text-brand-blue mb-2 relative">
                  <span className="relative z-10">9000+</span>
                  <span className="absolute -top-1 right-0 text-xs bg-brand-blue/10 text-brand-blue px-2 py-1 rounded-full">
                    +28%
                  </span>
                </div>
                <div className="text-gray-600">businesses trust us</div>
              </motion.div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <motion.div 
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.5 }}
                className="w-16 h-16 bg-gradient-to-br from-brand-purple/10 to-brand-purple/5 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Award className="h-8 w-8 text-brand-purple" />
              </motion.div>
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="text-4xl md:text-5xl font-bold text-brand-purple mb-2">140+</div>
                <div className="text-gray-600">countries served</div>
              </motion.div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <motion.div 
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.6 }}
                className="w-16 h-16 bg-gradient-to-br from-brand-pink/10 to-brand-pink/5 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <ThumbsUp className="h-8 w-8 text-brand-pink" />
              </motion.div>
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <div className="text-4xl md:text-5xl font-bold text-brand-pink mb-2">98%</div>
                <div className="text-gray-600">satisfaction rate</div>
              </motion.div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <motion.div 
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.7 }}
                className="w-16 h-16 bg-gradient-to-br from-brand-cyan/10 to-brand-cyan/5 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Shield className="h-8 w-8 text-brand-cyan" />
              </motion.div>
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="text-4xl md:text-5xl font-bold text-brand-cyan mb-2">24/7</div>
                <div className="text-gray-600">dedicated support</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
