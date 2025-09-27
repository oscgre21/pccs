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
    description: 'Since have been visonary relable sofware engnern partne.',
    icon: '/icons/feat-icon-1.png',
    gradientClass: 'bg-gradient-1'
  },
  {
    id: 'parents-day',
    title: 'Parents Day',
    description: 'Since have been visonary relable sofware engnern partne.',
    icon: '/icons/feat-icon-2.png',
    gradientClass: 'bg-gradient-2'
  },
  {
    id: 'expert-teachers',
    title: 'Expert Teachers',
    description: 'Since have been visonary relable sofware engnern partne.',
    icon: '/icons/feat-icon-3.png',
    gradientClass: 'bg-gradient-3'
  },
  {
    id: 'music-lessons',
    title: 'Music Lessons',
    description: 'Since have been visonary relable sofware engnern partne.',
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
                Cultivando Amor por Dios equipándolos para la Vida
              </h2>
              <p className="heading-sub-txt text-lg text-gray-600 leading-relaxed">
               Formamos estudiantes con excelencia académica, Educación bilingüe, fe cristiana y valores que transforman vidas. <br />
               Abrimos puertas a niños que merecen una oportunidad, sin importar su situación económica.
              </p>
            </div>

            {/* Features Grid */}
            <div className="features-grid grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature) => (
                <div key={feature.id} className="feature-box flex items-start space-x-4 p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  {/* Icon */}
                  <div className="feature-part-icon flex-shrink-0">
                    <div
                      className="w-16 h-16 flex items-center justify-center rounded-lg shadow-lg"
                      style={{ backgroundColor: '#1E1E8C' }}
                    >
                      <img
                        src={feature.icon}
                        alt={feature.title}
                        className="w-8 h-8 filter brightness-0 invert"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="feature-txt flex-1">
                    <h3 className="feature-sub-title text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>

                    {/* Divider */}
                    <div className="divider w-12 h-1 rounded-full mb-4" style={{ backgroundColor: '#2ECC40' }}></div>

                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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