import React from 'react';

interface AboutSectionProps {
  className?: string;
}

export function AboutSection({ className = '' }: AboutSectionProps) {
  return (
    <section className={`about-area py-16 lg:py-24 bg-white ${className}`}>
      <div className="container mx-auto px-4">
        <div className="tp-el-content tp-el-widget-about">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image Side */}
            <div className="about-img-container">
              <div className="about-img relative">
                <img
                  src="/images/img-5.jpg"
                  alt="About Kindergarten School"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />

                {/* Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full opacity-80" style={{ backgroundColor: '#2ECC40' }}></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full opacity-60" style={{ backgroundColor: '#4A90E2' }}></div>
              </div>
            </div>

            {/* Content Side */}
            <div className="about-content">
              <div className="section-heading mb-8">
                <h2 className="tp-el-title about-title text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  About Kindergarten School
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Our kindergarten provides a nurturing and stimulating environment where children can learn, grow, and develop essential skills for their future academic journey.
                </p>
                <p className="text-gray-600 leading-relaxed mb-8">
                  We believe in fostering creativity, curiosity, and confidence in every child through our innovative educational approach and dedicated teaching staff.
                </p>
              </div>

              {/* Features List */}
              <div className="about-features grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="feature-item flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2ECC40' }}>
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Qualified Teachers</span>
                </div>

                <div className="feature-item flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2ECC40' }}>
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Safe Environment</span>
                </div>

                <div className="feature-item flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2ECC40' }}>
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Creative Learning</span>
                </div>

                <div className="feature-item flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2ECC40' }}>
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Individual Attention</span>
                </div>
              </div>

              {/* Call to Action */}
              <div className="about-cta">
                <a
                  href="/about"
                  className="inline-flex items-center px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: '#1E1E8C' }}
                >
                  Learn More About Us
                  <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}