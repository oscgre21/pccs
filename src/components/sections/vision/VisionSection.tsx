import React from 'react';

interface VisionSectionProps {
  className?: string;
}

export function VisionSection({ className = '' }: VisionSectionProps) {
  const visionFeatures = [
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 512 512">
          <path d="M243.4 2.6l-224 96c-14 6-21.8 21-18.7 35.8S16.8 160 32 160v8c0 13.3 10.7 24 24 24H456c13.3 0 24-10.7 24-24v-8c15.2 0 28.3-10.7 31.3-25.6s-4.8-29.9-18.7-35.8l-224-96c-8-3.4-17.2-3.4-25.2 0zM128 224H64V420.3c-.6 .3-1.2 .7-1.8 1.1l-48 32c-11.7 7.8-17.7 22-14.8 35.2S17.9 512 32 512H480c14.1 0 26.5-9.2 30.6-22.7s-3.1-27.4-14.8-35.2l-48-32c-.6-.4-1.2-.7-1.8-1.1V224H384V416H344V224H280V416H232V224H168V416H128V224zM256 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
        </svg>
      ),
      title: "Educación de Calidad",
      description: "Líder en educación cristiana bilingüe accesible para todas las familias"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 576 512">
          <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32.1-14-32.1-32s14-32.1 32-32.1h32V160c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32V223.5h31.8c18 0 32.1 14 32.1 32zM304 288a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm80-64a16 16 0 1 0 0-32 16 16 0 1 0 0 32z"/>
        </svg>
      ),
      title: "Ambiente Acogedor",
      description: "Entorno educativo dinámico donde cada estudiante se siente valorado"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 640 512">
          <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"/>
        </svg>
      ),
      title: "Líderes Cristianos",
      description: "Formamos ciudadanos comprometidos con la justicia social"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 512 512">
          <path d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0zm0 66.8V444.8C394 378 431.1 230.1 432 141.4L256 66.8l0 0z"/>
        </svg>
      ),
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
                      <div className="text-green-600 mt-1">{feature.icon}</div>
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