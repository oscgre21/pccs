import React from 'react';
import {
  MissionSection,
  VisionSection,
  ValuesSection,
  PurposeSection,
  AboutSection
} from '@/components/sections';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - PCCS',
  description: 'Learn about our mission, vision, values, and purpose at Punta Cana Christian School. We are committed to providing quality Christian education.',
  keywords: ['about PCCS', 'mission', 'vision', 'values', 'purpose', 'Christian education', 'Punta Cana'],
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
            About Us
          </h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto">
            Discover our commitment to excellence in Christian education and
            our vision for transforming lives through faith and learning.
          </p>
        </div>
      </section>

      {/* About Section - if available */}
      {/* <AboutSection /> */}

      {/* Mission Section */}
      <MissionSection />

      {/* Vision Section */}
      <VisionSection />

      {/* Values Section */}
      <ValuesSection />

      {/* Purpose Section */}
      <PurposeSection />
    </main>
  );
}
