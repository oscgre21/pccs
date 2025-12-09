import { NextRequest, NextResponse } from 'next/server';
import { buildPaymentRequest, generatePaymentFormHtml, getServerAzulConfig } from '@/lib/azul/server';

/**
 * API Route: Initiate AZUL Payment for Student Services
 * POST /api/azul/student-payment
 *
 * This route handles student service payments (inscription, tuition, etc.)
 * - Does NOT require donationTypeId (not a donation)
 * - Generates order numbers
 * - Reads merchant credentials
 * - Constructs complete payment request
 * - Generates AuthHash
 * - Returns HTML form ready to submit
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      amount,
      description,
      studentName,
      parentName,
      email,
      phone,
      grade,
      comment,
      serviceId,
      customOrderId,
    } = body;

    console.log('[Student Payment] Request received:', {
      amount,
      description,
      studentName,
      parentName,
      email,
      serviceId,
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

    if (!studentName || !parentName || !email) {
      return NextResponse.json(
        { success: false, error: 'Student name, parent name, and email are required' },
        { status: 400 }
      );
    }

    // Build custom fields for student payment
    const customField1 = {
      label: 'Student',
      value: `${studentName}${grade ? ` (${grade})` : ''}`,
    };

    const customField2 = {
      label: 'Parent/Guardian',
      value: parentName,
    };

    // Build complete payment request (all sensitive logic here)
    const result = buildPaymentRequest({
      amount,
      description,
      customOrderId: customOrderId || `STUDENT-${serviceId}-${Date.now()}`,
      customField1,
      customField2,
    });

    if (!result.success || !result.request) {
      console.error('[Student Payment] Failed to build request:', result.error);
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

    console.log('[Student Payment] Payment request created successfully:', {
      orderNumber: result.orderNumber,
      amount: result.request.Amount,
      studentName,
      email,
    });

    // Return success response with HTML form
    return NextResponse.json({
      success: true,
      formHtml,
      orderNumber: result.orderNumber,
    });
  } catch (error) {
    console.error('[Student Payment] Unexpected error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
