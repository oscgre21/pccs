'use client';

import React from 'react';
import { useTranslation } from '@/contexts/LanguageContext';

interface StaffMember {
  id: string;
  name: string;
  positionKey: string;
  image: string;
}

const staffMembers: StaffMember[] = [
  {
    id: 'staff-1',
    name: 'Luis Soto',
    positionKey: 'nationalDirector',
    image: '/images/staff/luis-soto.jpg',
  },
  {
    id: 'staff-2',
    name: 'Karine Alpha Liz',
    positionKey: 'academicDirector',
    image: '/images/staff/karine-alpha.jpg',
  },
  {
    id: 'staff-3',
    name: 'María Brito',
    positionKey: 'registrationCoordinator',
    image: '/images/staff/maria-brito.jpg',
  },
  {
    id: 'staff-4',
    name: 'Laura Alfau',
    positionKey: 'adminCoordinator',
    image: '/images/staff/laura-alfau.jpg',
  },
  {
    id: 'staff-5',
    name: 'Jeanine Autrey',
    positionKey: 'englishCoordinator',
    image: '/images/staff/jeanine-autrey.jpg',
  },
];

interface StaffSectionProps {
  className?: string;
}

export function StaffSection({ className = '' }: StaffSectionProps) {
  const { t } = useTranslation();

  return (
    <section className={`staff-section py-16 lg:py-24 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6">
            {t.staff.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.staff.subtitle}
          </p>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {staffMembers.map((member) => (
            <div key={member.id} className="staff-card group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                {/* Image Container */}
                <div className="staff-card-img relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-6 text-center">
                  <h3 className="staff-name text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="staff-position text-gray-600">
                    {t.staff.positions?.[member.positionKey as keyof typeof t.staff.positions] || member.positionKey}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}