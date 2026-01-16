import { NextRequest, NextResponse } from 'next/server';
import { sendBookingEmail, type BookingEmailData } from '@/lib/email';

/**
 * API Route: Send Payment Confirmation Email
 * POST /api/hubtel/confirm-email
 * 
 * Called from the success page after verifying payment was successful
 * Sends confirmation emails to both customer and admin
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields
        const requiredFields = ['name', 'email', 'phone', 'pickupLocation', 'destination',
            'vehicleType', 'date', 'time', 'estimatedPrice', 'bookingReference'];

        for (const field of requiredFields) {
            if (!body[field]) {
                return NextResponse.json(
                    { error: `Missing required field: ${field}` },
                    { status: 400 }
                );
            }
        }

        // Prepare email data
        const emailData: BookingEmailData = {
            name: body.name,
            email: body.email,
            phone: body.phone,
            pickupLocation: body.pickupLocation,
            destination: body.destination,
            customDestination: body.customDestination,
            airline: body.airline,
            flightNumber: body.flightNumber,
            vehicleType: body.vehicleType,
            date: body.date,
            time: body.time,
            passengers: body.passengers || 1,
            luggage: body.luggage || 1,
            specialRequests: body.specialRequests,
            estimatedPrice: body.estimatedPrice,
            bookingReference: body.bookingReference,
            paymentStatus: 'paid',
            paymentReference: body.paymentReference || body.bookingReference
        };

        console.log('Sending payment confirmation emails for:', body.bookingReference);

        // Send confirmation emails to customer and admin
        const result = await sendBookingEmail(emailData);

        console.log('Email send result:', result);

        return NextResponse.json({
            success: true,
            message: 'Confirmation emails sent',
            customerSent: result.customerSent,
            adminSent: result.adminSent
        });

    } catch (error: any) {
        console.error('Error sending confirmation emails:', error);
        return NextResponse.json(
            { error: 'Failed to send confirmation emails', message: error.message },
            { status: 500 }
        );
    }
}
