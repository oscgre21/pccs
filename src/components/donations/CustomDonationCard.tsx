'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/contexts/LanguageContext';

interface CustomDonationCardProps {
  className?: string;
}

const MAX_COMMENT_LENGTH = 200;
const MIN_AMOUNT = 10;

type FrequencyType = 'one-time' | 'weekly' | 'monthly' | 'every-two-weeks';

const frequencies: { id: FrequencyType; labelKey: string }[] = [
  { id: 'one-time', labelKey: 'oneTime' },
  { id: 'weekly', labelKey: 'weekly' },
  { id: 'monthly', labelKey: 'monthly' },
  { id: 'every-two-weeks', labelKey: 'everyTwoWeeks' },
];

export function CustomDonationCard({ className = '' }: CustomDonationCardProps) {
  const { t } = useTranslation();
  const [amount, setAmount] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [frequency, setFrequency] = useState<FrequencyType>('one-time');

  const formatNumberWithCommas = (value: string): string => {
    // Remove all non-numeric characters except decimal point
    const cleanValue = value.replace(/[^0-9.]/g, '');

    // Split by decimal point
    const parts = cleanValue.split('.');

    // Add commas to the integer part
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Return formatted value (limit to 2 decimal places)
    return parts.length > 1 ? `${parts[0]}.${parts[1].slice(0, 2)}` : parts[0];
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Remove commas for validation
    const rawValue = value.replace(/,/g, '');

    // Only allow numbers and one decimal point
    if (rawValue === '' || /^\d*\.?\d{0,2}$/.test(rawValue)) {
      // Store the raw value without commas for calculations
      setAmount(rawValue);
      setError('');
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_COMMENT_LENGTH) {
      setComment(value);
      setError('');
    }
  };

  // Safety check: Ensure translations are loaded
  if (!t?.donations?.customDonation) {
    return null;
  }

  return (
    <div className={`donation-item ${className}`}>
      <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden h-full flex flex-col">
        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Title with Badge */}
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-xl font-semibold text-gray-900">
              {t.donations.customDonation.title}
            </h3>
            <span className="px-3 py-1 rounded-full text-white font-bold text-sm" style={{ backgroundColor: '#2ECC40' }}>
              {t.donations.customDonation.badge}
            </span>
          </div>

          {/* Divider */}
          <div className="w-12 h-1 rounded-full mb-4" style={{ backgroundColor: '#1E1E8C' }}></div>

          {/* Frequency Selector */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.donations.customDonation.frequencyLabel}
            </label>
            <div className="flex flex-wrap gap-2">
              {frequencies.map((freq) => (
                <button
                  key={freq.id}
                  type="button"
                  onClick={() => setFrequency(freq.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all duration-200 ${
                    frequency === freq.id
                      ? 'border-pccs-primary bg-pccs-primary/5 text-pccs-primary'
                      : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
                  }`}
                >
                  {t.donations.customDonation.frequencies[freq.labelKey as keyof typeof t.donations.customDonation.frequencies]}
                </button>
              ))}
            </div>
          </div>

          {/* Amount Input */}
          <div className="mb-3">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.donations.customDonation.amountLabel}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative group">
              {/* Dollar Sign */}
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-green-600 text-xl font-bold">$</span>
              </div>
              {/* Input Field */}
              <input
                type="text"
                value={formatNumberWithCommas(amount)}
                onChange={handleAmountChange}
                placeholder={t.donations.customDonation.amountPlaceholder}
                className="block w-full pl-10 pr-16 py-3 border-2 rounded-xl text-lg font-semibold text-gray-900 placeholder-gray-400 transition-all duration-200"
                style={{
                  borderColor: error ? '#EF4444' : (amount ? '#2ECC40' : '#D1D5DB'),
                  backgroundColor: amount ? '#F0FDF4' : '#FFFFFF',
                  outline: 'none',
                  boxShadow: amount ? '0 0 0 3px rgba(46, 204, 64, 0.1)' : 'none'
                }}
              />
              {/* USD Badge */}
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-bold uppercase" style={{
                  backgroundColor: amount ? '#2ECC40' : '#E5E7EB',
                  color: amount ? '#FFFFFF' : '#6B7280'
                }}>
                  USD
                </span>
              </div>
            </div>
          </div>

          {/* Comment Textarea */}
          <div className="mb-3 flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.donations.customDonation.commentLabel}
            </label>
            <textarea
              value={comment}
              onChange={handleCommentChange}
              placeholder={t.donations.customDonation.commentPlaceholder}
              rows={3}
              className="block w-full px-3 py-2.5 border-2 rounded-xl text-sm resize-none transition-all duration-200"
              style={{
                outline: 'none',
                minHeight: '80px',
                borderColor: comment ? '#2ECC40' : '#D1D5DB',
                backgroundColor: comment ? '#F0FDF4' : '#FFFFFF'
              }}
            />
            <div className="mt-1.5 flex items-center justify-between">
              <span className="text-xs text-gray-500">Optional</span>
              <span className="text-xs font-medium" style={{ color: comment.length > 180 ? '#EF4444' : '#6B7280' }}>
                {comment.length}/{MAX_COMMENT_LENGTH}
              </span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded">
              <p className="text-xs text-red-600">{error}</p>
            </div>
          )}

          {/* Minimum Amount Text */}
          <p className="text-xs text-gray-500 mb-3">
            {t.donations.customDonation.minimumAmount}
          </p>

          {/* Donate Button */}
          <div className="mt-auto">
            <button
              onClick={(e) => {
                e.preventDefault();
                // Disabled for now - no action on click
              }}
              disabled={!amount || parseFloat(amount) < MIN_AMOUNT}
              className="w-full py-3 px-4 rounded-lg font-semibold text-white text-base transition-all"
              style={{
                backgroundColor: (amount && parseFloat(amount) >= MIN_AMOUNT) ? '#2ECC40' : '#D1D5DB',
                cursor: (amount && parseFloat(amount) >= MIN_AMOUNT) ? 'pointer' : 'not-allowed',
                opacity: (amount && parseFloat(amount) >= MIN_AMOUNT) ? 1 : 0.6
              }}
            >
              {amount && parseFloat(amount) >= MIN_AMOUNT
                ? `${t.donations.customDonation.donateButton} $${parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                : t.donations.customDonation.donateButton
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
