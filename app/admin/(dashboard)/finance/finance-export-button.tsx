'use client';

type BookingRow = {
  id: string;
  payment_reference?: string;
  hubtel_transaction_id?: string;
  customer_name: string;
  customer_email?: string;
  price?: number | string;
  status?: string;
  created_at?: string;
  vehicle_type?: string;
};

export function FinanceExportButton({ bookings }: { bookings: BookingRow[] }) {
  const handleExport = () => {
    const headers = ['Date', 'Reference', 'Transaction ID', 'Customer', 'Email', 'Vehicle', 'Amount (GHS)', 'Status'];
    const rows = bookings.map((b) => [
      b.created_at ? new Date(b.created_at).toISOString().slice(0, 10) : '',
      b.payment_reference || '',
      b.hubtel_transaction_id || '',
      b.customer_name,
      b.customer_email || '',
      b.vehicle_type || '',
      String(Number(b.price) || 0),
      b.status || 'paid',
    ]);
    const csv = [headers.join(','), ...rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `quarhire-finance-report-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <button
      onClick={handleExport}
      className="px-4 py-2 bg-[#0A0A0A] text-white rounded-xl font-medium hover:bg-[#2B2F35] flex items-center gap-2"
    >
      <i className="ri-download-2-line"></i> Export Report
    </button>
  );
}
