'use client';

import React from 'react';
import Image from 'next/image';
import { StudentServicesSection } from '@/components/sections';
import { useTranslation } from '@/contexts/LanguageContext';

export default function StudentServicesPage() {
  const { t } = useTranslation();

  if (!t.studentServices) {
    return null;
  }


  const courses = [
    {
      id: "early-childhood",
      titleKey: "earlyChildhood",
      ageRangeKey: "earlyChildhoodAge",
      descriptionKey: "earlyChildhoodDesc",
      features: [
        "playBased",
        "socialDevelopment",
        "basicConcepts",
        "characterFormation",
      ],
      image: "/images/pic/PCCS-25.JPG",
    },
    {
      id: "elementary",
      titleKey: "elementary",
      ageRangeKey: "elementaryAge",
      descriptionKey: "elementaryDesc",
      features: [
        "bilingualEducation",
        "coreSubjects",
        "criticalThinking",
        "worldview",
      ],
      image: "/images/pic/PCCS-30.JPG",
    },
    {
      id: "middle-school",
      titleKey: "middleSchool",
      ageRangeKey: "middleSchoolAge",
      descriptionKey: "middleSchoolDesc",
      features: [
        "advancedCurriculum",
        "leadership",
        "technology",
        "serviceLearning",
      ],
      image: "/images/pic/PCCS-45.JPG",
    },
  ];  

  return (
    <main className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
        <Image
          src="/images/pic/PCCS-135.jpg"
          alt="PCCS Student Services"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
              {t.studentServices.title}
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
              {t.studentServices.description}
            </p>
          </div>
        </div>
      </section>

      {/* Student Services Payment Table */}
      <StudentServicesSection />


      {/* Courses Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {courses.map((course, index) => (
              <div
                key={course.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={course.image}
                      alt={
                        t.courses[
                          course.titleKey as keyof typeof t.courses
                        ] as string
                      }
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white rounded-full px-4 py-2 shadow-lg">
                      <span className="text-sm font-semibold text-blue-900">
                        {
                          t.courses[
                            course.ageRangeKey as keyof typeof t.courses
                          ]
                        }
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    {t.courses[course.titleKey as keyof typeof t.courses]}
                  </h2>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {t.courses[course.descriptionKey as keyof typeof t.courses]}
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {t.courses.programFeatures}
                  </h3>
                  <ul className="space-y-3 mb-8">
                    {course.features.map((featureKey, idx) => (
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
                        <span className="text-gray-700">
                          {t.courses[featureKey as keyof typeof t.courses]}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="/admissions"
                    className="inline-flex items-center justify-center px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    style={{ backgroundColor: "#1E1E8C" }}
                  >
                    {t.common.learnMore}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
 


    </main>
  );
}
