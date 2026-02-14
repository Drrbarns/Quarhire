import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

/**
 * GET /api/bookings/by-ref?ref=QRHRE-xxx
 * Public: returns minimal booking info for pay-later page. Only for pending bookings.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const ref = searchParams.get('ref');
    if (!ref) {
      return NextResponse.json({ error: 'ref is required' }, { status: 400 });
    }

    const { data: booking, error } = await supabaseAdmin
      .from('bookings')
      .select('id, customer_name, customer_email, customer_phone, price, payment_reference, status, vehicle_type, pickup_location, custom_pickup_location, destination, custom_destination, pickup_date, pickup_time, passengers, luggage')
      .eq('payment_reference', ref.trim())
      .single();

    if (error || !booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    if (booking.status !== 'pending') {
      return NextResponse.json(
        { error: 'This booking is already paid or no longer pending.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      id: booking.id,
      customer_name: booking.customer_name,
      customer_email: booking.customer_email,
      customer_phone: booking.customer_phone,
      price: Number(booking.price),
      payment_reference: booking.payment_reference,
      vehicle_type: booking.vehicle_type,
      pickup_location: booking.custom_pickup_location || booking.pickup_location,
      destination: booking.custom_destination || booking.destination,
      pickup_date: booking.pickup_date,
      pickup_time: booking.pickup_time,
      passengers: booking.passengers,
      luggage: booking.luggage,
    });
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
