'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Language, LanguageContextType, Translations } from '@/lib/i18n/types';
import { en } from '@/lib/i18n/translations/en';
import { es } from '@/lib/i18n/translations/es';

// Create context with default values
export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: en,
});

// Translation dictionary
const translations: Record<Language, Translations> = {
  en,
  es,
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  // Initialize language from localStorage after component mounts (SSR-safe)
  useEffect(() => {
    setMounted(true);
    const savedLanguage = localStorage.getItem('language') as Language | null;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
      setLanguageState(savedLanguage);
    } else {
      // Detect browser language
      const browserLang = navigator.language.toLowerCase();
      const detectedLang = browserLang.startsWith('es') ? 'es' : 'en';
      setLanguageState(detectedLang);
    }
  }, []);

  // Save language to localStorage when it changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  // Get current translations - always use default 'en' until mounted to prevent hydration issues
  const t = translations[mounted ? language : 'en'];

  const value: LanguageContextType = {
    language: mounted ? language : 'en',
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook for easy access to translations
export function useTranslation(): LanguageContextType {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
