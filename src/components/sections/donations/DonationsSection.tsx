'use client';

import React, { useState, useEffect } from 'react';
import { AzulPaymentButton } from '@/components/payment';
import { CustomDonationCard } from '@/components/donations';
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
  amount: string;
  benefits: string[];
  donationTypeName: string; // Maps to DonationType.name
  contactButton?: string; // Optional: for volunteering card
  contactOptions?: {
    email: string;
    googleForm: string;
  };
}

interface DonationsSectionProps {
  className?: string;
}

export function DonationsSection({ className = '' }: DonationsSectionProps) {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<DonationImage | null>(null);
  const [donationTypes, setDonationTypes] = useState<DonationType[]>([]);
  const [isLoadingTypes, setIsLoadingTypes] = useState(true);
  const [showContactDropdown, setShowContactDropdown] = useState(false);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (showContactDropdown) {
        setShowContactDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showContactDropdown]);

  // Array of donation images with descriptions mapped to donation types
  // Ordered by donation amount: $50 → $150 → $500 → $2,000 → $7,000 → $18,000 → $100,000+
  const donationImages: DonationImage[] = t?.donations?.donationTypes ? [
    {
      id: 'school-supplies',
      src: '/images/donations/1.jpg',
      alt: t.donations.donationTypes.schoolSupplies.title,
      title: t.donations.donationTypes.schoolSupplies.title,
      amount: t.donations.donationTypes.schoolSupplies.amount,
      benefits: t.donations.donationTypes.schoolSupplies.benefits,
      donationTypeName: 'School Supplies'
    },
    {
      id: 'school-meals',
      src: '/images/donations/2.jpg',
      alt: t.donations.donationTypes.schoolMeals.title,
      title: t.donations.donationTypes.schoolMeals.title,
      amount: t.donations.donationTypes.schoolMeals.amount,
      benefits: t.donations.donationTypes.schoolMeals.benefits,
      donationTypeName: 'School Meals'
    },
    {
      id: 'english-tech',
      src: '/images/donations/4.jpg',
      alt: t.donations.donationTypes.englishTech.title,
      title: t.donations.donationTypes.englishTech.title,
      amount: t.donations.donationTypes.englishTech.amount,
      benefits: t.donations.donationTypes.englishTech.benefits,
      donationTypeName: 'English & Technology'
    },
    {
      id: 'classroom-materials',
      src: '/images/donations/5.jpg',
      alt: t.donations.donationTypes.classroomMaterials.title,
      title: t.donations.donationTypes.classroomMaterials.title,
      amount: t.donations.donationTypes.classroomMaterials.amount,
      benefits: t.donations.donationTypes.classroomMaterials.benefits,
      donationTypeName: 'Classroom Materials'
    },
    {
      id: 'sponsor-child',
      src: '/images/donations/Apadrina un niño - Ingles.PNG',
      alt: t.donations.donationTypes.sponsorChild.title,
      title: t.donations.donationTypes.sponsorChild.title,
      amount: t.donations.donationTypes.sponsorChild.amount,
      benefits: t.donations.donationTypes.sponsorChild.benefits,
      donationTypeName: 'Sponsor a Child'
    },
    {
      id: 'sponsor-teacher',
      src: '/images/donations/3.png',
      alt: t.donations.donationTypes.sponsorTeacher.title,
      title: t.donations.donationTypes.sponsorTeacher.title,
      amount: t.donations.donationTypes.sponsorTeacher.amount,
      benefits: t.donations.donationTypes.sponsorTeacher.benefits,
      donationTypeName: 'Sponsor a Teacher'
    },
    {
      id: 'infrastructure',
      src: '/images/donations/6.jpg',
      alt: t.donations.donationTypes.infrastructure.title,
      title: t.donations.donationTypes.infrastructure.title,
      amount: t.donations.donationTypes.infrastructure.amount,
      benefits: t.donations.donationTypes.infrastructure.benefits,
      donationTypeName: 'Infrastructure'
    },
    {
      id: 'volunteering',
      src: '/images/pic/PCCS-103.JPG',
      alt: t.donations.donationTypes.volunteering.title,
      title: t.donations.donationTypes.volunteering.title,
      amount: t.donations.donationTypes.volunteering.amount,
      benefits: t.donations.donationTypes.volunteering.benefits,
      donationTypeName: 'Volunteering',
      contactButton: t.donations.donationTypes.volunteering.contactButton,
      contactOptions: t.donations.donationTypes.volunteering.contactOptions
    }
  ] : [];

  // Safety check: Ensure translations are loaded
  if (!t?.donations?.donationTypes || donationImages.length === 0) {
    return <div className="py-16 text-center">Loading translations...</div>;
  }

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
                    {/* Amount Badge with optional Contact Button */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="inline-block px-4 py-2 rounded-full text-white font-bold text-lg" style={{ backgroundColor: '#2ECC40' }}>
                        {donation.amount}
                      </div>
                      {donation.contactButton && donation.contactOptions && (
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowContactDropdown(!showContactDropdown);
                            }}
                            className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white rounded-lg transition-all duration-300 hover:opacity-90"
                            style={{ backgroundColor: '#DC2626' }}
                          >
                            {donation.contactButton}
                            <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                            </svg>
                          </button>
                          {showContactDropdown && (
                            <div
                              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10 overflow-hidden"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <a
                                href="mailto:info@pccs.edu.do?subject=Volunteering Inquiry"
                                className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                              >
                                <div className="flex items-center">
                                  <svg className="w-5 h-5 mr-2" style={{ color: '#DC2626' }} fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                                  </svg>
                                  {donation.contactOptions.email}
                                </div>
                              </a>
                              <a
                                href="https://forms.gle/your-google-form-id"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors border-t border-gray-200"
                              >
                                <div className="flex items-center">
                                  <svg className="w-5 h-5 mr-2" style={{ color: '#DC2626' }} fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
                                  </svg>
                                  {donation.contactOptions.googleForm}
                                </div>
                              </a>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {donation.title}
                    </h3>

                    {/* Divider */}
                    <div className="w-12 h-1 rounded-full mb-4" style={{ backgroundColor: '#1E1E8C' }}></div>

                    {/* Benefits List */}
                    <ul className="space-y-2">
                      {donation.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start text-gray-600 text-sm">
                          <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" style={{ color: '#2ECC40' }} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                          </svg>
                          <span className="leading-relaxed">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}

            {/* Custom Donation Card */}
            <CustomDonationCard />
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
                {/* Amount Badge */}
                <div className="inline-block mb-4 px-5 py-3 rounded-full text-white font-bold text-2xl" style={{ backgroundColor: '#2ECC40' }}>
                  {selectedImage.amount}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {selectedImage.title}
                </h3>
                <div className="w-16 h-1 rounded-full mb-4" style={{ backgroundColor: '#1E1E8C' }}></div>

                {/* Benefits List */}
                <ul className="space-y-3 mb-6">
                  {selectedImage.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start text-gray-600 text-base">
                      <svg className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" style={{ color: '#2ECC40' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span className="leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* Contact Button for Volunteering or Donation Button for others */}
                {selectedImage.contactButton ? (
                  <div className="flex justify-center" onClick={(e) => e.stopPropagation()}>
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white rounded-lg transition-all duration-300 hover:opacity-90 hover:scale-105"
                      style={{ backgroundColor: '#1E1E8C' }}
                    >
                      {selectedImage.contactButton}
                    </a>
                  </div>
                ) : donationTypes.find(type => type.name === selectedImage.donationTypeName) && (
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