import { NextRequest, NextResponse } from 'next/server';
import { sendInvoiceEmail, type InvoiceEmailData } from '@/lib/email';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { customerName, customerEmail, reference, invoiceDate, description, amount } = body as InvoiceEmailData;

    if (!customerName || !customerEmail || !reference || !invoiceDate || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields: customerName, customerEmail, reference, invoiceDate, amount' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    let paymentLink = body.paymentLink as string | undefined;

    // For custom invoices (no existing booking), create a booking record so
    // the /booking/pay page can look it up and initiate Hubtel payment.
    if (body.createBooking) {
      const paymentRef = reference.startsWith('INV-') ? reference : `INV-${reference}`;

      const { data: existing } = await supabaseAdmin
        .from('bookings')
        .select('id')
        .eq('payment_reference', paymentRef)
        .maybeSingle();

      if (!existing) {
        const { error: insertError } = await supabaseAdmin.from('bookings').insert([{
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: body.customerPhone || '',
          pickup_location: body.pickup || 'As arranged',
          destination: body.destination || 'As arranged',
          pickup_date: invoiceDate,
          pickup_time: '00:00',
          vehicle_type: 'economy',
          price: amount,
          status: 'pending',
          payment_reference: paymentRef,
        }]);

        if (insertError) {
          console.error('Failed to create booking for custom invoice:', insertError);
          return NextResponse.json(
            { error: 'Failed to create payment record. Email not sent.' },
            { status: 500 }
          );
        }
      }

      const origin = request.headers.get('origin') || request.headers.get('referer')?.replace(/\/[^/]*$/, '') || 'https://quarhire.com';
      paymentLink = `${origin}/booking/pay?ref=${encodeURIComponent(paymentRef)}`;
    }

    const emailData: InvoiceEmailData = {
      ...(body as InvoiceEmailData),
      paymentLink,
    };

    const result = await sendInvoiceEmail(emailData);

    if (result.success) {
      return NextResponse.json({ success: true, message: 'Invoice email sent successfully' });
    }

    return NextResponse.json(
      { success: false, error: result.error || 'Failed to send invoice email' },
      { status: 500 }
    );
  } catch (error: any) {
    console.error('Invoice email API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}
