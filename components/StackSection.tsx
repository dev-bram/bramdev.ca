'use client';

import { useEffect, useRef, memo, useState } from 'react';
import Image from 'next/image';
import { use } from 'react';
import { Locale, getTranslations } from '@/lib/i18n';
import { Logo, TECH_LOGOS_ROW_1, TECH_LOGOS_ROW_2 } from '@/lib/constants';

interface LogoCarouselProps {
  logos: Logo[];
  reverse?: boolean;
}

const LogoCarousel = memo(function LogoCarousel({ logos, reverse = false }: LogoCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const hasClonedRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!trackRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading slightly before visible
        threshold: 0.1,
      }
    );

    observer.observe(trackRef.current);

    return () => observer.disconnect();
  }, []);

  // Clone logos for infinite scroll
  useEffect(() => {
    if (!trackRef.current || hasClonedRef.current || !isVisible) return;

    const track = trackRef.current;
    const children = Array.from(track.children) as HTMLElement[];

    if (children.length === 0) return;

    children.forEach(child => {
      const clone = child.cloneNode(true);
      track.appendChild(clone);
    });

    hasClonedRef.current = true;

    const itemWidth = 150;
    const gap = 32;
    const totalItems = children.length;
    const trackWidth = totalItems * 2 * (itemWidth + gap);

    track.style.width = `${trackWidth}px`;

    const baseDuration = 30;
    const durationPerItem = 0.5;
    const scrollDuration = baseDuration + totalItems * durationPerItem;

    track.style.setProperty('--scroll-duration', `${scrollDuration}s`);
  }, [logos, isVisible]);

  return (
    <div className={`logo-carousel-container ${reverse ? 'carousel-reverse' : ''}`}>
      <div className="logo-carousel-track" ref={trackRef}>
        {logos.map((logo, index) => (
          <div className="logo-item" key={index}>
            <Image
              src={logo.src}
              alt={logo.alt}
              width={150}
              height={150}
              loading="lazy"
              className="square-image object-contain"
              sizes="150px"
            />
          </div>
        ))}
      </div>
      <div className="fade-overlay left"></div>
      <div className="fade-overlay right"></div>
    </div>
  );
});

interface StackSectionProps {
  params: Promise<{ locale: string }>;
}

function StackSectionComponent({ params }: StackSectionProps) {
  const { locale } = use(params) as { locale: Locale };
  const t = getTranslations(locale);

  return (
    <section className="relative py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="section-title text-white"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
          >
            {t.tech.title}
          </h2>
          <p className="text-white/60 italic mt-4">
            {t.tech.subtitle}
          </p>
        </div>
        <LogoCarousel logos={TECH_LOGOS_ROW_1} />
        <LogoCarousel logos={TECH_LOGOS_ROW_2} reverse={true} />
      </div>
    </section>
  );
}

export const StackSection = memo(StackSectionComponent);
StackSection.displayName = 'StackSection';
