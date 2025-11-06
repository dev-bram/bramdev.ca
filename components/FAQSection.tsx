'use client';

import { motion } from 'motion/react';
import { useState, memo } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Locale, getTranslations } from '@/lib/i18n';
import { use } from 'react';

interface FAQSectionProps {
  params: Promise<{ locale: string }>;
}

function FAQSectionComponent({ params }: FAQSectionProps) {
  const { locale } = use(params) as { locale: Locale };
  const t = getTranslations(locale);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title text-white" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
            {t.faq.title}
          </h2>
        </motion.div>

        <div className="space-y-4">
          {t.faq.items.map((faq, i) => (
            <motion.div
              key={i}
              className="border-b border-white/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <motion.button
                className="w-full py-6 flex items-center justify-between text-left group"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-white pr-8">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0"
                >
                  {openIndex === i ? (
                    <Minus className="w-5 h-5 text-white" />
                  ) : (
                    <Plus className="w-5 h-5 text-white" />
                  )}
                </motion.div>
              </motion.button>

              <motion.div
                initial={false}
                animate={{
                  height: openIndex === i ? 'auto' : 0,
                  opacity: openIndex === i ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="text-white/60 pb-6 pr-12">{faq.answer}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const FAQSection = memo(FAQSectionComponent);
FAQSection.displayName = 'FAQSection';
