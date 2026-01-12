import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateDonationTypes() {
  try {
    console.log('Checking donation types...');

    // Get all donation types
    const allTypes = await prisma.donationType.findMany();
    console.log('\nCurrent donation types:');
    allTypes.forEach(type => {
      console.log(`  - ${type.name} ($${type.amount})`);
    });

    // Check if old name exists
    const oldType = await prisma.donationType.findFirst({
      where: { name: 'One Month of School Meals' }
    });

    if (oldType) {
      console.log('\n✓ Found old name "One Month of School Meals", updating to "School Meals"...');

      await prisma.donationType.update({
        where: { id: oldType.id },
        data: { name: 'School Meals' }
      });

      console.log('✓ Successfully updated to "School Meals"');
    } else {
      console.log('\n✓ "One Month of School Meals" not found in database');

      // Check if new name already exists
      const newType = await prisma.donationType.findFirst({
        where: { name: 'School Meals' }
      });

      if (newType) {
        console.log('✓ "School Meals" already exists with amount $' + newType.amount);
      } else {
        console.log('! "School Meals" does not exist yet. Run the app to initialize types.');
      }
    }

    // Show final state
    const finalTypes = await prisma.donationType.findMany();
    console.log('\nFinal donation types:');
    finalTypes.forEach(type => {
      console.log(`  - ${type.name} ($${type.amount})`);
    });

  } catch (error) {
    console.error('Error updating donation types:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateDonationTypes();
