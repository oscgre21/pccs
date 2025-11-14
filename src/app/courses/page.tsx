import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Courses - PCCS',
  description: 'Explore our comprehensive curriculum and educational programs at Punta Cana Christian School. From early childhood to primary education.',
  keywords: ['courses', 'curriculum', 'education', 'programs', 'PCCS', 'Christian school'],
};

export default function CoursesPage() {
  const courses = [
    {
      id: 'early-childhood',
      title: 'Early Childhood Education',
      ageRange: '3-5 years',
      description: 'A nurturing environment where young learners develop foundational skills through play-based learning and Christian values.',
      features: [
        'Play-based learning approach',
        'Social and emotional development',
        'Introduction to basic concepts',
        'Christian character formation'
      ],
      image: '/images/pic/PCCS-25.JPG'
    },
    {
      id: 'elementary',
      title: 'Elementary Program',
      ageRange: '6-11 years',
      description: 'Building strong academic foundations with a bilingual curriculum that integrates faith and learning.',
      features: [
        'Bilingual education (English/Spanish)',
        'Core subjects mastery',
        'Critical thinking development',
        'Biblical worldview integration'
      ],
      image: '/images/pic/PCCS-30.JPG'
    },
    {
      id: 'middle-school',
      title: 'Middle School',
      ageRange: '12-14 years',
      description: 'Preparing students for academic excellence and spiritual growth through comprehensive education.',
      features: [
        'Advanced curriculum',
        'Leadership development',
        'Technology integration',
        'Service learning opportunities'
      ],
      image: '/images/pic/PCCS-45.JPG'
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
            Our Courses
          </h1>
          <p className="text-xl text-green-100 max-w-4xl mx-auto">
            Comprehensive educational programs designed to nurture minds, hearts, and spirits
            through academic excellence and Christian values.
          </p>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {courses.map((course, index) => (
              <div
                key={course.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image */}
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white rounded-full px-4 py-2 shadow-lg">
                      <span className="text-sm font-semibold text-blue-900">
                        {course.ageRange}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    {course.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {course.description}
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Program Features:
                  </h3>
                  <ul className="space-y-3 mb-8">
                    {course.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg
                          className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="/admissions"
                    className="inline-flex items-center justify-center px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    style={{ backgroundColor: '#1E1E8C' }}
                  >
                    Learn More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Ready to Enroll?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community of learners and experience the difference of quality Christian education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/admissions"
              className="inline-flex items-center justify-center px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              style={{ backgroundColor: '#1E1E8C' }}
            >
              Apply Now
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
              style={{ borderColor: '#1E1E8C', color: '#1E1E8C' }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
