
import { useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
  nonInteraction?: boolean;
  timestamp: number;
}

interface UseAnalyticsOptions {
  debug?: boolean;
  disabled?: boolean;
}

const useAnalytics = ({ debug = false, disabled = false }: UseAnalyticsOptions = {}) => {
  const location = useLocation();
  const eventsQueue = useRef<AnalyticsEvent[]>([]);
  const isInitialized = useRef(false);

  // Initialize analytics
  useEffect(() => {
    if (disabled || isInitialized.current) return;
    
    // This is just a mock implementation
    if (debug) {
      console.log('Analytics initialized');
    }
    
    isInitialized.current = true;
    
    // Track initial page view
    trackPageView(location.pathname);
    
    return () => {
      if (debug) {
        console.log('Analytics cleaned up');
      }
    };
  }, [disabled, debug, location.pathname]);
  
  // Track page changes
  useEffect(() => {
    if (disabled || !isInitialized.current) return;
    trackPageView(location.pathname);
  }, [location.pathname, disabled]);
  
  // Log events in debug mode
  useEffect(() => {
    if (!debug || disabled) return;
    
    const interval = setInterval(() => {
      if (eventsQueue.current.length > 0) {
        console.log('Analytics events queue:', [...eventsQueue.current]);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [debug, disabled]);
  
  // Track a page view
  const trackPageView = useCallback((path: string) => {
    if (disabled) return;
    
    const event: AnalyticsEvent = {
      category: 'Page',
      action: 'View',
      label: path,
      nonInteraction: true,
      timestamp: Date.now()
    };
    
    eventsQueue.current.push(event);
    
    if (debug) {
      console.log('Page view tracked:', path);
    }
  }, [debug, disabled]);
  
  // Track an event
  const trackEvent = useCallback((category: string, action: string, label?: string, value?: number) => {
    if (disabled) return;
    
    const event: AnalyticsEvent = {
      category,
      action,
      label,
      value,
      timestamp: Date.now()
    };
    
    eventsQueue.current.push(event);
    
    if (debug) {
      console.log('Event tracked:', { category, action, label, value });
    }
  }, [debug, disabled]);
  
  return { trackPageView, trackEvent };
};

export default useAnalytics;
