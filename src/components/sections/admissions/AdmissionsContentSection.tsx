'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslation } from '@/contexts/LanguageContext';

interface AdmissionsContentSectionProps {
  className?: string;
}

export function AdmissionsContentSection({ className = '' }: AdmissionsContentSectionProps) {
  const { t } = useTranslation();

  if (!t.admissions || !t.admissions.documents) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <section
      id="admissions-content"
      className={`min-h-screen w-full bg-pccs-light flex items-center py-12 lg:py-0 ${className}`}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image Gallery */}
          <div className="admissions-img-container">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/pic/PCCS-25.JPG"
                  alt="Students in class"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-xl shadow-lg"
                />
                <div className="absolute top-2 right-2 w-8 h-8 bg-pccs-earth rounded-full opacity-80"></div>
              </div>
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/pic/PCCS-30.JPG"
                  alt="School activities"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-xl shadow-lg"
                />
                <div className="absolute top-2 right-2 w-8 h-8 bg-pccs-tropical rounded-full opacity-80"></div>
              </div>
            </div>
            <div className="relative aspect-[16/9]">
              <Image
                src="/images/pic/PCCS-45.JPG"
                alt="Campus PCCS"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-xl shadow-lg"
              />
              <div className="absolute bottom-4 left-4 px-4 py-2 bg-pccs-primary rounded-full">
                <span className="text-pccs-white text-sm font-medium">PCCS Campus</span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="admissions-content">
            <div className="bg-pccs-white rounded-2xl shadow-xl p-6 lg:p-8 border-t-4 border-pccs-primary">
              <div className="section-heading mb-6">
                <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-4 leading-tight text-pccs-primary">
                  {t.admissions.title}
                </h2>
                <p className="text-base lg:text-lg leading-relaxed text-pccs-neutral">
                  {t.admissions.description}
                </p>
              </div>

              {/* Documents List */}
              <div className="documents-list mb-6">
                <h3 className="text-lg lg:text-xl font-semibold text-pccs-primary mb-4">
                  {t.admissions.requiredDocuments}
                </h3>
                <ul className="space-y-2 list-disc list-inside pl-2">
                  {t.admissions.documents.map((document, index) => (
                    <li
                      key={index}
                      className="text-gray-700 text-sm lg:text-base leading-relaxed marker:text-pccs-tropical"
                    >
                      {document}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Admission Action Buttons */}
              <div id="formularios" className="admission-actions">
                <div className="text-center mb-4">
                  <h3 className="text-lg lg:text-xl font-semibold text-pccs-primary mb-1">
                    {t.admissions.processesTitle}
                  </h3>
                  <p className="text-pccs-neutral text-sm">
                    {t.admissions.processesDescription}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <a
                    href="https://wa.me/18091234567?text=Hola%20quiero%20agendar%20una%20cita"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-3 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl bg-pccs-primary hover:bg-opacity-90 text-sm lg:text-base"
                  >
                    <svg className="w-4 h-4 lg:w-5 lg:h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    {t.admissions.scheduleAppointment}
                  </a>

                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSew3PwL6kkulsLr0Ayyfy36DuUxZhVI9arzjV1XA6zvWhuFqw/viewform?usp=header"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-3 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl bg-pccs-primary hover:bg-opacity-90 text-sm lg:text-base"
                  >
                    <svg className="w-4 h-4 lg:w-5 lg:h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                    {t.admissions.admissionForm}
                  </a>

                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLScydBLqzdD9XPQYdMCWLAIg8cNMC1UV5p9d98hZw21JaNetvQ/viewform?usp=header"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-3 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl bg-pccs-primary hover:bg-opacity-90 text-sm lg:text-base"
                  >
                    <svg className="w-4 h-4 lg:w-5 lg:h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                    {t.admissions.scholarshipApplication}
                  </a>

                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLScO1ts3uRkswZxvGm3QFC7-fYgyCysE7qZEKDSAvx5OnFCB3g/viewform?usp=header"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-3 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl bg-pccs-primary hover:bg-opacity-90 text-sm lg:text-base"
                  >
                    <svg className="w-4 h-4 lg:w-5 lg:h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    {t.admissions.inquiries}
                  </a>
                </div>

                {/* Quick Contact */}
                <div className="text-center pt-4 border-t border-pccs-light">
                  <p className="text-sm text-pccs-neutral mb-3">
                    {t.admissions.needHelp}
                  </p>
                  <a
                    href="tel:+1-809-917-7855"
                    className="inline-flex items-center justify-center px-6 py-3 font-semibold rounded-full border-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-pccs-accent border-pccs-accent bg-pccs-white hover:bg-pccs-accent hover:text-pccs-white"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    {t.admissions.callNow}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
