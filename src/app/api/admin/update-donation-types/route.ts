import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/**
 * Temporary API route to update donation type name
 * GET /api/admin/update-donation-types
 */
export async function GET() {
  try {
    console.log('Checking donation types...');

    // Get all donation types
    const allTypes = await prisma.donationType.findMany();
    const currentTypes = allTypes.map(t => ({ id: t.id, name: t.name, amount: t.amount.toString() }));

    // Check if old name exists
    const oldType = await prisma.donationType.findFirst({
      where: { name: 'One Month of School Meals' }
    });

    let updateMessage = '';
    let updated = false;

    if (oldType) {
      console.log('Found old name "One Month of School Meals", updating to "School Meals"...');

      await prisma.donationType.update({
        where: { id: oldType.id },
        data: { name: 'School Meals' }
      });

      updateMessage = 'Successfully updated "One Month of School Meals" to "School Meals"';
      updated = true;
      console.log(updateMessage);
    } else {
      // Check if new name already exists
      const newType = await prisma.donationType.findFirst({
        where: { name: 'School Meals' }
      });

      if (newType) {
        updateMessage = '"School Meals" already exists with correct name';
      } else {
        updateMessage = '"School Meals" does not exist yet. It will be created when the app initializes donation types.';
      }
    }

    // Get final state
    const finalTypes = await prisma.donationType.findMany();
    const finalTypesList = finalTypes.map(t => ({ id: t.id, name: t.name, amount: t.amount.toString() }));

    return NextResponse.json({
      success: true,
      updated,
      message: updateMessage,
      before: currentTypes,
      after: finalTypesList,
    });

  } catch (error) {
    console.error('Error updating donation types:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
