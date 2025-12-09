'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from '@/contexts/LanguageContext';

interface StudentServicePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  serviceId: string;
  amount: number;
}

type PaymentStatus = 'idle' | 'processing' | 'error';

export function StudentServicePaymentModal({
  isOpen,
  onClose,
  serviceName,
  serviceId,
  amount,
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

    try {
      setStatus('processing');

      // Call server API to initiate student payment
      const response = await fetch('/api/azul/student-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
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
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">{t.studentServices.paymentForm.serviceLabel}</p>
                <p className="text-lg font-semibold" style={{ color: '#1E1E8C' }}>
                  {serviceName}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">{t.studentServices.paymentForm.amountLabel}</p>
                <p className="text-3xl font-bold" style={{ color: '#2ECC40' }}>
                  ${amount}
                </p>
                <p className="text-xs text-gray-500">{t.studentServices.currency}</p>
              </div>
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'processing'}
              className="w-full py-4 font-semibold text-white rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              style={{
                backgroundColor: status === 'processing' ? '#6B7280' : '#2ECC40',
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
                  {t.studentServices.paymentForm.proceedToPayment} - ${amount}
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
              {t.studentServices.note}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
