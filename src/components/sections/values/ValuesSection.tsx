import React from 'react';

interface ValuesSectionProps {
  className?: string;
}

export function ValuesSection({ className = '' }: ValuesSectionProps) {
  const values = [
    {
      title: "Christian Faith",
      description: "Promote and practice the principles of Christianity in all areas of life.",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 384 512">
          <path d="M176 0c-26.5 0-48 21.5-48 48v80H48c-26.5 0-48 21.5-48 48v32c0 26.5 21.5 48 48 48h80v208c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V256h80c26.5 0 48-21.5 48-48v-32c0-26.5-21.5-48-48-48h-80V48c0-26.5-21.5-48-48-48H176z"/>
        </svg>
      ),
      color: "#1E1E8C"
    },
    {
      title: "Integrity",
      description: "Act with honesty, sincerity and consistency between what is said and what is done.",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 640 512">
          <path d="M323.4 85.2l-96.8 78.4c-16.1 13-19.2 36.4-7 53.1c12.9 17.8 38 21.3 55.3 7.8l99.3-77.2c7-5.4 17-4.2 22.5 2.8s4.2 17-2.8 22.5l-20.9 16.2L550.2 352H592c26.5 0 48-21.5 48-48V176c0-26.5-21.5-48-48-48H516h-4-.7l-3.9-2.5L434.8 79c-15.3-9.8-33.2-15-51.4-15c-21.8 0-43 7.5-60 21.2zm22.8 124.4l-51.7 40.2C263 274.4 217.3 268 193.7 235.6c-22.2-30.5-16.6-73.1 12.9-96.7l83.2-67.3c-11.6-4.9-24.1-7.4-36.8-7.4C234 64 215.7 69.6 200 80l-72 48H48c-26.5 0-48 21.5-48 48v288c0 26.5 21.5 48 48 48h272c26.5 0 48-21.5 48-48V304c0-10.1-3.2-19.8-9.1-27.7L346.2 209.6z"/>
        </svg>
      ),
      color: "#2ECC40"
    },
    {
      title: "Excellence",
      description: "Seek excellence in all areas of life, striving to reach maximum potential.",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 576 512">
          <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
        </svg>
      ),
      color: "#8B4513"
    },
    {
      title: "Learning",
      description: "Foster an attitude of curiosity and continuous learning, valuing education as a path to personal and spiritual growth.",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 576 512">
          <path d="M249.6 471.5c10.8 3.8 22.4-4.1 22.4-15.5V78.6c0-4.2-1.6-8.4-5-11C247.4 52 202.4 32 144 32C93.5 32 46.3 45.3 18.1 56.1C6.8 60.5 0 71.7 0 83.8V454.1c0 11.9 12.8 20.2 24.1 16.5C55.6 460.1 105.5 448 144 448c33.9 0 79 14 105.6 23.5zm76.8 0C353 462 398.1 448 432 448c38.5 0 88.4 12.1 119.9 22.6c11.3 3.8 24.1-4.6 24.1-16.5V83.8c0-12.1-6.8-23.3-18.1-27.6C529.7 45.3 482.5 32 432 32c-58.4 0-103.4 20-123 35.6c-3.3 2.6-5 6.8-5 11V456c0 11.4 11.7 19.3 22.4 15.5z"/>
        </svg>
      ),
      color: "#4A90E2"
    },
    {
      title: "Love",
      description: "Foster unconditional love toward God and others, following the example of Jesus Christ.",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 512 512">
          <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/>
        </svg>
      ),
      color: "#1E1E8C"
    },
    {
      title: "Compassion",
      description: "Demonstrate empathy and understanding toward the needs and sufferings of others, offering support and help.",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 640 512">
          <path d="M320 96C284.7 96 256 124.7 256 160c0 35.3 28.7 64 64 64s64-28.7 64-64c0-35.3-28.7-64-64-64zM144 384c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64zM496 384c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64zM269.3 354.7L192 432l77.3 77.3c6 6 14.1 9.4 22.6 9.4s16.6-3.4 22.6-9.4L512 312c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6L337.9 532c-12.5 12.5-32.8 12.5-45.3 0L106.7 346.1c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L269.3 354.7z"/>
        </svg>
      ),
      color: "#2ECC40"
    },
    {
      title: "Service",
      description: "Serve others with humility, generosity and altruism, always seeking the welfare and justice for all.",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 640 512">
          <path d="M272 416c17.7 0 32-14.3 32-32s-14.3-32-32-32H160c-17.7 0-32-14.3-32-32V192h32c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-64-64c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H64V320c0 53 43 96 96 96H272zM368 96c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32 14.3 32 32V320H480c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8H576V192c0-53-43-96-96-96H368z"/>
        </svg>
      ),
      color: "#4A90E2"
    },
    {
      title: "Gratitude",
      description: "Recognize and appreciate the blessings received, showing gratitude toward God and those who surround us and teach us.",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 512 512">
          <path d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64z"/>
        </svg>
      ),
      color: "#8B4513"
    }
  ];

  return (
    <section id="valores" className={`values-area py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="tp-el-content tp-el-widget-values">
          {/* Section Header */}
          <div className="section-header text-center mb-16">
            <h2 className="tp-el-title values-title text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              The values that guide our educational mission and shape the character of our student community.
              Each value represents a fundamental pillar in the comprehensive education we offer.
            </p>
          </div>

          {/* Hero Image */}
          <div className="values-hero mb-16">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/pic/PCCS-27.JPG"
                alt="PCCS Values - Formation in Christian values"
                className="w-full h-64 lg:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/70 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl lg:text-4xl font-bold mb-4">Values Formation</h3>
                  <p className="text-lg lg:text-xl">Building character with Christian principles</p>
                </div>
              </div>
            </div>
          </div>

          {/* Values Grid */}
          <div className="values-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="value-card bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                {/* Icon and Title */}
                <div className="value-header mb-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 text-white" style={{ backgroundColor: value.color }}>
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 text-center mb-3">
                    {value.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="value-content">
                  <p className="text-gray-600 leading-relaxed text-center">
                    {value.description}
                  </p>
                </div>

                {/* Decorative Bottom Border */}
                <div className="mt-6 h-1 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: value.color }}></div>
              </div>
            ))}
          </div>

          {/* Bottom CTA Section */}
          <div className="values-cta text-center mt-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                Join Our Values Community
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                At PCCS, these values are not just words on a wall. They are living principles that guide every
                aspect of our education and comprehensive formation.
              </p>
              <a
                href="/admisiones"
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
    </section>
  );
}