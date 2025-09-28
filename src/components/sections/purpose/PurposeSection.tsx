import React from 'react';

interface PurposeSectionProps {
  className?: string;
}

export function PurposeSection({ className = '' }: PurposeSectionProps) {
  const purposeGoals = [
    {
      title: "Centro de Excelencia Académica",
      description: "Ser un centro donde la excelencia académica permee las acciones del bienestar profesoral y estudiantil.",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 512 512">
          <path d="M243.4 2.6l-224 96c-14 6-21.8 21-18.7 35.8S16.8 160 32 160v8c0 13.3 10.7 24 24 24H456c13.3 0 24-10.7 24-24v-8c15.2 0 28.3-10.7 31.3-25.6s-4.8-29.9-18.7-35.8l-224-96c-8-3.4-17.2-3.4-25.2 0zM128 224H64V420.3c-.6 .3-1.2 .7-1.8 1.1l-48 32c-11.7 7.8-17.7 22-14.8 35.2S17.9 512 32 512H480c14.1 0 26.5-9.2 30.6-22.7s-3.1-27.4-14.8-35.2l-48-32c-.6-.4-1.2-.7-1.8-1.1V224H384V416H344V224H280V416H232V224H168V416H128V224zM256 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
        </svg>
      ),
      color: "#1E1E8C"
    },
    {
      title: "Logros Orientados por la Misión",
      description: "Alcanzar los logros orientados por nuestra misión educativa cristiana y bilingüe.",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 512 512">
          <path d="M448 256A192 192 0 1 0 64 256a192 192 0 1 0 384 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 80a80 80 0 1 0 0-160 80 80 0 1 0 0 160zm0-224a144 144 0 1 1 0 288 144 144 0 1 1 0-288zM224 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/>
        </svg>
      ),
      color: "#2ECC40"
    },
    {
      title: "Reconocimiento y Calidad",
      description: "Obtener el reconocimiento de la eficacia, la calidad, la responsabilidad, honestidad y ser un centro amante de Dios.",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 576 512">
          <path d="M400 0H176c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3 .4 10.6 .7 15.8H24C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 144.1 75.8C231.8 442.9 256 511.4 288 512s56.2-69.1 65.4-147.5c45.8-11 99.8-32.7 144.1-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24H446.4c.3-5.2 .5-10.4 .7-15.8C448.1 21.8 426.5 0 400 0zM48.9 112h84.4c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3C92.7 234.8 68.8 185.5 48.9 112zm84.4 0h109.7c-2.7 52.2-2.7 123.8 0 176H133.3C140.4 237.5 136.1 164.5 133.3 112zm336.1 150.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6h84.4C451.2 185.5 427.3 234.8 408 262.3zM288 64c0 16.2-13.1 30.7-24 32c-10.9-1.3-24-15.8-24-32s13.1-30.7 24-32c10.9 1.3 24 15.8 24 32z"/>
        </svg>
      ),
      color: "#8B4513"
    }
  ];

  return (
    <section id="proposito" className={`purpose-area py-16 lg:py-24 bg-gradient-to-br from-indigo-50 to-purple-50 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="tp-el-content tp-el-widget-purpose">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content Side */}
            <div className="purpose-content">
              <div className="section-heading mb-8">
                <h2 className="tp-el-title purpose-title text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Nuestro Propósito
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  En PCCS, nuestro propósito va más allá de la simple educación. Nos comprometemos a crear
                  un centro de excelencia que reconozca y honre a Dios en cada aspecto de nuestra labor educativa.
                </p>
              </div>

              {/* Purpose Goals */}
              <div className="purpose-goals space-y-8 mb-8">
                {purposeGoals.map((goal, index) => (
                  <div key={index} className="purpose-goal bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-start space-x-4">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 text-white" style={{ backgroundColor: goal.color }}>
                        {goal.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{goal.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{goal.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Call to Action */}
              <div className="purpose-cta">
                <a
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: '#1E1E8C' }}
                >
                  Conoce Nuestro Compromiso
                  <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Image Side */}
            <div className="purpose-img-container">
              <div className="purpose-img relative">
                <img
                  src="/images/pic/PCCS-91.JPG"
                  alt="Propósito PCCS - Centro de excelencia académica"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-80" style={{ backgroundColor: '#2ECC40' }}></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full opacity-60" style={{ backgroundColor: '#4A90E2' }}></div>

                {/* Achievement Stats Overlay */}
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold" style={{ color: '#1E1E8C' }}>100%</div>
                        <div className="text-xs text-gray-600">Compromiso</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold flex justify-center" style={{ color: '#2ECC40' }}>
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 512 512">
                            <path d="M116.7 33.8c4.5-6.1 11.7-9.8 19.3-9.8H376c7.6 0 14.8 3.6 19.3 9.8l112 152c6.8 9.2 6.1 21.9-1.5 30.4l-232 256c-6.2 6.9-15.1 10.8-24.5 10.8s-18.2-3.9-24.5-10.8l-232-256c-7.7-8.5-8.3-21.2-1.5-30.4l112-152zM192 128c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32zM384 160c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z"/>
                          </svg>
                        </div>
                        <div className="text-xs text-gray-600">Excelencia</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold flex justify-center" style={{ color: '#8B4513' }}>
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 576 512">
                            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                          </svg>
                        </div>
                        <div className="text-xs text-gray-600">Calidad</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Quote Section */}
          <div className="purpose-quote mt-16">
            <div className="rounded-2xl p-8 lg:p-12 text-center text-white" style={{ backgroundColor: '#1E1E8C' }}>
              <svg className="w-12 h-12 mx-auto mb-6 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
              </svg>
              <blockquote className="text-xl lg:text-2xl font-medium mb-6 leading-relaxed">
                "Nuestro propósito es formar no solo estudiantes académicamente excelentes,
                sino ciudadanos íntegros que honren a Dios en todo lo que hagan."
              </blockquote>
              <div className="text-indigo-200 font-semibold">
                Filosofía Educativa PCCS
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}