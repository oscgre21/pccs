'use client';

import React from 'react';
import Image from 'next/image';
import { StudentServicesSection } from '@/components/sections';
import { useTranslation } from '@/contexts/LanguageContext';

export default function StudentServicesPage() {
  const { t } = useTranslation();

  if (!t.studentServices) {
    return null;
  }

  return (
    <main className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
        <Image
          src="/images/pic/PCCS-135.jpg"
          alt="PCCS Student Services"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
              {t.studentServices.title}
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
              {t.studentServices.description}
            </p>
          </div>
        </div>
      </section>

      {/* Student Services Payment Table */}
      <StudentServicesSection />
    </main>
  );
}
