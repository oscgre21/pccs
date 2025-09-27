'use client';

import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface MenuItem {
  id: string;
  title: string;
  href: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: 'inicio',
    title: 'INICIO',
    href: '/',
    /*
    children: [
      { id: 'home-1', title: 'Home 01', href: '/' },
      { id: 'home-2', title: 'Home 02', href: '/home-2' },
      { id: 'home-3', title: 'Home 03', href: '/home-3' },
      { id: 'home-4', title: 'Home 04', href: '/home-4' },
      { id: 'home-5', title: 'Home 05', href: '/home-5' }
    ]*/
  },
  {
    id: 'nosotros',
    title: 'NOSOTROS',
    href: '/nosotros',
    children: [
      { id: 'mision', title: 'Misión', href: '/#mision' },
      { id: 'vision', title: 'Visión', href: '/#vision' },
      { id: 'valores', title: 'Valores', href: '/#valores' },
      { id: 'proposito', title: 'Propósito', href: '/#proposito' }
    ]
  },
  {
    id: 'admisiones',
    title: 'ADMISIONES',
    href: '/admisiones', 
  },
  {
    id: 'galeria',
    title: 'GALERÍA',
    href: '/galeria',
  },
  {
    id: 'contacto',
    title: 'CONTACTANOS',
    href: '/contact'
  }
];

export function Navigation() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

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
              className="nav-link flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-bold uppercase"
            >
              {item.title}
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
                    className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                  >
                    {child.title}
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