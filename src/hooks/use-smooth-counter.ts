
import { useEffect, useState, useRef } from 'react';

interface CounterOptions {
  duration?: number;
  delay?: number;
  easing?: (t: number) => number;
  formatter?: (value: number) => string | number;
  decimals?: number;
}

// Common easing functions
export const easings = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => --t * t * t + 1,
  easeInOutCubic: (t: number) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInExpo: (t: number) => (t === 0 ? 0 : Math.pow(2, 10 * (t - 1))),
  easeOutExpo: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  easeInOutExpo: (t: number) => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    if ((t *= 2) < 1) return 0.5 * Math.pow(2, 10 * (t - 1));
    return 0.5 * (2 - Math.pow(2, -10 * --t));
  }
};

/**
 * A hook that animates counting from one value to another
 */
const useSmoothCounter = (
  targetValue: number,
  {
    duration = 2000,
    delay = 0,
    easing = easings.easeOutExpo,
    formatter = (value: number) => value,
    decimals = 0
  }: CounterOptions = {}
) => {
  const [displayValue, setDisplayValue] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const startValueRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const isMountedRef = useRef(true);

  // Reset counter when target value changes
  useEffect(() => {
    // Store the current value as the starting point
    startValueRef.current = displayValue;
    
    // Clear any existing animation
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    
    // Use a timeout for the delay
    const timeoutId = setTimeout(() => {
      if (!isMountedRef.current) return;
      
      startTimeRef.current = null; // Reset start time
      
      const animate = (timestamp: number) => {
        if (!isMountedRef.current) return;
        
        if (startTimeRef.current === null) {
          startTimeRef.current = timestamp;
        }
        
        const elapsed = timestamp - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easing(progress);
        
        // Calculate current value
        const value = startValueRef.current + (targetValue - startValueRef.current) * easedProgress;
        
        // Round to specified decimal places
        const roundedValue = Number(value.toFixed(decimals));
        
        setDisplayValue(roundedValue);
        
        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate);
        }
      };
      
      frameRef.current = requestAnimationFrame(animate);
    }, delay);
    
    return () => {
      clearTimeout(timeoutId);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [targetValue, duration, delay, easing, decimals]);
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);
  
  // Format the display value
  const formattedValue = formatter(displayValue);
  
  return formattedValue;
};

export default useSmoothCounter;
