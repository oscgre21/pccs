'use client';

import React, { useState } from 'react';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

interface GallerySectionProps {
  className?: string;
}

export function GallerySection({ className = '' }: GallerySectionProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [showMore, setShowMore] = useState(false);

  // Generate array of gallery images
  const allImages: GalleryImage[] = [];
  for (let i = 10; i <= 137; i++) {
    const extension = i <= 134 ? 'JPG' : 'jpg';
    allImages.push({
      id: `pccs-${i}`,
      src: `/images/pic/PCCS-${i}.${extension}`,
      alt: `PCCS Galería ${i}`
    });
  }

  // Show only first 12 images initially
  const displayedImages = showMore ? allImages : allImages.slice(0, 12);

  const openModal = (image: GalleryImage) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <section className={`gallery-section py-16 lg:py-24 bg-gray-50 ${className}`}>
        <div className="container mx-auto px-4">
          {/* Section Heading */}
          <div className="section-heading text-center mb-12">
            <h2 className="section-title text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6">
              Nuestra Galería
            </h2>
            <p className="heading-sub-txt text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Descubre los momentos especiales, actividades educativas y la vida escolar
              que hacen de PCCS un lugar extraordinario para crecer y aprender.
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="gallery-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            {displayedImages.map((image) => (
              <div
                key={image.id}
                className="gallery-item group cursor-pointer transform transition-all duration-300 hover:scale-105"
                onClick={() => openModal(image)}
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-64 object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    style={{ objectFit: 'cover' }}
                    loading="lazy"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                        style={{ backgroundColor: '#1E1E8C' }}
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM8.5 16l3.5-2.5 3.5 2.5L12 18.5 8.5 16z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show More Button */}
          {!showMore && allImages.length > 12 && (
            <div className="text-center">
              <button
                onClick={() => setShowMore(true)}
                className="inline-flex items-center px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                style={{ backgroundColor: '#1E1E8C' }}
              >
                Ver Más Fotos
                <span className="ml-2 text-sm" style={{ color: '#2ECC40' }}>
                  (+{allImages.length - 12})
                </span>
              </button>
            </div>
          )}

          {/* Show Less Button */}
          {showMore && (
            <div className="text-center">
              <button
                onClick={() => setShowMore(false)}
                className="inline-flex items-center px-8 py-4 border-2 font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
                style={{
                  borderColor: '#1E1E8C',
                  color: '#1E1E8C'
                }}
              >
                Ver Menos
              </button>
            </div>
          )}
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

            {/* Image */}
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              style={{ objectFit: 'contain', maxHeight: '90vh', maxWidth: '90vw' }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
}