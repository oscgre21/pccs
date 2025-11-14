import React from 'react';
import { AdmissionsSection } from '@/components/sections';

export const metadata = {
  title: 'Admissions - PCCS',
  description: 'Documents and requirements for admissions at Punta Cana Christian School. Learn everything you need for the enrollment process.',
  keywords: ['admissions', 'enrollment', 'PCCS', 'documents', 'requirements', 'Punta Cana Christian School'],
};

export default function AdmissionsPage() {
  return (
    <main className="min-h-screen">
      <AdmissionsSection />
    </main>
  );
}