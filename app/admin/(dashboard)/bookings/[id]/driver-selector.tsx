
'use client';

import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';

export default function DriverSelector({
    bookingId,
    currentDriverId,
    drivers
}: {
    bookingId: string,
    currentDriverId: string | null,
    drivers: any[]
}) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedDriver, setSelectedDriver] = useState(currentDriverId || '');
    const router = useRouter();
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const handleAssign = async () => {
        setIsUpdating(true);
        try {
            const { error } = await supabase
                .from('bookings')
                .update({
                    driver_id: selectedDriver || null,
                    // If assigning a driver, update status to confirmed if it was pending/paid
                    // status: selectedDriver ? 'confirmed' : 'pending' // Optional logic
                })
                .eq('id', bookingId);

            if (error) throw error;
            router.refresh();
        } catch (error) {
            console.error(error);
            alert('Failed to assign driver');
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-[#DDE2E9] shadow-sm p-6">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">Driver Assignment</h3>

            <div className="space-y-4">
                <div>
                    <select
                        value={selectedDriver}
                        onChange={(e) => setSelectedDriver(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0074C8] bg-gray-50 text-sm"
                        disabled={isUpdating}
                    >
                        <option value="">-- Select a Driver --</option>
                        {drivers.map(driver => (
                            <option key={driver.id} value={driver.id}>
                                {driver.name} {driver.vehicle_model ? `(${driver.vehicle_model})` : ''}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedDriver !== (currentDriverId || '') && (
                    <button
                        onClick={handleAssign}
                        disabled={isUpdating}
                        className="w-full py-2 bg-[#0074C8] text-white rounded-lg font-medium hover:bg-[#005da0] transition-colors text-sm disabled:opacity-50"
                    >
                        {isUpdating ? 'Updating...' : 'Confirm Assignment'}
                    </button>
                )}

                {currentDriverId && selectedDriver === currentDriverId && (
                    <div className="flex items-center gap-3 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
                        <i className="ri-check-double-line"></i>
                        Driver assigned
                    </div>
                )}
            </div>
        </div>
    );
}
