import { NextRequest, NextResponse } from 'next/server';
import {
    HUBTEL_STATUS_ENDPOINT,
    getHubtelAuthHeader,
    isHubtelConfigured,
    type HubtelStatusCheckResponse
} from '@/lib/hubtel';

/**
 * API Route: Check Hubtel Transaction Status
 * GET /api/hubtel/status?clientReference=xxx
 * 
 * Checks the status of a payment transaction
 * Required when callback is not received within 5 minutes
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

        const merchantAccountNumber = process.env.HUBTEL_MERCHANT_ACCOUNT_NUMBER;

        // Build status check URL
        const statusUrl = `${HUBTEL_STATUS_ENDPOINT}/${merchantAccountNumber}/status?clientReference=${clientReference}`;

        // Make request to Hubtel Status API
        const response = await fetch(statusUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getHubtelAuthHeader()
            }
        });

        if (!response.ok) {
            // Handle 403 Forbidden (IP not whitelisted)
            if (response.status === 403) {
                return NextResponse.json(
                    {
                        error: 'Access denied. Server IP may not be whitelisted with Hubtel.',
                        note: 'Contact your Hubtel Retail Systems Engineer to whitelist your server IP.'
                    },
                    { status: 403 }
                );
            }

            return NextResponse.json(
                { error: 'Failed to check transaction status' },
                { status: response.status }
            );
        }

        const data: HubtelStatusCheckResponse = await response.json();

        // Return formatted status response
        return NextResponse.json({
            success: true,
            status: data.data.status,
            transaction: {
                clientReference: data.data.clientReference,
                transactionId: data.data.transactionId,
                amount: data.data.amount,
                charges: data.data.charges,
                amountAfterCharges: data.data.amountAfterCharges,
                paymentMethod: data.data.paymentMethod,
                date: data.data.date,
                isPaid: data.data.status === 'Paid'
            }
        });
    } catch (error: any) {
        console.error('Hubtel status check error:', error);
        return NextResponse.json(
            { error: 'Internal server error', message: error.message },
            { status: 500 }
        );
    }
}
