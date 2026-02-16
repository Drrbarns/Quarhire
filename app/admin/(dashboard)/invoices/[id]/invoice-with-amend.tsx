'use client';

import { useState } from 'react';
import Link from 'next/link';

const VEHICLE_LABELS: Record<string, string> = {
  economy: 'Sedan',
  executive: 'Mini SUV',
  suv: 'Premium SUV',
  van: 'Executive Mini Van',
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-GH', { style: 'currency', currency: 'GHS' }).format(amount);
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return '';
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateStr));
}

export type BookingForInvoice = {
  id: string;
  payment_reference: string | null;
  customer_name: string;
  customer_email: string | null;
  customer_phone: string | null;
  custom_pickup_location: string | null;
  pickup_location: string | null;
  custom_destination: string | null;
  destination: string | null;
  pickup_date: string | null;
  pickup_time: string | null;
  vehicle_type: string | null;
  passengers: number | null;
  luggage: number | null;
  price: number | string | null;
  status: string | null;
  created_at: string | null;
};

type AmendedData = {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  reference: string;
  invoice_date: string;
  pickup: string;
  destination: string;
  date_time: string;
  vehicle: string;
  passengers: string;
  luggage: string;
  amount: string;
  status: string;
};

function defaultAmended(booking: BookingForInvoice): AmendedData {
  const pickup = booking.custom_pickup_location || booking.pickup_location || '';
  const dest = booking.custom_destination || booking.destination || '';
  return {
    customer_name: booking.customer_name || '',
    customer_email: booking.customer_email || '',
    customer_phone: booking.customer_phone || '',
    reference: booking.payment_reference || '',
    invoice_date: booking.created_at ? booking.created_at.slice(0, 10) : '',
    pickup,
    destination: dest,
    date_time: booking.pickup_date && booking.pickup_time ? `${booking.pickup_date} at ${booking.pickup_time}` : '',
    vehicle: VEHICLE_LABELS[booking.vehicle_type || ''] || booking.vehicle_type || '',
    passengers: String(booking.passengers ?? ''),
    luggage: String(booking.luggage ?? ''),
    amount: String(booking.price ?? ''),
    status: booking.status || 'pending',
  };
}

