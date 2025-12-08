'use client';

import React from 'react';
import { useTranslation } from '@/contexts/LanguageContext';

interface AdmissionsHeroSectionProps {
  className?: string;
}

export function AdmissionsHeroSection({ className = '' }: AdmissionsHeroSectionProps) {
  const { t } = useTranslation();

  if (!t.admissions) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <section className={`relative w-full h-[120vh] min-h-[900px] sm:min-h-[1000px] md:min-h-[1100px] lg:min-h-[1200px] overflow-hidden ${className}`}>
      <img
        src="/images/pic/PCCS-15.JPG"
        alt="PCCS Students"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Enhanced overlay for maximum text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-pccs-primary/85 via-pccs-primary/75 to-pccs-primary/70"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40"></div>

      {/* Hero Content */}
      <div className="relative z-20 flex items-center justify-center h-full px-6">
        <div className="text-center max-w-5xl mx-auto">
          {/* Subtítulo más pequeño para contraste */}
          <div className="mb-8 sm:mb-12">
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
              <span className="drop-shadow-xl" style={{
                textShadow: '0 0 20px rgba(0,0,0,0.9), 0 0 40px rgba(30,30,140,0.3)'
              }}>
                {t.admissions.heroTitle}
              </span>
            </p>

            <p className="text-lg sm:text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed font-medium">
              <span className="drop-shadow-lg" style={{
                textShadow: '0 0 15px rgba(0,0,0,0.8)'
              }}>
                {t.admissions.heroSubtitle}
              </span>
            </p>
          </div>

          {/* Call to action en el hero */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#formularios"
              className="inline-flex items-center justify-center px-8 py-4 text-pccs-primary font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl bg-white hover:bg-gray-100 text-lg"
            >
              {t.admissions.viewForms}
              <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </a>

            <a
              href="tel:+1-484-298-9317"
              className="inline-flex items-center justify-center px-8 py-4 font-bold rounded-full border-3 border-white transition-all duration-300 transform hover:scale-105 shadow-2xl text-white hover:bg-white hover:text-pccs-primary text-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              {t.admissions.callNow}
            </a>
          </div>
        </div>
      </div>

      {/* Brand decorative elements optimizados */}
      <div className="absolute top-8 left-4 sm:top-10 sm:left-10 w-16 h-16 sm:w-24 sm:h-24 bg-pccs-tropical rounded-full opacity-70 animate-pulse"></div>
      <div className="absolute bottom-8 right-4 sm:bottom-10 sm:right-10 w-14 h-14 sm:w-20 sm:h-20 bg-pccs-accent rounded-full opacity-60"></div>
      <div className="absolute top-1/4 right-8 sm:top-1/3 sm:right-20 w-12 h-12 sm:w-16 sm:h-16 bg-pccs-earth rounded-full opacity-50"></div>
    </section>
  );
}
