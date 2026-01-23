
import { createClient } from '@/lib/supabase/server';
import { formatCurrency } from '@/lib/utils';
import { redirect } from 'next/navigation';

// Recharts components will need to be client-side, 
// so we'll fetch data here and pass it to a client component
import DashboardCharts from './charts';

export default async function DashboardOverview() {
    const supabase = await createClient();

    // Verify auth again (middleware handles it, but good practice)
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/admin/login');

    // Fetch all bookings
    const { data: bookings, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        return <div>Error loading data</div>;
    }

    // Calculate Metrics
    const totalBookings = bookings.length;
    const totalRevenue = bookings
        .filter(b => b.status === 'paid' || b.status === 'completed')
        .reduce((sum, b) => sum + (parseFloat(b.price) || 0), 0);

    const activeBookings = bookings.filter(b => ['pending', 'paid', 'confirmed'].includes(b.status)).length;
    const recentBookings = bookings.slice(0, 5);

    // Group by Status for Charts
    const statusDistribution = [
        { name: 'Paid', value: bookings.filter(b => b.status === 'paid').length, color: '#10B981' },
        { name: 'Pending', value: bookings.filter(b => b.status === 'pending').length, color: '#F59E0B' },
        { name: 'Confirmed', value: bookings.filter(b => b.status === 'confirmed').length, color: '#3B82F6' },
        { name: 'Cancelled', value: bookings.filter(b => b.status === 'cancelled').length, color: '#EF4444' },
    ].filter(i => i.value > 0);

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div>
                <h2 className="text-3xl font-bold text-[#0A0A0A]">Overview</h2>
                <p className="text-[#2B2F35]">Welcome back, Admin. Here's what's happening today.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-[#DDE2E9] shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-[#2B2F35] uppercase">Total Revenue</h3>
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                            <i className="ri-money-dollar-circle-line text-xl"></i>
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-[#0A0A0A]">{formatCurrency(totalRevenue)}</div>
                    <div className="text-xs text-green-600 font-medium mt-1">+12% from last month</div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#DDE2E9] shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-[#2B2F35] uppercase">Total Bookings</h3>
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                            <i className="ri-taxi-line text-xl"></i>
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-[#0A0A0A]">{totalBookings}</div>
                    <div className="text-xs text-blue-600 font-medium mt-1">Lifetime bookings</div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#DDE2E9] shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-[#2B2F35] uppercase">Active Requests</h3>
                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600">
                            <i className="ri-time-line text-xl"></i>
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-[#0A0A0A]">{activeBookings}</div>
                    <div className="text-xs text-gray-400 font-medium mt-1">Pending fulfillment</div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#DDE2E9] shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-[#2B2F35] uppercase">Conversion Rate</h3>
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                            <i className="ri-bar-chart-line text-xl"></i>
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-[#0A0A0A]">
                        {totalBookings > 0 ? Math.round((bookings.filter(b => b.status === 'paid').length / totalBookings) * 100) : 0}%
                    </div>
                    <div className="text-xs text-purple-600 font-medium mt-1">Paid bookings</div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Charts Section */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-[#DDE2E9] shadow-sm">
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-[#0A0A0A]">Booking Analytics</h3>
                    </div>
                    <div className="h-[300px]">
                        <DashboardCharts data={statusDistribution} />
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white p-6 rounded-2xl border border-[#DDE2E9] shadow-sm">
                    <h3 className="text-lg font-bold text-[#0A0A0A] mb-6">Recent Bookings</h3>
                    <div className="space-y-6">
                        {recentBookings.map((booking) => (
                            <div key={booking.id} className="flex items-start gap-4 pb-6 border-b border-dashed border-[#DDE2E9] last:border-0 last:pb-0">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${booking.status === 'paid' ? 'bg-green-100 text-green-600' :
                                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                                            'bg-gray-100 text-gray-600'
                                    }`}>
                                    <i className={`ri-${booking.status === 'paid' ? 'check-double-line' : 'loader-4-line'} text-xl`}></i>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-[#0A0A0A]">{booking.customer_name}</p>
                                    <p className="text-xs text-[#2B2F35] mt-1">
                                        Booked {booking.vehicle_type} from {booking.pickup_location}
                                    </p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-100 rounded text-gray-600 uppercase tracking-wide">
                                            {booking.payment_reference?.split('-')[2] || 'REF'}
                                        </span>
                                        <span className="text-xs font-semibold text-[#0074C8]">
                                            {formatCurrency(booking.price)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {recentBookings.length === 0 && (
                            <p className="text-gray-400 text-center py-4">No recent activity</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
