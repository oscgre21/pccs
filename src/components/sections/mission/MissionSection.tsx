import React from 'react';

interface MissionSectionProps {
  className?: string;
}

export function MissionSection({ className = '' }: MissionSectionProps) {
  const missionPoints = [
    "La formación de jóvenes a través de una educación integral basada en la palabra de Dios.",
    "Crear un ambiente cristiano, donde los jóvenes adquieran las herramientas espirituales e intelectuales que les garanticen su superación permanente.",
    "Proporcionar una educación cristiana bilingüe de alta calidad a precios accesibles, comprometida con el desarrollo integral de cada estudiante.",
    "Cultivar un ambiente de aprendizaje de excelencia y amoroso, donde se promueva el crecimiento espiritual, intelectual y emocional, con valores cristianos en amor, compasión y servicio."
  ];

  return (
    <section id="mision" className={`mission-area py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-purple-50 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="tp-el-content tp-el-widget-mission">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content Side */}
            <div className="mission-content">
              <div className="section-heading mb-8">
                <h2 className="tp-el-title mission-title text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Nuestra Misión
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  En PCCS, nos dedicamos a formar jóvenes íntegros a través de una educación cristiana de excelencia,
                  comprometida con el desarrollo espiritual, académico y personal de cada estudiante.
                </p>
              </div>

              {/* Mission Points */}
              <div className="mission-points space-y-6 mb-8">
                {missionPoints.map((point, index) => (
                  <div key={index} className="mission-point flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: '#1E1E8C' }}>
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Side */}
            <div className="mission-img-container">
              <div className="mission-img relative">
                <img
                  src="/images/pic/PCCS-35.JPG"
                  alt="Misión PCCS - Formación integral cristiana"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />

                {/* Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full opacity-80" style={{ backgroundColor: '#2ECC40' }}></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full opacity-60" style={{ backgroundColor: '#4A90E2' }}></div>

                {/* Overlay Card */}
                <div className="absolute bottom-8 left-8 bg-white rounded-lg p-4 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1E1E8C' }}>
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Educación Integral</h4>
                      <p className="text-sm text-gray-600">Cristiana y Bilingüe</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}