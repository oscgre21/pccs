'use client';

import { useTranslation } from '@/contexts/LanguageContext';

export default function TerminosCondicionesPage() {
  const { language } = useTranslation();

  const content = {
    es: {
      title: 'Términos y Condiciones',
      lastUpdated: 'Última actualización: Enero 2026',
      sections: [
        {
          title: '1. Aceptación de los Términos',
          content: 'Al acceder y utilizar este sitio web de Punta Cana Christian School (PCCS), usted acepta estar sujeto a estos Términos y Condiciones de uso. Si no está de acuerdo con alguno de estos términos, le solicitamos que no utilice nuestro sitio web.',
        },
        {
          title: '2. Descripción del Servicio',
          content: 'PCCS es una institución educativa cristiana que ofrece servicios educativos bilingües. A través de este sitio web, ofrecemos información sobre nuestros programas educativos, admisiones, y la posibilidad de realizar pagos de servicios estudiantiles y donaciones.',
        },
        {
          title: '3. Uso del Sitio Web',
          content: 'Usted se compromete a utilizar este sitio web únicamente para fines legales y de manera que no infrinja los derechos de terceros ni restrinja o inhiba el uso y disfrute del sitio por parte de cualquier otra persona.',
        },
        {
          title: '4. Pagos y Transacciones',
          content: 'Los pagos realizados a través de nuestro sitio web son procesados de forma segura por AZUL, cumpliendo con los estándares de seguridad PCI-DSS. Los montos están expresados en Pesos Dominicanos (DOP). Al realizar un pago, usted acepta los términos de la transacción mostrados antes de confirmar.',
        },
        {
          title: '5. Propiedad Intelectual',
          content: 'Todo el contenido de este sitio web, incluyendo textos, gráficos, logotipos, imágenes y software, es propiedad de PCCS o de sus proveedores de contenido y está protegido por las leyes de propiedad intelectual.',
        },
        {
          title: '6. Limitación de Responsabilidad',
          content: 'PCCS no será responsable de ningún daño directo, indirecto, incidental, especial o consecuente que resulte del uso o la imposibilidad de usar este sitio web o los servicios relacionados.',
        },
        {
          title: '7. Modificaciones',
          content: 'PCCS se reserva el derecho de modificar estos términos y condiciones en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio web.',
        },
        {
          title: '8. Ley Aplicable',
          content: 'Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes de la República Dominicana.',
        },
        {
          title: '9. Contacto',
          content: 'Si tiene alguna pregunta sobre estos Términos y Condiciones, puede contactarnos en:\n\nEmail: info@pccs.edu.do\nTeléfono: +1 (849) 855 1635\nDirección: Av. Barceló, Punta Cana, C. Edgar Allan Poe, No. 1',
        },
      ],
    },
    en: {
      title: 'Terms and Conditions',
      lastUpdated: 'Last updated: January 2026',
      sections: [
        {
          title: '1. Acceptance of Terms',
          content: 'By accessing and using this Punta Cana Christian School (PCCS) website, you agree to be bound by these Terms and Conditions of use. If you do not agree with any of these terms, please do not use our website.',
        },
        {
          title: '2. Description of Service',
          content: 'PCCS is a Christian educational institution offering bilingual educational services. Through this website, we provide information about our educational programs, admissions, and the ability to make student service payments and donations.',
        },
        {
          title: '3. Use of Website',
          content: 'You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of third parties or restrict or inhibit the use and enjoyment of the site by any other person.',
        },
        {
          title: '4. Payments and Transactions',
          content: 'Payments made through our website are securely processed by AZUL, complying with PCI-DSS security standards. Amounts are expressed in Dominican Pesos (DOP). By making a payment, you accept the transaction terms displayed before confirming.',
        },
        {
          title: '5. Intellectual Property',
          content: 'All content on this website, including text, graphics, logos, images, and software, is the property of PCCS or its content providers and is protected by intellectual property laws.',
        },
        {
          title: '6. Limitation of Liability',
          content: 'PCCS shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use this website or related services.',
        },
        {
          title: '7. Modifications',
          content: 'PCCS reserves the right to modify these terms and conditions at any time. Changes will take effect immediately upon posting on the website.',
        },
        {
          title: '8. Applicable Law',
          content: 'These terms and conditions shall be governed and interpreted in accordance with the laws of the Dominican Republic.',
        },
        {
          title: '9. Contact',
          content: 'If you have any questions about these Terms and Conditions, you can contact us at:\n\nEmail: info@pccs.edu.do\nPhone: +1 (849) 855 1635\nAddress: Av. Barceló, Punta Cana, C. Edgar Allan Poe, No. 1',
        },
      ],
    },
  };

  const t = content[language as keyof typeof content] || content.es;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1E1E8C] to-[#4433BB] py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white text-center">{t.title}</h1>
          <p className="text-purple-200 text-center mt-2">{t.lastUpdated}</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          {t.sections.map((section, index) => (
            <div key={index} className="mb-8 last:mb-0">
              <h2 className="text-xl font-bold text-[#1E1E8C] mb-3">{section.title}</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{section.content}</p>
            </div>
          ))}
        </div>

        {/* Back Link */}
        <div className="text-center mt-8">
          <a
            href="/"
            className="inline-flex items-center text-[#1E1E8C] hover:text-[#4433BB] transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {language === 'es' ? 'Volver al Inicio' : 'Back to Home'}
          </a>
        </div>
      </div>
    </main>
  );
}
