'use client';

import React, { useState } from 'react';
import { XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { contactInfo } from '@/app/constant';

interface MenuItem {
  id: string;
  title: string;
  href: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: 'home',
    title: 'Home',
    href: '/',
  },
  {
    id: 'about',
    title: 'About Us',
    href: '/about',
    children: [
      { id: 'mission', title: 'Mission', href: '/#mission' },
      { id: 'vision', title: 'Vision', href: '/#vision' },
      { id: 'values', title: 'Values', href: '/#values' },
      { id: 'purpose', title: 'Purpose', href: '/#purpose' }
    ]
  },
  {
    id: 'courses',
    title: 'Courses',
    href: '/courses',
  },
  {
    id: 'admissions',
    title: 'Admissions',
    href: '/admissions',
  },
  {
    id: 'gallery',
    title: 'Gallery',
    href: '/gallery',
  },
  {
    id: 'contact',
    title: 'Contact Us',
    href: '/contact'
  }
];

 

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleSubmenu = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{
            background: 'linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3))'
          }}
          onClick={onClose}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-80 max-w-full h-full shadow-xl z-50 transform transition-transform duration-300 lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backgroundColor: '#1E1E8C' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.1)', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
          <div className="bg-white rounded-md px-2 py-1">
            <img
              src="/logos/logo3.png"
              alt="PCCS Logo"
              className="h-8"
            />
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white rounded-md transition-colors"
            onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = 'rgba(74, 144, 226, 0.2)'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'transparent'}
            aria-label="Close menu"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <div className="py-4">
          <nav>
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <div className="px-4">
                    {item.children ? (
                      <button
                        onClick={() => toggleSubmenu(item.id)}
                        className="flex items-center justify-between w-full py-3 text-left text-white transition-colors"
                        onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#2ECC40'}
                        onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#FFFFFF'}
                      >
                        <span className="font-medium">{item.title}</span>
                        <ChevronDownIcon
                          className={`w-4 h-4 text-white transition-transform ${
                            expandedItems.includes(item.id) ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    ) : (
                      <a
                        href={item.href}
                        onClick={onClose}
                        className="block py-3 text-white transition-colors font-medium"
                        onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#2ECC40'}
                        onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#FFFFFF'}
                      >
                        {item.title}
                      </a>
                    )}

                    {/* Submenu */}
                    {item.children && expandedItems.includes(item.id) && (
                      <ul className="ml-4 mt-2 space-y-1 border-l-2 pl-3" style={{ borderColor: '#2ECC40' }}>
                        {item.children.map((child) => (
                          <li key={child.id}>
                            <a
                              href={child.href}
                              onClick={onClose}
                              className="block py-2 text-white opacity-80 transition-all"
                              onMouseEnter={(e) => {
                                (e.target as HTMLElement).style.color = '#4A90E2';
                                (e.target as HTMLElement).style.opacity = '1';
                              }}
                              onMouseLeave={(e) => {
                                (e.target as HTMLElement).style.color = '#FFFFFF';
                                (e.target as HTMLElement).style.opacity = '0.8';
                              }}
                            >
                              {child.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Sponsor Button */}
        <div className="px-4 mb-6">
          <a
            href="/donations"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-semibold transition-colors inline-flex items-center justify-center w-full"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
            Sponsor
          </a>
        </div>

        {/* Contact Info */}
        <div className="border-t mt-6 pt-6 px-4" style={{ borderColor: 'rgba(255, 255, 255, 0.1)', backgroundColor: 'rgba(0, 0, 0, 0.15)' }}>
          <h4 className="font-semibold text-white mb-4">Contact Info</h4>
          <ul className="space-y-3">
            {contactInfo.map((item, index) => (
              <li key={index}>
                {item.href ? (
                  <a
                    href={item.href}
                    className="flex items-center space-x-3 text-white opacity-90 transition-all"
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.color = '#2ECC40';
                      (e.target as HTMLElement).style.opacity = '1';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.color = '#FFFFFF';
                      (e.target as HTMLElement).style.opacity = '0.9';
                    }}
                  >
                    <svg
                      className="w-4 h-4 flex-shrink-0"
                      style={{ color: '#4A90E2' }}
                      viewBox="0 0 512 512"
                      fill="currentColor"
                    >
                      <path d={item.icon} />
                    </svg>
                    <span className="text-sm">{item.text}</span>
                  </a>
                ) : (
                  <div className="flex items-center space-x-3 text-white opacity-90">
                    <svg
                      className="w-4 h-4 flex-shrink-0"
                      style={{ color: '#4A90E2' }}
                      viewBox="0 0 512 512"
                      fill="currentColor"
                    >
                      <path d={item.icon} />
                    </svg>
                    <span className="text-sm">{item.text}</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}