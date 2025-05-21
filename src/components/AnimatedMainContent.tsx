
'use client';

import { useState, useEffect, type ReactNode } from 'react';

export function AnimatedMainContent({ children }: { children: ReactNode }) {
  const [animateContent, setAnimateContent] = useState(false);

  useEffect(() => {
    // Initial animation on load, slight delay to ensure transition applies
    const initialTimeout = setTimeout(() => {
      if (document.visibilityState === 'visible') {
        setAnimateContent(true);
      }
    }, 50);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Reset and re-trigger animation
        setAnimateContent(false); // Apply initial (hidden) state
        setTimeout(() => setAnimateContent(true), 100); // Apply final (visible) state after a short delay
      } else {
        // Optionally, set to false when tab is hidden to prepare for next reveal.
        // If you want an "animate-out" effect, you could set it here.
        // For now, we only animate in when tab becomes visible again.
      }
    };

    // Set initial state based on current visibility, in case the effect runs after the first paint
    if (document.visibilityState === 'visible' && !animateContent) {
       // This ensures that if the component mounts and tab is already visible, we trigger animation.
       // The setTimeout in initialTimeout handles the very first load.
    }


    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup listener on component unmount
    return () => {
      clearTimeout(initialTimeout);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []); // Empty dependency array ensures this runs once on mount and cleans up on unmount

  return (
    <main
      className={`flex-grow transition-all duration-700 ease-out ${
        animateContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      {children}
    </main>
  );
}
