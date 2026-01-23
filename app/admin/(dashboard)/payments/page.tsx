import { supabaseAdmin } from '@/lib/supabase/admin';
import { formatCurrency, formatDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function PaymentsPage({
    searchParams
}: {
    searchParams: Promise<{ tab?: string }>
}) {
    const { tab } = await searchParams;
    const activeTab = tab || 'transactions';

    // Fetch Transactions (Successful Bookings)
    const { data: transactions, error: txError } = await supabaseAdmin
        .from('bookings')
        .select('*')
        .in('status', ['paid', 'completed'])
        .order('created_at', { ascending: false });

    // Fetch Raw Hubtel Logs
    const { data: logs, error: logsError } = await supabaseAdmin
        .from('hubtel_callbacks')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-[#0A0A0A] mb-2">Payments</h2>
                    <p className="text-[#2B2F35]">Monitor transactions and gateway logs</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-[#DDE2E9] flex items-center gap-6">
                <a
                    href="/admin/payments?tab=transactions"
                    className={`pb-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'transactions'
                        ? 'border-[#0074C8] text-[#0074C8]'
                        : 'border-transparent text-gray-500 hover:text-[#0A0A0A]'
                        }`}
                >
                    Successful Transactions
                </a>
                <a
                    href="/admin/payments?tab=logs"
                    className={`pb-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'logs'
                        ? 'border-[#0074C8] text-[#0074C8]'
                        : 'border-transparent text-gray-500 hover:text-[#0A0A0A]'
                        }`}
                >
                    Hubtel Callbacks (Raw Logs)
                </a>
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl border border-[#DDE2E9] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    {activeTab === 'transactions' ? (
                        <table className="w-full">
                            <thead className="bg-[#F8FAFB] border-b border-[#DDE2E9]">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-[#2B2F35] uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-[#2B2F35] uppercase tracking-wider">Ref / Transaction ID</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-[#2B2F35] uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-[#2B2F35] uppercase tracking-wider">Method</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-[#2B2F35] uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-4 text-center text-xs font-bold text-[#2B2F35] uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#DDE2E9]">
                                {transactions && transactions.length > 0 ? transactions.map(tx => (
                                    <tr key={tx.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-xs text-[#2B2F35]">
                                            {formatDate(tx.created_at)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-mono text-sm font-bold text-[#0A0A0A]">{tx.payment_reference}</div>
                                            <div className="text-xs text-gray-400 font-mono mt-0.5">{tx.hubtel_transaction_id}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0A0A0A]">
                                            {tx.customer_name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-xs text-[#2B2F35]">
                                            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">Hubtel Pay</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-[#0A0A0A]">
                                            {formatCurrency(Number(tx.price))}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 uppercase tracking-wide">
                                                Paid
                                            </span>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                                            No successfull transactions found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    ) : (
                        // LOGS VIEW
                        <table className="w-full">
                            <thead className="bg-[#F8FAFB] border-b border-[#DDE2E9]">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-[#2B2F35] uppercase tracking-wider">Time</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-[#2B2F35] uppercase tracking-wider">Checkout ID</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-[#2B2F35] uppercase tracking-wider">Client Ref</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-[#2B2F35] uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-[#2B2F35] uppercase tracking-wider">Raw Payload</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#DDE2E9]">
                                {logs && logs.length > 0 ? logs.map((log: any) => (
                                    <tr key={log.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-xs text-[#2B2F35] font-mono">
                                            {new Date(log.created_at).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-mono font-bold">
                                            {log.checkout_id || '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-gray-600">
                                            {log.client_reference || '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium font-mono ${log.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                {log.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <details className="group">
                                                <summary className="text-xs text-[#0074C8] cursor-pointer hover:underline list-none">
                                                    <span className="group-open:hidden">View JSON</span>
                                                    <span className="hidden group-open:inline">Hide</span>
                                                </summary>
                                                <pre className="mt-2 p-2 bg-gray-900 text-green-400 rounded text-[10px] overflow-auto max-w-xs md:max-w-md max-h-40">
                                                    {log.payload ? JSON.stringify(log.payload, null, 2) : 'No payload'}
                                                </pre>
                                            </details>
                                        </td>
                                    </tr>
                                )) : (
                                    // Provide a clearer message if table not found (migration needed)
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                            {logsError ? (
                                                <div className="flex flex-col items-center gap-2">
                                                    <i className="ri-database-2-line text-2xl text-red-400"></i>
                                                    <span>Table `hubtel_callbacks` not found or permission denied.</span>
                                                    <span className="text-xs">Please run the SQL migration from SUPABASE_FINANCE_SETUP.md</span>
                                                </div>
                                            ) : (
                                                'No callback logs found yet.'
                                            )}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
