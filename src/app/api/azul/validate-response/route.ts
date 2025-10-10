import { NextRequest, NextResponse } from 'next/server';
import { validatePaymentResponse, parseCallbackParams } from '@/lib/azul/server/validator';
import { getServerAzulConfig } from '@/lib/azul/server';
import { updateDonationStatus, getDonationByOrderNumber } from '@/lib/db/donation.service';
import { PaymentStatus } from '@prisma/client';

/**
 * API Route: Validate AZUL Payment Response and Update Database
 * POST /api/azul/validate-response
 *
 * Validates the AuthHash and response from AZUL payment gateway
 * Updates donation record in database with final status
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { queryString, callbackType } = body;

    if (!queryString) {
      return NextResponse.json(
        { success: false, error: 'Query string is required' },
        { status: 400 }
      );
    }

    console.log('[Validate Response] Validating payment response');

    // Parse query string
    const searchParams = new URLSearchParams(queryString);
    const paymentResponse = parseCallbackParams(searchParams);

    // Get server config
    const config = getServerAzulConfig();

    if (!config.authKey) {
      console.error('[Validate Response] Missing auth key');
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Check if donation exists and has a final status (APPROVED, DECLINED, CANCELLED)
    const existingDonation = await getDonationByOrderNumber(paymentResponse.OrderNumber);
    const finalStatuses = [PaymentStatus.APPROVED, PaymentStatus.DECLINED, PaymentStatus.CANCELLED];

    if (existingDonation && finalStatuses.includes(existingDonation.status)) {
      // Security logging - record attempt to modify final status
      console.warn('[SECURITY] Attempt to modify donation with final status:', {
        orderNumber: paymentResponse.OrderNumber,
        transactionId: existingDonation.id,
        currentStatus: existingDonation.status,
        currentApprovedAt: existingDonation.approvedAt,
        currentDeclinedAt: existingDonation.declinedAt,
        currentCancelledAt: existingDonation.cancelledAt,
        attemptedCallbackType: callbackType,
        attemptedResponseCode: paymentResponse.ResponseCode,
        attemptedAuthCode: paymentResponse.AuthorizationCode,
        timestamp: new Date().toISOString(),
        clientIP: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      });

      // Return existing transaction without modification
      const isApproved = existingDonation.status === PaymentStatus.APPROVED;
      return NextResponse.json({
        success: true,
        transactionId: existingDonation.id,
        validation: {
          isValid: true,
          isApproved: isApproved,
          responseCode: existingDonation.responseCode || '00',
          errors: isApproved ? [] : ['Donation has final status and cannot be modified'],
        },
        response: paymentResponse,
        message: `Donation already has final status (${existingDonation.status}) and cannot be modified`,
        protected: true, // Flag indicating this was a protected transaction
      });
    }

    // Validate response
    const validation = await validatePaymentResponse(paymentResponse, config.authKey);

    console.log('[Validate Response] Validation result:', {
      isValid: validation.isValid,
      isApproved: validation.isApproved,
      errors: validation.errors,
      orderNumber: paymentResponse.OrderNumber,
    });

    // Determine status based on callback type and validation
    let donationStatus: PaymentStatus;
    if (callbackType === 'cancelled') {
      donationStatus = PaymentStatus.CANCELLED;
    } else if (validation.isApproved && validation.isValid) {
      donationStatus = PaymentStatus.APPROVED;
    } else if (!validation.isApproved) {
      donationStatus = PaymentStatus.DECLINED;
    } else {
      donationStatus = PaymentStatus.FAILED;
    }

    // Update donation in database
    let transactionId: string | null = null;
    try {
      const updatedDonation = await updateDonationStatus({
        orderNumber: paymentResponse.OrderNumber,
        status: donationStatus,
        authorizationCode: paymentResponse.AuthorizationCode,
        azulOrderId: paymentResponse.AzulOrderId,
        rrn: paymentResponse.RRN,
        isoCode: paymentResponse.IsoCode,
        responseCode: paymentResponse.ResponseCode,
        responseMessage: paymentResponse.ResponseMessage,
        errorDescription: paymentResponse.ErrorDescription,
        validationErrors: validation.errors,
        rawAzulResponse: Object.fromEntries(searchParams),
      });

      transactionId = updatedDonation.id;

      console.log('[Validate Response] Donation status updated:', {
        orderNumber: paymentResponse.OrderNumber,
        status: donationStatus,
        transactionId,
      });
    } catch (dbError) {
      console.error('[Validate Response] Failed to update donation:', dbError);
      // Continue anyway - don't fail the response validation
    }

    return NextResponse.json({
      success: true,
      transactionId,
      validation: {
        isValid: validation.isValid,
        isApproved: validation.isApproved,
        responseCode: validation.responseCode,
        errors: validation.errors,
      },
      response: paymentResponse,
    });
  } catch (error) {
    console.error('[Validate Response] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Validation failed',
      },
      { status: 500 }
    );
  }
}
