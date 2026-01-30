import { NextRequest, NextResponse } from 'next/server';
import {
    type HubtelCallbackPayload,
    isSuccessResponse,
    hubtelGetTransactionStatus
} from '@/lib/hubtel';
import { sendBookingEmail, type BookingEmailData } from '@/lib/email';
import { supabaseAdmin } from '@/lib/supabase/admin';

/**
 * API Route: Hubtel Payment Callback
 * POST /api/hubtel/callback
 * 
 * Receives payment status notifications from Hubtel
 * IMPORTANT: Always verifies with Hubtel API before trusting callback data
 */
export async function POST(request: NextRequest) {
    let clientReference: string | null = null;
    let callbackPayload: any = null;

    try {
        // Parse callback payload safely
        try {
            callbackPayload = await request.json();
        } catch {
            // Try to get clientReference from query params as fallback
            const { searchParams } = new URL(request.url);
            clientReference = searchParams.get('clientReference');

            if (!clientReference) {
                console.error('[Hubtel Callback] Failed to parse JSON body and no clientReference in query');
                return NextResponse.json({ received: true, error: 'Invalid payload' });
            }
        }

        const payload = callbackPayload as HubtelCallbackPayload;

        // Log callback (we'll update with verification status later)
        console.log('[Hubtel Callback] Received callback');

        // Extract clientReference robustly (check multiple possible locations)
        clientReference =
            payload?.Data?.ClientReference ||
            (payload?.Data as any)?.clientReference ||
            (payload as any)?.clientReference ||
            (payload as any)?.ClientReference ||
            new URL(request.url).searchParams.get('clientReference');

        if (!clientReference) {
            console.error('[Hubtel Callback] No clientReference found in payload');
            // Still log the raw callback for debugging
            await logCallback(null, payload, 'no_reference', null);
            return NextResponse.json({ received: true, message: 'No clientReference' });
        }

        // =====================================================================
        // CRITICAL: Verify payment with Hubtel API before trusting callback
        // =====================================================================
        console.log('[Hubtel Callback] Verifying payment with Hubtel API for:', clientReference);
        const verification = await hubtelGetTransactionStatus(clientReference);

        // Log the callback with verification result
        await logCallback(clientReference, payload, verification.status, verification.rawResponse);

        // Check if payment is verified as PAID
        if (verification.verified && verification.status === 'Paid') {
            console.log('[Hubtel Callback] Payment VERIFIED as Paid');

            // Idempotent DB update - only update if not already paid
            const { data: existingBooking } = await supabaseAdmin
                .from('bookings')
                .select('id, status, customer_email')
                .eq('payment_reference', clientReference)
                .single();

            if (!existingBooking) {
                console.error('[Hubtel Callback] Booking not found for reference:', clientReference);
                return NextResponse.json({ received: true, message: 'Booking not found' });
            }

            // Idempotent: Don't downgrade a paid booking
            if (existingBooking.status === 'paid') {
                console.log('[Hubtel Callback] Booking already paid, skipping update');
                return NextResponse.json({
                    received: true,
                    message: 'Already processed',
                    status: 'paid'
                });
            }

            // Update booking to paid with verification timestamp
            const { data: updatedBooking, error: dbError } = await supabaseAdmin
                .from('bookings')
                .update({
                    status: 'paid',
                    hubtel_transaction_id: verification.transactionId || payload?.Data?.CheckoutId,
                    payment_verified_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                })
                .eq('payment_reference', clientReference)
                .eq('status', 'pending') // Extra safety: only update pending bookings
                .select()
                .single();

            if (dbError) {
                console.error('[Hubtel Callback] Failed to update booking:', dbError);
            } else if (updatedBooking) {
                console.log('[Hubtel Callback] Booking marked as PAID:', clientReference);

                // Send confirmation email
                try {
                    const emailData: BookingEmailData = {
                        name: updatedBooking.customer_name,
                        email: updatedBooking.customer_email,
                        phone: updatedBooking.customer_phone,
                        pickupLocation: updatedBooking.custom_pickup_location || updatedBooking.pickup_location,
                        destination: updatedBooking.custom_destination || updatedBooking.destination,
                        vehicleType: updatedBooking.vehicle_type,
                        date: updatedBooking.pickup_date,
                        time: updatedBooking.pickup_time,
                        passengers: updatedBooking.passengers,
                        luggage: updatedBooking.luggage,
                        specialRequests: updatedBooking.special_requests,
                        estimatedPrice: `GHS ${updatedBooking.price}`,
                        bookingReference: clientReference,
                        paymentStatus: 'paid',
                        paymentReference: clientReference
                    };

                    await sendBookingEmail(emailData);
                    console.log('[Hubtel Callback] Confirmation email sent');
                } catch (emailError) {
                    console.error('[Hubtel Callback] Failed to send email:', emailError);
                    // Don't fail - payment was still successful
                }
            }

            return NextResponse.json({
                received: true,
                verified: true,
                status: 'paid',
                message: 'Payment verified and processed'
            });

        } else if (!verification.verified || verification.status === 'Error') {
            // Verification failed - log but don't update booking
            console.warn('[Hubtel Callback] Verification FAILED:', verification.errorReason);

            // Update callback log with unverified status
            await supabaseAdmin
                .from('hubtel_callbacks')
                .update({
                    verification_status: 'unverified',
                    verification_error: verification.errorReason
                })
                .eq('client_reference', clientReference)
                .order('created_at', { ascending: false })
                .limit(1);

            return NextResponse.json({
                received: true,
                verified: false,
                status: 'unverified',
                message: 'Could not verify payment with Hubtel',
                reason: verification.errorReason
            });
        } else {
            // Payment not paid (Unpaid/Refunded)
            console.log('[Hubtel Callback] Payment status:', verification.status);
            return NextResponse.json({
                received: true,
                verified: true,
                status: verification.status,
                message: `Payment ${verification.status}`
            });
        }

    } catch (error: any) {
        console.error('[Hubtel Callback] Error:', error.message);

        // Log error callback
        if (clientReference) {
            await logCallback(clientReference, callbackPayload, 'error', { error: error.message });
        }

        // Always return 200 to Hubtel (they expect acknowledgment)
        return NextResponse.json({
            received: true,
            error: 'Processing error',
            message: 'Will retry verification'
        });
    }
}

/**
 * Log callback to database for debugging and audit
 */
async function logCallback(
    clientReference: string | null,
    payload: any,
    status: string,
    verificationResponse: any
) {
    try {
        await supabaseAdmin
            .from('hubtel_callbacks')
            .insert({
                client_reference: clientReference,
                checkout_id: payload?.Data?.CheckoutId || payload?.data?.checkoutId,
                status: status,
                amount: payload?.Data?.Amount || payload?.data?.amount,
                payload: payload,
                verification_response: verificationResponse,
                verification_status: status === 'Paid' ? 'verified' : 'pending'
            });
    } catch (logError) {
        console.error('[Hubtel Callback] Failed to log callback:', logError);
    }
}

// Handle GET requests (for testing/verification)
export async function GET() {
    return NextResponse.json({
        message: 'Hubtel callback endpoint is active',
        timestamp: new Date().toISOString()
    });
}
