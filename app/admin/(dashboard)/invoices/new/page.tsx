'use client';

import { useState } from 'react';
import Link from 'next/link';

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-GH', { style: 'currency', currency: 'GHS' }).format(amount);
}

function formatDate(dateStr: string) {
  if (!dateStr) return '';
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateStr));
}

export default function NewInvoicePage() {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().slice(0, 10));
  const [reference, setReference] = useState('');
  const [preview, setPreview] = useState<{
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    description: string;
    amount: number;
    date: string;
    reference: string;
  } | null>(null);
  const [sending, setSending] = useState(false);
  const [emailStatus, setEmailStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount.replace(/,/g, '')) || 0;
    const ref = reference.trim() || `INV-${Date.now()}`;
    setPreview({
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim(),
      customerPhone: customerPhone.trim(),
      description: description.trim(),
      amount: numAmount,
      date: invoiceDate,
      reference: ref,
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSendEmail = async () => {
    if (!preview) return;
    if (!preview.customerEmail) {
      setEmailStatus({ type: 'error', message: 'No customer email address provided.' });
      return;
    }
    setSending(true);
    setEmailStatus(null);

    try {
      const res = await fetch('/api/invoices/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: preview.customerName,
          customerEmail: preview.customerEmail,
          customerPhone: preview.customerPhone || undefined,
          reference: preview.reference,
          invoiceDate: preview.date,
          description: preview.description,
          amount: preview.amount,
          status: 'pending',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setEmailStatus({ type: 'success', message: `Invoice sent to ${preview.customerEmail}` });
      } else {
        setEmailStatus({ type: 'error', message: data.error || 'Failed to send email' });
      }
    } catch {
      setEmailStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 flex justify-between items-center print:hidden">
        <Link
          href="/admin/invoices"
          className="text-[#0074C8] hover:underline flex items-center gap-2"
        >
          <i className="ri-arrow-left-line"></i> Back to Invoices
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-[#DDE2E9] shadow-sm p-6 mb-8 print:hidden">
        <h2 className="text-xl font-bold text-[#0A0A0A] mb-4">Create Custom Invoice</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#0A0A0A] mb-1">Customer name *</label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-2 border border-[#DDE2E9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0074C8]"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0A0A0A] mb-1">Email *</label>
              <input
                type="email"
                required
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full px-3 py-2 border border-[#DDE2E9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0074C8]"
                placeholder="john@example.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0A0A0A] mb-1">Phone</label>
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full px-3 py-2 border border-[#DDE2E9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0074C8]"
              placeholder="+233 XX XXX XXXX"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0A0A0A] mb-1">Description / Service *</label>
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-[#DDE2E9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0074C8]"
              placeholder="e.g. Airport transfer, Custom trip"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#0A0A0A] mb-1">Amount (GHS) *</label>
              <input
                type="text"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 border border-[#DDE2E9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0074C8]"
                placeholder="800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0A0A0A] mb-1">Invoice date *</label>
              <input
                type="date"
                required
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
                className="w-full px-3 py-2 border border-[#DDE2E9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0074C8]"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0A0A0A] mb-1">Reference (optional)</label>
            <input
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              className="w-full px-3 py-2 border border-[#DDE2E9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0074C8] font-mono"
              placeholder="Leave blank to auto-generate"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-[#0074C8] text-white font-medium rounded-xl hover:bg-[#005da0] flex items-center gap-2"
            >
              <i className="ri-eye-line"></i> Generate Preview
            </button>
            <Link
              href="/admin/invoices"
              className="px-4 py-2 border border-[#DDE2E9] text-[#2B2F35] font-medium rounded-xl hover:bg-gray-50"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>

      {preview && (
        <div className="space-y-4">
          {emailStatus && (
            <div className={`p-4 rounded-xl text-sm flex items-center gap-2 print:hidden ${
              emailStatus.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              <i className={emailStatus.type === 'success' ? 'ri-check-line' : 'ri-error-warning-line'}></i>
              {emailStatus.message}
              <button onClick={() => setEmailStatus(null)} className="ml-auto text-lg leading-none">&times;</button>
            </div>
          )}
          <div className="flex justify-end gap-2 print:hidden">
            <button
              type="button"
              onClick={handleSendEmail}
              disabled={sending}
              className="px-4 py-2 bg-[#0074C8] text-white rounded-xl font-medium hover:bg-[#005da0] disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {sending ? (
                <><i className="ri-loader-4-line animate-spin"></i> Sending...</>
              ) : (
                <><i className="ri-mail-send-line"></i> Send Invoice Email</>
              )}
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 bg-[#0A0A0A] text-white rounded-xl font-medium hover:bg-[#2B2F35] flex items-center gap-2"
            >
              <i className="ri-printer-line"></i> Print / Save as PDF
            </button>
          </div>
          <div id="invoice" className="bg-white rounded-2xl border border-[#DDE2E9] shadow-sm overflow-hidden print:shadow-none print:border-0">
            <div className="bg-[#0A0A0A] text-white p-8">
              <h1 className="text-2xl font-bold">INVOICE</h1>
              <p className="text-white/80 mt-1">Quarhire Airport Transfers</p>
              <div className="mt-6 flex justify-between items-start">
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-wide">Invoice #</p>
                  <p className="font-mono font-bold">{preview.reference}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/60 uppercase tracking-wide">Date</p>
                  <p>{formatDate(preview.date)}</p>
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="mb-8">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Bill To</h3>
                <p className="font-bold text-[#0A0A0A]">{preview.customerName}</p>
                <p className="text-[#2B2F35] text-sm">{preview.customerEmail}</p>
                {preview.customerPhone && (
                  <p className="text-[#2B2F35] text-sm">{preview.customerPhone}</p>
                )}
              </div>
              <div className="mb-8">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Description</h3>
                <p className="text-[#0A0A0A]">{preview.description}</p>
              </div>
              <div className="border-t border-[#DDE2E9] pt-6">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#0A0A0A]">Total</span>
                  <span className="text-2xl font-bold text-[#0074C8]">{formatCurrency(preview.amount)}</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-8 py-4 text-center text-xs text-gray-500 print:bg-gray-100">
              Thank you for choosing Quarhire. For queries contact +233 240 665 648 or WhatsApp.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
