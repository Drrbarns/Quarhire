import { NextRequest, NextResponse } from 'next/server';
import { type HubtelCallbackPayload, isSuccessResponse } from '@/lib/hubtel';

/**
 * API Route: Hubtel Payment Callback
 * POST /api/hubtel/callback
 * 
 * Receives payment status notifications from Hubtel
 * Note: Email confirmation is handled by the success page using localStorage data
 */
export async function POST(request: NextRequest) {
    try {
        const payload: HubtelCallbackPayload = await request.json();

        console.log('=== HUBTEL PAYMENT CALLBACK ===');
        console.log('Timestamp:', new Date().toISOString());
        console.log('Payload:', JSON.stringify(payload, null, 2));

        // Extract payment details
        const {
            ResponseCode,
            Status,
            Data
        } = payload;

        // Check if payment was successful
        if (isSuccessResponse(ResponseCode) && Status === 'Success' && Data.Status === 'Success') {
            // Payment successful
            console.log('✅ PAYMENT SUCCESSFUL');
            console.log('Checkout ID:', Data.CheckoutId);
            console.log('Client Reference:', Data.ClientReference);
            console.log('Amount:', Data.Amount);
            console.log('Customer Phone:', Data.CustomerPhoneNumber);
            console.log('Payment Type:', Data.PaymentDetails?.PaymentType);
            console.log('Channel:', Data.PaymentDetails?.Channel);

            // Note: Email confirmation is sent from the success page
            // which has access to full booking data stored in localStorage

            return NextResponse.json({
                success: true,
                message: 'Payment callback received successfully',
                reference: Data.ClientReference
            });
        } else {
            // Payment failed or pending
            console.log('❌ PAYMENT NOT SUCCESSFUL');
            console.log('Response Code:', ResponseCode);
            console.log('Status:', Status);
            console.log('Data Status:', Data?.Status);
            console.log('Description:', Data?.Description);

            return NextResponse.json({
                success: false,
                message: 'Payment not successful',
                status: Data?.Status
            });
        }
    } catch (error: any) {
        console.error('❌ HUBTEL CALLBACK ERROR:', error);
        return NextResponse.json(
            { error: 'Failed to process callback', message: error.message },
            { status: 500 }
        );
    }
}

// Handle GET requests (for testing/verification)
export async function GET() {
    return NextResponse.json({
        message: 'Hubtel callback endpoint is active',
        timestamp: new Date().toISOString(),
        note: 'POST payment notifications to this endpoint'
    });
}
