import { NextResponse } from 'next/server';
import { getActiveDonationTypes } from '@/lib/db/donation.service';

/**
 * GET /api/donation-types
 * Returns all active donation types
 */
export async function GET() {
  try {
    // Get active types directly (no need to ensure on every request)
    const types = await getActiveDonationTypes();

    // Convert Decimal to number for JSON serialization
    const typesWithAmount = types.map(type => ({
      ...type,
      amount: type.amount ? parseFloat(type.amount.toString()) : 0,
    }));

    return NextResponse.json({
      success: true,
      types: typesWithAmount,
    });
  } catch (error) {
    console.error('[DonationTypes] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to load donation types',
      },
      { status: 500 }
    );
  }
}
