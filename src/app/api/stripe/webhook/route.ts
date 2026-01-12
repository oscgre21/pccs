/**
 * Stripe Webhook API
 * Handles webhook events from Stripe
 */

import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import {
  constructWebhookEvent,
  extractCheckoutSessionData,
} from '@/lib/stripe/server';
import {
  getDonationByOrderNumber,
  getDonationByStripeSessionId,
  updateDonationStatus,
} from '@/lib/db/donation.service';
import { PaymentStatus } from '@prisma/client';

// Disable body parsing for webhook signature verification
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
      console.error('[Stripe Webhook] Missing stripe-signature header');
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = await constructWebhookEvent(body, signature);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('[Stripe Webhook] Signature verification failed:', errorMessage);
      return NextResponse.json(
        { error: `Webhook signature verification failed: ${errorMessage}` },
        { status: 400 }
      );
    }

    console.log('[Stripe Webhook] Event received:', event.type);

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionExpired(session);
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentIntentSucceeded(paymentIntent);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentIntentFailed(paymentIntent);
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentSucceeded(invoice);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      default:
        console.log('[Stripe Webhook] Unhandled event type:', event.type);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[Stripe Webhook] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

/**
 * Handle checkout.session.completed event
 */
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  console.log('[Stripe Webhook] Checkout session completed:', session.id);

  const sessionData = extractCheckoutSessionData(session);
  const orderNumber = session.metadata?.orderNumber;

  if (!orderNumber) {
    console.error('[Stripe Webhook] No orderNumber in session metadata');
    return;
  }

  // Check if donation exists and is still pending
  const donation = await getDonationByOrderNumber(orderNumber);

  if (!donation) {
    console.error('[Stripe Webhook] Donation not found:', orderNumber);
    return;
  }

  // Protect against replay attacks - don't modify if already in final status
  const finalStatuses: PaymentStatus[] = [PaymentStatus.APPROVED, PaymentStatus.DECLINED, PaymentStatus.CANCELLED];
  if (finalStatuses.includes(donation.status as PaymentStatus)) {
    console.warn('[Stripe Webhook] [SECURITY] Attempt to modify donation with final status:', {
      orderNumber,
      currentStatus: donation.status,
    });
    return;
  }

  // Update donation status
  if (session.payment_status === 'paid') {
    await updateDonationStatus({
      orderNumber,
      status: PaymentStatus.APPROVED,
      stripePaymentIntentId: sessionData.paymentIntentId || undefined,
      stripeSubscriptionId: sessionData.subscriptionId || undefined,
      stripeCustomerId: sessionData.customerId || undefined,
      responseMessage: 'Payment completed via Stripe Checkout',
      rawProviderResponse: session as object,
    });

    console.log('[Stripe Webhook] Donation approved:', orderNumber);
  }
}

/**
 * Handle checkout.session.expired event
 */
async function handleCheckoutSessionExpired(session: Stripe.Checkout.Session) {
  console.log('[Stripe Webhook] Checkout session expired:', session.id);

  const orderNumber = session.metadata?.orderNumber;

  if (!orderNumber) {
    return;
  }

  const donation = await getDonationByOrderNumber(orderNumber);

  if (!donation || donation.status !== PaymentStatus.PENDING) {
    return;
  }

  await updateDonationStatus({
    orderNumber,
    status: PaymentStatus.CANCELLED,
    responseMessage: 'Checkout session expired',
    rawProviderResponse: session as unknown as Record<string, unknown>,
  });

  console.log('[Stripe Webhook] Donation cancelled (expired):', orderNumber);
}

/**
 * Handle payment_intent.succeeded event (backup confirmation)
 */
async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  console.log('[Stripe Webhook] Payment intent succeeded:', paymentIntent.id);

  const orderNumber = paymentIntent.metadata?.orderNumber;

  if (!orderNumber) {
    return;
  }

  const donation = await getDonationByOrderNumber(orderNumber);

  if (!donation) {
    return;
  }

  // Only update if still pending (checkout.session.completed usually handles this first)
  if (donation.status === PaymentStatus.PENDING) {
    await updateDonationStatus({
      orderNumber,
      status: PaymentStatus.APPROVED,
      stripePaymentIntentId: paymentIntent.id,
      responseMessage: 'Payment confirmed via PaymentIntent',
      rawProviderResponse: paymentIntent as unknown as Record<string, unknown>,
    });

    console.log('[Stripe Webhook] Donation approved via PaymentIntent:', orderNumber);
  }
}

/**
 * Handle payment_intent.payment_failed event
 */
async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.log('[Stripe Webhook] Payment intent failed:', paymentIntent.id);

  const orderNumber = paymentIntent.metadata?.orderNumber;

  if (!orderNumber) {
    return;
  }

  const donation = await getDonationByOrderNumber(orderNumber);

  if (!donation || donation.status !== PaymentStatus.PENDING) {
    return;
  }

  const lastError = paymentIntent.last_payment_error;

  await updateDonationStatus({
    orderNumber,
    status: PaymentStatus.FAILED,
    stripePaymentIntentId: paymentIntent.id,
    errorDescription: lastError?.message || 'Payment failed',
    responseCode: lastError?.code || undefined,
    rawProviderResponse: paymentIntent as unknown as Record<string, unknown>,
  });

  console.log('[Stripe Webhook] Donation failed:', orderNumber);
}

/**
 * Handle invoice.payment_succeeded event (for recurring payments)
 */
async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log('[Stripe Webhook] Invoice payment succeeded:', invoice.id);

  // This is for recurring subscription payments
  // The first payment is handled by checkout.session.completed
  // Subsequent payments come here

  // Get subscription ID from the invoice
  const subscriptionId = invoice.parent?.subscription_details?.subscription;

  if (!subscriptionId) {
    return;
  }

  // Log for now - can be extended to create new donation records for each recurring payment
  console.log('[Stripe Webhook] Recurring payment for subscription:', subscriptionId);
}

/**
 * Handle customer.subscription.deleted event
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log('[Stripe Webhook] Subscription deleted:', subscription.id);

  // Find donation by subscription ID and update
  const orderNumber = subscription.metadata?.orderNumber;

  if (orderNumber) {
    const donation = await getDonationByOrderNumber(orderNumber);

    if (donation && donation.stripeSubscriptionId === subscription.id) {
      console.log('[Stripe Webhook] Subscription cancelled for donation:', orderNumber);
      // Note: We don't change the status as the original donation was already approved
      // Just log for tracking purposes
    }
  }
}
