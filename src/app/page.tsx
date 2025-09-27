import React from 'react';
import {
  HeroSection,
  FeaturesSection,
  AboutSection,
  MissionSection,
  VisionSection,
  ValuesSection,
  PurposeSection
} from '@/components/sections';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* About Section */}
      <AboutSection />

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