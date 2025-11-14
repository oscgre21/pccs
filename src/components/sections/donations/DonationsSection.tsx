'use client';

import React, { useState, useEffect } from 'react';
import { AzulPaymentButton } from '@/components/payment';
import { useTranslation } from '@/contexts/LanguageContext';

interface DonationType {
  id: string;
  name: string;
  description: string | null;
  amount: number;
}

interface DonationImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
  donationTypeName: string; // Maps to DonationType.name
}

interface DonationsSectionProps {
  className?: string;
}

export function DonationsSection({ className = '' }: DonationsSectionProps) {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<DonationImage | null>(null);
  const [donationTypes, setDonationTypes] = useState<DonationType[]>([]);
  const [isLoadingTypes, setIsLoadingTypes] = useState(true);

  useEffect(() => {
    const loadDonationTypes = async () => {
      try {
        const response = await fetch('/api/donation-types');
        const data = await response.json();
        if (data.success && data.types) {
          setDonationTypes(data.types);
          // Wait for next tick to ensure state is updated before hiding loader
          setTimeout(() => setIsLoadingTypes(false), 0);
        } else {
          setIsLoadingTypes(false);
        }
      } catch (error) {
        console.error('Failed to load donation types:', error);
        setIsLoadingTypes(false);
      }
    };
    loadDonationTypes();
  }, []);

  // Array of donation images with descriptions mapped to donation types
  const donationImages: DonationImage[] = [
    {
      id: 'school-supplies',
      src: '/images/donations/1.jpg',
      alt: t.donations.donationTypes.schoolSupplies.title,
      title: t.donations.donationTypes.schoolSupplies.title,
      description: t.donations.donationTypes.schoolSupplies.description,
      donationTypeName: 'School Supplies'
    },
    {
      id: 'scholarships',
      src: '/images/donations/2.jpg',
      alt: t.donations.donationTypes.scholarships.title,
      title: t.donations.donationTypes.scholarships.title,
      description: t.donations.donationTypes.scholarships.description,
      donationTypeName: 'Scholarships'
    },
    {
      id: 'infrastructure',
      src: '/images/donations/3.png',
      alt: t.donations.donationTypes.infrastructure.title,
      title: t.donations.donationTypes.infrastructure.title,
      description: t.donations.donationTypes.infrastructure.description,
      donationTypeName: 'Infrastructure'
    },
    {
      id: 'general',
      src: '/images/donations/4.jpg',
      alt: t.donations.donationTypes.general.title,
      title: t.donations.donationTypes.general.title,
      description: t.donations.donationTypes.general.description,
      donationTypeName: 'General Donation'
    },
    {
      id: 'sponsor-child',
      src: '/images/donations/Apadrina un niño - Ingles.PNG',
      alt: t.donations.donationTypes.sponsorChild.title,
      title: t.donations.donationTypes.sponsorChild.title,
      description: t.donations.donationTypes.sponsorChild.description,
      donationTypeName: 'Sponsor a Child'
    }
  ];

  const openModal = (image: DonationImage) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <section className={`donations-section py-16 lg:py-24 bg-white ${className}`}>
        <div className="container mx-auto px-4">
          {/* Section Heading */}
          <div className="section-heading text-center mb-12">
            <h2 className="section-title text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6">
              {t.donations.howYouCanHelp}
            </h2>
            <p className="heading-sub-txt text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
              {t.donations.howYouCanHelpDescription}
            </p>
          </div>

          {/* Donations Grid */}
          <div className="donations-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {donationImages.map((donation) => (
              <div
                key={donation.id}
                className="donation-item group cursor-pointer transform transition-all duration-300 hover:scale-105"
                onClick={() => openModal(donation)}
              >
                <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
                  {/* Image */}
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={donation.src}
                      alt={donation.alt}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                      style={{ objectFit: 'cover' }}
                      loading="lazy"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                          style={{ backgroundColor: '#1E1E8C' }}
                        >
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {donation.title}
                    </h3>

                    {/* Divider */}
                    <div className="w-12 h-1 rounded-full mb-4" style={{ backgroundColor: '#2ECC40' }}></div>

                    <p className="text-gray-600 text-sm leading-relaxed">
                      {donation.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

 
        </div>
      </section>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
          onClick={closeModal}
        >
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-4 -right-4 z-10 w-10 h-10 rounded-full text-white hover:bg-white hover:text-black transition-colors"
              style={{ backgroundColor: '#1E1E8C' }}
            >
              <svg className="w-6 h-6 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>

            {/* Content */}
            <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
              {/* Image */}
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-96 object-cover object-center"
                style={{ objectFit: 'cover' }}
                onClick={(e) => e.stopPropagation()}
              />

              {/* Modal Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {selectedImage.title}
                </h3>
                <div className="w-16 h-1 rounded-full mb-4" style={{ backgroundColor: '#2ECC40' }}></div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {selectedImage.description}
                </p>

                {/* Donation Button with pre-selected type */}
                {donationTypes.find(type => type.name === selectedImage.donationTypeName) && (
                  <div className="flex justify-center" onClick={(e) => e.stopPropagation()}>
                    <AzulPaymentButton
                      amount={50}
                      description={`Donation - ${selectedImage.title}`}
                      donationTypeId={donationTypes.find(type => type.name === selectedImage.donationTypeName)?.id}
                      className="text-lg py-4 px-8"
                    >
                      {t.donations.donateNow}
                    </AzulPaymentButton>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}