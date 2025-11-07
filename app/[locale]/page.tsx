"use client";

import dynamic from 'next/dynamic';
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { FloatingParticles } from "@/components/FloatingParticles";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";

// Lazy load below-fold sections for better initial page load
const StackSection = dynamic(() => import("@/components/StackSection").then(mod => ({ default: mod.StackSection })), {
  loading: () => <div className="relative py-32 px-4" />,
});

const FAQSection = dynamic(() => import("@/components/FAQSection").then(mod => ({ default: mod.FAQSection })), {
  loading: () => <div className="relative py-32 px-4" />,
});

const ReadySection = dynamic(() => import("@/components/ReadySection").then(mod => ({ default: mod.ReadySection })), {
  loading: () => <div className="relative py-32 px-4" />,
});

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default function HomePage({ params }: PageProps) {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <AnimatedBackground />
      <FloatingParticles />

      <div className="relative z-10">
        <HeroSection params={params} />
        <ServicesSection params={params} />
        <StackSection params={params} />
        <FAQSection params={params} />
        <ReadySection params={params} />
      </div>
    </div>
  );
}
