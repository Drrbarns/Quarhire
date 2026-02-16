import { supabaseAdmin } from '@/lib/supabase/admin';
import Link from 'next/link';
import InvoiceWithAmend from './invoice-with-amend';

export const dynamic = 'force-dynamic';

export default async function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: booking, error } = await supabaseAdmin
    .from('bookings')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !booking) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-red-600">Booking not found</h2>
        <Link href="/admin/invoices" className="text-[#0074C8] hover:underline mt-4 inline-block">
          Return to Invoices
        </Link>
      </div>
    );
  }

  return (
    <InvoiceWithAmend
      booking={{
        id: booking.id,
        payment_reference: booking.payment_reference ?? null,
        customer_name: booking.customer_name ?? '',
        customer_email: booking.customer_email ?? null,
        customer_phone: booking.customer_phone ?? null,
        custom_pickup_location: booking.custom_pickup_location ?? null,
        pickup_location: booking.pickup_location ?? null,
        custom_destination: booking.custom_destination ?? null,
        destination: booking.destination ?? null,
        pickup_date: booking.pickup_date ?? null,
        pickup_time: booking.pickup_time ?? null,
        vehicle_type: booking.vehicle_type ?? null,
        passengers: booking.passengers ?? null,
        luggage: booking.luggage ?? null,
        price: booking.price ?? null,
        status: booking.status ?? null,
        created_at: booking.created_at ?? null,
      }}
    />
  );
}
