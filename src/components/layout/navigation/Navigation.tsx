'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useTranslation } from '@/contexts/LanguageContext';

interface MenuItem {
  id: string;
  titleKey: string;
  href: string;
  children?: MenuItem[];
}

export function Navigation() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Check if it's a hash link
    if (href.includes('#')) {
      e.preventDefault();
      const hash = href.split('#')[1];
      const basePath = href.split('#')[0] || '/';

      // If we're on the same page or going to home page, scroll to section
      if (pathname === basePath || (pathname === '/' && basePath === '/') || basePath === '/') {
        // If not on home page, navigate first
        if (pathname !== '/' && basePath === '/') {
          router.push('/');
          // Wait for navigation then scroll
          setTimeout(() => {
            const element = document.getElementById(hash);
            if (element) {
              const headerOffset = 100;
              const elementPosition = element.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
              window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
          }, 100);
        } else {
          const element = document.getElementById(hash);
          if (element) {
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          }
        }
      } else {
        router.push(href);
      }
    }
  };

  const menuItems: MenuItem[] = [
    {
      id: 'home',
      titleKey: 'home',
      href: '/',
    },
    {
      id: 'about',
      titleKey: 'aboutUs',
      href: '/about',
      children: [
        { id: 'mission', titleKey: 'mission', href: '/#mission' },
        { id: 'vision', titleKey: 'vision', href: '/#vision' },
        { id: 'values', titleKey: 'values', href: '/#values' },
        { id: 'purpose', titleKey: 'purpose', href: '/#purpose' }
      ]
    },
    {
      id: 'courses',
      titleKey: 'courses',
      href: '/student-services',
    },
    {
      id: 'admissions',
      titleKey: 'admissions',
      href: '/admissions',
    },
    {
      id: 'gallery',
      titleKey: 'gallery',
      href: '/#gallery',
    },
    {
      id: 'contact',
      titleKey: 'contact',
      href: '/contact'
    }
  ];

  const handleMouseEnter = (itemId: string) => {
    setActiveDropdown(itemId);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <nav className="navbar">
      <ul className="navbar-nav flex items-center space-x-1">
        {menuItems.map((item) => (
          <li
            key={item.id}
            className="nav-item relative"
            onMouseEnter={() => item.children && handleMouseEnter(item.id)}
            onMouseLeave={handleMouseLeave}
          >
            <a
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className="nav-link flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-bold uppercase"
            >
              {t.navigation[item.titleKey as keyof typeof t.navigation]}
              {item.children && (
                <ChevronDownIcon className="w-4 h-4 ml-1" />
              )}
            </a>

            {/* Dropdown Menu */}
            {item.children && (
              <div
                className={`dropdown-menu absolute top-full left-0 min-w-[200px] bg-white shadow-lg rounded-md border border-gray-100 py-2 transition-all duration-300 ${
                  activeDropdown === item.id
                    ? 'opacity-100 visible transform translate-y-0'
                    : 'opacity-0 invisible transform -translate-y-2'
                }`}
                style={{ zIndex: 1000 }}
              >
                {item.children.map((child) => (
                  <a
                    key={child.id}
                    href={child.href}
                    onClick={(e) => scrollToSection(e, child.href)}
                    className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                  >
                    {t.navigation[child.titleKey as keyof typeof t.navigation]}
                  </a>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
