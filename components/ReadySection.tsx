'use client';

import { motion } from 'motion/react';
import { use, memo } from 'react';
import { Locale, getTranslations } from '@/lib/i18n';
import { SOCIAL_LINKS } from '@/lib/constants';

interface ReadySectionProps {
  params: Promise<{ locale: string }>;
}

function ReadySectionComponent({ params }: ReadySectionProps) {
  const { locale } = use(params) as { locale: Locale };
  const t = getTranslations(locale);

  return (
    <section className="relative pt-32 px-4" id="connect">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="section-title text-white mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
            {t.contact.title}
          </h2>

          <p className="text-white/60 italic mb-12">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <motion.div
          className="mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.a
            href="mailto:team@bramdev.ca"
            className="contact-button"
            whileHover={{ y: -5 }}
            whileTap={{ y: -2 }}
          >
            {t.contact.button}
            <span className="arrow">→</span>
          </motion.a>
        </motion.div>

        <motion.div
          className="flex justify-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {SOCIAL_LINKS.map((social, i) => (
            <a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="w-14 h-14 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 transition-all relative group"
              style={{
                ['--hover-color' as string]: social.color,
              }}
            >
              <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
              <social.icon className="w-5 h-5 relative z-10 transition-colors duration-300 group-hover:[color:var(--hover-color)]" />
            </a>
          ))}
        </motion.div>

        <motion.p
          className="text-white/40 mt-16 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {t.contact.footer}
        </motion.p>
      </div>
    </section>
  );
}

export const ReadySection = memo(ReadySectionComponent);
ReadySection.displayName = 'ReadySection';