export default function InvoiceWithAmend({ booking }: { booking: BookingForInvoice }) {
  const [amended, setAmended] = useState<AmendedData | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<AmendedData>(() => defaultAmended(booking));

  const display = amended || defaultAmended(booking);
  const isAmended = amended !== null;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setAmended({ ...form });
    setShowForm(false);
  };

  const handleReset = () => {
    setAmended(null);
    setForm(defaultAmended(booking));
    setShowForm(false);
  };

  const amountNum = parseFloat(String(display.amount).replace(/,/g, '')) || 0;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6 flex flex-wrap justify-between items-center gap-3 print:hidden">
        <div className="flex items-center gap-3">
          <Link href="/admin/invoices" className="text-[#0074C8] hover:underline flex items-center gap-2">
            <i className="ri-arrow-left-line"></i> Back to Invoices
          </Link>
          {isAmended && (
            <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded">Amended</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowForm((s) => !s)}
            className="px-4 py-2 bg-white border border-[#DDE2E9] text-[#2B2F35] rounded-xl font-medium hover:bg-gray-50 flex items-center gap-2"
          >
            <i className="ri-edit-line"></i> {showForm ? 'Cancel edit' : 'Amend invoice'}
          </button>
          {isAmended && (
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 text-amber-700 border border-amber-200 rounded-xl font-medium hover:bg-amber-50 flex items-center gap-2"
            >
              <i className="ri-restart-line"></i> Reset to original
            </button>
          )}
          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2 bg-[#0A0A0A] text-white rounded-xl font-medium hover:bg-[#2B2F35] flex items-center gap-2"
          >
            <i className="ri-printer-line"></i> Print / Save as PDF
          </button>
        </div>
      </div>

      {showForm && (
        <div className="mb-8 p-6 bg-gray-50 rounded-2xl border border-[#DDE2E9] print:hidden">
          <h3 className="text-lg font-bold text-[#0A0A0A] mb-4">Amend invoice (for special cases)</h3>
          <p className="text-sm text-[#2B2F35] mb-4">Changes apply only to this invoice view and print. The booking record is not updated.</p>
          <form onSubmit={handleApply} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#0A0A0A] mb-1">Customer name</label>
                <input
                  type="text"
                  value={form.customer_name}
                  onChange={(e) => setForm((f) => ({ ...f, customer_name: e.target.value }))}
                  className="w-full px-3 py-2 border border-[#DDE2E9] rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0A0A0A] mb-1">Email</label>
                <input
                  type="email"
                  value={form.customer_email}
                  onChange={(e) => setForm((f) => ({ ...f, customer_email: e.target.value }))}
                  className="w-full px-3 py-2 border border-[#DDE2E9] rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0A0A0A] mb-1">Phone</label>
              <input
                type="text"
                value={form.customer_phone}
                onChange={(e) => setForm((f) => ({ ...f, customer_phone: e.target.value }))}
                className="w-full px-3 py-2 border border-[#DDE2E9] rounded-lg"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#0A0A0A] mb-1">Invoice # / Reference</label>
                <input
                  type="text"
                  value={form.reference}
                  onChange={(e) => setForm((f) => ({ ...f, reference: e.target.value }))}
                  className="w-full px-3 py-2 border border-[#DDE2E9] rounded-lg font-mono"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0A0A0A] mb-1">Invoice date</label>
                <input
                  type="date"
                  value={form.invoice_date}
                  onChange={(e) => setForm((f) => ({ ...f, invoice_date: e.target.value }))}
                  className="w-full px-3 py-2 border border-[#DDE2E9] rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0A0A0A] mb-1">Pickup</label>
              <input
                type="text"
                value={form.pickup}
                onChange={(e) => setForm((f) => ({ ...f, pickup: e.target.value }))}
                className="w-full px-3 py-2 border border-[#DDE2E9] rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0A0A0A] mb-1">Destination</label>
              <input
                type="text"
                value={form.destination}
                onChange={(e) => setForm((f) => ({ ...f, destination: e.target.value }))}
                className="w-full px-3 py-2 border border-[#DDE2E9] rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0A0A0A] mb-1">Date & time</label>
              <input
                type="text"
                value={form.date_time}
                onChange={(e) => setForm((f) => ({ ...f, date_time: e.target.value }))}
                className="w-full px-3 py-2 border border-[#DDE2E9] rounded-lg"
                placeholder="e.g. 2026-02-15 at 14:00"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#0A0A0A] mb-1">Vehicle</label>
                <input
                  type="text"
                  value={form.vehicle}
                  onChange={(e) => setForm((f) => ({ ...f, vehicle: e.target.value }))}
                  className="w-full px-3 py-2 border border-[#DDE2E9] rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0A0A0A] mb-1">Passengers</label>
                <input
                  type="text"
                  value={form.passengers}
                  onChange={(e) => setForm((f) => ({ ...f, passengers: e.target.value }))}
                  className="w-full px-3 py-2 border border-[#DDE2E9] rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0A0A0A] mb-1">Luggage</label>
                <input
                  type="text"
                  value={form.luggage}
                  onChange={(e) => setForm((f) => ({ ...f, luggage: e.target.value }))}
                  className="w-full px-3 py-2 border border-[#DDE2E9] rounded-lg"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#0A0A0A] mb-1">Amount (GHS)</label>
                <input
                  type="text"
                  value={form.amount}
                  onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                  className="w-full px-3 py-2 border border-[#DDE2E9] rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0A0A0A] mb-1">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                  className="w-full px-3 py-2 border border-[#DDE2E9] rounded-lg"
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <button type="submit" className="px-4 py-2 bg-[#0074C8] text-white font-medium rounded-xl hover:bg-[#005da0]">
                Apply to invoice
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border border-[#DDE2E9] rounded-xl font-medium hover:bg-gray-50">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div id="invoice" className="bg-white rounded-2xl border border-[#DDE2E9] shadow-sm overflow-hidden print:shadow-none print:border-0">
        <div className="bg-[#0A0A0A] text-white p-8">
          <h1 className="text-2xl font-bold">INVOICE</h1>
          <p className="text-white/80 mt-1">Quarhire Airport Transfers</p>
          <div className="mt-6 flex justify-between items-start">
            <div>
              <p className="text-xs text-white/60 uppercase tracking-wide">Invoice #</p>
              <p className="font-mono font-bold">{display.reference}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/60 uppercase tracking-wide">Date</p>
              <p>{display.invoice_date ? formatDate(display.invoice_date) : formatDate(booking.created_at)}</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="mb-8">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Bill To</h3>
            <p className="font-bold text-[#0A0A0A]">{display.customer_name}</p>
            <p className="text-[#2B2F35] text-sm">{display.customer_email}</p>
            {display.customer_phone && <p className="text-[#2B2F35] text-sm">{display.customer_phone}</p>}
          </div>

          <div className="mb-8">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Trip Details</h3>
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="py-2 text-gray-500 w-40">Pickup</td>
                  <td className="py-2 text-[#0A0A0A]">{display.pickup}</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-500">Destination</td>
                  <td className="py-2 text-[#0A0A0A]">{display.destination}</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-500">Date & Time</td>
                  <td className="py-2 text-[#0A0A0A]">{display.date_time}</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-500">Vehicle</td>
                  <td className="py-2 text-[#0A0A0A]">{display.vehicle}</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-500">Passengers / Luggage</td>
                  <td className="py-2 text-[#0A0A0A]">{display.passengers} pax, {display.luggage} bags</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="border-t border-[#DDE2E9] pt-6">
            <div className="flex justify-between items-center">
              <span className="font-bold text-[#0A0A0A]">Total</span>
              <span className="text-2xl font-bold text-[#0074C8]">{formatCurrency(amountNum)}</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Status: <span className="capitalize font-medium">{display.status}</span></p>
          </div>
        </div>

        <div className="bg-gray-50 px-8 py-4 text-center text-xs text-gray-500 print:bg-gray-100">
          Thank you for choosing Quarhire. For queries contact +233 240 665 648 or WhatsApp.
        </div>
      </div>
    </div>
  );
}
