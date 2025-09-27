import React from 'react';
import { SocialLinks } from '../header/SocialLinks';

interface FooterLink {
  title: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: 'Navegación',
    links: [
      { title: 'Inicio', href: '/' },
      { title: 'Nosotros', href: '/about' },
      { title: 'Cursos', href: '/courses' },
      { title: 'Contacto', href: '/contact' }
    ]
  },
  {
    title: 'Servicios',
    links: [
      { title: 'Educación Infantil', href: '/services/educacion-infantil' },
      { title: 'Actividades Extracurriculares', href: '/services/actividades' },
      { title: 'Apoyo Familiar', href: '/services/apoyo-familiar' },
      { title: 'Talleres', href: '/services/talleres' }
    ]
  },
  {
    title: 'Recursos',
    links: [
      { title: 'Blog', href: '/blog' },
      { title: 'Eventos', href: '/events' },
      { title: 'Galería', href: '/gallery' },
      { title: 'Descargas', href: '/downloads' }
    ]
  }
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-white" style={{ backgroundColor: '#4433BB' }}>
      {/* Main Footer */}
      <div className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <img
                  src="/logos/logo3.png"
                  alt="PCCS Logo"
                  className="h-12 w-auto"
                />
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                PCCS ofrece un enfoque innovador para el estudio y desarrollo de niños y jóvenes,
                proporcionando las mejores soluciones educativas en un ambiente limpio y seguro.
              </p>
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-4">Síguenos</h4>
                <SocialLinks />
              </div>
            </div>

            {/* Footer Navigation */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h4 className="text-white font-semibold mb-6">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200"
                      >
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="border-t py-8" style={{ borderColor: '#665555' }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phone */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-opacity-20 bg-white rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                >
                  <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z" />
                </svg>
              </div>
              <div>
                <p className="text-purple-200 text-sm">Llámanos</p>
                <a
                  href="tel:+18498551635"
                  className="text-white hover:text-purple-300 transition-colors"
                >
                  +1 (849) 855 1635
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-opacity-20 bg-white rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                >
                  <path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z" />
                </svg>
              </div>
              <div>
                <p className="text-purple-200 text-sm">Email</p>
                <a
                  href="mailto:info@pccs.edu.do"
                  className="text-white hover:text-purple-300 transition-colors"
                >
                  info@pccs.edu.do
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-opacity-20 bg-white rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 384 512"
                  fill="currentColor"
                >
                  <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" />
                </svg>
              </div>
              <div>
                <p className="text-purple-200 text-sm">Ubicación</p>
                <p className="text-white">
                  Av. Barcelo, Punta Cana, C. Edgar Allan Poe, No. 1
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t py-6" style={{ borderColor: '#665555' }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-purple-200 text-sm">
              © {currentYear} PCCS. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy" className="text-purple-200 hover:text-white text-sm transition-colors">
                Política de Privacidad
              </a>
              <a href="/terms" className="text-purple-200 hover:text-white text-sm transition-colors">
                Términos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}