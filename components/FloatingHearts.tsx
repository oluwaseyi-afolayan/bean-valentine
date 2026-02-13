'use client';

import { useMemo, useState, useEffect } from 'react';

interface FloatingHeartsProps {
  count?: number;
}

export default function FloatingHearts({ count = 15 }: FloatingHeartsProps) {
  const [isClient, setIsClient] = useState(false);

  // Only render on client to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Memoize elements so they don't regenerate on every render
  const elements = useMemo(() => 
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 20 + 15, // 15-35px
      duration: Math.random() * 10 + 15, // 15-25s
      delay: Math.random() * 5,
    })),
    [count]
  );

  // Don't render anything on server
  if (!isClient) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((element) => (
        <div
          key={element.id}
          className="floating-element"
          style={{
            left: element.left,
            fontSize: `${element.size}px`,
            animationDuration: `${element.duration}s`,
            animationDelay: `${element.delay}s`,
          }}
        >
          💕
        </div>
      ))}
    </div>
  );
}