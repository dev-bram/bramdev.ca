"use client";

import { AnimatedBackground } from "@/components/AnimatedBackground";
import { FloatingParticles } from "@/components/FloatingParticles";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { StackSection } from "@/components/StackSection";
import { FAQSection } from "@/components/FAQSection";
import { ReadySection } from "@/components/ReadySection";

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
