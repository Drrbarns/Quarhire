import { VEHICLE_PRICES, VEHICLE_LABELS } from '@/lib/pricing';
import { formatCurrency } from '@/lib/utils';

const vehicleKeys = ['economy', 'executive', 'suv', 'van'] as const;

export default function VehiclesPage() {
    return (
        <div>
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-[#0A0A0A] mb-2">Vehicles</h2>
                    <p className="text-[#2B2F35]">Fleet and current pricing schedule</p>
                </div>
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
                                    <span className="font-medium text-[#0A0A0A]">{VEHICLE_LABELS[key]}</span>
                                </td>
                                <td className="px-6 py-4 text-sm text-[#2B2F35]">
                                    {key === 'economy' && '1–4 passengers, ideal for individuals or small groups'}
                                    {key === 'executive' && '1–4 passengers, Mini SUV comfort'}
                                    {key === 'suv' && '1–5 passengers, Premium SUV'}
                                    {key === 'van' && '1–7 passengers, Executive Mini Van'}
                                </td>
                                <td className="px-6 py-4 text-right font-bold text-[#0074C8]">
                                    {formatCurrency(VEHICLE_PRICES[key])}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="bg-gray-50 px-6 py-4 border-t border-[#DDE2E9] text-sm text-[#2B2F35]">
                    Pricing is updated in the app configuration. Changes here reflect across the booking page.
                </div>
            </div>
        </div>
    );
}
