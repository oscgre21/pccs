'use client';

import React from 'react';
import { DonationsSection } from '@/components/sections';
import { useTranslation } from '@/contexts/LanguageContext';

export default function DonacionesPage() {
  const { t } = useTranslation();
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

      {/* Impact Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-green-600 uppercase tracking-wide mb-2">
              {t.donations.impactTitle}
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              {t.donations.impactSubtitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              {t.donations.impactDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Panel: Impact Areas */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">{t.donations.impactAreasTitle}</h3>
              <div className="space-y-6">
                {/* Quality Bilingual Education */}
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#2ECC40' }}>
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t.donations.qualityBilingualEducation}</h4>
                    <p className="text-gray-600">{t.donations.qualityBilingualEducationDesc}</p>
                  </div>
                </div>

                {/* Scholarships for Those Most in Need */}
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#2ECC40' }}>
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t.donations.scholarshipsNeeded}</h4>
                    <p className="text-gray-600">{t.donations.scholarshipsNeededDesc}</p>
                  </div>
                </div>

                {/* Family & Character Development */}
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#2ECC40' }}>
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t.donations.familyCharacterDevelopment}</h4>
                    <p className="text-gray-600">{t.donations.familyCharacterDevelopmentDesc}</p>
                  </div>
                </div>

                {/* Future Economic Opportunity */}
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#2ECC40' }}>
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t.donations.futureEconomicOpportunity}</h4>
                    <p className="text-gray-600">{t.donations.futureEconomicOpportunityDesc}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel: Fund Distribution */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                  {t.donations.fundDistributionTitle}
                </h3>
                <p className="text-sm text-gray-600 mb-6 text-center">
                  {t.donations.fundDistributionSubtitle}
                </p>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">{t.donations.educationResources}</span>
                      <span className="font-semibold">60%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="h-3 rounded-full" style={{ backgroundColor: '#1E1E8C', width: '60%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">{t.donations.scholarships}</span>
                      <span className="font-semibold">25%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="h-3 rounded-full" style={{ backgroundColor: '#2ECC40', width: '25%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">{t.donations.infrastructure}</span>
                      <span className="font-semibold">15%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="h-3 rounded-full" style={{ backgroundColor: '#4A90E2', width: '15%' }}></div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mt-6 text-center">
                  {t.donations.transparency}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-green-600 uppercase tracking-wide mb-2">
              {t.donations.sponsorshipSubtitle}
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              {t.donations.sponsorshipTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {t.donations.sponsorshipLevels.map((level, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-center mb-4">
                  <p className="text-3xl font-bold text-green-600 mb-2">{level.amount}</p>
                  <div className="w-16 h-1 bg-green-600 mx-auto rounded-full"></div>
                </div>
                <p className="text-gray-700 text-center">{level.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}