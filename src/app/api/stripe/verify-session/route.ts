/**
 * Stripe Verify Session API
 * Verifies a Stripe Checkout Session and returns transaction details
 */

import { NextRequest, NextResponse } from 'next/server';
import { getCheckoutSession } from '@/lib/stripe/server';
import {
  getDonationByOrderNumber,
  getDonationByStripeSessionId,
  updateDonationStatus,
} from '@/lib/db/donation.service';
import { PaymentStatus } from '@prisma/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, orderNumber } = body;

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: 'Missing session ID' },
        { status: 400 }
      );
    }

    console.log('[Stripe Verify] Verifying session:', { sessionId, orderNumber });

    // Retrieve session from Stripe
    const session = await getCheckoutSession(sessionId);

    // Find donation - try by orderNumber first, then by sessionId
    let donation = orderNumber
      ? await getDonationByOrderNumber(orderNumber)
      : await getDonationByStripeSessionId(sessionId);

    if (!donation) {
      console.error('[Stripe Verify] Donation not found:', { sessionId, orderNumber });
      return NextResponse.json(
        { success: false, error: 'Donation not found' },
        { status: 404 }
      );
    }

    // If payment is complete and donation is still pending, update it
    // This handles cases where webhook hasn't arrived yet
    if (session.payment_status === 'paid' && donation.status === PaymentStatus.PENDING) {
      console.log('[Stripe Verify] Updating donation status to APPROVED');

      const paymentIntentId = typeof session.payment_intent === 'string'
        ? session.payment_intent
        : session.payment_intent?.id || undefined;

      const subscriptionId = typeof session.subscription === 'string'
        ? session.subscription
        : session.subscription?.id || undefined;

      const customerId = typeof session.customer === 'string'
        ? session.customer
        : session.customer?.id || undefined;

      await updateDonationStatus({
        orderNumber: donation.orderNumber,
        status: PaymentStatus.APPROVED,
        stripePaymentIntentId: paymentIntentId,
        stripeSubscriptionId: subscriptionId,
        stripeCustomerId: customerId,
        responseMessage: 'Payment verified via session check',
        rawProviderResponse: session as unknown as Record<string, unknown>,
      });

      // Refresh donation data
      donation = await getDonationByOrderNumber(donation.orderNumber);
    }

    console.log('[Stripe Verify] Session verified:', {
      sessionId,
      paymentStatus: session.payment_status,
      donationStatus: donation?.status,
    });

    return NextResponse.json({
      success: true,
      transactionId: donation?.id,
      status: session.payment_status,
      donationStatus: donation?.status,
      amountTotal: session.amount_total,
      currency: session.currency,
      customerEmail: session.customer_email,
    });
  } catch (error) {
    console.error('[Stripe Verify] Error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Verification failed';

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
