
import { supabaseAdmin } from '@/lib/supabase/admin';
import { formatCurrency } from '@/lib/utils';
import { SimpleChart } from '../charts';

// Helper to get day name
const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
};

export default async function FinancePage() {
    // Fetch all paid bookings
    const { data: bookings, error } = await supabaseAdmin
        .from('bookings')
        .select('*')
        .in('status', ['paid', 'completed', 'confirmed']);

    if (error) return <div className="p-4 text-red-500">Error loading finance data</div>;

    // --- Calculations ---

    const totalRevenue = bookings.reduce((sum, b) => sum + (Number(b.price) || 0), 0);

    // Monthly Revenue (Current Month)
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const monthlyRevenue = bookings
        .filter(b => {
            const d = new Date(b.created_at);
            return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
        })
        .reduce((sum, b) => sum + (Number(b.price) || 0), 0);

    // Today's Revenue
    const todayStr = now.toISOString().split('T')[0];
    const dailyRevenue = bookings
        .filter(b => b.created_at.startsWith(todayStr))
        .reduce((sum, b) => sum + (Number(b.price) || 0), 0);

    // Revenue by Vehicle Type
    const revenueByVehicle: Record<string, number> = {};
    bookings.forEach(b => {
        const v = b.vehicle_type || 'Unknown';
        revenueByVehicle[v] = (revenueByVehicle[v] || 0) + (Number(b.price) || 0);
    });
    const vehicleChartData = Object.entries(revenueByVehicle).map(([name, value], index) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
        color: ['#0074C8', '#10B981', '#F59E0B', '#8B5CF6'][index % 4]
    }));

    // Revenue Trend (Last 7 Days - Mocking real dates if sparse, or just aggregating actuals)
    // For simplicity, let's group actual bookings by date
    const revenueByDate: Record<string, number> = {};
    // Initialize last 7 days with 0
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0]; // YYYY-MM-DD
        revenueByDate[dateStr] = 0;
    }

    bookings.forEach(b => {
        const dateStr = b.created_at.split('T')[0];
        if (revenueByDate[dateStr] !== undefined) {
            revenueByDate[dateStr] += (Number(b.price) || 0);
        }
    });

    const trendData = Object.entries(revenueByDate).map(([date, value]) => ({
        name: getDayName(date), // 'Mon', 'Tue'
        fullDate: date,
        value
    }));


    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-[#0A0A0A] mb-2">Finance</h2>
                    <p className="text-[#2B2F35]">Financial overview and revenue reports</p>
                </div>
                <button className="px-4 py-2 bg-[#0A0A0A] text-white rounded-xl font-medium hover:bg-[#2B2F35] flex items-center gap-2">
                    <i className="ri-download-2-line"></i> Export Report
                </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-[#DDE2E9] shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">Total Revenue</p>
                            <h3 className="text-3xl font-bold text-[#0A0A0A] mt-1">{formatCurrency(totalRevenue)}</h3>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                            <i className="ri-wallet-3-line text-2xl"></i>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-green-600">
                        <i className="ri-arrow-up-line"></i>
                        <span>Lifetime Earnings</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#DDE2E9] shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">This Month</p>
                            <h3 className="text-3xl font-bold text-[#0A0A0A] mt-1">{formatCurrency(monthlyRevenue)}</h3>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                            <i className="ri-calendar-check-line text-2xl"></i>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-blue-600">
                        <span>Current billing period</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#DDE2E9] shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">Today</p>
                            <h3 className="text-3xl font-bold text-[#0A0A0A] mt-1">{formatCurrency(dailyRevenue)}</h3>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                            <i className="ri-sun-line text-2xl"></i>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-purple-600">
                        <span>Daily performance</span>
                    </div>
                </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl border border-[#DDE2E9] shadow-sm">
                    <h3 className="text-lg font-bold text-[#0A0A0A] mb-6">Revenue Trend (Last 7 Days)</h3>
                    <div className="h-[300px]">
                        <SimpleChart data={trendData} type="area" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#DDE2E9] shadow-sm">
                    <h3 className="text-lg font-bold text-[#0A0A0A] mb-6">Revenue by Vehicle Class</h3>
                    <div className="h-[300px]">
                        <SimpleChart data={vehicleChartData} type="pie" />
                    </div>
                    <div className="flex justify-center flex-wrap gap-4 mt-4">
                        {vehicleChartData.map(d => (
                            <div key={d.name} className="flex items-center gap-2 text-xs">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></div>
                                <span className="font-medium">{d.name}</span>
                                <span className="text-gray-500">({formatCurrency(d.value)})</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Transactions Table Preview */}
            <div className="bg-white rounded-2xl border border-[#DDE2E9] shadow-sm overflow-hidden">
                <div className="p-6 border-b border-[#DDE2E9] flex justify-between items-center">
                    <h3 className="text-lg font-bold text-[#0A0A0A]">Recent Transactions</h3>
                    <a href="/admin/payments" className="text-sm text-[#0074C8] hover:underline font-medium">View All Payments</a>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#F8FAFB] border-b border-[#DDE2E9]">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-[#2B2F35] uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-[#2B2F35] uppercase tracking-wider">Transaction ID</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-[#2B2F35] uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-[#2B2F35] uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-[#2B2F35] uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#DDE2E9]">
                            {bookings.slice(0, 5).map(b => (
                                <tr key={b.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-xs text-[#2B2F35] font-mono">
                                        {new Date(b.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-xs font-bold text-[#0A0A0A] font-mono">
                                        {b.hubtel_transaction_id || b.payment_reference?.split('-').slice(1).join('-')}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[#0A0A0A]">
                                        {b.customer_name}
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm font-bold text-[#0A0A0A]">
                                        {formatCurrency(Number(b.price))}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            Paid
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
