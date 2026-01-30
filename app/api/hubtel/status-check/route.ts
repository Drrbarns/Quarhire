import { NextRequest, NextResponse } from 'next/server';
import { hubtelGetTransactionStatus } from '@/lib/hubtel';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { sendBookingEmail, type BookingEmailData } from '@/lib/email';

/**
 * API Route: Hubtel Transaction Status Check (Admin Use)
 * POST /api/hubtel/status-check
 * 
 * Checks the status of a transaction with Hubtel's Status API
 * Use this for pending transactions that haven't received a callback
 * Also used by the admin dashboard "Verify Payment" button
 */
export async function POST(request: NextRequest) {
    try {
        const { clientReference, bookingId } = await request.json();

        if (!clientReference) {
            return NextResponse.json(
                { error: 'clientReference is required' },
                { status: 400 }
            );
        }

        console.log('[Status Check] Checking transaction:', clientReference);

        // Use centralized verification function
        const result = await hubtelGetTransactionStatus(clientReference);

        if (!result.success) {
            return NextResponse.json({
                success: false,
                error: result.errorReason || 'Failed to check transaction status',
                rawResponse: result.rawResponse
            }, { status: 500 });
        }

        // If transaction is Paid, update our booking
        if (result.verified && result.status === 'Paid') {
            const { data: booking, error: fetchError } = await supabaseAdmin
                .from('bookings')
                .select('*')
                .eq('payment_reference', clientReference)
                .single();

            if (fetchError) {
                console.error('[Status Check] Error fetching booking:', fetchError);
                return NextResponse.json({
                    success: true,
                    status: 'Paid',
                    message: 'Transaction is paid but booking not found in database',
                    rawResponse: result.rawResponse
                });
            }

            // Idempotent: Only update if not already paid
            if (booking && booking.status !== 'paid') {
                const { error: updateError } = await supabaseAdmin
                    .from('bookings')
                    .update({
                        status: 'paid',
                        hubtel_transaction_id: result.transactionId,
                        payment_verified_at: new Date().toISOString(),
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', booking.id)
                    .eq('status', 'pending'); // Extra safety

                if (updateError) {
                    console.error('[Status Check] Error updating booking:', updateError);
                } else {
                    console.log('[Status Check] Booking updated to PAID:', clientReference);

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
                        console.log('[Status Check] Confirmation email sent');
                    } catch (emailError) {
                        console.error('[Status Check] Failed to send email:', emailError);
                    }
                }

                return NextResponse.json({
                    success: true,
                    status: 'Paid',
                    message: 'Transaction is paid and booking updated',
                    bookingUpdated: true,
                    rawResponse: result.rawResponse
                });
            }

            return NextResponse.json({
                success: true,
                status: 'Paid',
                message: 'Transaction is paid (booking already up to date)',
                bookingUpdated: false,
                rawResponse: result.rawResponse
            });

        } else if (result.verified && result.status === 'Unpaid') {
            return NextResponse.json({
                success: true,
                status: 'Unpaid',
                message: 'Transaction is unpaid or still pending',
                rawResponse: result.rawResponse
            });

        } else if (result.verified && result.status === 'Refunded') {
            return NextResponse.json({
                success: true,
                status: 'Refunded',
                message: 'Transaction has been refunded',
                rawResponse: result.rawResponse
            });

        } else {
            return NextResponse.json({
                success: false,
                status: result.status,
                message: result.errorReason || 'Unable to determine transaction status',
                rawResponse: result.rawResponse
            });
        }

    } catch (error: any) {
        console.error('[Status Check] Error:', error.message);
        return NextResponse.json(
            { error: 'Failed to check status', message: error.message },
            { status: 500 }
        );
    }
}
