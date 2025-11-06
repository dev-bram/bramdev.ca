import { motion } from 'motion/react';
import { useState, useEffect, memo } from 'react';

function FloatingParticlesComponent() {
  const [isMounted, setIsMounted] = useState(false);

  const [particles] = useState(() =>
    [...Array(15)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }))
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {isMounted && particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}

export const FloatingParticles = memo(FloatingParticlesComponent);
FloatingParticles.displayName = 'FloatingParticles';
