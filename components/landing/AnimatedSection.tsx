'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right';

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
};

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: AnimatedSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  const hiddenTransform =
    direction === 'up'
      ? 'translate-y-8'
      : direction === 'down'
      ? '-translate-y-8'
      : direction === 'left'
      ? 'translate-x-8'
      : '-translate-x-8';

  return (
    <div
      ref={containerRef}
      className={`transition-all duration-700 ease-out will-change-transform ${
        isVisible ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${hiddenTransform}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}


