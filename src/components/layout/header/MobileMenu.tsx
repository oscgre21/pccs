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
    id: 'inicio',
    title: 'Home',
    href: '/',
    children: [
      { id: 'home-1', title: 'Home 01', href: '/' },
      { id: 'home-2', title: 'Home 02', href: '/home-2' },
      { id: 'home-3', title: 'Home 03', href: '/home-3' },
      { id: 'home-4', title: 'Home 04', href: '/home-4' },
      { id: 'home-5', title: 'Home 05', href: '/home-5' }
    ]
  },
  {
    id: 'nosotros',
    title: 'About Us',
    href: '/nosotros',
    children: [
      { id: 'courses', title: 'Courses Default', href: '/courses' },
      { id: 'course-details', title: 'Course Details', href: '/courses/course-details' }
    ]
  },
  {
    id: 'admisiones',
    title: 'Admissions',
    href: '/admisiones',
    children: [
      { id: 'shop', title: 'Shop', href: '/shop' }
    ]
  },
  {
    id: 'contacto',
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
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-80 max-w-full h-full shadow-xl z-50 transform transition-transform duration-300 lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backgroundColor: '#4433' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: '#665555' }}>
          <img
            src="/logos/logo3.png"
            alt="PCCS Logo"
            className="h-8"
          />
          <button
            onClick={onClose}
            className="p-2 text-white rounded-md transition-colors hover:bg-gray-600"
            onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#665555'}
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
                        className="flex items-center justify-between w-full py-3 text-left text-white hover:text-purple-200 transition-colors"
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
                        className="block py-3 text-white hover:text-purple-200 transition-colors font-medium"
                      >
                        {item.title}
                      </a>
                    )}

                    {/* Submenu */}
                    {item.children && expandedItems.includes(item.id) && (
                      <ul className="ml-4 mt-2 space-y-1">
                        {item.children.map((child) => (
                          <li key={child.id}>
                            <a
                              href={child.href}
                              onClick={onClose}
                              className="block py-2 text-purple-200 hover:text-white transition-colors"
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

        {/* Contact Info */}
        <div className="border-t mt-6 pt-6 px-4" style={{ borderColor: '#665555', backgroundColor: '#4433BB' }}>
          <h4 className="font-semibold text-white mb-4">Contact Info</h4>
          <ul className="space-y-3">
            {contactInfo.map((item, index) => (
              <li key={index}>
                {item.href ? (
                  <a
                    href={item.href}
                    className="flex items-center space-x-3 text-purple-200 hover:text-white transition-colors"
                  >
                    <svg
                      className="w-4 h-4 text-purple-200 flex-shrink-0"
                      viewBox="0 0 512 512"
                      fill="currentColor"
                    >
                      <path d={item.icon} />
                    </svg>
                    <span className="text-sm">{item.text}</span>
                  </a>
                ) : (
                  <div className="flex items-center space-x-3 text-purple-200">
                    <svg
                      className="w-4 h-4 text-purple-200 flex-shrink-0"
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