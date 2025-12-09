'use client';

import React from 'react';
import { StudentServicesSection } from '@/components/sections';
import { useTranslation } from '@/contexts/LanguageContext';

export default function StudentServicesPage() {
  const { t } = useTranslation();

  if (!t.studentServices) {
    return null;
  }

  return (
    <main className="min-h-screen">

      {/* Student Services Payment Table */}
      <StudentServicesSection />
    </main>
  );
}
