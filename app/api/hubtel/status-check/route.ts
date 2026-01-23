import { NextRequest, NextResponse } from 'next/server';
import { getHubtelAuthHeader, HUBTEL_STATUS_ENDPOINT, type HubtelStatusCheckResponse } from '@/lib/hubtel';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { sendBookingEmail, type BookingEmailData } from '@/lib/email';

/**
 * API Route: Hubtel Transaction Status Check
 * POST /api/hubtel/status-check
 * 
 * Checks the status of a transaction with Hubtel's Status API
 * Use this for pending transactions that haven't received a callback
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

        const merchantAccountNumber = process.env.HUBTEL_MERCHANT_ACCOUNT_NUMBER;
        if (!merchantAccountNumber) {
            return NextResponse.json(
                { error: 'Merchant account not configured' },
                { status: 500 }
            );
        }

        // Call Hubtel Status Check API
        const statusUrl = `${HUBTEL_STATUS_ENDPOINT}/${merchantAccountNumber}/status?clientReference=${encodeURIComponent(clientReference)}`;

        console.log('Checking transaction status:', statusUrl);

        const response = await fetch(statusUrl, {
            method: 'GET',
            headers: {
                'Authorization': getHubtelAuthHeader(),
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Hubtel status check failed:', response.status, errorText);
            return NextResponse.json(
                {
                    error: 'Failed to check transaction status',
                    status: response.status,
                    message: errorText
                },
                { status: response.status }
            );
        }

        const result: HubtelStatusCheckResponse = await response.json();
        console.log('Hubtel Status Check Result:', result);

        // If transaction is Paid but our booking is still pending, update it
        if (result.responseCode === '0000' && result.data?.status === 'Paid') {
            const { data: booking, error: fetchError } = await supabaseAdmin
                .from('bookings')
                .select('*')
                .eq('payment_reference', clientReference)
                .single();

            if (fetchError) {
                console.error('Error fetching booking:', fetchError);
            } else if (booking && booking.status !== 'paid') {
                // Update booking to paid
                const { error: updateError } = await supabaseAdmin
                    .from('bookings')
                    .update({
                        status: 'paid',
                        hubtel_transaction_id: result.data.transactionId,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', booking.id);

                if (updateError) {
                    console.error('Error updating booking:', updateError);
                } else {
                    console.log(`Booking ${clientReference} updated to PAID via status check.`);

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
                        console.log('Confirmation email sent after status check.');
                    } catch (emailError) {
                        console.error('Failed to send email after status check:', emailError);
                    }
                }
            }

            return NextResponse.json({
                success: true,
                status: 'Paid',
                message: 'Transaction is paid',
                bookingUpdated: booking?.status !== 'paid',
                data: result.data
            });
        } else if (result.responseCode === '0000' && result.data?.status === 'Unpaid') {
            return NextResponse.json({
                success: true,
                status: 'Unpaid',
                message: 'Transaction is unpaid or still pending',
                data: result.data
            });
        } else {
            return NextResponse.json({
                success: false,
                status: result.data?.status || 'Unknown',
                message: result.message || 'Unable to determine transaction status',
                data: result.data
            });
        }
    } catch (error: any) {
        console.error('Status check error:', error);
        return NextResponse.json(
            { error: 'Failed to check status', message: error.message },
            { status: 500 }
        );
    }
}
