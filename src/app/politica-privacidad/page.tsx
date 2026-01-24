'use client';

import { useTranslation } from '@/contexts/LanguageContext';

export default function PoliticaPrivacidadPage() {
  const { language } = useTranslation();

  const content = {
    es: {
      title: 'Política de Privacidad',
      lastUpdated: 'Última actualización: Enero 2026',
      sections: [
        {
          title: '1. Información que Recolectamos',
          content: 'Al realizar una compra o donación en nuestro sitio web, recolectamos la siguiente información personal:\n\n• Nombre completo\n• Dirección de correo electrónico\n• Número de teléfono (opcional)\n• Información relacionada con el estudiante (para pagos de servicios)\n• Dirección IP y datos de navegación (automáticamente)\n\nEsta información es necesaria para procesar sus transacciones y brindarle un mejor servicio.',
        },
        {
          title: '2. Uso de la Información',
          content: 'Utilizamos su información personal para:\n\n• Procesar pagos y transacciones\n• Enviar confirmaciones y recibos de pago\n• Comunicarnos con usted sobre servicios relacionados\n• Mejorar nuestro sitio web y experiencia de usuario\n• Cumplir con obligaciones legales\n\nNunca vendemos, alquilamos ni compartimos su información personal con terceros para fines de marketing.',
        },
        {
          title: '3. Protección de Datos',
          content: 'Tomamos medidas razonables para proteger su información personal:\n\n• Utilizamos cifrado SSL para todas las transmisiones de datos\n• Los pagos son procesados por AZUL, que cumple con PCI-DSS\n• Limitamos el acceso a la información personal solo al personal autorizado\n• No almacenamos datos completos de tarjetas de crédito en nuestros servidores',
        },
        {
          title: '4. Cookies',
          content: 'Nuestro sitio web utiliza cookies para:\n\n• Mejorar la funcionalidad del sitio\n• Recordar sus preferencias de idioma\n• Analizar el tráfico del sitio web\n\nPuede configurar su navegador para rechazar cookies, aunque esto puede afectar la funcionalidad del sitio.',
        },
        {
          title: '5. Compartir Información',
          content: 'Podemos compartir su información con:\n\n• AZUL (procesador de pagos): Para procesar sus transacciones de forma segura\n• Autoridades competentes: Cuando sea requerido por ley\n\nNo compartimos su información con terceros para fines publicitarios o de marketing.',
        },
        {
          title: '6. Sus Derechos',
          content: 'Usted tiene derecho a:\n\n• Acceder a su información personal que tenemos almacenada\n• Solicitar la corrección de datos incorrectos\n• Solicitar la eliminación de su información\n• Retirar su consentimiento para el uso de sus datos\n\nPara ejercer estos derechos, contáctenos a través de los medios indicados abajo.',
        },
        {
          title: '7. Retención de Datos',
          content: 'Conservamos su información personal durante el tiempo necesario para cumplir con los fines para los que fue recopilada, incluyendo requisitos legales, contables o de informes.',
        },
        {
          title: '8. Menores de Edad',
          content: 'No recopilamos intencionalmente información personal de menores de 18 años sin el consentimiento de los padres o tutores. La información de estudiantes es proporcionada por sus padres o tutores legales.',
        },
        {
          title: '9. Cambios en esta Política',
          content: 'Podemos actualizar esta política de privacidad periódicamente. Le notificaremos cualquier cambio publicando la nueva política en esta página con una nueva fecha de actualización.',
        },
        {
          title: '10. Contacto',
          content: 'Si tiene preguntas sobre esta Política de Privacidad o desea ejercer sus derechos, contáctenos:\n\nEmail: info@pccs.edu.do\nTeléfono: +1 (849) 855 1635\nDirección: Av. Barceló, Punta Cana, C. Edgar Allan Poe, No. 1',
        },
      ],
    },
    en: {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated: January 2026',
      sections: [
        {
          title: '1. Information We Collect',
          content: 'When making a purchase or donation on our website, we collect the following personal information:\n\n• Full name\n• Email address\n• Phone number (optional)\n• Student-related information (for service payments)\n• IP address and browsing data (automatically)\n\nThis information is necessary to process your transactions and provide you with better service.',
        },
        {
          title: '2. Use of Information',
          content: 'We use your personal information to:\n\n• Process payments and transactions\n• Send payment confirmations and receipts\n• Communicate with you about related services\n• Improve our website and user experience\n• Comply with legal obligations\n\nWe never sell, rent, or share your personal information with third parties for marketing purposes.',
        },
        {
          title: '3. Data Protection',
          content: 'We take reasonable measures to protect your personal information:\n\n• We use SSL encryption for all data transmissions\n• Payments are processed by AZUL, which is PCI-DSS compliant\n• We limit access to personal information to authorized personnel only\n• We do not store complete credit card data on our servers',
        },
        {
          title: '4. Cookies',
          content: 'Our website uses cookies to:\n\n• Improve site functionality\n• Remember your language preferences\n• Analyze website traffic\n\nYou can configure your browser to reject cookies, although this may affect site functionality.',
        },
        {
          title: '5. Information Sharing',
          content: 'We may share your information with:\n\n• AZUL (payment processor): To securely process your transactions\n• Competent authorities: When required by law\n\nWe do not share your information with third parties for advertising or marketing purposes.',
        },
        {
          title: '6. Your Rights',
          content: 'You have the right to:\n\n• Access your personal information that we have stored\n• Request correction of incorrect data\n• Request deletion of your information\n• Withdraw your consent for the use of your data\n\nTo exercise these rights, contact us through the means indicated below.',
        },
        {
          title: '7. Data Retention',
          content: 'We retain your personal information for as long as necessary to fulfill the purposes for which it was collected, including legal, accounting, or reporting requirements.',
        },
        {
          title: '8. Minors',
          content: 'We do not intentionally collect personal information from minors under 18 years of age without parental or guardian consent. Student information is provided by their parents or legal guardians.',
        },
        {
          title: '9. Changes to this Policy',
          content: 'We may update this privacy policy periodically. We will notify you of any changes by posting the new policy on this page with a new update date.',
        },
        {
          title: '10. Contact',
          content: 'If you have questions about this Privacy Policy or wish to exercise your rights, contact us:\n\nEmail: info@pccs.edu.do\nPhone: +1 (849) 855 1635\nAddress: Av. Barceló, Punta Cana, C. Edgar Allan Poe, No. 1',
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
