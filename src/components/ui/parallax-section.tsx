
import React, { useEffect, useRef } from 'react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  backgroundSpeed?: number; // Lower value = slower movement
  contentSpeed?: number; // Higher value = faster movement
  className?: string;
  backgroundClassName?: string;
  contentClassName?: string;
}

const ParallaxSection = ({
  children,
  backgroundSpeed = 0.5,
  contentSpeed = 0.8,
  className = "",
  backgroundClassName = "",
  contentClassName = ""
}: ParallaxSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const scrollPosition = window.scrollY;
      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Only apply parallax when the section is in view
      if (
        scrollPosition + viewportHeight > sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        const relativeScroll = scrollPosition - sectionTop;
        
        if (backgroundRef.current) {
          backgroundRef.current.style.transform = `translateY(${relativeScroll * backgroundSpeed}px)`;
        }
        
        if (contentRef.current) {
          contentRef.current.style.transform = `translateY(${relativeScroll * contentSpeed}px)`;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [backgroundSpeed, contentSpeed]);

  return (
    <div ref={sectionRef} className={`relative overflow-hidden ${className}`}>
      <div ref={backgroundRef} className={`absolute inset-0 z-0 ${backgroundClassName}`} />
      <div ref={contentRef} className={`relative z-10 ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection;
