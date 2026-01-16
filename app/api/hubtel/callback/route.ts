import { NextRequest, NextResponse } from 'next/server';
import { type HubtelCallbackPayload, isSuccessResponse } from '@/lib/hubtel';

/**
 * API Route: Hubtel Payment Callback
 * POST /api/hubtel/callback
 * 
 * Receives payment status notifications from Hubtel
 */
export async function POST(request: NextRequest) {
    try {
        const payload: HubtelCallbackPayload = await request.json();

        console.log('Hubtel Callback Received:', JSON.stringify(payload, null, 2));

        // Extract payment details
        const {
            ResponseCode,
            Status,
            Data
        } = payload;

        // Check if payment was successful
        if (isSuccessResponse(ResponseCode) && Status === 'Success' && Data.Status === 'Success') {
            // Payment successful - you would typically:
            // 1. Update booking status in database
            // 2. Send confirmation email to customer
            // 3. Notify admin of new paid booking

            console.log('Payment Successful:', {
                checkoutId: Data.CheckoutId,
                clientReference: Data.ClientReference,
                amount: Data.Amount,
                customerPhone: Data.CustomerPhoneNumber,
                paymentType: Data.PaymentDetails?.PaymentType,
                channel: Data.PaymentDetails?.Channel
            });

            // TODO: Implement your business logic here
            // Example: Update booking in database
            // await updateBookingStatus(Data.ClientReference, 'paid', {
            //   hubtelCheckoutId: Data.CheckoutId,
            //   salesInvoiceId: Data.SalesInvoiceId,
            //   amount: Data.Amount,
            //   paymentMethod: Data.PaymentDetails?.PaymentType,
            //   paidAt: new Date()
            // });

            return NextResponse.json({
                success: true,
                message: 'Callback processed successfully'
            });
        } else {
            // Payment failed
            console.log('Payment Failed or Pending:', {
                responseCode: ResponseCode,
                status: Status,
                dataStatus: Data?.Status,
                description: Data?.Description,
                clientReference: Data?.ClientReference
            });

            // TODO: Handle failed payment
            // await updateBookingStatus(Data.ClientReference, 'payment_failed');

            return NextResponse.json({
                success: false,
                message: 'Payment not successful',
                status: Data?.Status
            });
        }
    } catch (error: any) {
        console.error('Hubtel callback error:', error);
        return NextResponse.json(
            { error: 'Failed to process callback', message: error.message },
            { status: 500 }
        );
    }
}

// Also handle GET requests (for testing/verification)
export async function GET() {
    return NextResponse.json({
        message: 'Hubtel callback endpoint is active',
        timestamp: new Date().toISOString()
    });
}
