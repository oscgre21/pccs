import React from 'react';
import { GallerySection } from '@/components/sections';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Galería - PCCS',
  description: 'Descubre momentos especiales, actividades educativas y la vida escolar que hacen de PCCS un lugar extraordinario para crecer y aprender.',
};

export default function GaleriaPage() {
  return (
    <main className="min-h-screen"> 

      {/* Gallery Section */}
      <GallerySection />
    </main>
  );
}