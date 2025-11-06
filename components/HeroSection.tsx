'use client';

import { motion } from 'motion/react';
import { use, memo } from 'react';
import { Locale, getTranslations } from '@/lib/i18n';

const letterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.6, 0.01, 0.05, 0.95],
    },
  }),
};

interface HeroSectionProps {
  params: Promise<{ locale: string }>;
}

function HeroSectionComponent({ params }: HeroSectionProps) {
  const { locale } = use(params) as { locale: Locale };
  const t = getTranslations(locale);
  const otherLocale = locale === 'fr' ? 'en' : 'fr';
  const otherLocaleUrl = otherLocale === 'fr' ? '/' : '/en';

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-4">
      <motion.header
        className="absolute top-0 left-0 right-0 flex justify-end items-center p-6 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="flex gap-4 items-center text-lg">
          <motion.a
            href="mailto:team@bramdev.ca"
            className="text-white/60 hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            {t.nav.email}
          </motion.a>
          <span className="text-white/40">|</span>
          <motion.a
            href={otherLocaleUrl}
            className="text-white/60 hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            {t.nav.languageToggle}
          </motion.a>
        </div>
      </motion.header>

      <div className="relative z-10 text-center">
        <motion.div
          className="relative inline-block"
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center justify-center mb-8">
            {['_', 'b', 'r', 'a', 'm', '.'].map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                className="inline-block text-white relative"
                style={{
                  fontSize: 'clamp(4rem, 15vw, 10rem)',
                  fontWeight: 900,
                  textShadow: '0 0 30px rgba(255, 255, 255, 0.3), 0 0 60px rgba(255, 255, 255, 0.1)',
                }}
                whileHover={{
                  y: -10,
                  textShadow: '0 0 40px rgba(255, 255, 255, 0.5), 0 0 80px rgba(255, 255, 255, 0.2)',
                  transition: { duration: 0.2 },
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-8 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0 }}
        >
          <div className="inline-block px-8 py-4 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 relative overflow-hidden group">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            />

            <p className="text-white/90 italic relative z-10">
              <span className="animated-dot"></span> {t.hero.tagline}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export const HeroSection = memo(HeroSectionComponent);
HeroSection.displayName = 'HeroSection';
