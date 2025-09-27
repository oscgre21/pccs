import React from 'react';

interface VisionSectionProps {
  className?: string;
}

export function VisionSection({ className = '' }: VisionSectionProps) {
  const visionFeatures = [
    {
      icon: "🌟",
      title: "Educación de Calidad",
      description: "Líder en educación cristiana bilingüe accesible para todas las familias"
    },
    {
      icon: "🏠",
      title: "Ambiente Acogedor",
      description: "Entorno educativo dinámico donde cada estudiante se siente valorado"
    },
    {
      icon: "👥",
      title: "Líderes Cristianos",
      description: "Formamos ciudadanos comprometidos con la justicia social"
    },
    {
      icon: "💪",
      title: "Confianza e Integridad",
      description: "Capacitamos para enfrentar desafíos con compasión y determinación"
    }
  ];

  return (
    <section id="vision" className={`vision-area py-16 lg:py-24 bg-white ${className}`}>
      <div className="container mx-auto px-4">
        <div className="tp-el-content tp-el-widget-vision">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image Side */}
            <div className="vision-img-container order-2 lg:order-1">
              <div className="vision-img relative">
                <img
                  src="/images/pic/PCCS-118.JPG"
                  alt="Visión PCCS - Liderazgo en educación cristiana"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-80" style={{ backgroundColor: '#2ECC40' }}></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full opacity-60" style={{ backgroundColor: '#8B4513' }}></div>

 
              </div>
            </div>

            {/* Content Side */}
            <div className="vision-content order-1 lg:order-2">
              <div className="section-heading mb-8">
                <h2 className="tp-el-title vision-title text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Nuestra Visión
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  Ser reconocidos como líderes en la provisión de una educación cristiana bilingüe de calidad,
                  asequible y accesible para todas las familias. Aspiramos a crear un entorno educativo dinámico
                  y acogedor, donde cada estudiante se sienta valorado y capacitado para alcanzar sus metas.
                </p>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Buscamos formar líderes cristianos que sean ciudadanos comprometidos con la justicia social,
                  capaces de enfrentar los desafíos del mundo con confianza, integridad y compasión.
                </p>
              </div>

              {/* Vision Features */}
              <div className="vision-features grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {visionFeatures.map((feature, index) => (
                  <div key={index} className="feature-card bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{feature.icon}</div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Call to Action */}
              <div className="vision-cta">
                <a
                  href="/admisiones"
                  className="inline-flex items-center px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: '#2ECC40' }}
                >
                  Únete a Nuestra Visión
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