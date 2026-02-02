'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/contexts/LanguageContext';
import { StudentServicePaymentModal } from '@/components/payment';

interface StudentServicesSectionProps {
  className?: string;
}

// Default exchange rate USD to DOP
const DEFAULT_EXCHANGE_RATE = 63;

export function StudentServicesSection({ className = '' }: StudentServicesSectionProps) {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const exchangeRate = DEFAULT_EXCHANGE_RATE;

  if (!t.studentServices) {
    return null;
  }

  const services = [
    {
      id: 'inscription',
      ...t.studentServices.services.inscription,
    },
    {
      id: 'reInscription',
      ...t.studentServices.services.reInscription,
    },
    {
      id: 'monthlyTuition',
      ...t.studentServices.services.monthlyTuition,
    },
  ];

  return (
    <section className={`py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Title & Description */}
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-3" style={{ color: '#1E1E8C' }}>
              {t.studentServices.title}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t.studentServices.description}
            </p>
          </div>

          {/* Make Payment Button */}
          <div className="text-center mb-10">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              style={{ backgroundColor: '#1E1E8C' }}
            >
              {t.studentServices.paymentForm.makePayment}
              <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Note */}
          <div className="text-center">
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {t.studentServices.note}
            </p>
          </div>

          {/* Payment Logos - 3D Secure */}
          <div className="mt-6 flex flex-wrap justify-center items-center gap-6">
            <div className="flex items-center gap-4">
              <img src="/images/payment/visa-logo.svg" alt="Visa" className="h-8" />
              <img src="/images/payment/mastercard-logo.svg" alt="MasterCard" className="h-8" />
            </div>
            <div className="h-8 w-px bg-gray-300 hidden md:block"></div>
            <div className="flex items-center gap-4">
              <img src="/images/payment/visa-secure-logo.svg" alt="Visa Secure" className="h-8" />
              <img src="/images/payment/mastercard-id-check-logo.svg" alt="MasterCard ID Check" className="h-10" />
            </div>
          </div>

          {/* Other Services Section */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              {t.studentServices.otherServicesTitle}
            </h3>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 p-6">
              <div className="flex flex-wrap justify-center gap-4">
                {/* Day-Care */}
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                  <svg className="w-5 h-5 text-pccs-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold text-gray-800">
                    {t.studentServices.otherServices.dayCare.name}
                  </span>
                </div>

                {/* Sala de Tareas */}
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                  <svg className="w-5 h-5 text-pccs-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold text-gray-800">
                    {t.studentServices.otherServices.salaDeTareas.name}
                  </span>
                </div>

                {/* Clase de Inglés */}
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                  <svg className="w-5 h-5 text-pccs-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold text-gray-800">
                    {t.studentServices.otherServices.claseDeIngles.name}
                  </span>
                </div>
              </div>

              {/* Info note for other services */}
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500 italic">
                  {t.studentServices.otherServicesNote}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Modal */}
          <StudentServicePaymentModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            services={services}
            initialExchangeRate={exchangeRate}
          />
        </div>
      </div>
    </section>
  );
}
