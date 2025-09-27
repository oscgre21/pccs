'use client';

import React, { useEffect, useState, useRef } from 'react';

interface Stat {
  id: string;
  number: number;
  suffix: string;
  title: string;
  icon: string;
  gradientClass: string;
}

const stats: Stat[] = [
  {
    id: 'students',
    number: 1500,
    suffix: '+',
    title: 'Happy Students',
    icon: '/images/counter-icon-1.png',
    gradientClass: 'bg-gradient-to-br from-blue-500 to-blue-600'
  },
  {
    id: 'teachers',
    number: 85,
    suffix: '+',
    title: 'Expert Teachers',
    icon: '/images/counter-icon-2.png',
    gradientClass: 'bg-gradient-to-br from-green-500 to-green-600'
  },
  {
    id: 'courses',
    number: 120,
    suffix: '+',
    title: 'Available Courses',
    icon: '/images/counter-icon-3.png',
    gradientClass: 'bg-gradient-to-br from-purple-500 to-purple-600'
  },
  {
    id: 'awards',
    number: 25,
    suffix: '+',
    title: 'Awards Won',
    icon: '/images/counter-icon-4.png',
    gradientClass: 'bg-gradient-to-br from-orange-500 to-orange-600'
  }
];

interface StatCardProps {
  stat: Stat;
  isVisible: boolean;
}

function StatCard({ stat, isVisible }: StatCardProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = stat.number / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.number) {
          setCount(stat.number);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isVisible, hasAnimated, stat.number]);

  return (
    <div className="counter-item text-center">
      <div className="counter-box bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
        {/* Icon */}
        <div className="counter-icon-wrapper mb-6">
          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${stat.gradientClass} shadow-lg`}>
            <img
              src={stat.icon}
              alt={stat.title}
              className="w-10 h-10 filter brightness-0 invert"
            />
          </div>
        </div>

        {/* Number */}
        <div className="counter-number mb-4">
          <span className="text-4xl lg:text-5xl font-bold text-gray-900">
            {count.toLocaleString()}
          </span>
          <span className="text-4xl lg:text-5xl font-bold text-blue-600">
            {stat.suffix}
          </span>
        </div>

        {/* Title */}
        <h3 className="counter-title text-lg font-semibold text-gray-700">
          {stat.title}
        </h3>
      </div>
    </div>
  );
}

interface StatsSectionProps {
  className?: string;
}

export function StatsSection({ className = '' }: StatsSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`stats-section py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-purple-50 ${className}`}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6">
            Our Achievements
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Here is what you can expect from a house cleaning from a Handy professional.
            Download the app to share further cleaning details and instructions!
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <StatCard key={stat.id} stat={stat} isVisible={isVisible} />
          ))}
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
      </div>
    </section>
  );
}