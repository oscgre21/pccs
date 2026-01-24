'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from '@/contexts/LanguageContext';

// Default exchange rate USD to DOP
const DEFAULT_EXCHANGE_RATE = 60.50;

interface StudentServicePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  serviceId: string;
  amount: number;
  initialExchangeRate?: number;
}

type PaymentStatus = 'idle' | 'processing' | 'error';

export function StudentServicePaymentModal({
  isOpen,
  onClose,
  serviceName,
  serviceId,
  amount,
  initialExchangeRate = DEFAULT_EXCHANGE_RATE,
}: StudentServicePaymentModalProps) {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<PaymentStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  // Form fields
  const [studentName, setStudentName] = useState('');
  const [parentName, setParentName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [grade, setGrade] = useState('');
  const [comment, setComment] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Exchange rate (USD to DOP) - Fixed rate from parent, not editable
  const exchangeRate = initialExchangeRate;
  const amountDOP = Math.round(amount * exchangeRate);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate required fields
    if (!studentName.trim()) {
      setError(t.studentServices.paymentForm.errors.studentNameRequired);
      return;
    }
    if (!parentName.trim()) {
      setError(t.studentServices.paymentForm.errors.parentNameRequired);
      return;
    }
    if (!email.trim()) {
      setError(t.studentServices.paymentForm.errors.emailRequired);
      return;
    }
    if (!validateEmail(email)) {
      setError(t.studentServices.paymentForm.errors.emailInvalid);
      return;
    }
    if (!acceptedTerms) {
      setError(t.studentServices.paymentForm.errors.termsRequired);
      return;
    }

    try {
      setStatus('processing');

      // Call server API to initiate student payment (amount in DOP)
      const response = await fetch('/api/azul/student-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amountDOP, // Send amount in DOP for payment
          amountUSD: amount, // Original USD amount for reference
          exchangeRate,
          description: `${serviceName} - PCCS`,
          studentName,
          parentName,
          email,
          phone: phone || undefined,
          grade: grade || undefined,
          comment: comment || undefined,
          serviceId,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to initiate payment');
      }

      // Create form and submit to Azul
      const container = document.createElement('div');
      container.style.display = 'none';
      container.innerHTML = data.formHtml;
      document.body.appendChild(container);

      const form = container.querySelector('form');
      if (form) {
        document.body.appendChild(form);
        form.submit();
      } else {
        throw new Error('Payment form not found');
      }
    } catch (err) {
      setStatus('error');
      const errorMessage = err instanceof Error ? err.message : 'Payment initialization failed';
      setError(errorMessage);
      console.error('[StudentServicePayment] Error:', errorMessage);
    }
  };

  const handleClose = () => {
    if (status !== 'processing') {
      setError(null);
      setStatus('idle');
      onClose();
    }
  };

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold" style={{ color: '#1E1E8C' }}>
              {t.studentServices.paymentForm.title}
            </h2>
            <button
              onClick={handleClose}
              disabled={status === 'processing'}
              className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Service Info Card */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-xl border border-blue-100 mb-6">
            {/* Service Name */}
            <div className="mb-4">
              <p className="text-sm text-gray-600">{t.studentServices.paymentForm.serviceLabel}</p>
              <p className="text-lg font-semibold" style={{ color: '#1E1E8C' }}>
                {serviceName}
              </p>
            </div>

            {/* Amount Cards */}
            <div className="grid grid-cols-2 gap-4">
              {/* USD Amount */}
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">{t.studentServices.paymentForm.amountUSD}</p>
                <p className="text-xl font-bold text-gray-700">
                  ${amount.toLocaleString()}
                </p>
              </div>

              {/* DOP Amount */}
              <div className="bg-white p-3 rounded-lg border-2" style={{ borderColor: '#2ECC40' }}>
                <p className="text-xs text-gray-500 mb-1">{t.studentServices.paymentForm.amountDOP}</p>
                <p className="text-xl font-bold" style={{ color: '#2ECC40' }}>
                  RD${amountDOP.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Exchange Rate - Read Only */}
            <div className="mt-3 text-center text-xs text-gray-500">
              <span>{t.studentServices.paymentForm.exchangeRate}: 1 USD = {exchangeRate.toFixed(2)} DOP</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Student Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.studentServices.paymentForm.studentName}
                <span className="text-red-500 ml-1">{t.studentServices.paymentForm.requiredField}</span>
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder={t.studentServices.paymentForm.studentNamePlaceholder}
                required
              />
            </div>

            {/* Parent Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.studentServices.paymentForm.parentName}
                <span className="text-red-500 ml-1">{t.studentServices.paymentForm.requiredField}</span>
              </label>
              <input
                type="text"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder={t.studentServices.paymentForm.parentNamePlaceholder}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.studentServices.paymentForm.email}
                <span className="text-red-500 ml-1">{t.studentServices.paymentForm.requiredField}</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder={t.studentServices.paymentForm.emailPlaceholder}
                required
              />
            </div>

            {/* Phone and Grade Row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.studentServices.paymentForm.phone}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder={t.studentServices.paymentForm.phonePlaceholder}
                />
              </div>

              {/* Grade */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.studentServices.paymentForm.grade}
                </label>
                <input
                  type="text"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder={t.studentServices.paymentForm.gradePlaceholder}
                />
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.studentServices.paymentForm.comment}
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                placeholder={t.studentServices.paymentForm.commentPlaceholder}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div
                className="p-4 rounded-lg text-sm"
                style={{ backgroundColor: '#FEE2E2', color: '#991B1B' }}
                role="alert"
              >
                <p className="font-semibold">Error</p>
                <p>{error}</p>
              </div>
            )}

            {/* Accepted Cards and Secure Payment Logos */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              {/* Accepted Cards */}
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-2">{t.studentServices.paymentForm.acceptedCards}:</p>
                <div className="flex items-center gap-3">
                  <img src="/images/payment/visa-logo.svg" alt="Visa" className="h-8" />
                  <img src="/images/payment/mastercard-logo.svg" alt="MasterCard" className="h-8" />
                </div>
              </div>
              {/* 3D Secure Logos */}
              <div>
                <p className="text-xs text-gray-500 mb-2">{t.studentServices.paymentForm.securePayment}:</p>
                <div className="flex items-center gap-3">
                  <img src="/images/payment/visa-secure-logo.svg" alt="Visa Secure" className="h-8" />
                  <img src="/images/payment/mastercard-id-check-logo.svg" alt="MasterCard ID Check" className="h-10" />
                </div>
              </div>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="acceptTerms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="acceptTerms" className="text-sm text-gray-600">
                {t.studentServices.paymentForm.termsCheckbox}{' '}
                <a href="/terminos-condiciones" target="_blank" className="text-blue-600 hover:underline">
                  {t.studentServices.paymentForm.termsAndConditions}
                </a>{' '}
                {t.studentServices.paymentForm.andThe}{' '}
                <a href="/politica-privacidad" target="_blank" className="text-blue-600 hover:underline">
                  {t.studentServices.paymentForm.privacyPolicy}
                </a>
                <span className="text-red-500 ml-1">{t.studentServices.paymentForm.requiredField}</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'processing' || !acceptedTerms}
              className="w-full py-4 font-semibold text-white rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              style={{
                backgroundColor: (status === 'processing' || !acceptedTerms) ? '#6B7280' : '#2ECC40',
              }}
            >
              {status === 'processing' ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {t.studentServices.paymentForm.processing}
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  {t.studentServices.paymentForm.proceedToPayment} - RD${amountDOP.toLocaleString()}
                  <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </button>
          </form>

          {/* Security Note */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              {t.studentServices.paymentForm.securityNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
