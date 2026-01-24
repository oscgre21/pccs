'use client';

import { useTranslation } from '@/contexts/LanguageContext';

export default function PoliticaSeguridadPage() {
  const { language } = useTranslation();

  const content = {
    es: {
      title: 'Política de Seguridad para Transmisión de Datos',
      lastUpdated: 'Última actualización: Enero 2026',
      sections: [
        {
          title: '1. Compromiso con la Seguridad',
          content: 'En Punta Cana Christian School (PCCS), tomamos muy en serio la seguridad de su información. Implementamos las mejores prácticas de la industria para proteger sus datos personales y financieros durante todas las transacciones realizadas en nuestro sitio web.',
        },
        {
          title: '2. Cifrado SSL/TLS',
          content: 'Toda la información transmitida entre su navegador y nuestros servidores está protegida mediante cifrado SSL/TLS (Secure Sockets Layer/Transport Layer Security):\n\n• Utilizamos certificados SSL de 256 bits\n• Toda comunicación está encriptada de extremo a extremo\n• Los datos de su tarjeta nunca viajan sin protección\n• Puede verificar la conexión segura mediante el candado en la barra de direcciones',
        },
        {
          title: '3. Procesamiento de Pagos con AZUL',
          content: 'Los pagos en nuestro sitio son procesados por AZUL, el procesador de pagos líder en República Dominicana:\n\n• AZUL cumple con los estándares PCI-DSS (Payment Card Industry Data Security Standard)\n• Los datos de su tarjeta son procesados directamente por AZUL\n• PCCS nunca almacena números completos de tarjetas de crédito\n• Todas las transacciones son monitoreadas para detectar fraudes',
        },
        {
          title: '4. Verificación 3D Secure',
          content: 'Para mayor seguridad, implementamos los programas de autenticación 3D Secure:\n\n• Verified by Visa: Programa de Visa que verifica la identidad del tarjetahabiente\n• Mastercard Identity Check: Programa de Mastercard para autenticación segura\n\nCuando procesa un pago, si su tarjeta está inscrita en estos programas, será dirigido a una página de verificación de su banco emisor donde deberá autenticarse según el método definido por su banco (SMS, email, app bancaria, etc.). Una vez verificado, la transacción se completa de forma segura.',
        },
        {
          title: '5. Protección de Datos Almacenados',
          content: 'La información que almacenamos está protegida mediante:\n\n• Servidores seguros con acceso restringido\n• Encriptación de datos sensibles en reposo\n• Respaldos regulares de información\n• Monitoreo continuo de accesos\n• Políticas estrictas de acceso para el personal',
        },
        {
          title: '6. Buenas Prácticas para el Usuario',
          content: 'Le recomendamos seguir estas prácticas de seguridad:\n\n• No comparta sus datos de tarjeta por correo electrónico o teléfono\n• Verifique que la URL comience con "https://" antes de ingresar datos\n• Busque el icono del candado en su navegador\n• Use conexiones de internet seguras (evite redes WiFi públicas)\n• Mantenga actualizado su navegador y antivirus\n• Revise regularmente sus estados de cuenta',
        },
        {
          title: '7. Qué Hacer en Caso de Problema',
          content: 'Si sospecha de una transacción no autorizada o tiene problemas de seguridad:\n\n1. Contacte inmediatamente a su banco emisor\n2. Notifique a PCCS al +1 (849) 855 1635 o info@pccs.edu.do\n3. Guarde todos los comprobantes relacionados\n\nActuaremos de inmediato para investigar cualquier incidente.',
        },
        {
          title: '8. Nunca Solicitamos Información Sensible',
          content: 'PCCS nunca le solicitará por correo electrónico, teléfono o mensaje:\n\n• Su número completo de tarjeta de crédito\n• Su código CVV/CVC\n• Su contraseña o PIN\n• Datos de acceso bancario\n\nSi recibe una solicitud de este tipo, no responda y repórtelo a info@pccs.edu.do',
        },
        {
          title: '9. Contacto',
          content: 'Para preguntas sobre seguridad o reportar incidentes:\n\nEmail: info@pccs.edu.do\nTeléfono: +1 (849) 855 1635\nDirección: Av. Barceló, Punta Cana, C. Edgar Allan Poe, No. 1',
        },
      ],
    },
    en: {
      title: 'Security Policy for Data Transmission',
      lastUpdated: 'Last updated: January 2026',
      sections: [
        {
          title: '1. Commitment to Security',
          content: 'At Punta Cana Christian School (PCCS), we take the security of your information very seriously. We implement industry best practices to protect your personal and financial data during all transactions made on our website.',
        },
        {
          title: '2. SSL/TLS Encryption',
          content: 'All information transmitted between your browser and our servers is protected by SSL/TLS (Secure Sockets Layer/Transport Layer Security) encryption:\n\n• We use 256-bit SSL certificates\n• All communication is encrypted end-to-end\n• Your card data never travels unprotected\n• You can verify the secure connection by the padlock in the address bar',
        },
        {
          title: '3. Payment Processing with AZUL',
          content: 'Payments on our site are processed by AZUL, the leading payment processor in the Dominican Republic:\n\n• AZUL complies with PCI-DSS (Payment Card Industry Data Security Standard)\n• Your card data is processed directly by AZUL\n• PCCS never stores complete credit card numbers\n• All transactions are monitored for fraud detection',
        },
        {
          title: '4. 3D Secure Verification',
          content: 'For added security, we implement 3D Secure authentication programs:\n\n• Verified by Visa: Visa\'s program that verifies cardholder identity\n• Mastercard Identity Check: Mastercard\'s program for secure authentication\n\nWhen processing a payment, if your card is enrolled in these programs, you will be directed to a verification page from your issuing bank where you must authenticate according to your bank\'s defined method (SMS, email, banking app, etc.). Once verified, the transaction is completed securely.',
        },
        {
          title: '5. Protection of Stored Data',
          content: 'The information we store is protected by:\n\n• Secure servers with restricted access\n• Encryption of sensitive data at rest\n• Regular information backups\n• Continuous access monitoring\n• Strict access policies for staff',
        },
        {
          title: '6. Best Practices for Users',
          content: 'We recommend following these security practices:\n\n• Do not share your card details via email or phone\n• Verify the URL starts with "https://" before entering data\n• Look for the padlock icon in your browser\n• Use secure internet connections (avoid public WiFi)\n• Keep your browser and antivirus updated\n• Regularly review your account statements',
        },
        {
          title: '7. What to Do in Case of a Problem',
          content: 'If you suspect an unauthorized transaction or have security issues:\n\n1. Contact your issuing bank immediately\n2. Notify PCCS at +1 (849) 855 1635 or info@pccs.edu.do\n3. Keep all related receipts\n\nWe will act immediately to investigate any incident.',
        },
        {
          title: '8. We Never Request Sensitive Information',
          content: 'PCCS will never ask you via email, phone, or message for:\n\n• Your complete credit card number\n• Your CVV/CVC code\n• Your password or PIN\n• Banking access data\n\nIf you receive such a request, do not respond and report it to info@pccs.edu.do',
        },
        {
          title: '9. Contact',
          content: 'For security questions or to report incidents:\n\nEmail: info@pccs.edu.do\nPhone: +1 (849) 855 1635\nAddress: Av. Barceló, Punta Cana, C. Edgar Allan Poe, No. 1',
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

      {/* 3D Secure Logos */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-wrap justify-center items-center gap-8">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-3">{language === 'es' ? 'Tarjetas aceptadas' : 'Accepted cards'}</p>
              <div className="flex items-center gap-4">
                <img src="/images/payment/visa-logo.svg" alt="Visa" className="h-10" />
                <img src="/images/payment/mastercard-logo.svg" alt="MasterCard" className="h-10" />
              </div>
            </div>
            <div className="h-16 w-px bg-gray-200 hidden md:block"></div>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-3">{language === 'es' ? 'Pago seguro verificado' : 'Verified secure payment'}</p>
              <div className="flex items-center gap-4">
                <img src="/images/payment/visa-secure-logo.svg" alt="Visa Secure" className="h-10" />
                <img src="/images/payment/mastercard-id-check-logo.svg" alt="MasterCard ID Check" className="h-12" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pb-12">
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
