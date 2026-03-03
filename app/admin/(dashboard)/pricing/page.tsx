'use client';

import { useEffect, useState } from 'react';

const VEHICLE_KEYS = ['economy', 'executive', 'suv', 'van'] as const;

const VEHICLE_DESCRIPTIONS: Record<string, string> = {
  economy: '1–4 passengers, ideal for individuals or small groups',
  executive: '1–4 passengers, Mini SUV comfort',
  suv: '1–5 passengers, Premium SUV',
  van: '1–7 passengers, Executive Mini Van',
};

const VEHICLE_ICONS: Record<string, string> = {
  economy: 'ri-taxi-line',
  executive: 'ri-roadster-line',
  suv: 'ri-car-line',
  van: 'ri-bus-line',
};

type PricingData = {
  prices: Record<string, number>;
  labels: Record<string, string>;
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-GH', { style: 'currency', currency: 'GHS' }).format(amount);
}

export default function PricingPage() {
  const [data, setData] = useState<PricingData | null>(null);
  const [editPrices, setEditPrices] = useState<Record<string, string>>({});
  const [editLabels, setEditLabels] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchPricing = async () => {
    try {
      const res = await fetch('/api/pricing');
      const json = await res.json();
      setData(json);
      setEditPrices(
        Object.fromEntries(VEHICLE_KEYS.map((k) => [k, String(json.prices[k] ?? 0)]))
      );
      setEditLabels(
        Object.fromEntries(VEHICLE_KEYS.map((k) => [k, json.labels[k] ?? k]))
      );
    } catch {
      setStatus({ type: 'error', message: 'Failed to load pricing' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPricing(); }, []);

  const handleSave = async () => {
    setSaving(true);
    setStatus(null);
    try {
      const prices: Record<string, number> = {};
      for (const key of VEHICLE_KEYS) {
        const val = parseFloat(editPrices[key]);
        if (isNaN(val) || val < 0) {
          setStatus({ type: 'error', message: `Invalid price for ${editLabels[key] || key}` });
          setSaving(false);
          return;
        }
        prices[key] = val;
      }

      const res = await fetch('/api/pricing', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prices, labels: editLabels }),
      });

      const json = await res.json();
      if (json.success) {
        setStatus({ type: 'success', message: 'Pricing updated successfully. Changes are live on the booking page.' });
        setEditing(false);
        await fetchPricing();
      } else {
        setStatus({ type: 'error', message: json.error || 'Failed to update pricing' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (data) {
      setEditPrices(
        Object.fromEntries(VEHICLE_KEYS.map((k) => [k, String(data.prices[k] ?? 0)]))
      );
      setEditLabels(
        Object.fromEntries(VEHICLE_KEYS.map((k) => [k, data.labels[k] ?? k]))
      );
    }
    setEditing(false);
    setStatus(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <i className="ri-loader-4-line animate-spin text-3xl text-[#0074C8]"></i>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap justify-between items-end mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-2">Pricing</h2>
          <p className="text-[#2B2F35]">Manage vehicle pricing. Changes apply instantly to the booking page.</p>
        </div>
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="px-4 py-2 bg-[#0074C8] text-white rounded-xl font-medium hover:bg-[#005da0] flex items-center gap-2"
          >
            <i className="ri-edit-line"></i> Edit Pricing
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-[#DDE2E9] text-[#2B2F35] rounded-xl font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-[#0074C8] text-white rounded-xl font-medium hover:bg-[#005da0] disabled:opacity-60 flex items-center gap-2"
            >
              {saving ? <><i className="ri-loader-4-line animate-spin"></i> Saving...</> : <><i className="ri-check-line"></i> Save Changes</>}
            </button>
          </div>
        )}
      </div>

      {status && (
        <div className={`mb-6 p-4 rounded-xl text-sm flex items-center gap-2 ${
          status.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          <i className={status.type === 'success' ? 'ri-check-line' : 'ri-error-warning-line'}></i>
          {status.message}
          <button onClick={() => setStatus(null)} className="ml-auto text-lg leading-none">&times;</button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {VEHICLE_KEYS.map((key) => (
          <div
            key={key}
            className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all ${
              editing ? 'border-[#0074C8]/30 shadow-md' : 'border-[#DDE2E9]'
            }`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#0074C8]/10 flex items-center justify-center">
                    <i className={`${VEHICLE_ICONS[key]} text-2xl text-[#0074C8]`}></i>
                  </div>
                  <div>
                    {editing ? (
                      <input
                        type="text"
                        value={editLabels[key] || ''}
                        onChange={(e) => setEditLabels((p) => ({ ...p, [key]: e.target.value }))}
                        className="font-bold text-[#0A0A0A] text-lg border-b-2 border-[#0074C8] bg-transparent focus:outline-none pb-0.5"
                      />
                    ) : (
                      <h3 className="font-bold text-[#0A0A0A] text-lg">{data?.labels[key] || key}</h3>
                    )}
                    <p className="text-sm text-[#2B2F35] mt-0.5">{VEHICLE_DESCRIPTIONS[key]}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#DDE2E9]">
                <span className="text-sm text-[#2B2F35] font-medium">Price per trip</span>
                {editing ? (
                  <div className="flex items-center gap-1">
                    <span className="text-[#2B2F35] font-medium">GHS</span>
                    <input
                      type="number"
                      min="0"
                      step="50"
                      value={editPrices[key] || ''}
                      onChange={(e) => setEditPrices((p) => ({ ...p, [key]: e.target.value }))}
                      className="w-28 text-right text-2xl font-bold text-[#0074C8] border-b-2 border-[#0074C8] bg-transparent focus:outline-none"
                    />
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-[#0074C8]">
                    {formatCurrency(data?.prices[key] ?? 0)}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gray-50 rounded-2xl border border-[#DDE2E9] p-6">
        <h3 className="font-bold text-[#0A0A0A] mb-2 flex items-center gap-2">
          <i className="ri-information-line text-[#0074C8]"></i> How pricing works
        </h3>
        <ul className="text-sm text-[#2B2F35] space-y-1.5">
          <li>Prices set here are used on the <strong>public booking page</strong> when customers select a vehicle.</li>
          <li>Existing bookings keep their original price. Only <strong>new bookings</strong> use the updated prices.</li>
          <li>For one-off special pricing, use the <strong>Invoice Amend</strong> feature on individual booking invoices.</li>
        </ul>
      </div>
    </div>
  );
}
