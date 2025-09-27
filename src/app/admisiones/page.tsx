import React from 'react';
import { AdmissionsSection } from '@/components/sections';

export const metadata = {
  title: 'Admisiones - PCCS',
  description: 'Documentos y requisitos para admisiones en Punta Cana Christian School. Conoce todo lo que necesitas para el proceso de inscripción.',
  keywords: ['admisiones', 'inscripción', 'PCCS', 'documentos', 'requisitos', 'Punta Cana Christian School'],
};

export default function AdmissionsPage() {
  return (
    <main className="min-h-screen">
      <AdmissionsSection />
    </main>
  );
}