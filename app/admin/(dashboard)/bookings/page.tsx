
import { supabaseAdmin } from '@/lib/supabase/admin';
import { formatDate, formatCurrency } from '@/lib/utils';

import Link from 'next/link';

export default async function BookingsPage() {
    // Fetch bookings using Admin client to bypass RLS for this internal dashboard
    const { data: bookings, error } = await supabaseAdmin
        .from('bookings')
        .select('*')
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
                    <h2 className="text-3xl font-bold text-[#0A0A0A] mb-2">Bookings</h2>
                    <p className="text-[#2B2F35]">Manage and track all airport transfer reservations</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white border border-[#DDE2E9] rounded-xl text-[#2B2F35] font-medium hover:bg-gray-50 flex items-center gap-2">
                        <i className="ri-filter-3-line"></i> Filter
                    </button>
                    <button className="px-4 py-2 bg-[#0A0A0A] text-white rounded-xl font-medium hover:bg-[#2B2F35] flex items-center gap-2">
                        <i className="ri-download-line"></i> Export
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#DDE2E9] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#F8FAFB] border-b border-[#DDE2E9]">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-[#2B2F35] uppercase tracking-wider">Reference</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-[#2B2F35] uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-[#2B2F35] uppercase tracking-wider">Trip Info</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-[#2B2F35] uppercase tracking-wider">Vehicle</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-[#2B2F35] uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-[#2B2F35] uppercase tracking-wider">Price</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-[#2B2F35] uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#DDE2E9]">
                            {bookings?.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-[#2B2F35]">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                                                <i className="ri-inbox-line text-2xl"></i>
                                            </div>
                                            <p>No bookings found yet.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                bookings?.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-mono text-sm font-bold text-[#0A0A0A]">
                                                {booking.payment_reference || booking.id.substring(0, 8)}
                                            </div>
                                            <div className="text-xs text-[#2B2F35] mt-1">
                                                {formatDate(booking.created_at)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-bold text-[#0A0A0A]">{booking.customer_name}</div>
                                            <div className="text-xs text-[#2B2F35]">{booking.customer_email}</div>
                                            <div className="text-xs text-[#2B2F35]">{booking.customer_phone}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-xs">
                                                    <i className="ri-map-pin-line text-green-600"></i>
                                                    <span className="truncate max-w-[150px]" title={booking.pickup_location}>{booking.pickup_location}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs">
                                                    <i className="ri-map-pin-user-line text-red-600"></i>
                                                    <span className="truncate max-w-[150px]" title={booking.destination}>{booking.destination}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-[#0074C8] font-medium mt-1">
                                                    <i className="ri-time-line"></i>
                                                    {formatDate(booking.pickup_date)} at {booking.pickup_time}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 capitalize">
                                                {booking.vehicle_type}
                                            </span>
                                            <div className="text-xs text-[#2B2F35] mt-1">
                                                {booking.passengers} Pax • {booking.luggage} Bags
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${booking.status === 'paid' ? 'bg-green-100 text-green-800' :
                                                booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    booking.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-gray-100 text-gray-800'
                                                }`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-[#0A0A0A]">{formatCurrency(booking.price)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link href={`/admin/bookings/${booking.id}`} className="text-[#0074C8] hover:text-[#0097F2] p-2 inline-block">
                                                <i className="ri-eye-line text-xl"></i>
                                            </Link>
                                            <button className="text-gray-400 hover:text-red-500 p-2">
                                                <i className="ri-delete-bin-line text-xl"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="bg-gray-50 px-6 py-4 border-t border-[#DDE2E9] flex items-center justify-between">
                    <span className="text-sm text-[#2B2F35]">Showing {bookings?.length || 0} bookings</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 bg-white border border-[#DDE2E9] rounded-lg text-sm text-[#2B2F35] disabled:opacity-50" disabled>Previous</button>
                        <button className="px-3 py-1 bg-white border border-[#DDE2E9] rounded-lg text-sm text-[#2B2F35] disabled:opacity-50" disabled>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
