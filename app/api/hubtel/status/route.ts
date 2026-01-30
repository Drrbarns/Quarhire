import { NextRequest, NextResponse } from 'next/server';
import {
    isHubtelConfigured,
    hubtelGetTransactionStatus
} from '@/lib/hubtel';

/**
 * API Route: Check Hubtel Transaction Status
 * GET /api/hubtel/status?clientReference=xxx
 * 
 * Checks the status of a payment transaction
 * Used by the success page to verify payment
 */
export async function GET(request: NextRequest) {
    try {
        // Check if Hubtel is configured
        if (!isHubtelConfigured()) {
            return NextResponse.json(
                { error: 'Payment gateway not configured' },
                { status: 500 }
            );
        }

        const { searchParams } = new URL(request.url);
        const clientReference = searchParams.get('clientReference');

        if (!clientReference) {
            return NextResponse.json(
                { error: 'clientReference is required' },
                { status: 400 }
            );
        }

        // Use the centralized verification function
        const result = await hubtelGetTransactionStatus(clientReference);

        if (!result.success) {
            // Handle 403 specifically for user-friendly message
            if (result.errorReason?.includes('403') || result.errorReason?.includes('IP not whitelisted')) {
                return NextResponse.json(
                    {
                        success: false,
                        error: 'Access denied. Server IP may not be whitelisted with Hubtel.',
                        note: 'Contact your Hubtel Retail Systems Engineer to whitelist your server IP.'
                    },
                    { status: 403 }
                );
            }

            return NextResponse.json(
                {
                    success: false,
                    error: result.errorReason || 'Failed to check transaction status'
                },
                { status: 500 }
            );
        }

        // Return formatted status response
        return NextResponse.json({
            success: true,
            status: result.status,
            transaction: {
                clientReference: result.rawResponse?.clientReference,
                transactionId: result.transactionId,
                amount: result.amount,
                date: result.rawResponse?.date,
                isPaid: result.status === 'Paid'
            }
        });

    } catch (error: any) {
        console.error('[Hubtel Status] Error:', error.message);
        return NextResponse.json(
            { error: 'Internal server error', message: error.message },
            { status: 500 }
        );
    }
}
