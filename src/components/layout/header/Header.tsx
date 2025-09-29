'use client';

import React, { useState } from 'react';
import { Navigation } from '../navigation/Navigation';
import { ContactInfo } from './ContactInfo';
import { SocialLinks } from './SocialLinks';
import { MobileMenu } from './MobileMenu';

interface HeaderProps {
  className?: string;
}

export function Header({ className = '' }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={`header header-style-1 ${className}`}>
      {/* Top Header - Contact Info and Social Links */}
      <div className="top-header bg-gray-50 py-3 hidden lg:block"  style={{ backgroundColor: '#4433BB' }}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <ContactInfo />
            <SocialLinks />
          </div>
        </div>
      </div>

      {/* Main Header - Logo and Navigation */}
      <div className="bottom-header bg-white shadow-sm">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between py-3 lg:py-3">
            {/* Logo */}
            <div className="site-logo flex-shrink-0">
              <a href="/" className="flex items-center">
                <img
                  src="/logos/logo_land.png"
                  alt="PCCS Logo"
                  className="h-12 md:h-20 w-32 md:w-48 object-contain"
                />
              </a>
            </div>

            {/* Desktop Navigation - Centered */}
            <div className="hidden lg:flex flex-1 justify-center">
              <Navigation />
            </div>

            {/* Admit Now Button - Desktop */}
            <div className="hidden lg:flex flex-shrink-0">
              <a
                href="/donaciones"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-semibold transition-colors inline-flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                </svg>
                Sponsor
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}