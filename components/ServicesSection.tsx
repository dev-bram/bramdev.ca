'use client';

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, memo } from "react";
import { Globe, Wrench, Database, Settings } from "lucide-react";
import { Locale, getTranslations } from '@/lib/i18n';
import { use } from 'react';

const iconMap = [Globe, Wrench, Database, Settings];

interface ServicesSectionProps {
  params: Promise<{ locale: string }>;
}

function ServicesSectionComponent({ params }: ServicesSectionProps) {
  const { locale } = use(params) as { locale: Locale };
  const t = getTranslations(locale);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8]
  );

  return (
    <motion.section
      ref={ref}
      className="relative py-32 px-4"
      style={{ opacity, scale }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="section-title text-white mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            {t.services.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.services.items.map((service, i) => {
            const Icon = iconMap[i];
            return (
              <motion.div
                key={i}
                className="relative group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="relative h-full p-8 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 overflow-hidden">
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "radial-gradient(circle at center, rgba(255, 255, 255, 0.08), transparent)",
                    }}
                  />

                  <div className="relative z-10">
                    <motion.div
                      className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-6 group-hover:bg-white/20 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </motion.div>

                    <h3 className="text-white mb-3">{service.title}</h3>
                    <p className="text-white/60">{service.description}</p>
                  </div>

                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent blur-2xl" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

export const ServicesSection = memo(ServicesSectionComponent);
ServicesSection.displayName = 'ServicesSection';
