import { NextRequest, NextResponse } from 'next/server';
import { sendBookingEmail, type BookingEmailData } from '@/lib/email';

/**
 * API Route: Send Booking Confirmation Email
 * POST /api/booking/email
 * 
 * Sends booking confirmation email to customer and admin
 */
export async function POST(request: NextRequest) {
  try {
    const data: BookingEmailData = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'pickupLocation', 'destination', 'vehicleType', 'date', 'time', 'passengers', 'luggage', 'estimatedPrice', 'paymentStatus'];
    const missingFields = requiredFields.filter(field => !data[field as keyof BookingEmailData]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: 'Missing required fields', missingFields },
        { status: 400 }
      );
    }

    // Send emails (separate to customer and admin)
    const emailResult = await sendBookingEmail(data);

    if (emailResult.customerSent || emailResult.adminSent) {
      return NextResponse.json({
        success: true,
        message: 'Emails sent successfully',
        customerEmailSent: emailResult.customerSent,
        adminEmailSent: emailResult.adminSent,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: 'Emails could not be sent. Please check email configuration.',
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

