import React from 'react';
import { DonationsSection } from '@/components/sections';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Donaciones - PCCS',
  description: 'Tu donación hace la diferencia en la vida de nuestros estudiantes. Conoce las diferentes formas en que puedes contribuir al futuro de la educación cristiana en Punta Cana.',
};

export default function DonacionesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section for Donations */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
            Donaciones
          </h1>
          <p className="text-xl text-green-100 max-w-4xl mx-auto">
            Tu generosidad transforma vidas. Cada donación contribuye directamente
            a brindar educación cristiana de calidad y oportunidades a niños que lo necesitan.
          </p>

 
        </div>
      </section>

      {/* Donations Section */}
      <DonationsSection />

      {/* Impact Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                El Impacto de Tu Donación
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                En PCCS, cada donación se utiliza de manera responsable y transparente
                para maximizar el impacto en la vida de nuestros estudiantes.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#2ECC40' }}>
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Educación de Calidad</h3>
                    <p className="text-gray-600">Financiamos programas educativos innovadores y recursos de aprendizaje.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#2ECC40' }}>
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Becas de Estudio</h3>
                    <p className="text-gray-600">Proporcionamos oportunidades educativas a familias con necesidades económicas.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#2ECC40' }}>
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Desarrollo Integral</h3>
                    <p className="text-gray-600">Apoyamos el crecimiento espiritual, académico y social de cada estudiante.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Image/Stats */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Distribución de Fondos
                </h3>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Educación y Recursos</span>
                      <span className="font-semibold">60%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="h-3 rounded-full" style={{ backgroundColor: '#1E1E8C', width: '60%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Becas de Estudio</span>
                      <span className="font-semibold">25%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="h-3 rounded-full" style={{ backgroundColor: '#2ECC40', width: '25%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Infraestructura</span>
                      <span className="font-semibold">15%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="h-3 rounded-full" style={{ backgroundColor: '#4A90E2', width: '15%' }}></div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mt-6 text-center">
                  Transparencia total en el uso de fondos
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}