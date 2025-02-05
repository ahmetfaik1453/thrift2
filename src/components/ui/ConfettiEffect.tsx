import React from 'react';
import { useEffect, useState } from 'react';

export default function ConfettiEffect() {
  const [particles, setParticles] = useState<Array<{ x: number; y: number; color: string }>>([]);

  useEffect(() => {
    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];
    const newParticles = Array.from({ length: 50 }, () => ({
      x: Math.random() * window.innerWidth,
      y: -20,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setParticles(newParticles);

    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(p => ({
          ...p,
          y: p.y + 5,
          x: p.x + (Math.random() - 0.5) * 3
        })).filter(p => p.y < window.innerHeight)
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: p.x,
            top: p.y,
            backgroundColor: p.color,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
        />
      ))}
    </div>
  );
}
