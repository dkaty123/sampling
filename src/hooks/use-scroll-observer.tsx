
import { useState, useEffect, useRef, RefObject } from 'react';

interface ScrollObserverOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

interface ScrollObserverReturn {
  ref: RefObject<HTMLElement>;
  isInView: boolean;
  hasBeenInView: boolean;
  entry: IntersectionObserverEntry | null;
}

const useScrollObserver = (options: ScrollObserverOptions = {}): ScrollObserverReturn => {
  const { threshold = 0, rootMargin = '0px', once = false } = options;
  
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  
  const ref = useRef<HTMLElement>(null);
  const prevRatio = useRef(0);
  
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        // Store the entry for external use
        setEntry(entry);
        
        // Update visibility state
        const isEntryIntersecting = entry.isIntersecting;
        
        if (isEntryIntersecting) {
          setIsInView(true);
          setHasBeenInView(true);
          
          // If once is true, unobserve after first time in view
          if (once) {
            observer.unobserve(entry.target);
          }
        } else {
          // Only update if not using "once" mode or element hasn't been in view yet
          if (!once || !hasBeenInView) {
            setIsInView(false);
          }
        }
        
        // Store current ratio for future comparisons
        prevRatio.current = entry.intersectionRatio;
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, {
      threshold,
      rootMargin,
    });
    
    const currentRef = ref.current;
    
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, once, hasBeenInView]);
  
  return { ref, isInView, hasBeenInView, entry };
};

export default useScrollObserver;
