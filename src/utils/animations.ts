import { useState, useEffect } from 'react';

/**
 * Hook to detect mobile screens (< 768px)
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
}

/**
 * Professional, snappy fade-up animation tailored for mobile and desktop.
 * Mobile: minimal vertical movement (8px), snappy duration (0.24s), minimal delay.
 * Desktop: sleek 16px vertical drift, fast duration (0.32s).
 */
export const getFadeUpProps = (isMobile: boolean, delay = 0) => ({
  initial: { opacity: 0, y: isMobile ? 8 : 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: isMobile ? "-10px" : "-30px" },
  transition: {
    duration: isMobile ? 0.22 : 0.32,
    delay: isMobile ? Math.min(delay, 0.04) : delay,
    ease: [0.16, 1, 0.3, 1] as const,
  },
});

/**
 * Snappy load fade-in for hero/header elements
 */
export const getHeroFadeProps = (isMobile: boolean, delay = 0) => ({
  initial: { opacity: 0, y: isMobile ? 6 : 14 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: isMobile ? 0.25 : 0.35,
    delay: isMobile ? Math.min(delay, 0.06) : delay,
    ease: [0.16, 1, 0.3, 1] as const,
  },
});
