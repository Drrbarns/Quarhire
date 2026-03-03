import { supabaseAdmin } from '@/lib/supabase/admin';
import { VEHICLE_PRICES, VEHICLE_LABELS } from '@/lib/pricing';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const vehicleKeys = ['economy', 'executive', 'suv', 'van'] as const;

const VEHICLE_DESCRIPTIONS: Record<string, string> = {
    economy: '1–4 passengers, ideal for individuals or small groups',
    executive: '1–4 passengers, Mini SUV comfort',
    suv: '1–5 passengers, Premium SUV',
    van: '1–7 passengers, Executive Mini Van',
};

async function getPricing() {
    try {
        const { data, error } = await supabaseAdmin
            .from('vehicle_pricing')
            .select('vehicle_key, label, price');

        if (!error && data && data.length > 0) {
            const prices: Record<string, number> = {};
            const labels: Record<string, string> = {};
            for (const row of data) {
                prices[row.vehicle_key] = Number(row.price);
                labels[row.vehicle_key] = row.label;
            }
            return { prices, labels };
        }
    } catch {}
    return { prices: VEHICLE_PRICES, labels: VEHICLE_LABELS };
}

export default async function VehiclesPage() {
    const { prices, labels } = await getPricing();

    return (
        <div>
            <div className="flex flex-wrap justify-between items-end mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-[#0A0A0A] mb-2">Vehicles</h2>
                    <p className="text-[#2B2F35]">Fleet and current pricing schedule</p>
                </div>
                <Link
                    href="/admin/pricing"
                    className="px-4 py-2 bg-[#0074C8] text-white rounded-xl font-medium hover:bg-[#005da0] flex items-center gap-2"
                >
                    <i className="ri-price-tag-3-line"></i> Edit Pricing
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-[#DDE2E9] shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-[#F8FAFB] border-b border-[#DDE2E9]">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-[#2B2F35] uppercase tracking-wider">Vehicle Type</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-[#2B2F35] uppercase tracking-wider">Description</th>
                            <th className="px-6 py-4 text-right text-xs font-bold text-[#2B2F35] uppercase tracking-wider">Price (GHS)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#DDE2E9]">
                        {vehicleKeys.map((key) => (
                            <tr key={key} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <span className="font-medium text-[#0A0A0A]">{labels[key] || VEHICLE_LABELS[key]}</span>
                                </td>
                                <td className="px-6 py-4 text-sm text-[#2B2F35]">
                                    {VEHICLE_DESCRIPTIONS[key]}
                                </td>
                                <td className="px-6 py-4 text-right font-bold text-[#0074C8]">
                                    {formatCurrency(prices[key] ?? VEHICLE_PRICES[key])}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="bg-gray-50 px-6 py-4 border-t border-[#DDE2E9] text-sm text-[#2B2F35]">
                    Pricing is managed from the <Link href="/admin/pricing" className="text-[#0074C8] hover:underline font-medium">Pricing</Link> page. Changes reflect across the booking page.
                </div>
            </div>
        </div>
    );
}
