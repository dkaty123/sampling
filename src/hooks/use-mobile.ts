
import { useState, useEffect, useCallback } from 'react';

interface UseMobileOptions {
  mobileBreakpoint?: number;
  tabletBreakpoint?: number;
  desktopBreakpoint?: number;
  updateOnResize?: boolean;
}

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  orientation: 'portrait' | 'landscape';
  width: number;
  height: number;
  breakpoint: 'mobile' | 'tablet' | 'desktop';
}

export const useDeviceDetect = ({
  mobileBreakpoint = 768, 
  tabletBreakpoint = 1024,
  desktopBreakpoint = 1280,
  updateOnResize = true
}: UseMobileOptions = {}): DeviceInfo => {
  const getDeviceInfo = useCallback((): DeviceInfo => {
    // For SSR, provide default values
    if (typeof window === 'undefined') {
      return {
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        orientation: 'landscape',
        width: 1920,
        height: 1080,
        breakpoint: 'desktop'
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    
    const isMobile = width < mobileBreakpoint;
    const isTablet = width >= mobileBreakpoint && width < desktopBreakpoint;
    const isDesktop = width >= desktopBreakpoint;
    
    let breakpoint: 'mobile' | 'tablet' | 'desktop' = 'desktop';
    if (isMobile) breakpoint = 'mobile';
    else if (isTablet) breakpoint = 'tablet';
    
    return {
      isMobile,
      isTablet,
      isDesktop,
      orientation: width > height ? 'landscape' : 'portrait',
      width,
      height,
      breakpoint
    };
  }, [mobileBreakpoint, tabletBreakpoint, desktopBreakpoint]);

  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(getDeviceInfo());

  useEffect(() => {
    if (!updateOnResize) return;

    const handleResize = () => {
      setDeviceInfo(getDeviceInfo());
    };

    // Add event listener
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    // Call once on init
    handleResize();

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [getDeviceInfo, updateOnResize]);

  return deviceInfo;
};

// For backward compatibility
export const useIsMobile = () => {
  const { isMobile } = useDeviceDetect();
  return isMobile;
};

export default useDeviceDetect;
