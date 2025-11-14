'use client';

import React from 'react';
import { AzulPaymentButton } from '@/components/payment';

interface DonationType {
  id: string;
  name: string;
  description: string | null;
  amount: number;
}

interface SponsorshipLevel {
  amount: string;
  description: string;
}

interface SponsorshipCardProps {
  level: SponsorshipLevel;
  index: number;
  gradient: string;
  donationType?: DonationType;
  isLoading?: boolean;
  donateNowText: string;
}

export function SponsorshipCard({
  level,
  index,
  gradient,
  donationType,
  isLoading = false,
  donateNowText,
}: SponsorshipCardProps) {
  // Extract numeric amount from string (e.g., "$50" -> 50, "$100,000+" -> 100000)
  const getNumericAmount = (amountStr: string): number => {
    const cleanAmount = amountStr.replace(/[$,+]/g, '');
    return parseFloat(cleanAmount);
  };

  const numericAmount = getNumericAmount(level.amount);

  if (isLoading) {
    return (
      <div className="group relative bg-white rounded-2xl shadow-xl overflow-hidden animate-pulse">
        <div className={`h-2 bg-gradient-to-r ${gradient}`}></div>
        <div className="p-8">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-gray-200"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded mb-4 mx-auto w-24"></div>
          <div className="h-16 bg-gray-200 rounded mb-4"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
      {/* Colored top bar */}
      <div className={`h-2 bg-gradient-to-r ${gradient}`}></div>

      {/* Content */}
      <div className="p-8">
        {/* Icon circle with gradient */}
        <div className="mb-6 flex justify-center">
          <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Amount */}
        <div className="text-center mb-4">
          <p className={`text-4xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-2`}>
            {level.amount}
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-center leading-relaxed min-h-[60px] flex items-center justify-center mb-6">
          {level.description}
        </p>

        {/* Payment Button */}
        {donationType ? (
          <AzulPaymentButton
            amount={donationType.amount}
            description={`Sponsorship - ${level.description}`}
            donationTypeId={donationType.id}
            className="w-full text-base py-3 px-6 font-semibold"
          >
            {donateNowText}
          </AzulPaymentButton>
        ) : (
          <button
            className="w-full py-3 px-6 rounded-lg font-semibold text-white bg-gray-400 cursor-not-allowed"
            disabled
          >
            {donateNowText}
          </button>
        )}

        {/* Decorative element */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex justify-center space-x-1">
            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradient} opacity-60`}></div>
            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradient} opacity-80`}></div>
            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradient}`}></div>
          </div>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>
    </div>
  );
}
