'use client';

import React from 'react';
import { StaffSection } from '@/components/sections';
import { useTranslation } from '@/contexts/LanguageContext';

export default function StaffPage() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 to-purple-700 text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
            {t.staff.title}
          </h1>
          <p className="text-xl text-purple-100 max-w-4xl mx-auto">
            {t.staff.subtitle}
          </p>
        </div>
      </section>

      {/* Staff Section */}
      <StaffSection />

      {/* Join Our Team Section */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              {t.staff.joinTeam}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {t.staff.joinTeamDesc}
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              style={{ backgroundColor: '#1E1E8C' }}
            >
              {t.staff.contactAboutOpportunities}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
