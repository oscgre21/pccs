'use client';

import React from 'react';
import { getAssetPath } from '@/data/assets-mapping';
import { VideoModal } from '@/components/ui';
import { useModal } from '@/hooks';
import { useTranslation } from '@/contexts/LanguageContext';

interface FeaturesSectionProps {
  className?: string;
}

export function FeaturesSection({ className = '' }: FeaturesSectionProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const { t } = useTranslation();

  return (
    <>
      <section className={`features-section py-16 lg:py-24 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Side */}
          <div>
            {/* Section Heading */}
            <div className="section-heading mb-8">
              <h2 className="section-title text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6">
                {t.features.title}
              </h2>
              <p className="heading-sub-txt text-lg text-gray-600 leading-relaxed">
                {t.features.description}
              </p>
            </div>

            {/* Features Grid */}

          </div>

          {/* Image Side */}
          <div className="feature-img-container">
            <div className="feature-img relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="/images/pic/PCCS-108.JPG"
                alt="Educational Activities"
                className="w-full h-96 object-cover object-center scale-150"
              />

              {/* Video Button */}
              <button
                onClick={openModal}
                className="video-btn absolute bottom-6 right-6 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
                style={{ backgroundColor: '#1E1E8C' }}
                aria-label="Play video"
              >
                <svg
                  className="w-6 h-6 ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      </section>

      {/* Video Modal */}
      <VideoModal
        isOpen={isOpen}
        onClose={closeModal}
        videoId="NGvSMK0ycxM"
        title="Educational Activities"
      />
    </>
  );
}