'use client';

import { useEffect, useMemo, useState } from 'react';

export const useScreenSize = () => {
    const [width, setWidth] = useState(0);
  
    useEffect(() => {
      setWidth(window.innerWidth)
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    const isMobile = useMemo(() => width < 1024, [width]); // Example: define 1024px as the mobile threshold
  
    return { width, isMobile };
  };