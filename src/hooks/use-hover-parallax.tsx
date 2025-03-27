
import { useState, useEffect, useRef, RefObject } from 'react';

interface ParallaxElement {
  element: HTMLElement;
  translateX: number;
  translateY: number;
  speed: number;
}

interface UseHoverParallaxOptions {
  intensity?: number;
  resetOnExit?: boolean;
  perspective?: number;
}

// This hook provides a way to create parallax effects on elements when hovering over a container
const useHoverParallax = <T extends HTMLElement>(
  options: UseHoverParallaxOptions = {}
): [RefObject<T>, (ref: RefObject<HTMLElement>, speed: number) => void] => {
  const {
    intensity = 10,
    resetOnExit = true,
    perspective = 1000,
  } = options;
  
  const containerRef = useRef<T>(null);
  const elementsRef = useRef<ParallaxElement[]>([]);

  const addElement = (ref: RefObject<HTMLElement>, speed: number = 1) => {
    if (ref.current && !elementsRef.current.some(e => e.element === ref.current)) {
      elementsRef.current.push({
        element: ref.current,
        translateX: 0,
        translateY: 0,
        speed,
      });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.style.perspective = `${perspective}px`;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const mouseY = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
      
      elementsRef.current.forEach(item => {
        const translateX = mouseX * intensity * item.speed;
        const translateY = mouseY * intensity * item.speed;
        
        item.translateX = translateX;
        item.translateY = translateY;
        
        item.element.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
        item.element.style.transition = 'transform 0.1s ease-out';
      });
    };
    
    const handleMouseLeave = () => {
      if (resetOnExit) {
        elementsRef.current.forEach(item => {
          item.translateX = 0;
          item.translateY = 0;
          item.element.style.transform = 'translate3d(0, 0, 0)';
          item.element.style.transition = 'transform 0.3s ease-out';
        });
      }
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity, resetOnExit, perspective]);
  
  return [containerRef, addElement];
};

export default useHoverParallax;
