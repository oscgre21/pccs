'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/contexts/LanguageContext';
import { Language } from '@/lib/i18n/types';
import { GlobeAltIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
  nativeName: string;
}

const languages: LanguageOption[] = [
  { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
];

export function LanguageSelector() {
  const { language, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Desktop Version - Toggle Button */}
      <div className="hidden md:flex items-center gap-1 bg-white/10 rounded-full p-1">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`
              relative px-4 py-2 rounded-full text-sm font-medium
              transition-all duration-300 ease-in-out
              flex items-center gap-2
              ${
                language === lang.code
                  ? 'bg-white text-purple-900 shadow-lg scale-105'
                  : 'text-white hover:bg-white/20'
              }
            `}
            aria-label={`Switch to ${lang.name}`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="font-semibold">{lang.code.toUpperCase()}</span>
            {language === lang.code && (
              <span className="absolute inset-0 rounded-full bg-white opacity-20 animate-ping" />
            )}
          </button>
        ))}
      </div>

      {/* Mobile Version - Dropdown */}
      <div className="md:hidden relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg transition-all duration-200"
          aria-label="Select language"
        >
          <GlobeAltIcon className="w-5 h-5" />
          <span className="text-lg">{currentLanguage.flag}</span>
          <span className="text-sm font-medium">{currentLanguage.code.toUpperCase()}</span>
          <ChevronDownIcon
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu */}
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 animate-fade-in">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 text-left
                    transition-colors duration-150
                    ${
                      language === lang.code
                        ? 'bg-purple-50 text-purple-900'
                        : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <div className="flex-1">
                    <div className="font-medium">{lang.nativeName}</div>
                    <div className="text-xs text-gray-500">{lang.name}</div>
                  </div>
                  {language === lang.code && (
                    <svg
                      className="w-5 h-5 text-purple-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
