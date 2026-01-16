import { NextRequest, NextResponse } from 'next/server';
import {
    HUBTEL_API_ENDPOINT,
    getHubtelAuthHeader,
    isHubtelConfigured,
    isSuccessResponse,
    type HubtelCheckoutRequest,
    type HubtelCheckoutResponse
} from '@/lib/hubtel';

/**
 * API Route: Initiate Hubtel Checkout
 * POST /api/hubtel/checkout
 * 
 * Creates a new checkout session and returns the payment URL
 */
export async function POST(request: NextRequest) {
    try {
        // Check if Hubtel is configured
        if (!isHubtelConfigured()) {
            return NextResponse.json(
                { error: 'Payment gateway not configured. Please contact support.' },
                { status: 500 }
            );
        }

        const body = await request.json();

        // Validate required fields
        const requiredFields = ['totalAmount', 'description', 'clientReference', 'name', 'email', 'phone'];
        for (const field of requiredFields) {
            if (!body[field]) {
                return NextResponse.json(
                    { error: `Missing required field: ${field}` },
                    { status: 400 }
                );
            }
        }

        // Get base URL for callbacks
        const protocol = request.headers.get('x-forwarded-proto') || 'http';
        const host = request.headers.get('host') || 'localhost:3000';
        const baseUrl = `${protocol}://${host}`;

        // Build Hubtel checkout request
        const checkoutRequest: HubtelCheckoutRequest = {
            totalAmount: parseFloat(body.totalAmount.toFixed(2)),
            description: body.description,
            callbackUrl: `${baseUrl}/api/hubtel/callback`,
            returnUrl: `${baseUrl}/booking/success?ref=${body.clientReference}`,
            cancellationUrl: `${baseUrl}/booking?cancelled=true`,
            merchantAccountNumber: process.env.HUBTEL_MERCHANT_ACCOUNT_NUMBER || '',
            clientReference: body.clientReference,
            payeeName: body.name,
            payeeMobileNumber: body.phone,
            payeeEmail: body.email
        };

        // Make request to Hubtel API
        const response = await fetch(HUBTEL_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getHubtelAuthHeader(),
                'Cache-Control': 'no-cache'
            },
            body: JSON.stringify(checkoutRequest)
        });

        const data: HubtelCheckoutResponse = await response.json();

        // Check if request was successful
        if (isSuccessResponse(data.responseCode)) {
            return NextResponse.json({
                success: true,
                checkoutUrl: data.data.checkoutUrl,
                checkoutDirectUrl: data.data.checkoutDirectUrl,
                checkoutId: data.data.checkoutId,
                clientReference: data.data.clientReference
            });
        } else {
            console.error('Hubtel API error:', data);
            return NextResponse.json(
                {
                    error: 'Failed to create checkout session',
                    responseCode: data.responseCode,
                    message: data.data?.message || 'Unknown error'
                },
                { status: 400 }
            );
        }
    } catch (error: any) {
        console.error('Hubtel checkout error:', error);
        return NextResponse.json(
            { error: 'Internal server error', message: error.message },
            { status: 500 }
        );
    }
}
