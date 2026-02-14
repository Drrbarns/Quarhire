import { supabaseAdmin } from '@/lib/supabase/admin';
import { formatDate, formatCurrency } from '@/lib/utils';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function InvoicesPage() {
  const { data: bookings, error } = await supabaseAdmin
    .from('bookings')
    .select('id, payment_reference, customer_name, customer_email, status, price, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-500 rounded-lg">
        Error loading bookings: {error.message}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-2">Invoices</h2>
          <p className="text-[#2B2F35]">Generate invoices for bookings or create custom invoices</p>
        </div>
        <Link
          href="/admin/invoices/new"
          className="px-4 py-2 bg-[#0074C8] text-white rounded-xl font-medium hover:bg-[#005da0] flex items-center gap-2"
        >
          <i className="ri-add-line"></i> Create Invoice
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-[#DDE2E9] shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#F8FAFB] border-b border-[#DDE2E9]">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-[#2B2F35] uppercase tracking-wider">Reference</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-[#2B2F35] uppercase tracking-wider">Customer</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-[#2B2F35] uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-[#2B2F35] uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-[#2B2F35] uppercase tracking-wider">Amount</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-[#2B2F35] uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DDE2E9]">
            {bookings?.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-[#2B2F35]">
                  No bookings yet. Invoices can be generated from individual booking details as well.
                </td>
              </tr>
            ) : (
              bookings?.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono text-sm font-bold text-[#0A0A0A]">{b.payment_reference}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-[#0A0A0A]">{b.customer_name}</div>
                    <div className="text-xs text-gray-500">{b.customer_email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#2B2F35]">{formatDate(b.created_at)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                      b.status === 'paid' ? 'bg-green-100 text-green-800' :
                      b.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-[#0A0A0A]">{formatCurrency(Number(b.price))}</td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/invoices/${b.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#0074C8] text-white text-sm font-medium rounded-lg hover:bg-[#005da0]"
                    >
                      <i className="ri-file-list-3-line"></i> Generate Invoice
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
