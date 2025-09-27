import { contactInfo } from '@/app/constant';
import React from 'react';

 

export function ContactInfo() {
  return (
    <div className="contact-info">
      <ul className="flex items-center space-x-6 text-sm text-white">
        {contactInfo.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            {item.href ? (
              <a
                href={item.href}
                className="flex items-center space-x-2 hover:text-white transition-colors"
              >
                <svg
                  className="w-4 h-4 text-white"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                >
                  <path d={item.icon} />
                </svg>
                <span>{item.text}</span>
              </a>
            ) : (
              <>
                <svg
                  className="w-4 h-4 text-white"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                >
                  <path d={item.icon} />
                </svg>
                <span>{item.text}</span>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}