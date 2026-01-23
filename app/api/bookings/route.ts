
import { type NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function GET(request: NextRequest) {
    try {
        const supabase = await createClient();

        // Check if user is authenticated
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Fetch all bookings (ordered by created_at desc)
        const { data: bookings, error } = await supabase
            .from('bookings')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        return NextResponse.json({ bookings });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // We use the admin client here to bypass RLS for inserts if needed, 
        // or just rely on the 'public insert' policy we defined in SQL.
        // Using supabaseAdmin ensures it works even if RLS is strict.

        const bookingData = {
            customer_name: body.name,
            customer_email: body.email,
            customer_phone: body.phone,
            pickup_location: body.pickupLocation,
            custom_pickup_location: body.customPickupLocation || null,
            destination: body.destination,
            custom_destination: body.customDestination || null,
            pickup_date: body.date,
            pickup_time: body.time,
            airline: body.airline || null,
            flight_number: body.flightNumber || null,
            vehicle_type: body.vehicleType,
            passengers: body.passengers,
            luggage: body.luggage,
            special_requests: body.specialRequests || null,
            price: parseFloat(body.estimatedPrice.replace(/[^0-9.]/g, '')), // "GHS 500" -> 500.00
            status: body.paymentStatus === 'paid' ? 'paid' : 'pending',
            payment_reference: body.paymentReference || body.bookingReference,
        };

        const { data, error } = await supabaseAdmin
            .from('bookings')
            .insert([bookingData])
            .select('id')
            .single();

        if (error) {
            console.error('Database Error:', error);
            throw error;
        }

        return NextResponse.json({ success: true, id: data.id });

    } catch (error: any) {
        console.error('Booking Creation Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
