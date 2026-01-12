/**
 * Stripe Create Checkout Session API
 * Creates a Stripe Checkout Session for donations
 */

import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe/server';
import { createDonation } from '@/lib/db/donation.service';
import { PaymentProvider, DonationFrequency } from '@prisma/client';
import { DonationFrequency as FrequencyType } from '@/lib/stripe/types';

// Map frequency string to Prisma enum
const frequencyMap: Record<FrequencyType, DonationFrequency> = {
  'one-time': DonationFrequency.ONE_TIME,
  'weekly': DonationFrequency.WEEKLY,
  'every-two-weeks': DonationFrequency.EVERY_TWO_WEEKS,
  'monthly': DonationFrequency.MONTHLY,
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      amount,
      description,
      donorName,
      donorEmail,
      donorPhone,
      comment,
      donationTypeId,
      frequency = 'one-time',
    } = body;

    // Validation
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid amount. Must be a positive number.' },
        { status: 400 }
      );
    }

    if (amount < 10) {
      return NextResponse.json(
        { success: false, error: 'Minimum donation amount is $10.' },
        { status: 400 }
      );
    }

    if (!donorName || typeof donorName !== 'string' || donorName.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Donor name is required.' },
        { status: 400 }
      );
    }

    if (!donorEmail || typeof donorEmail !== 'string' || !donorEmail.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Valid email is required.' },
        { status: 400 }
      );
    }

    if (!donationTypeId || typeof donationTypeId !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Donation type is required.' },
        { status: 400 }
      );
    }

    const validFrequencies: FrequencyType[] = ['one-time', 'weekly', 'monthly', 'every-two-weeks'];
    if (!validFrequencies.includes(frequency)) {
      return NextResponse.json(
        { success: false, error: 'Invalid frequency.' },
        { status: 400 }
      );
    }

    console.log('[Stripe Create Checkout] Request received:', {
      amount,
      donorEmail,
      frequency,
      donationTypeId,
    });

    // Create Stripe Checkout Session
    const session = await createCheckoutSession({
      amount,
      currency: 'usd',
      description: description || `Donation to PCCS - ${frequency}`,
      donorEmail: donorEmail.trim(),
      donorName: donorName.trim(),
      donorPhone: donorPhone?.trim(),
      donationTypeId,
      frequency,
      comment: comment?.trim(),
    });

    // Save donation to database with PENDING status
    await createDonation({
      donorName: donorName.trim(),
      donorEmail: donorEmail.trim(),
      donorPhone: donorPhone?.trim(),
      comment: comment?.trim(),
      amount,
      orderNumber: session.orderNumber,
      donationTypeId,
      paymentProvider: PaymentProvider.STRIPE,
      frequency: frequencyMap[frequency as FrequencyType],
      stripeSessionId: session.sessionId,
    });

    console.log('[Stripe Create Checkout] Session created:', {
      sessionId: session.sessionId,
      orderNumber: session.orderNumber,
    });

    return NextResponse.json({
      success: true,
      sessionId: session.sessionId,
      url: session.url,
      orderNumber: session.orderNumber,
    });
  } catch (error) {
    console.error('[Stripe Create Checkout] Error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Internal server error';

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
