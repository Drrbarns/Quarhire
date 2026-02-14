import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route: Verify Paystack Payment
 * POST /api/paystack/verify
 * 
 * Verifies a payment transaction with Paystack
 */
export async function POST(request: NextRequest) {
    try {
        const { reference } = await request.json();

        if (!reference) {
            return NextResponse.json(
                { error: 'Payment reference is required' },
                { status: 400 }
            );
        }

        const secretKey = process.env.PAYSTACK_SECRET_KEY;

        if (!secretKey || secretKey === 'sk_test_your_secret_key_here') {
            console.error('Paystack secret key not configured');
            return NextResponse.json(
                { error: 'Payment verification not configured' },
                { status: 500 }
            );
        }

        // Verify payment with Paystack
        const response = await fetch(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${secretKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Payment verification failed', details: data },
                { status: response.status }
            );
        }

        // Check if payment was successful
        if (data.status && data.data.status === 'success') {
            return NextResponse.json({
                success: true,
                message: 'Payment verified successfully',
                data: {
                    reference: data.data.reference,
                    amount: data.data.amount / 100, // Convert from kobo to cedis
                    currency: data.data.currency,
                    paidAt: data.data.paid_at,
                    channel: data.data.channel,
                    customer: {
                        email: data.data.customer.email,
                        customerCode: data.data.customer.customer_code,
                    },
                    metadata: data.data.metadata,
                },
            });
        } else {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Payment was not successful',
                    status: data.data.status
                },
                { status: 400 }
            );
        }
    } catch (error: any) {
        console.error('Payment verification error:', error);
        return NextResponse.json(
            { error: 'Internal server error', message: error.message },
            { status: 500 }
        );
    }
}
