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

 
    </main>
  );
}