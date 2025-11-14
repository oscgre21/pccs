'use client';

import React from 'react';
import { SocialLinks } from '../header/SocialLinks';
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useTranslation } from '@/contexts/LanguageContext';

interface FooterLink {
  titleKey: string;
  href: string;
}

interface FooterSection {
  titleKey: string;
  links: FooterLink[];
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  const footerSections: FooterSection[] = [
    {
      titleKey: 'navigation',
      links: [
        { titleKey: 'home', href: '/' },
        { titleKey: 'aboutUs', href: '/about' },
        { titleKey: 'courses', href: '/courses' },
        { titleKey: 'admissions', href: '/admissions' },
        { titleKey: 'contact', href: '/contact' }
      ]
    },
    {
      titleKey: 'explore',
      links: [
        { titleKey: 'gallery', href: '/gallery' },
        { titleKey: 'staff', href: '/staff' },
        { titleKey: 'donations', href: '/donations' },
        { titleKey: 'blog', href: '/blog' }
      ]
    },
    {
      titleKey: 'quickLinks',
      links: [
        { titleKey: 'mission', href: '/#mission' },
        { titleKey: 'vision', href: '/#vision' },
        { titleKey: 'values', href: '/#values' },
        { titleKey: 'purpose', href: '/#purpose' }
      ]
    }
  ];

  return (
    <footer className="text-white" style={{ backgroundColor: '#4433BB' }}>
      {/* Main Footer */}
      <div className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="lg:col-span-1">
              <div className="mb-6 inline-block">
                <div className="bg-white rounded-lg p-4 shadow-lg">
                  <img
                    src="/logos/logo3.png"
                    alt="PCCS Logo"
                    className="h-20 w-auto"
                  />
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {t.footer.description}
              </p>
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-4">{t.footer.followUs}</h4>
                <SocialLinks />
              </div>
            </div>

            {/* Footer Navigation */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h4 className="text-white font-semibold mb-6">
                  {t.footer[section.titleKey as keyof typeof t.footer] as string}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200"
                      >
                        {t.navigation[link.titleKey as keyof typeof t.navigation]}
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
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <PhoneIcon className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <div>
                <p className="text-purple-200 text-sm">{t.footer.callUs}</p>
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
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <EnvelopeIcon className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <div>
                <p className="text-purple-200 text-sm">{t.footer.email}</p>
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
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPinIcon className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <div>
                <p className="text-purple-200 text-sm">{t.footer.location}</p>
                <p className="text-white">
                  Av. Barcelo, Punta Cana, C. Edgar Allan Poe, No. 1
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright 
      <div className="border-t py-6" style={{ borderColor: '#665555' }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-purple-200 text-sm">
              © {currentYear} PCCS. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy" className="text-purple-200 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-purple-200 hover:text-white text-sm transition-colors">
                Terms of Use
              </a>
            </div>
          </div>
        </div>
      </div>*/}
    </footer>
  );
}