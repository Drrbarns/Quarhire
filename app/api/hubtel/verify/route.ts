import { NextRequest, NextResponse } from 'next/server';
import { hubtelGetTransactionStatus, isHubtelConfigured } from '@/lib/hubtel';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { sendBookingEmail, type BookingEmailData } from '@/lib/email';

/**
 * API Route: Manual Payment Verification
 * POST /api/hubtel/verify
 * 
 * Manually verify a payment with Hubtel and update the booking
 * Use this when a callback was missed or for admin verification
 * 
 * Request body: { clientReference: string }
 */
export async function POST(request: NextRequest) {
    try {
        if (!isHubtelConfigured()) {
            return NextResponse.json(
                { error: 'Hubtel not configured' },
                { status: 500 }
            );
        }

        const { clientReference } = await request.json();

        if (!clientReference) {
            return NextResponse.json(
                { error: 'clientReference is required' },
                { status: 400 }
            );
        }

        console.log('[Manual Verify] Verifying transaction:', clientReference);

        // Verify with Hubtel
        const verification = await hubtelGetTransactionStatus(clientReference);

        if (!verification.success) {
            return NextResponse.json({
                success: false,
                verified: false,
                status: verification.status,
                error: verification.errorReason,
                rawResponse: verification.rawResponse
            }, { status: 500 });
        }

        // Get current booking state
        const { data: booking, error: fetchError } = await supabaseAdmin
            .from('bookings')
            .select('*')
            .eq('payment_reference', clientReference)
            .single();

        if (fetchError || !booking) {
            return NextResponse.json({
                success: true,
                verified: verification.verified,
                status: verification.status,
                message: 'Verification complete but booking not found in database',
                bookingFound: false,
                rawResponse: verification.rawResponse
            });
        }

        const previousStatus = booking.status;
        let bookingUpdated = false;
        let emailSent = false;

        // Update booking if payment is verified as Paid and booking is not already paid
        if (verification.verified && verification.status === 'Paid' && booking.status !== 'paid') {
            const { error: updateError } = await supabaseAdmin
                .from('bookings')
                .update({
                    status: 'paid',
                    hubtel_transaction_id: verification.transactionId,
                    payment_verified_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                })
                .eq('id', booking.id);

            if (updateError) {
                console.error('[Manual Verify] DB update error:', updateError);
            } else {
                bookingUpdated = true;
                console.log('[Manual Verify] Booking updated to paid');

                // Send confirmation email
                try {
                    const emailData: BookingEmailData = {
                        name: booking.customer_name,
                        email: booking.customer_email,
                        phone: booking.customer_phone,
                        pickupLocation: booking.custom_pickup_location || booking.pickup_location,
                        destination: booking.custom_destination || booking.destination,
                        vehicleType: booking.vehicle_type,
                        date: booking.pickup_date,
                        time: booking.pickup_time,
                        passengers: booking.passengers,
                        luggage: booking.luggage,
                        specialRequests: booking.special_requests,
                        estimatedPrice: `GHS ${booking.price}`,
                        bookingReference: clientReference,
                        paymentStatus: 'paid',
                        paymentReference: clientReference
                    };

                    await sendBookingEmail(emailData);
                    emailSent = true;
                    console.log('[Manual Verify] Confirmation email sent');
                } catch (emailError) {
                    console.error('[Manual Verify] Email error:', emailError);
                }
            }
        }

        // Log verification attempt
        await supabaseAdmin
            .from('hubtel_callbacks')
            .insert({
                client_reference: clientReference,
                status: `manual_verify_${verification.status}`,
                verification_status: verification.verified ? 'verified' : 'unverified',
                verification_response: verification.rawResponse,
                payload: {
                    source: 'manual_verify',
                    previousBookingStatus: previousStatus,
                    bookingUpdated,
                    emailSent
                }
            });

        return NextResponse.json({
            success: true,
            verified: verification.verified,
            status: verification.status,
            transactionId: verification.transactionId,
            amount: verification.amount,
            booking: {
                id: booking.id,
                previousStatus,
                currentStatus: bookingUpdated ? 'paid' : booking.status,
                updated: bookingUpdated
            },
            emailSent,
            rawResponse: verification.rawResponse
        });

    } catch (error: any) {
        console.error('[Manual Verify] Error:', error.message);
        return NextResponse.json(
            { error: 'Verification failed', message: error.message },
            { status: 500 }
        );
    }
}

/**
 * GET endpoint for quick status check (no DB updates)
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const clientReference = searchParams.get('clientReference');

        if (!clientReference) {
            return NextResponse.json(
                { error: 'clientReference query parameter is required' },
                { status: 400 }
            );
        }

        const verification = await hubtelGetTransactionStatus(clientReference);

        return NextResponse.json({
            success: verification.success,
            verified: verification.verified,
            status: verification.status,
            transactionId: verification.transactionId,
            amount: verification.amount,
            errorReason: verification.errorReason,
            rawResponse: verification.rawResponse
        });

    } catch (error: any) {
        return NextResponse.json(
            { error: 'Verification failed', message: error.message },
            { status: 500 }
        );
    }
}
