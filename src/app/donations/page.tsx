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
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                >
                  {/* Colored top bar */}
                  <div className={`h-2 bg-gradient-to-r ${gradients[index % gradients.length]}`}></div>

                  {/* Content */}
                  <div className="p-8">
                    {/* Icon circle with gradient */}
                    <div className="mb-6 flex justify-center">
                      <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="text-center mb-4">
                      <p className={`text-4xl font-bold bg-gradient-to-r ${gradients[index % gradients.length]} bg-clip-text text-transparent mb-2`}>
                        {level.amount}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 text-center leading-relaxed min-h-[60px] flex items-center justify-center">
                      {level.description}
                    </p>

                    {/* Decorative element */}
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <div className="flex justify-center space-x-1">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradients[index % gradients.length]} opacity-60`}></div>
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradients[index % gradients.length]} opacity-80`}></div>
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradients[index % gradients.length]}`}></div>
                      </div>
                    </div>
                  </div>

                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>
                </div>
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