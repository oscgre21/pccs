import React from 'react';

interface ValuesSectionProps {
  className?: string;
}

export function ValuesSection({ className = '' }: ValuesSectionProps) {
  const values = [
    {
      title: "Fe Cristiana",
      description: "Promover y practicar los principios del cristianismo en todas las áreas de la vida.",
      icon: "✝️",
      color: "#1E1E8C"
    },
    {
      title: "Integridad",
      description: "Actuar con honestidad, sinceridad y coherencia entre lo que se dice y lo que se hace.",
      icon: "🤝",
      color: "#2ECC40"
    },
    {
      title: "Excelencia",
      description: "Buscar la excelencia en todas las áreas de la vida, esforzándose por alcanzar el máximo potencial.",
      icon: "⭐",
      color: "#8B4513"
    },
    {
      title: "Aprendizaje",
      description: "Fomentar una actitud de curiosidad y aprendizaje continuo, valorando la educación como un camino hacia el crecimiento personal y espiritual.",
      icon: "📚",
      color: "#4A90E2"
    },
    {
      title: "Amor",
      description: "Fomentar el amor incondicional hacia Dios y hacia los demás, siguiendo el ejemplo de Jesucristo.",
      icon: "❤️",
      color: "#1E1E8C"
    },
    {
      title: "Compasión",
      description: "Demostrar empatía y comprensión hacia las necesidades y sufrimientos de los demás, ofreciendo apoyo y ayuda.",
      icon: "🤗",
      color: "#2ECC40"
    },
    {
      title: "Servicio",
      description: "Servir a los demás con humildad, generosidad y altruismo, buscando siempre el bienestar y la justicia para todos.",
      icon: "🙏",
      color: "#4A90E2"
    },
    {
      title: "Gratitud",
      description: "Reconocer y apreciar las bendiciones recibidas, mostrando agradecimiento hacia Dios y hacia quienes nos rodean y enseñan.",
      icon: "🙌",
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
              Nuestros Valores
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Los valores que guían nuestra misión educativa y forman el carácter de nuestra comunidad estudiantil.
              Cada valor representa un pilar fundamental en la formación integral que ofrecemos.
            </p>
          </div>

          {/* Hero Image */}
          <div className="values-hero mb-16">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/pic/PCCS-27.JPG"
                alt="Valores PCCS - Formación en valores cristianos"
                className="w-full h-64 lg:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/70 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl lg:text-4xl font-bold mb-4">Formación en Valores</h3>
                  <p className="text-lg lg:text-xl">Construyendo carácter con principios cristianos</p>
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
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: value.color }}>
                    <span className="text-2xl">{value.icon}</span>
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
                Únete a Nuestra Comunidad de Valores
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                En PCCS, estos valores no son solo palabras en una pared. Son principios vivos que guían cada
                aspecto de nuestra educación y formación integral.
              </p>
              <a
                href="/admisiones"
                className="inline-flex items-center px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                style={{ backgroundColor: '#1E1E8C' }}
              >
                Conoce Más Sobre Nosotros
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