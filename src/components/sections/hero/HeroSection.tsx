'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { HeroSectionProps, CarouselImage } from '@/types';


const animatedWords = ['Kids', 'Child', 'youth'];
const carouselImages: CarouselImage[] = [
  {
    src: '/images/pic/PCCS-12.JPG',
    alt: 'PCCS Educational Environment - Image 1'
  },
  {
    src: '/images/pic/PCCS-56.JPG',
    alt: 'PCCS Educational Environment - Image 2'
  }
];

export function HeroSection({ className = '' }: HeroSectionProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [showCurrentImage, setShowCurrentImage] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % animatedWords.length);
        setIsVisible(true);
      }, 300);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setShowCurrentImage(false);

      setTimeout(() => {
        setCurrentImageIndex(nextImageIndex);
        setNextImageIndex((nextImageIndex + 1) % carouselImages.length);
        setShowCurrentImage(true);
      }, 1000);
    }, 4000);

    return () => clearInterval(imageInterval);
  }, [nextImageIndex]);

  return (
    <section
      className={`banner relative bg-cover bg-center bg-no-repeat py-24 lg:py-32 ${className}`}
      role="banner"
      aria-label="Hero section introducing PCCS Education"
    >
      {/* Background Images */}
      <Image
        src={carouselImages[currentImageIndex].src}
        alt={carouselImages[currentImageIndex].alt}
        fill
        style={{ objectFit: 'cover' }}
        priority
        className={`absolute inset-0 transition-opacity duration-1000 ${
          showCurrentImage ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <Image
        src={carouselImages[nextImageIndex].src}
        alt={carouselImages[nextImageIndex].alt}
        fill
        style={{ objectFit: 'cover' }}
        className={`absolute inset-0 transition-opacity duration-1000 ${
          !showCurrentImage ? 'opacity-100' : 'opacity-0'
        }`}
      />
     

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-4xl">
          <div className="banner-txt text-white">
            {/* Subtitle */}
            <h3 className="banner-subtitle text-lg md:text-xl lg:text-2xl font-medium mb-4" style={{ color: '#2ECC40' }}>
              A New Approach to
            </h3>

            {/* Animated Title */}
            <h1 className="banner-title text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
              <span className="block">Study Of</span>
              <span className="block mt-2">
                <span
                  className={`inline-block transition-all duration-300 ${
                    isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'
                  }`}
                  aria-live="polite"
                  aria-label={`Focus on ${animatedWords[currentWordIndex]} education`}
                >
                  {animatedWords[currentWordIndex]}
                </span>
              </span>
            </h1>

            {/* Description */}
            <p className="banner-paragraph text-lg md:text-xl lg:text-2xl mb-8 lg:mb-12 leading-relaxed text-gray-100 max-w-2xl">
              Formamos estudiantes con excelencia académica, educación bilingüe, fe cristiana y valores que transforman vidas.
            </p>

            {/* Buttons */}
            <div className="btn-box flex flex-col sm:flex-row gap-4 sm:gap-6" role="navigation" aria-label="Main call-to-action buttons">
              <a
                href="/admisiones"
                className="def-btn btn-2 inline-flex items-center justify-center px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-center focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ backgroundColor: '#1E1E8C' }}
                onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#161671'}
                onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = '#1E1E8C'}
                aria-label="Apply for admission to PCCS Education"
              >
                ADMISIÓN AHORA
              </a>
              <a
                href="/courses"
                className="def-btn btn-3 inline-flex items-center justify-center px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-center focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ backgroundColor: '#2ECC40' }}
                onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#26A235'}
                onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = '#2ECC40'}
                aria-label="View our available classes and courses"
              >
                NUESTRAS CLASES
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          className="w-full h-16 lg:h-24 text-white"
          viewBox="0 0 1200 120"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M0,120 L1200,120 L1200,0 C1100,80 900,120 600,60 C300,0 200,40 0,0 Z" />
        </svg>
      </div>
    </section>
  );
}