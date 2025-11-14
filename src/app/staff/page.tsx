import React from 'react';
import { StaffSection } from '@/components/sections';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Staff - PCCS',
  description: 'Meet our dedicated team of educators and staff at Punta Cana Christian School. Experienced professionals committed to excellence in Christian education.',
  keywords: ['staff', 'teachers', 'educators', 'team', 'PCCS', 'faculty'],
};

export default function StaffPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 to-purple-700 text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
            Our Staff
          </h1>
          <p className="text-xl text-purple-100 max-w-4xl mx-auto">
            Meet the dedicated professionals who make PCCS a place of excellence,
            compassion, and growth.
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
              Join Our Team
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Are you passionate about Christian education and making a difference in students' lives?
              We're always looking for dedicated educators to join our team.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              style={{ backgroundColor: '#1E1E8C' }}
            >
              Contact Us About Opportunities
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
