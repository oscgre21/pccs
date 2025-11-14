'use client';

import React, { useState, useEffect } from 'react';
import { DonationsSection } from '@/components/sections';
import { SponsorshipCard } from '@/components/donations/SponsorshipCard';
import { useTranslation } from '@/contexts/LanguageContext';

interface DonationType {
  id: string;
  name: string;
  description: string | null;
  amount: number;
}

export default function DonacionesPage() {
  const { t } = useTranslation();
  const [donationTypes, setDonationTypes] = useState<DonationType[]>([]);
  const [isLoadingTypes, setIsLoadingTypes] = useState(true);

  // Load donation types from API
  useEffect(() => {
    const loadDonationTypes = async () => {
      try {
        const response = await fetch('/api/donation-types');
        const data = await response.json();
        if (data.success && data.types) {
          setDonationTypes(data.types);
        }
      } catch (error) {
        console.error('Failed to load donation types:', error);
      } finally {
        setIsLoadingTypes(false);
      }
    };
    loadDonationTypes();
  }, []);

  // Helper function to extract numeric amount from string
  const getNumericAmount = (amountStr: string): number => {
    const cleanAmount = amountStr.replace(/[$,+]/g, '');
    return parseFloat(cleanAmount);
  };

  // Map sponsorship levels to donation types
  const getSponsorshipDonationType = (level: { amount: string; description: string }): DonationType | undefined => {
    const numericAmount = getNumericAmount(level.amount);
    return donationTypes.find(type => type.amount === numericAmount);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section for Donations */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
            {t.donations.heroTitle}
          </h1>
          <p className="text-xl text-green-100 max-w-4xl mx-auto">
            {t.donations.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Donations Section */}
      <DonationsSection />

 

      {/* Future Vision Panel */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm font-semibold uppercase tracking-wide mb-2 text-blue-200">
              {t.donations.futureVisionSubtitle}
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              {t.donations.futureVisionTitle}
            </h2>
            <p className="text-lg mb-8 text-blue-100">
              {t.donations.futureVisionDescription}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {t.donations.futureVisionItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <svg className="w-6 h-6 text-blue-200 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-left">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sponsorship Impact Panel */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-green-600 uppercase tracking-wide mb-2">
              {t.donations.sponsorshipSubtitle}
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t.donations.sponsorshipTitle}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-blue-600 mx-auto rounded-full mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {t.donations.sponsorshipLevels.map((level, index) => {
              // Define gradient colors for each card
              const gradients = [
                'from-blue-500 to-blue-600',      // $50
                'from-green-500 to-green-600',    // $150
                'from-purple-500 to-purple-600',  // $500
                'from-orange-500 to-orange-600',  // $2,000
                'from-pink-500 to-pink-600',      // $7,000
                'from-indigo-500 to-indigo-600',  // $18,000
                'from-yellow-500 to-yellow-600',  // $100,000+
              ];

              return (
                <SponsorshipCard
                  key={index}
                  level={level}
                  index={index}
                  gradient={gradients[index % gradients.length]}
                  donationType={getSponsorshipDonationType(level)}
                  isLoading={isLoadingTypes}
                  donateNowText={t.donations.donateNow}
                />
              );
            })}
          </div>

          {/* Call to action at the bottom */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl shadow-2xl p-8 text-white max-w-2xl">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-90" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
              <h3 className="text-2xl font-bold mb-3">{t.donations.readyToMakeDifference}</h3>
              <p className="text-lg text-green-50">{t.donations.everyDonation}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}