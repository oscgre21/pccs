'use client';

import React from 'react';
import { StaffSection } from '@/components/sections';
import { useTranslation } from '@/contexts/LanguageContext';

export default function StaffPage() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section
        className="text-white py-16 lg:py-24"
        style={{ background: 'linear-gradient(135deg, #1E1E8C 0%, #4433BB 100%)' }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
            {t.staff.title}
          </h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto">
            {t.staff.subtitle}
          </p>
        </div>
      </section>

      {/* Staff Section */}
      <StaffSection />
    </main>
  );
}
