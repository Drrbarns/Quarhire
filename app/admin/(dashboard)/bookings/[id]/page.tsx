
import { supabaseAdmin } from '@/lib/supabase/admin';
import { formatDate, formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import DriverSelector from './driver-selector';

export default async function BookingDetailsPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    const { data: booking, error } = await supabaseAdmin
        .from('bookings')
        .select('*')
        .eq('id', id)
        .single();

    // Fetch active drivers to populate selection if drivers table exists
    let drivers = [];
    try {
        const { data } = await supabaseAdmin
            .from('drivers')
            .select('*')
            .eq('status', 'active');
        drivers = data || [];
    } catch (e) {
        // Table might not exist yet
        console.warn('Drivers table access failed', e);
    }

    if (error || !booking) {
        return (
            <div className="p-8 text-center">
                <h2 className="text-xl font-bold text-red-600">Booking Not Found</h2>
                <Link href="/admin/bookings" className="text-blue-600 hover:underline mt-4 inline-block">
                    Return to Bookings
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Link href="/admin/bookings" className="text-gray-400 hover:text-gray-600">
                            <i className="ri-arrow-left-line text-xl"></i>
                        </Link>
                        <h1 className="text-2xl font-bold text-[#0A0A0A]">Booking Details</h1>
                    </div>
                    <p className="text-[#2B2F35] ml-8">Reference: <span className="font-mono font-bold">{booking.payment_reference}</span></p>
                </div>

                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white border border-[#DDE2E9] rounded-xl text-red-600 font-medium hover:bg-red-50 flex items-center gap-2">
                        <i className="ri-close-circle-line"></i> Cancel Booking
                    </button>
                    <button className="px-4 py-2 bg-[#0A0A0A] text-white rounded-xl font-medium hover:bg-[#2B2F35] flex items-center gap-2">
                        <i className="ri-mail-send-line"></i> Resend Email
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl border border-[#DDE2E9] shadow-sm p-6">
                        <h3 className="text-lg font-bold text-[#0A0A0A] mb-4 pb-4 border-b border-[#DDE2E9]">Trip Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Pickup</label>
                                <div className="flex items-start gap-2 text-[#0A0A0A] font-medium">
                                    <i className="ri-map-pin-line text-green-600 mt-1"></i>
                                    <span>{booking.custom_pickup_location || booking.pickup_location}</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Destination</label>
                                <div className="flex items-start gap-2 text-[#0A0A0A] font-medium">
                                    <i className="ri-map-pin-user-line text-red-600 mt-1"></i>
                                    <span>{booking.custom_destination || booking.destination}</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Date & Time</label>
                                <div className="flex items-start gap-2 text-[#0A0A0A] font-medium">
                                    <i className="ri-calendar-event-line text-[#0074C8] mt-1"></i>
                                    <span>{formatDate(booking.pickup_date)} at {booking.pickup_time}</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Flight Details</label>
                                <div className="text-[#0A0A0A]">
                                    {booking.airline || booking.flight_number ? (
                                        <span>{booking.airline} {booking.flight_number}</span>
                                    ) : (
                                        <span className="text-gray-400 italic">No flight info provided</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-[#DDE2E9] shadow-sm p-6">
                        <h3 className="text-lg font-bold text-[#0A0A0A] mb-4 pb-4 border-b border-[#DDE2E9]">Vehicle & Passengers</h3>
                        <div className="flex items-center gap-6 mb-6">
                            <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center text-[#0074C8]">
                                <i className="ri-roadster-line text-3xl"></i>
                            </div>
                            <div>
                                <h4 className="text-xl font-bold capitalize">{booking.vehicle_type}</h4>
                                <p className="text-gray-500">Standard Class</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-gray-50 rounded-xl">
                                <span className="block text-xs text-gray-500">Passengers</span>
                                <span className="font-bold text-[#0A0A0A]">{booking.passengers} Adults</span>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-xl">
                                <span className="block text-xs text-gray-500">Luggage</span>
                                <span className="font-bold text-[#0A0A0A]">{booking.luggage} Bags</span>
                            </div>
                        </div>
                        {booking.special_requests && (
                            <div className="mt-6">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Special Requests</label>
                                <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-xl text-sm text-yellow-800">
                                    "{booking.special_requests}"
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    {/* DRIVER ASSIGNMENT WIDGET */}
                    <DriverSelector
                        bookingId={booking.id}
                        currentDriverId={booking.driver_id}
                        drivers={drivers || []}
                    />

                    <div className="bg-white rounded-2xl border border-[#DDE2E9] shadow-sm p-6">
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">Payment Status</h3>
                        <div className={`mb-6 p-4 rounded-xl flex items-center justify-between ${booking.status === 'paid' ? 'bg-green-50 text-green-700' :
                            booking.status === 'pending' ? 'bg-yellow-50 text-yellow-700' :
                                'bg-gray-50 text-gray-700'
                            }`}>
                            <span className="font-bold capitalize flex items-center gap-2">
                                <i className={`ri-${booking.status === 'paid' ? 'check-line' : 'time-line'}`}></i>
                                {booking.status}
                            </span>
                            <span className="font-bold">{formatCurrency(booking.price)}</span>
                        </div>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-500">Subtotal</span>
                                <span className="font-medium text-[#0A0A0A]">{formatCurrency(booking.price)}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-500">Tax</span>
                                <span className="font-medium text-[#0A0A0A]">{formatCurrency(0)}</span>
                            </div>
                            <div className="flex justify-between pt-2">
                                <span className="font-bold text-[#0A0A0A]">Total Paid</span>
                                <span className="font-bold text-[#0074C8] text-lg">{formatCurrency(booking.price)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-[#DDE2E9] shadow-sm p-6">
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">Customer Details</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                    <i className="ri-user-line"></i>
                                </div>
                                <div>
                                    <p className="font-bold text-[#0A0A0A]">{booking.customer_name}</p>
                                    <p className="text-xs text-green-600">New Customer</p>
                                </div>
                            </div>
                            <div>
                                <a href={`mailto:${booking.customer_email}`} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                                    <i className="ri-mail-line text-gray-400"></i>
                                    <span className="text-sm text-[#2B2F35] truncate">{booking.customer_email}</span>
                                </a>
                                <a href={`tel:${booking.customer_phone}`} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                                    <i className="ri-phone-line text-gray-400"></i>
                                    <span className="text-sm text-[#2B2F35]">{booking.customer_phone}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
