'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '@/contexts/LanguageContext';

interface AdmissionsPreviewSectionProps {
  className?: string;
  variant?: 'split' | 'banner' | 'card';
}

export function AdmissionsPreviewSection({
  className = '',
  variant = 'split'
}: AdmissionsPreviewSectionProps) {
  const { t } = useTranslation();

  if (!t.admissions) {
    return null;
  }

  // Variante Split Screen - Mitad imagen, mitad contenido
  if (variant === 'split') {
    return (
      <section className={`relative overflow-hidden ${className}`}>
        <div className="flex flex-col lg:flex-row min-h-[600px] lg:min-h-[700px]">
          {/* Lado de la imagen */}
          <div className="relative w-full lg:w-1/2 h-[400px] lg:h-auto">
            <Image
              src="/images/pic/PCCS-15.JPG"
              alt="PCCS Students"
              fill
              style={{ objectFit: 'cover' }}
              className="absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-pccs-primary/20 lg:bg-gradient-to-l"></div>
          </div>

          {/* Lado del contenido */}
          <div className="w-full lg:w-1/2 bg-pccs-primary flex items-center">
            <div className="px-8 py-12 lg:px-16 lg:py-20 max-w-xl">
              <span className="inline-block px-4 py-1 bg-pccs-tropical/20 text-pccs-tropical rounded-full text-sm font-medium mb-4">
                {t.admissions.heroSubtitle}
              </span>

              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
                {t.admissions.heroTitle}
              </h2>

              <p className="text-lg text-gray-200 mb-8 leading-relaxed">
                {t.admissions.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/admissions"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-pccs-primary font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {t.admissions.viewForms}
                  <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Link>
                <a
                  href="tel:+1-849-855-1635"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full transition-all duration-300 hover:bg-white hover:text-pccs-primary"
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
      </section>
    );
  }

  // Variante Banner - Imagen de fondo con overlay
  if (variant === 'banner') {
    return (
      <section className={`relative py-20 lg:py-32 overflow-hidden ${className}`}>
        <Image
          src="/images/pic/PCCS-15.JPG"
          alt="PCCS Students"
          fill
          style={{ objectFit: 'cover' }}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-pccs-primary/80"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-pccs-tropical/20 text-pccs-tropical rounded-full text-sm font-medium mb-4">
              {t.admissions.heroSubtitle}
            </span>

            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              {t.admissions.heroTitle}
            </h2>

            <p className="text-lg lg:text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
              {t.admissions.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/admissions"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-pccs-primary font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {t.admissions.viewForms}
                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
              <a
                href="tel:+1-849-855-1635"
                className="inline-flex items-center justify-center px-8 py-4 bg-pccs-tropical text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                {t.admissions.callNow}
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Variante Card - Diseño con tarjeta e imagen
  if (variant === 'card') {
    return (
      <section className={`py-16 lg:py-24 bg-gradient-to-b from-white to-pccs-light ${className}`}>
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              {/* Imagen */}
              <div className="lg:col-span-2 relative min-h-[300px] lg:min-h-full">
                <Image src="/images/pic/PCCS-15.JPG" alt="Students" fill style={{ objectFit: 'cover' }} />
              </div>

              {/* Contenido */}
              <div className="lg:col-span-3 p-8 lg:p-12 flex flex-col justify-center">
                <span className="inline-block w-fit px-4 py-1 bg-pccs-tropical/10 text-pccs-tropical rounded-full text-sm font-medium mb-4">
                  {t.admissions.heroSubtitle}
                </span>

                <h2 className="text-2xl lg:text-4xl font-bold text-pccs-primary mb-4">
                  {t.admissions.heroTitle}
                </h2>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {t.admissions.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/admissions"
                    className="inline-flex items-center justify-center px-6 py-3 bg-pccs-primary text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    {t.admissions.viewForms}
                    <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </Link>
                  <a
                    href="tel:+1-849-855-1635"
                    className="inline-flex items-center justify-center px-6 py-3 border-2 border-pccs-primary text-pccs-primary font-semibold rounded-full transition-all duration-300 hover:bg-pccs-primary hover:text-white"
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
      </section>
    );
  }

  return null;
}
