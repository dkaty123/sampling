
import { useState, useEffect, useRef } from 'react';

interface ScrollObserverProps {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

const useScrollObserver = ({ threshold = 0.1, rootMargin = '0px', once = false }: ScrollObserverProps = {}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        setIsInView(isVisible);
        
        // If 'once' is true and the element is in view, we don't need to observe it anymore
        if (once && isVisible) {
          observer.unobserve(currentRef);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(currentRef);

    const handleScroll = () => {
      if (!currentRef) return;
      
      const rect = currentRef.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far the element is through the viewport
      // 0 means the element's top is at the bottom of the viewport
      // 100 means the element's bottom is at the top of the viewport
      const percentage = Math.min(
        100,
        Math.max(
          0,
          ((windowHeight - rect.top) / (windowHeight + rect.height)) * 100
        )
      );
      
      setScrollPercentage(percentage);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold, rootMargin, once]);

  return { ref, isInView, scrollPercentage };
};

export default useScrollObserver;
