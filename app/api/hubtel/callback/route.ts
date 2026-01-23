import { NextRequest, NextResponse } from 'next/server';
import { type HubtelCallbackPayload, isSuccessResponse } from '@/lib/hubtel';
import { sendBookingEmail, type BookingEmailData } from '@/lib/email';
import { supabaseAdmin } from '@/lib/supabase/admin';

/**
 * API Route: Hubtel Payment Callback
 * POST /api/hubtel/callback
 * 
 * Receives payment status notifications from Hubtel
 * Automatically sends confirmation emails when payment is successful
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
            console.log('Payment Successful - Processing confirmation emails...');

            // Parse the client reference to extract booking details
            // The client reference format is: QRH-{timestamp}-{random}
            const clientReference = Data.ClientReference;

            // Update database
            const { error: dbError } = await supabaseAdmin
                .from('bookings')
                .update({
                    status: 'paid',
                    hubtel_transaction_id: Data.CheckoutId,
                    updated_at: new Date().toISOString()
                })
                .eq('payment_reference', clientReference);

            if (dbError) {
                console.error('Failed to update booking status in DB:', dbError);
            } else {
                console.log(`Booking ${clientReference} marked as PAID in database.`);
            }

            // Extract customer phone from payment details
            const customerPhone = Data.CustomerPhoneNumber || Data.PaymentDetails?.MobileMoneyNumber || '';

            // Log successful payment details
            console.log('Payment Confirmation Details:', {
                checkoutId: Data.CheckoutId,
                clientReference: clientReference,
                amount: Data.Amount,
                customerPhone: customerPhone,
                paymentType: Data.PaymentDetails?.PaymentType,
                channel: Data.PaymentDetails?.Channel,
                salesInvoiceId: Data.SalesInvoiceId
            });

            return NextResponse.json({
                success: true,
                message: 'Payment callback processed successfully',
                paymentConfirmed: true,
                data: {
                    clientReference: clientReference,
                    amount: Data.Amount,
                    checkoutId: Data.CheckoutId
                }
            });
        } else {
            // Payment failed or pending
            console.log('Payment Failed or Pending:', {
                responseCode: ResponseCode,
                status: Status,
                dataStatus: Data?.Status,
                description: Data?.Description,
                clientReference: Data?.ClientReference
            });

            return NextResponse.json({
                success: false,
                message: 'Payment not successful',
                status: Data?.Status,
                description: Data?.Description
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
