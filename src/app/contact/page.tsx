'use client';

import React from 'react';
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useTranslation } from '@/contexts/LanguageContext';

export default function ContactPage() {
  const { t } = useTranslation();
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
            {t.contact.title}
          </h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Phone */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1E1E8C' }}>
                <PhoneIcon className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.contact.callUs}</h3>
              <p className="text-gray-600 mb-2">{t.contact.callUsDesc}</p>
              <a
                href="tel:+18498551635"
                className="text-blue-600 hover:text-blue-700 font-semibold text-lg"
              >
                +1 (849) 855 1635
              </a>
            </div>

            {/* Email */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2ECC40' }}>
                <EnvelopeIcon className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.contact.emailUs}</h3>
              <p className="text-gray-600 mb-2">{t.contact.emailUsDesc}</p>
              <a
                href="mailto:info@pccs.edu.do"
                className="text-blue-600 hover:text-blue-700 font-semibold text-lg"
              >
                info@pccs.edu.do
              </a>
            </div>

            {/* Location */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#4A90E2' }}>
                <MapPinIcon className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.contact.visitUs}</h3>
              <p className="text-gray-600 mb-2">{t.contact.visitUsDesc}</p>
              <p className="text-gray-700">
                Av. Barcelo, Punta Cana<br />
                C. Edgar Allan Poe, No. 1
              </p>
            </div>
          </div>

          {/* Contact Form and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.contact.sendMessage}</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.contact.fullName} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t.contact.fullNamePlaceholder}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.contact.email} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t.contact.emailPlaceholder}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.contact.phone}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t.contact.phonePlaceholder}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.contact.subject} *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t.contact.subjectPlaceholder}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.contact.message} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t.contact.messagePlaceholder}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: '#1E1E8C' }}
                >
                  {t.contact.sendButton}
                </button>
              </form>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-200 rounded-2xl overflow-hidden h-[600px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3761.234567890123!2d-68.40123456789012!3d18.56789012345678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDM0JzA0LjQiTiA2OMKwMjQnMDQuNCJX!5e0!3m2!1sen!2sdo!4v1234567890123!5m2!1sen!2sdo"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="PCCS Location Map"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">{t.contact.officeHours}</h2>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t.contact.mondayFriday}</h3>
                  <p className="text-gray-600">{t.contact.mondayFridayHours}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t.contact.saturdaySunday}</h3>
                  <p className="text-gray-600">{t.contact.closed}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-6">
                {t.contact.officeHoursNote}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
