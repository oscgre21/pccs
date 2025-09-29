import React from 'react';

interface AdmissionsSectionProps {
  className?: string;
}

export function AdmissionsSection({ className = '' }: AdmissionsSectionProps) {
  const documents = [
    '4 photos 2x2',
    'Birth Certificate',
    'Copy of Medical Insurance Card',
    'Copy of Parents\' ID or Passport',
    'Vaccination Record',
    'Medical Certificate',
    'Learning Report',
    'Balance Letter',
    'Conduct Letter',
    'Grade Report',
    'Copy of primary school years completed records (from 1st grade onwards)',
    'Ophthalmology Verification'
  ];

  return (
    <>
      {/* Full-Width Hero Section */}
      <section className="relative w-full h-[120vh] min-h-[900px] sm:min-h-[1000px] md:min-h-[1100px] lg:min-h-[1200px] overflow-hidden">
        <img
          src="/images/pic/PCCS-15.JPG"
          alt="PCCS Students"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Enhanced overlay for maximum text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-pccs-primary/85 via-pccs-primary/75 to-pccs-primary/70"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40"></div>

        {/* Hero Content */}
        <div className="relative z-20 flex items-center justify-center h-full px-6">
          <div className="text-center max-w-5xl mx-auto">

 

            {/* Subtítulo más pequeño para contraste */}
            <div className="mb-8 sm:mb-12">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                <span className="drop-shadow-xl" style={{
                  textShadow: '0 0 20px rgba(0,0,0,0.9), 0 0 40px rgba(30,30,140,0.3)'
                }}>
                 ADMISSIONS
                </span>
              </p>

              <p className="text-lg sm:text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed font-medium">
                <span className="drop-shadow-lg" style={{
                  textShadow: '0 0 15px rgba(0,0,0,0.8)'
                }}>
                  Discover excellence in education that prepares our students for a bright future
                </span>
              </p>
            </div>

            {/* Call to action en el hero */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#formularios"
                className="inline-flex items-center justify-center px-8 py-4 text-pccs-primary font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl bg-white hover:bg-gray-100 text-lg"
              >
                View Forms
                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </a>

              <a
                href="tel:+1-484-298-9317"
                className="inline-flex items-center justify-center px-8 py-4 font-bold rounded-full border-3 border-white transition-all duration-300 transform hover:scale-105 shadow-2xl text-white hover:bg-white hover:text-pccs-primary text-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call Now
              </a>
            </div>
          </div>
        </div>

        {/* Brand decorative elements optimizados */}
        <div className="absolute top-8 left-4 sm:top-10 sm:left-10 w-16 h-16 sm:w-24 sm:h-24 bg-pccs-tropical rounded-full opacity-70 animate-pulse"></div>
        <div className="absolute bottom-8 right-4 sm:bottom-10 sm:right-10 w-14 h-14 sm:w-20 sm:h-20 bg-pccs-accent rounded-full opacity-60"></div>
        <div className="absolute top-1/4 right-8 sm:top-1/3 sm:right-20 w-12 h-12 sm:w-16 sm:h-16 bg-pccs-earth rounded-full opacity-50"></div>
      </section>

      <section className={`admissions-area py-16 lg:py-24 bg-pccs-light ${className}`}>
        <div className="container mx-auto px-4">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Image Gallery with Natural Elements */}
          <div className="admissions-img-container">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="relative">
                <img
                  src="/images/pic/PCCS-25.JPG"
                  alt="Students in class"
                  className="w-full h-48 object-cover rounded-xl shadow-lg"
                />
                {/* Natural element accent using earth color */}
                <div className="absolute top-2 right-2 w-8 h-8 bg-pccs-earth rounded-full opacity-80"></div>
              </div>
              <div className="relative">
                <img
                  src="/images/pic/PCCS-30.JPG"
                  alt="School activities"
                  className="w-full h-48 object-cover rounded-xl shadow-lg"
                />
                {/* Tropical accent for nature-related activities */}
                <div className="absolute top-2 right-2 w-8 h-8 bg-pccs-tropical rounded-full opacity-80"></div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/pic/PCCS-45.JPG"
                alt="Campus PCCS"
                className="w-full h-64 object-cover rounded-xl shadow-lg"
              />
              {/* Campus accent with primary brand color */}
              <div className="absolute bottom-4 left-4 px-4 py-2 bg-pccs-primary rounded-full">
                <span className="text-pccs-white text-sm font-medium">PCCS Campus</span>
              </div>
            </div>

            {/* Brand decorative elements positioned properly */}
            <div className="relative mt-4">
              <div className="absolute -top-8 -left-4 w-24 h-24 bg-pccs-tropical rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -right-6 w-32 h-32 bg-pccs-accent rounded-full opacity-15"></div>
            </div>
          </div>

          {/* Content Section with Brand Guidelines */}
          <div className="admissions-content">
            <div className="bg-pccs-white rounded-2xl shadow-xl p-8 border-t-4 border-pccs-primary">
              <div className="section-heading mb-8">
                {/* Primary brand color for main heading */}
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight text-pccs-primary">
                  Documents List for Admissions
                </h2>
                {/* Neutral gray for descriptive text */}
                <p className="text-lg leading-relaxed mb-6 text-pccs-neutral">
                  To complete the admission process at PCCS, you will need to gather the following documents.
                  Our team will be available to help you every step of the way.
                </p>
              </div>

              {/* Documents List - Minimalist Design */}
              <div className="documents-list mb-8">
                <h3 className="text-xl font-semibold text-pccs-primary mb-6">
                  REQUIRED DOCUMENTS
                </h3>

                <ul className="space-y-3 list-disc list-inside pl-4">
                  {documents.map((document, index) => (
                    <li
                      key={index}
                      className="text-gray-700 leading-relaxed marker:text-pccs-tropical"
                    >
                      {document}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Admission Action Buttons */}
              <div id="formularios" className="admission-actions">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-pccs-primary mb-2">
                    Admission Processes
                  </h3>
                  <p className="text-pccs-neutral text-sm">
                    Access our forms and services directly
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {/* Agenda tu cita */}
                  <a
                    href="https://services.tochat.be/es/whatsapp-business-directory/person/573b8be9-543f-4cad-b00f-21fa720ac55b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-4 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl bg-pccs-primary hover:bg-opacity-90"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    Schedule Your Appointment
                  </a>

                  {/* Formulario de Admisión */}
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSew3PwL6kkulsLr0Ayyfy36DuUxZhVI9arzjV1XA6zvWhuFqw/viewform?usp=header"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-4 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl bg-pccs-primary hover:bg-opacity-90"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                    Admission Form
                  </a>

                  {/* Formulario Solicitud a Beca */}
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLScydBLqzdD9XPQYdMCWLAIg8cNMC1UV5p9d98hZw21JaNetvQ/viewform?usp=header"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-4 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl bg-pccs-primary hover:bg-opacity-90"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                    Scholarship Application
                  </a>

                  {/* Formulario de contacto para consultas */}
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLScO1ts3uRkswZxvGm3QFC7-fYgyCysE7qZEKDSAvx5OnFCB3g/viewform?usp=header"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-4 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl bg-pccs-primary hover:bg-opacity-90"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Inquiries
                  </a>
                </div>

                {/* Quick Contact */}
                <div className="text-center pt-4 border-t border-pccs-light">
                  <p className="text-sm text-pccs-neutral mb-3">
                    Need immediate help?
                  </p>
                  <a
                    href="tel:+1-484-298-9317"
                    className="inline-flex items-center justify-center px-6 py-3 font-semibold rounded-full border-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-pccs-accent border-pccs-accent bg-pccs-white hover:bg-pccs-accent hover:text-pccs-white"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
 
      </div>
    </section>
    </>
  );
}