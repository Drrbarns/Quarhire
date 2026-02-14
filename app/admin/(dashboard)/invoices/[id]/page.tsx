import { supabaseAdmin } from '@/lib/supabase/admin';
import { formatDate, formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import PrintButton from '../print-button';

export const dynamic = 'force-dynamic';

const VEHICLE_LABELS: Record<string, string> = {
  economy: 'Sedan',
  executive: 'Mini SUV',
  suv: 'Premium SUV',
  van: 'Executive Mini Van',
};

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
        <Link href="/admin/invoices" className="text-[#0074C8] hover:underline mt-4 inline-block">Back to Invoices</Link>
      </div>
    );
  }

  const vehicleLabel = VEHICLE_LABELS[booking.vehicle_type] || booking.vehicle_type;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PrintButton />

      <div id="invoice" className="bg-white rounded-2xl border border-[#DDE2E9] shadow-sm overflow-hidden print:shadow-none print:border-0">
        {/* Header */}
        <div className="bg-[#0A0A0A] text-white p-8">
          <h1 className="text-2xl font-bold">INVOICE</h1>
          <p className="text-white/80 mt-1">Quarhire Airport Transfers</p>
          <div className="mt-6 flex justify-between items-start">
            <div>
              <p className="text-xs text-white/60 uppercase tracking-wide">Invoice #</p>
              <p className="font-mono font-bold">{booking.payment_reference}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/60 uppercase tracking-wide">Date</p>
              <p>{formatDate(booking.created_at)}</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Bill To */}
          <div className="mb-8">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Bill To</h3>
            <p className="font-bold text-[#0A0A0A]">{booking.customer_name}</p>
            <p className="text-[#2B2F35] text-sm">{booking.customer_email}</p>
            <p className="text-[#2B2F35] text-sm">{booking.customer_phone}</p>
          </div>

          {/* Trip details */}
          <div className="mb-8">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Trip Details</h3>
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="py-2 text-gray-500 w-40">Pickup</td>
                  <td className="py-2 text-[#0A0A0A]">{booking.custom_pickup_location || booking.pickup_location}</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-500">Destination</td>
                  <td className="py-2 text-[#0A0A0A]">{booking.custom_destination || booking.destination}</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-500">Date & Time</td>
                  <td className="py-2 text-[#0A0A0A]">{booking.pickup_date} at {booking.pickup_time}</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-500">Vehicle</td>
                  <td className="py-2 text-[#0A0A0A]">{vehicleLabel}</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-500">Passengers / Luggage</td>
                  <td className="py-2 text-[#0A0A0A]">{booking.passengers} pax, {booking.luggage} bags</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Amount */}
          <div className="border-t border-[#DDE2E9] pt-6">
            <div className="flex justify-between items-center">
              <span className="font-bold text-[#0A0A0A]">Total</span>
              <span className="text-2xl font-bold text-[#0074C8]">{formatCurrency(Number(booking.price))}</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Status: <span className="capitalize font-medium">{booking.status}</span></p>
          </div>
        </div>

        <div className="bg-gray-50 px-8 py-4 text-center text-xs text-gray-500 print:bg-gray-100">
          Thank you for choosing Quarhire. For queries contact +233 240 665 648 or WhatsApp.
        </div>
      </div>
    </div>
  );
}
