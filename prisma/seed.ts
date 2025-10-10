import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding donation types...');

  const donationTypes = [
    {
      name: 'School Supplies',
      description: 'Útiles Escolares',
      amount: 25.00,
    },
    {
      name: 'Sponsor a Child',
      description: 'Apadrinar un Niño',
      amount: 100.00,
    },
    {
      name: 'General Donation',
      description: 'Donación General',
      amount: 50.00,
    },
    {
      name: 'Infrastructure',
      description: 'Infraestructura',
      amount: 250.00,
    },
    {
      name: 'Scholarships',
      description: 'Becas',
      amount: 100.00,
    },
  ];

  for (const type of donationTypes) {
    await prisma.donationType.upsert({
      where: { name: type.name },
      update: { amount: type.amount, description: type.description },
      create: type,
    });
    console.log(`✓ Created/Updated: ${type.name} - $${type.amount}`);
  }

  console.log('Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
