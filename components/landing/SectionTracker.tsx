'use client';

import { useEffect, useRef } from 'react';

const SECTION_IDS = [
  'hero',
  'about',
  'case-studies',
  'blog',
  'testimonials',
  'services',
  'pricing',
  'contact',
];

const STORAGE_KEY = 'lastVisitedSection';
const STORAGE_TIMESTAMP_KEY = 'lastVisitedTimestamp';
const SECTION_STAY_TIME = 10000; // 10 seconds in milliseconds
const REFRESH_TIMEOUT = 10000; // 10 seconds before refresh goes to home

export default function SectionTracker() {
  const currentSectionRef = useRef<string>('');
  const sectionStartTimeRef = useRef<number>(Date.now());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Immediately scroll to top to prevent browser scroll restoration
    window.scrollTo(0, 0);

    // Update timestamp when page is about to unload (user refreshes or leaves)
    // This tracks when the user last visited the page
    const handleBeforeUnload = () => {
      const savedSection = localStorage.getItem(STORAGE_KEY);
      if (savedSection) {
        // Update timestamp to current time when leaving
        localStorage.setItem(STORAGE_TIMESTAMP_KEY, Date.now().toString());
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Check if we should restore a section on page load
    const savedSection = localStorage.getItem(STORAGE_KEY);
    const savedTimestamp = localStorage.getItem(STORAGE_TIMESTAMP_KEY);
    
    if (savedSection && savedTimestamp) {
      const timeSinceLastVisit = Date.now() - parseInt(savedTimestamp);
      
      // If less than 10 seconds since last visit, restore the section
      if (timeSinceLastVisit < REFRESH_TIMEOUT) {
        // Small delay to ensure page is rendered
        setTimeout(() => {
          const element = document.getElementById(savedSection);
          if (element) {
            // For hero section, scroll to top
            if (savedSection === 'hero') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              // For other sections, scroll to element with offset for header
              const headerOffset = 64;
              const elementPosition = element.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
              window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
            currentSectionRef.current = savedSection;
            sectionStartTimeRef.current = Date.now();
          }
        }, 100);
        return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
        };
      } else {
        // Clear saved section if more than 10 seconds have passed
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STORAGE_TIMESTAMP_KEY);
      }
    }

    // Default: scroll to top (hero/home)
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      currentSectionRef.current = 'hero';
      sectionStartTimeRef.current = Date.now();
    }, 100);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      let found = false;
      
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Check if section is in view (with some threshold)
          if (rect.top <= 100 && rect.bottom > 100) {
            if (currentSectionRef.current !== id) {
              // Section changed
              currentSectionRef.current = id;
              sectionStartTimeRef.current = Date.now();
              
              // Clear any existing timeout
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
              }
              
              // Set timeout to mark section as "stayed for 10+ seconds"
              timeoutRef.current = setTimeout(() => {
                if (currentSectionRef.current === id) {
                  // User has been on this section for 10+ seconds
                  // Mark it as eligible to be restored on refresh
                  localStorage.setItem(STORAGE_KEY, id);
                  // Set timestamp to current time (will be updated on page unload)
                  localStorage.setItem(STORAGE_TIMESTAMP_KEY, Date.now().toString());
                }
              }, SECTION_STAY_TIME);
            }
            found = true;
            break;
          }
        }
      }
    };

    // Initial check
    handleScroll();

    // Throttle scroll events
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    
    // Also check on a timer to catch cases where scroll doesn't fire
    const intervalId = setInterval(handleScroll, 500);

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      clearInterval(intervalId);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return null; // This component doesn't render anything
}

