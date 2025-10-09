import { NextRequest, NextResponse } from 'next/server';
import { buildPaymentRequest, generatePaymentFormHtml, getServerAzulConfig } from '@/lib/azul/server';

/**
 * API Route: Initiate AZUL Payment
 * POST /api/azul/initiate-payment
 *
 * This route handles ALL sensitive payment logic server-side:
 * - Generates order numbers
 * - Reads merchant credentials
 * - Constructs complete payment request
 * - Generates AuthHash
 * - Returns HTML form ready to submit
 *
 * Client only sends: amount, description, and optional custom fields
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { amount, description, customOrderId, customField1, customField2 } = body;

    console.log('[Initiate Payment] Request received:', {
      amount,
      description,
      customOrderId,
      hasCustomField1: !!customField1,
      hasCustomField2: !!customField2,
    });

    // Validate input
    if (!amount || typeof amount !== 'number') {
      return NextResponse.json(
        { success: false, error: 'Invalid amount' },
        { status: 400 }
      );
    }

    if (amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Amount must be greater than 0' },
        { status: 400 }
      );
    }

    if (!description || typeof description !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Description is required' },
        { status: 400 }
      );
    }

    // Build complete payment request (all sensitive logic here)
    const result = buildPaymentRequest({
      amount,
      description,
      customOrderId,
      customField1,
      customField2,
    });

    if (!result.success || !result.request) {
      console.error('[Initiate Payment] Failed to build request:', result.error);
      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Failed to build payment request',
          errors: result.errors,
        },
        { status: 500 }
      );
    }

    // Get payment URL from config
    const config = getServerAzulConfig();

    // Generate HTML form
    const formHtml = generatePaymentFormHtml(result.request, config.paymentUrl);

    console.log('[Initiate Payment] Payment request created successfully:', {
      orderNumber: result.orderNumber,
      amount: result.request.Amount,
    });

    // Return success response with HTML form
    return NextResponse.json({
      success: true,
      formHtml,
      orderNumber: result.orderNumber,
    });
  } catch (error) {
    console.error('[Initiate Payment] Unexpected error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
