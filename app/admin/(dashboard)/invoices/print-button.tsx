'use client';

import Link from 'next/link';

export default function PrintButton() {
  return (
    <div className="mb-6 flex justify-between items-center print:hidden">
      <Link href="/admin/invoices" className="text-[#0074C8] hover:underline flex items-center gap-2">
        <i className="ri-arrow-left-line"></i> Back to Invoices
      </Link>
      <button
        type="button"
        onClick={() => window.print()}
        className="px-4 py-2 bg-[#0A0A0A] text-white rounded-xl font-medium hover:bg-[#2B2F35] flex items-center gap-2"
      >
        <i className="ri-printer-line"></i> Print / Save as PDF
      </button>
    </div>
  );
}
