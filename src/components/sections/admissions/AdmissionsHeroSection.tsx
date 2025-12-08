'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslation } from '@/contexts/LanguageContext';

interface AdmissionsHeroSectionProps {
  className?: string;
}

export function AdmissionsHeroSection({ className = '' }: AdmissionsHeroSectionProps) {
  const { t } = useTranslation();

  const scrollToContent = () => {
    const contentSection = document.getElementById('admissions-content');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!t.admissions) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <section
      className={`relative h-screen w-full overflow-hidden ${className}`}
      role="banner"
      aria-label="Admissions hero section"
    >
      {/* Background Image */}
      <Image
        src="/images/pic/PCCS-15.JPG"
        alt="PCCS Students"
        fill
        style={{ objectFit: 'cover' }}
        priority
        className="absolute inset-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-pccs-primary/80 via-pccs-primary/60 to-transparent"></div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="text-white">
              {/* Subtitle */}
              <h3 className="text-lg md:text-xl lg:text-2xl font-medium mb-4" style={{ color: '#2ECC40' }}>
                {t.admissions.heroSubtitle}
              </h3>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
                {t.admissions.heroTitle}
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl lg:text-2xl mb-8 lg:mb-12 leading-relaxed text-gray-100 max-w-2xl">
                {t.admissions.description}
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <button
                  onClick={scrollToContent}
                  className="inline-flex items-center justify-center px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-center focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{ backgroundColor: '#1E1E8C' }}
                  onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#161671'}
                  onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = '#1E1E8C'}
                >
                  {t.admissions.viewForms}
                  <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <a
                  href="tel:+1-484-298-9317"
                  className="inline-flex items-center justify-center px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-center focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{ backgroundColor: '#2ECC40' }}
                  onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#26A235'}
                  onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = '#2ECC40'}
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  {t.admissions.callNow}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <button
          onClick={scrollToContent}
          className="flex flex-col items-center text-white opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
          aria-label="Scroll to content"
        >
          <span className="text-sm mb-2">Scroll</span>
          <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>
  );
}
