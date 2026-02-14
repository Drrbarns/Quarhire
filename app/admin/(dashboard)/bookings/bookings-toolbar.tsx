'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

type BookingRow = {
  id: string;
  payment_reference?: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  pickup_location?: string;
  custom_pickup_location?: string;
  destination?: string;
  custom_destination?: string;
  pickup_date?: string;
  pickup_time?: string;
  vehicle_type?: string;
  passengers?: number;
  luggage?: number;
  status?: string;
  price?: number | string;
  created_at?: string;
};

export function BookingsFilterExport({ bookings }: { bookings: BookingRow[] }) {
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get('status') || 'all';

  const handleExport = () => {
    const headers = ['Reference', 'Customer', 'Email', 'Phone', 'Pickup', 'Destination', 'Date', 'Time', 'Vehicle', 'Status', 'Price (GHS)', 'Created'];
    const rows = bookings.map((b) => [
      b.payment_reference || b.id,
      b.customer_name,
      b.customer_email,
      b.customer_phone || '',
      b.custom_pickup_location || b.pickup_location || '',
      b.custom_destination || b.destination || '',
      b.pickup_date || '',
      b.pickup_time || '',
      b.vehicle_type || '',
      b.status || '',
      String(Number(b.price) || 0),
      b.created_at || '',
    ]);
    const csv = [headers.join(','), ...rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `quarhire-bookings-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="flex gap-3">
      <div className="relative group">
        <button className="px-4 py-2 bg-white border border-[#DDE2E9] rounded-xl text-[#2B2F35] font-medium hover:bg-gray-50 flex items-center gap-2">
          <i className="ri-filter-3-line"></i> Filter
          <i className="ri-arrow-down-s-line text-sm"></i>
        </button>
        <div className="absolute right-0 mt-1 w-48 bg-white border border-[#DDE2E9] rounded-xl shadow-lg py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
          <Link href="/admin/bookings" className={`block px-4 py-2 text-sm ${currentStatus === 'all' ? 'bg-gray-100 font-medium text-[#0A0A0A]' : 'text-[#2B2F35] hover:bg-gray-50'}`}>
            All
          </Link>
          <Link href="/admin/bookings?status=pending" className={`block px-4 py-2 text-sm ${currentStatus === 'pending' ? 'bg-gray-100 font-medium text-[#0A0A0A]' : 'text-[#2B2F35] hover:bg-gray-50'}`}>
            Pending
          </Link>
          <Link href="/admin/bookings?status=paid" className={`block px-4 py-2 text-sm ${currentStatus === 'paid' ? 'bg-gray-100 font-medium text-[#0A0A0A]' : 'text-[#2B2F35] hover:bg-gray-50'}`}>
            Paid
          </Link>
          <Link href="/admin/bookings?status=confirmed" className={`block px-4 py-2 text-sm ${currentStatus === 'confirmed' ? 'bg-gray-100 font-medium text-[#0A0A0A]' : 'text-[#2B2F35] hover:bg-gray-50'}`}>
            Confirmed
          </Link>
          <Link href="/admin/bookings?status=cancelled" className={`block px-4 py-2 text-sm ${currentStatus === 'cancelled' ? 'bg-gray-100 font-medium text-[#0A0A0A]' : 'text-[#2B2F35] hover:bg-gray-50'}`}>
            Cancelled
          </Link>
        </div>
      </div>
      <button onClick={handleExport} className="px-4 py-2 bg-[#0A0A0A] text-white rounded-xl font-medium hover:bg-[#2B2F35] flex items-center gap-2">
        <i className="ri-download-line"></i> Export
      </button>
    </div>
  );
}
