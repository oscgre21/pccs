'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/contexts/LanguageContext';

// Lista de videos de testimonios
const testimonialVideos = [
  { id: 1, src: '/video/Testimonio-1PCCS_1.mp4' },
  { id: 2, src: '/video/Testimonio-2PCCS_2.mp4' },
  { id: 3, src: '/video/Testimonio-3PCCS_3.mp4' },
  { id: 4, src: '/video/Testimonio-4PCCS_4.mp4' },
];

interface ImpactSectionProps {
  className?: string;
}

export function ImpactSection({ className = '' }: ImpactSectionProps) {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Intersection Observer para autoplay cuando el video está visible
  useEffect(() => {
    const videoElement = videoRef.current;
    const containerElement = containerRef.current;

    if (!videoElement || !containerElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            // El video está visible al menos 50%, reproducir
            videoElement.play().catch(() => {
              // Autoplay puede fallar si el usuario no ha interactuado con la página
              console.log('Autoplay bloqueado por el navegador');
            });
          } else {
            // El video ya no está visible, pausar
            videoElement.pause();
          }
        });
      },
      {
        threshold: 0.5, // Disparar cuando el 50% del video esté visible
      }
    );

    observer.observe(containerElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  const handleSelectVideo = (index: number) => {
    if (index === currentVideoIndex) return;

    // Pausar video actual
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsPlaying(false);
    setCurrentVideoIndex(index);

    // Cargar y reproducir el nuevo video después de cambiar el source
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play().catch(() => {
          console.log('Autoplay bloqueado');
        });
      }
    }, 100);
  };

  if (!t.impact) {
    return null;
  }

  return (
    <section className={`py-16 lg:py-24 bg-white ${className}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-pccs-tropical/10 text-pccs-tropical rounded-full text-sm font-medium mb-4">
            {t.impact.subtitle}
          </span>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-pccs-primary mb-4">
            {t.impact.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.impact.description}
          </p>
        </div>

        {/* Video Player - Formato vertical 9:16 */}
        <div className="flex justify-center mb-12">
          <div
            ref={containerRef}
            className="relative rounded-2xl overflow-hidden shadow-2xl bg-black w-full max-w-sm lg:max-w-md"
            style={{ aspectRatio: '9/16' }}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              preload="auto"
              onEnded={handleVideoEnded}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              controls={isPlaying}
              playsInline
              muted
            >
              <source src={`${testimonialVideos[currentVideoIndex].src}#t=0.1`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Play Button Overlay */}
            {!isPlaying && (
              <div
                className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/30 transition-all hover:bg-black/40"
                onClick={handlePlayPause}
              >
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-white/90 flex items-center justify-center shadow-lg transform transition-transform hover:scale-110">
                    <svg
                      className="w-10 h-10 lg:w-12 lg:h-12 text-pccs-primary ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span className="mt-4 text-white font-medium text-lg drop-shadow-lg">
                    {t.impact.watchTestimonial}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Video Thumbnails - Selección de testimonios */}
        <div className="flex justify-center gap-3 lg:gap-4 mb-12">
          {testimonialVideos.map((video, index) => (
            <button
              key={video.id}
              onClick={() => handleSelectVideo(index)}
              className={`relative w-16 lg:w-20 rounded-lg overflow-hidden transition-all duration-300 ${
                currentVideoIndex === index
                  ? 'ring-2 ring-pccs-tropical ring-offset-2 scale-105'
                  : 'opacity-70 hover:opacity-100 hover:scale-105'
              }`}
              style={{ aspectRatio: '9/16' }}
            >
              <video
                ref={(el) => { thumbnailRefs.current[index] = el; }}
                className="w-full h-full object-cover"
                preload="metadata"
                muted
                playsInline
              >
                <source src={`${video.src}#t=0.1`} type="video/mp4" />
              </video>
              {/* Indicador de video actual */}
              {currentVideoIndex === index && (
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
                  <div className="w-2 h-2 bg-pccs-tropical rounded-full"></div>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl lg:text-3xl font-bold text-pccs-primary mb-4">
            {t.impact.ctaTitle}
          </h3>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            {t.impact.ctaDescription}
          </p>
          <Link
            href="/donations"
            className="inline-flex items-center justify-center px-8 py-4 bg-pccs-primary text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {t.impact.donateButton}
            <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
