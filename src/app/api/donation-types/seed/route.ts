import { NextResponse } from 'next/server';
import { ensureDonationTypes } from '@/lib/db/donation.service';

/**
 * POST /api/donation-types/seed
 * Initialize default donation types (run once)
 */
export async function POST() {
  try {
    const types = await ensureDonationTypes();

    return NextResponse.json({
      success: true,
      message: 'Donation types initialized successfully',
      types: types.map(type => ({
        ...type,
        amount: type.amount ? parseFloat(type.amount.toString()) : 0,
      })),
    });
  } catch (error) {
    console.error('[SeedDonationTypes] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to seed donation types',
      },
      { status: 500 }
    );
  }
}
