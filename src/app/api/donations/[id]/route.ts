import { NextRequest, NextResponse } from 'next/server';
import { getDonationById } from '@/lib/db/donation.service';

/**
 * GET /api/donations/[id]
 * Returns donation details by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Donation ID is required' },
        { status: 400 }
      );
    }

    const donation = await getDonationById(id);

    if (!donation) {
      return NextResponse.json(
        { success: false, error: 'Donation not found' },
        { status: 404 }
      );
    }

    // Convert Decimal to number for JSON serialization
    const donationWithAmount = {
      ...donation,
      amount: donation.amount ? parseFloat(donation.amount.toString()) : 0,
      donationType: donation.donationType ? {
        ...donation.donationType,
        amount: donation.donationType.amount
          ? parseFloat(donation.donationType.amount.toString())
          : 0,
      } : null,
    };

    return NextResponse.json({
      success: true,
      donation: donationWithAmount,
    });
  } catch (error) {
    console.error('[GetDonation] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get donation',
      },
      { status: 500 }
    );
  }
}
