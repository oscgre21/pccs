'use client';

import { useTranslation } from '@/contexts/LanguageContext';

export default function PoliticaDevolucionesPage() {
  const { language } = useTranslation();

  const content = {
    es: {
      title: 'Política de Devoluciones y Reembolsos',
      lastUpdated: 'Última actualización: Enero 2026',
      sections: [
        {
          title: '1. Alcance',
          content: 'Esta política aplica a todos los pagos realizados a través de nuestro sitio web para servicios estudiantiles (inscripción, reinscripción, mensualidades) y donaciones a Punta Cana Christian School (PCCS).',
        },
        {
          title: '2. Servicios Estudiantiles',
          content: 'Para pagos de servicios estudiantiles (inscripción, reinscripción, mensualidades):\n\n• Los pagos son generalmente no reembolsables una vez procesados.\n• En casos excepcionales, se pueden considerar reembolsos parciales si se solicitan dentro de los primeros 5 días hábiles después del pago.\n• Para solicitar un reembolso, debe contactar directamente a la administración de PCCS.\n• Los reembolsos aprobados se procesarán dentro de 15-30 días hábiles.',
        },
        {
          title: '3. Donaciones',
          content: 'Las donaciones realizadas a PCCS:\n\n• Son generalmente irrevocables y no reembolsables.\n• En caso de error demostrable en el monto (por ejemplo, duplicación accidental), se considerará el reembolso.\n• Para solicitar la revisión de una donación, contáctenos dentro de las 48 horas posteriores a la transacción.',
        },
        {
          title: '4. Proceso de Solicitud de Reembolso',
          content: 'Para solicitar un reembolso:\n\n1. Envíe un correo electrónico a info@pccs.edu.do\n2. Incluya su nombre completo y número de orden/transacción\n3. Explique el motivo de la solicitud de reembolso\n4. Adjunte el recibo o comprobante de pago\n\nRecibirá una respuesta dentro de 3-5 días hábiles.',
        },
        {
          title: '5. Condiciones para Reembolsos',
          content: 'Se pueden aprobar reembolsos en los siguientes casos:\n\n• Error técnico que resultó en un cargo incorrecto\n• Cargo duplicado por error del sistema\n• Retiro formal del estudiante antes del inicio del período escolar\n• Circunstancias extraordinarias evaluadas caso por caso\n\nNo se otorgarán reembolsos por:\n\n• Cambio de opinión después de realizar el pago\n• Incumplimiento de los requisitos de admisión\n• Retiro después de iniciado el período escolar (excepto casos extraordinarios)',
        },
        {
          title: '6. Método de Reembolso',
          content: 'Los reembolsos aprobados se procesarán:\n\n• Al mismo método de pago utilizado en la transacción original\n• Si no es posible, se coordinará un método alternativo\n• El tiempo de procesamiento depende de la institución financiera (generalmente 5-10 días hábiles adicionales)',
        },
        {
          title: '7. Cancelaciones',
          content: 'Si necesita cancelar un pago en proceso:\n\n• Contáctenos inmediatamente al +1 (849) 855 1635\n• Si el pago aún no ha sido procesado, podremos cancelarlo sin cargos\n• Una vez procesado el pago, aplica la política de reembolsos descrita anteriormente',
        },
        {
          title: '8. Contacto',
          content: 'Para cualquier consulta sobre devoluciones o reembolsos:\n\nEmail: info@pccs.edu.do\nTeléfono: +1 (849) 855 1635\nHorario: Lunes a Viernes, 8:00 AM - 4:00 PM\nDirección: Av. Barceló, Punta Cana, C. Edgar Allan Poe, No. 1',
        },
      ],
    },
    en: {
      title: 'Returns and Refunds Policy',
      lastUpdated: 'Last updated: January 2026',
      sections: [
        {
          title: '1. Scope',
          content: 'This policy applies to all payments made through our website for student services (enrollment, re-enrollment, tuition) and donations to Punta Cana Christian School (PCCS).',
        },
        {
          title: '2. Student Services',
          content: 'For student service payments (enrollment, re-enrollment, tuition):\n\n• Payments are generally non-refundable once processed.\n• In exceptional cases, partial refunds may be considered if requested within the first 5 business days after payment.\n• To request a refund, you must contact PCCS administration directly.\n• Approved refunds will be processed within 15-30 business days.',
        },
        {
          title: '3. Donations',
          content: 'Donations made to PCCS:\n\n• Are generally irrevocable and non-refundable.\n• In case of demonstrable error in the amount (e.g., accidental duplication), a refund will be considered.\n• To request review of a donation, contact us within 48 hours of the transaction.',
        },
        {
          title: '4. Refund Request Process',
          content: 'To request a refund:\n\n1. Send an email to info@pccs.edu.do\n2. Include your full name and order/transaction number\n3. Explain the reason for the refund request\n4. Attach the receipt or proof of payment\n\nYou will receive a response within 3-5 business days.',
        },
        {
          title: '5. Conditions for Refunds',
          content: 'Refunds may be approved in the following cases:\n\n• Technical error resulting in incorrect charge\n• Duplicate charge due to system error\n• Formal student withdrawal before the start of the school term\n• Extraordinary circumstances evaluated on a case-by-case basis\n\nRefunds will not be granted for:\n\n• Change of mind after making payment\n• Failure to meet admission requirements\n• Withdrawal after the school term has started (except extraordinary cases)',
        },
        {
          title: '6. Refund Method',
          content: 'Approved refunds will be processed:\n\n• To the same payment method used in the original transaction\n• If not possible, an alternative method will be coordinated\n• Processing time depends on the financial institution (generally 5-10 additional business days)',
        },
        {
          title: '7. Cancellations',
          content: 'If you need to cancel a payment in progress:\n\n• Contact us immediately at +1 (849) 855 1635\n• If the payment has not yet been processed, we can cancel it without charges\n• Once the payment is processed, the refund policy described above applies',
        },
        {
          title: '8. Contact',
          content: 'For any inquiries about returns or refunds:\n\nEmail: info@pccs.edu.do\nPhone: +1 (849) 855 1635\nHours: Monday to Friday, 8:00 AM - 4:00 PM\nAddress: Av. Barceló, Punta Cana, C. Edgar Allan Poe, No. 1',
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
