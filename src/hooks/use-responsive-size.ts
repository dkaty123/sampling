
import { useState, useEffect } from 'react';

interface ResponsiveSizeOptions {
  baseSize: number;
  minSize?: number;
  maxSize?: number;
  scaleFactor?: number;
  breakpoints?: { [key: string]: number };
}

/**
 * A hook that returns a responsive size based on viewport width
 */
const useResponsiveSize = ({
  baseSize,
  minSize = 0,
  maxSize = Number.MAX_VALUE,
  scaleFactor = 1,
  breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536
  }
}: ResponsiveSizeOptions) => {
  const [size, setSize] = useState(baseSize);
  const [breakpoint, setBreakpoint] = useState<string | null>(null);

  useEffect(() => {
    const calculateSize = () => {
      const width = window.innerWidth;
      
      // Determine current breakpoint
      let currentBreakpoint: string | null = null;
      const sortedBreakpoints = Object.entries(breakpoints)
        .sort((a, b) => b[1] - a[1]); // Sort from largest to smallest
      
      for (const [name, minWidth] of sortedBreakpoints) {
        if (width >= minWidth) {
          currentBreakpoint = name;
          break;
        }
      }
      
      setBreakpoint(currentBreakpoint);
      
      // Calculate size based on viewport width and scale factor
      const widthRatio = width / 1920; // Base on a "standard" 1920px wide screen
      const calculatedSize = baseSize * widthRatio * scaleFactor;
      
      // Ensure size is within bounds
      const clampedSize = Math.max(minSize, Math.min(calculatedSize, maxSize));
      setSize(clampedSize);
    };
    
    // Calculate initial size
    calculateSize();
    
    // Update size on resize
    window.addEventListener('resize', calculateSize);
    
    return () => {
      window.removeEventListener('resize', calculateSize);
    };
  }, [baseSize, minSize, maxSize, scaleFactor, breakpoints]);
  
  return { size, breakpoint };
};

export default useResponsiveSize;
