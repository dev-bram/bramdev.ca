'use client';

import { motion } from 'motion/react';
import { useEffect, useState, memo } from 'react';

function AnimatedBackgroundComponent() {
  const [isMounted, setIsMounted] = useState(false);

  const [orbs] = useState(() =>
    [...Array(3)].map((_, i) => ({
      width: Math.random() * 400 + 300,
      height: Math.random() * 400 + 300,
      left: Math.random() * 100,
      top: Math.random() * 100,
      xOffset: Math.random() * 100 - 50,
      yOffset: Math.random() * 100 - 50,
      duration: Math.random() * 15 + 15,
      opacity: 0.035 + i * 0.01,
    }))
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.035), transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.025), transparent 50%), radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.025), transparent 50%)',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      {/* Floating orbs */}
      {isMounted && orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: `${orb.width}px`,
            height: `${orb.height}px`,
            background: `radial-gradient(circle, rgba(255, 255, 255, ${orb.opacity}), transparent)`,
            left: `${orb.left}%`,
            top: `${orb.top}%`,
          }}
          animate={{
            x: [0, orb.xOffset, 0],
            y: [0, orb.yOffset, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.9) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
}

export const AnimatedBackground = memo(AnimatedBackgroundComponent);
AnimatedBackground.displayName = 'AnimatedBackground';
