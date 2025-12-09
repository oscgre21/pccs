'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/contexts/LanguageContext';
import { StudentServicePaymentModal } from '@/components/payment';

interface StudentServicesSectionProps {
  className?: string;
}

interface SelectedService {
  id: string;
  name: string;
  amount: number;
}

export function StudentServicesSection({ className = '' }: StudentServicesSectionProps) {
  const { t } = useTranslation();
  const [selectedService, setSelectedService] = useState<SelectedService | null>(null);

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

  const handlePayClick = (service: { id: string; name: string; amount: number }) => {
    setSelectedService(service);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  return (
    <section className={`py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-pccs-tropical/10 text-pccs-tropical rounded-full text-sm font-medium mb-4">
            {t.studentServices.subtitle}
          </span>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-pccs-primary mb-4">
            {t.studentServices.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.studentServices.description}
          </p>
        </div>

        {/* Payment Table */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-4 gap-4 p-4 text-white font-semibold text-sm lg:text-base" style={{ backgroundColor: '#1E1E8C' }}>
              <div className="col-span-1">{t.studentServices.tableHeaders.description}</div>
              <div className="col-span-1 text-center">{t.studentServices.tableHeaders.frequency}</div>
              <div className="col-span-1 text-center">{t.studentServices.tableHeaders.amount}</div>
              <div className="col-span-1 text-center">{t.studentServices.tableHeaders.action}</div>
            </div>

            {/* Table Body */}
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`grid grid-cols-4 gap-4 p-4 items-center border-b border-gray-100 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } hover:bg-pccs-primary/5 transition-colors duration-200`}
              >
                {/* Service Name */}
                <div className="col-span-1">
                  <span className="font-semibold text-gray-900 text-sm lg:text-base">
                    {service.name}
                  </span>
                </div>

                {/* Frequency */}
                <div className="col-span-1 text-center">
                  <span className="text-gray-600 text-sm lg:text-base">
                    {service.frequency}
                  </span>
                </div>

                {/* Amount */}
                <div className="col-span-1 text-center">
                  <span className="font-bold text-lg lg:text-xl" style={{ color: '#2ECC40' }}>
                    ${service.amount}
                  </span>
                  <span className="text-gray-500 text-xs ml-1">
                    {t.studentServices.currency}
                  </span>
                </div>

                {/* Pay Button */}
                <div className="col-span-1 text-center">
                  <button
                    onClick={() => handlePayClick(service)}
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    style={{ backgroundColor: '#1E1E8C' }}
                  >
                    {t.studentServices.payButton}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Note */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {t.studentServices.note}
            </p>
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

                {/* Lecto-Escritura */}
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                  <svg className="w-5 h-5 text-pccs-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold text-gray-800">
                    {t.studentServices.otherServices.lectoEscritura.name}
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
            isOpen={selectedService !== null}
            onClose={handleCloseModal}
            serviceName={selectedService?.name || ''}
            serviceId={selectedService?.id || ''}
            amount={selectedService?.amount || 0}
          />
        </div>
      </div>
    </section>
  );
}
