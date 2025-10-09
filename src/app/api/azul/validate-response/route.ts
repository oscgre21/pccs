import { NextRequest, NextResponse } from 'next/server';
import { validatePaymentResponse, parseCallbackParams } from '@/lib/azul/server/validator';
import { getServerAzulConfig } from '@/lib/azul/server';

/**
 * API Route: Validate AZUL Payment Response
 * POST /api/azul/validate-response
 *
 * Validates the AuthHash and response from AZUL payment gateway
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { queryString } = body;

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

    // Validate response
    const validation = await validatePaymentResponse(paymentResponse, config.authKey);

    console.log('[Validate Response] Validation result:', {
      isValid: validation.isValid,
      isApproved: validation.isApproved,
      errors: validation.errors,
      orderNumber: paymentResponse.OrderNumber,
    });

    return NextResponse.json({
      success: true,
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
