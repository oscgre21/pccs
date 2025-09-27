import React from 'react';

interface PurposeSectionProps {
  className?: string;
}

export function PurposeSection({ className = '' }: PurposeSectionProps) {
  const purposeGoals = [
    {
      title: "Centro de Excelencia Académica",
      description: "Ser un centro donde la excelencia académica permee las acciones del bienestar profesoral y estudiantil.",
      icon: "🎓",
      color: "#1E1E8C"
    },
    {
      title: "Logros Orientados por la Misión",
      description: "Alcanzar los logros orientados por nuestra misión educativa cristiana y bilingüe.",
      icon: "🎯",
      color: "#2ECC40"
    },
    {
      title: "Reconocimiento y Calidad",
      description: "Obtener el reconocimiento de la eficacia, la calidad, la responsabilidad, honestidad y ser un centro amante de Dios.",
      icon: "🏆",
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
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: goal.color }}>
                        <span className="text-2xl">{goal.icon}</span>
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
                        <div className="text-2xl font-bold" style={{ color: '#2ECC40' }}>💎</div>
                        <div className="text-xs text-gray-600">Excelencia</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold" style={{ color: '#8B4513' }}>⭐</div>
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