import { NextRequest, NextResponse } from 'next/server';
import { sendContactFormEmail, type ContactFormData } from '@/lib/email';

/**
 * API Route: Send Contact Form Email
 * POST /api/contact/email
 * 
 * Sends contact form submission to admin email
 */
export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'email', 'subject', 'message'];
    const missingFields = requiredFields.filter(field => !data[field as keyof ContactFormData]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: 'Missing required fields', missingFields },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Send email
    const emailSent = await sendContactFormEmail(data);

    if (emailSent) {
      return NextResponse.json({
        success: true,
        message: 'Contact form submitted successfully',
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: 'Email could not be sent. Please check email configuration.',
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Contact form API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

