import { supabaseAdmin } from '@/lib/supabase/admin';
import { formatCurrency, formatDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';

type AggregatedCustomer = {
  customer_email: string;
  customer_name: string;
  customer_phone: string | null;
  booking_count: number;
  total_spent: number;
  last_booking_at: string;
};

export default async function CustomersPage() {
  const { data: bookings, error } = await supabaseAdmin
    .from('bookings')
    .select('customer_email, customer_name, customer_phone, price, created_at, status')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-500 rounded-lg">
        Error loading customers: {error.message}
      </div>
    );
  }

  const byEmail = new Map<string, AggregatedCustomer>();
  for (const b of bookings || []) {
    const email = (b.customer_email || '').trim().toLowerCase();
    if (!email) continue;
    const existing = byEmail.get(email);
    const price = Number(b.price) || 0;
    const isPaid = (b.status || '').toLowerCase() === 'paid' || (b.status || '').toLowerCase() === 'completed' || (b.status || '').toLowerCase() === 'confirmed';
    if (existing) {
      existing.booking_count += 1;
      if (isPaid) existing.total_spent += price;
      if (b.created_at && b.created_at > existing.last_booking_at) {
        existing.last_booking_at = b.created_at;
      }
    } else {
      byEmail.set(email, {
        customer_email: b.customer_email || email,
        customer_name: b.customer_name || '—',
        customer_phone: b.customer_phone || null,
        booking_count: 1,
        total_spent: isPaid ? price : 0,
        last_booking_at: b.created_at || '',
      });
    }
  }

  const customers = Array.from(byEmail.values()).sort((a, b) => b.last_booking_at.localeCompare(a.last_booking_at));

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-2">Customers</h2>
          <p className="text-[#2B2F35]">Customers from bookings (by email)</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#DDE2E9] shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#F8FAFB] border-b border-[#DDE2E9]">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-[#2B2F35] uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-[#2B2F35] uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-[#2B2F35] uppercase tracking-wider">Phone</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-[#2B2F35] uppercase tracking-wider">Bookings</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-[#2B2F35] uppercase tracking-wider">Total spent</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-[#2B2F35] uppercase tracking-wider">Last booking</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DDE2E9]">
            {customers.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-[#2B2F35]">
                  No customers yet. Customers appear here once they have made a booking.
                </td>
              </tr>
            ) : (
              customers.map((c) => (
                <tr key={c.customer_email} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-[#0A0A0A]">{c.customer_name}</td>
                  <td className="px-6 py-4 text-sm text-[#2B2F35]">
                    <a href={`mailto:${c.customer_email}`} className="text-[#0074C8] hover:underline">{c.customer_email}</a>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#2B2F35]">
                    {c.customer_phone ? (
                      <a href={`tel:${c.customer_phone}`} className="text-[#0074C8] hover:underline">{c.customer_phone}</a>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-[#0A0A0A]">{c.booking_count}</td>
                  <td className="px-6 py-4 text-right font-medium text-[#0074C8]">{formatCurrency(c.total_spent)}</td>
                  <td className="px-6 py-4 text-sm text-[#2B2F35]">{c.last_booking_at ? formatDate(c.last_booking_at) : '—'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="bg-gray-50 px-6 py-4 border-t border-[#DDE2E9] text-sm text-[#2B2F35]">
          Showing {customers.length} unique customer(s) from booking history.
        </div>
      </div>
    </div>
  );
}
