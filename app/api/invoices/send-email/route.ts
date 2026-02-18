import { NextRequest, NextResponse } from 'next/server';
import { sendInvoiceEmail, type InvoiceEmailData } from '@/lib/email';

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

    const result = await sendInvoiceEmail(body as InvoiceEmailData);

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
