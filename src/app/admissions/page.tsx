'use client';

import React from 'react';
import { AdmissionsHeroSection, AdmissionsContentSection } from '@/components/sections';

export default function AdmissionsPage() {
  return (
    <main className="min-h-screen">
      <AdmissionsHeroSection />
      <AdmissionsContentSection />
    </main>
  );
}