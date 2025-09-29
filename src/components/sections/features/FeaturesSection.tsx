'use client';

import React from 'react';
import { getAssetPath } from '@/data/assets-mapping';
import { VideoModal } from '@/components/ui';
import { useModal } from '@/hooks';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradientClass: string;
}

const features: Feature[] = [
  {
    id: 'active-learning',
    title: 'Active Learning',
    description: 'Engaging and interactive learning experiences that promote critical thinking and creativity.',
    icon: '/icons/feat-icon-1.png',
    gradientClass: 'bg-gradient-1'
  },
  {
    id: 'parents-day',
    title: 'Parents Day',
    description: 'Special events that strengthen the bond between families and our educational community.',
    icon: '/icons/feat-icon-2.png',
    gradientClass: 'bg-gradient-2'
  },
  {
    id: 'expert-teachers',
    title: 'Expert Teachers',
    description: 'Qualified educators dedicated to nurturing each student\'s potential with passion and expertise.',
    icon: '/icons/feat-icon-3.png',
    gradientClass: 'bg-gradient-3'
  },
  {
    id: 'music-lessons',
    title: 'Music Lessons',
    description: 'Creative music education that develops artistic expression and cultural appreciation.',
    icon: '/icons/feat-icon-4.png',
    gradientClass: 'bg-gradient-4'
  }
];

interface FeaturesSectionProps {
  className?: string;
}

export function FeaturesSection({ className = '' }: FeaturesSectionProps) {
  const { isOpen, openModal, closeModal } = useModal();

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
                Cultivating Love for God by Equipping Them for Life
              </h2>
              <p className="heading-sub-txt text-lg text-gray-600 leading-relaxed">
               We educate students with academic excellence, bilingual education, Christian faith and values that transform lives. <br />
               We open doors for children who deserve an opportunity, regardless of their economic situation.
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