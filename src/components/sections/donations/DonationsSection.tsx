'use client';

import React, { useState } from 'react';

interface DonationImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
}

interface DonationsSectionProps {
  className?: string;
}

export function DonationsSection({ className = '' }: DonationsSectionProps) {
  const [selectedImage, setSelectedImage] = useState<DonationImage | null>(null);

  // Array of donation images with descriptions
  const donationImages: DonationImage[] = [
    {
      id: 'donation-1',
      src: '/images/donations/1.jpg',
      alt: 'PCCS Donation 1',
      title: 'Educational Support',
      description: 'Your donation helps provide quality education to children in need.'
    },
    {
      id: 'donation-2',
      src: '/images/donations/2.jpg',
      alt: 'PCCS Donation 2',
      title: 'Study Scholarships',
      description: 'Scholarship program for students with financial needs.'
    },
    {
      id: 'donation-3',
      src: '/images/donations/3.jpg',
      alt: 'PCCS Donation 3',
      title: 'Infrastructure',
      description: 'Improvements to school facilities for a better learning environment.'
    },
    {
      id: 'donation-4',
      src: '/images/donations/4.jpg',
      alt: 'PCCS Donation 4',
      title: 'Educational Resources',
      description: 'Books, materials and technology to enrich the educational experience.'
    },
    {
      id: 'donation-5',
      src: '/images/donations/5.jpg',
      alt: 'PCCS Donation 5',
      title: 'Special Programs',
      description: 'Extracurricular activities and comprehensive development programs.'
    },
    {
      id: 'donation-6',
      src: '/images/donations/6.jpg',
      alt: 'PCCS Donation 6',
      title: 'School Nutrition',
      description: 'Nutrition program to ensure the health of our students.'
    },
    {
      id: 'sponsor-child',
      src: '/images/donations/Apadrina un niño - Ingles.PNG',
      alt: 'Sponsor a Child',
      title: 'Sponsor a Child',
      description: 'Special sponsorship program to transform lives through education.'
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
              How You Can Help
            </h2>
            <p className="heading-sub-txt text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
              Your donation makes a difference in the lives of our students. Learn about the different ways
              you can contribute to the future of Christian education in Punta Cana.
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

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Make a Difference?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Every donation, regardless of size, contributes directly to the future
                of our students and strengthens our educational mission.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#contact"
                  className="inline-flex items-center px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: '#1E1E8C' }}
                >
                  Donate Now
                  <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center px-8 py-4 border-2 font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
                  style={{
                    borderColor: '#1E1E8C',
                    color: '#1E1E8C'
                  }}
                >
                  More Information
                  <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
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
                <p className="text-gray-600 leading-relaxed">
                  {selectedImage.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}