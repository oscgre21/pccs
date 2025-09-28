'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  HeroSection,
  FeaturesSection,
  MissionSection,
  VisionSection,
  ValuesSection,
  PurposeSection
} from '@/components/sections';

export default function HomePage() {
  const [showLoading, setShowLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Después de 2 segundos, inicia el fade out
    const timer = setTimeout(() => {
      setFadeOut(true);
      // Después del fade out, oculta completamente el loading
      setTimeout(() => {
        setShowLoading(false);
      }, 800);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Contenido principal - siempre visible */}
      <main className="min-h-screen">
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* About Section       <AboutSection /> */}


        {/* Mission Section */}
        <MissionSection />

        {/* Vision Section */}
        <VisionSection />

        {/* Values Section */}
        <ValuesSection />

        {/* Purpose Section */}
        <PurposeSection />
      </main>

      {/* Loading Screen - overlay que se desvanece */}
      {showLoading && (
        <div
          className={`fixed inset-0 bg-white flex items-center justify-center z-50 transition-opacity duration-800 ${
            fadeOut ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div
            className="relative"
            style={{
              animation: 'pulseGrow 2s ease-in-out infinite'
            }}
          >
            <Image
              src="/logos/logo3.png"
              alt="PCCS Logo"
              width={200}
              height={200}
              className="drop-shadow-2xl"
              priority
            />
          </div>
          <style>{`
            @keyframes pulseGrow {
              0%, 100% {
                transform: scale(1);
              }
              50% {
                transform: scale(1.15);
              }
            }
          `}</style>
        </div>
      )}
    </>
  );
}