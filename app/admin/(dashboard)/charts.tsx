
'use client';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    AreaChart,
    Area
} from 'recharts';
import { formatCurrency } from '@/lib/utils'; // You might need to move formatCurrency to a client safe file or duplicate it for client components if it's not

interface DataPoint {
    name: string;
    value: number;
    color?: string;
}

interface ChartComponentProps {
    data: any[];
    type?: 'pie' | 'bar' | 'line' | 'area';
    dataKey?: string;
    title?: string;
    height?: number;
}

export function SimpleChart({ data, type = 'bar', dataKey = 'value', title, height = 300 }: ChartComponentProps) {
    if (!data || data.length === 0) {
        return (
            <div className="h-full flex items-center justify-center text-gray-400 min-h-[200px]">
                No data available
            </div>
        );
    }

    return (
        <div style={{ height }} className="w-full">
            {title && <h4 className="text-sm font-semibold text-gray-500 mb-4 text-center">{title}</h4>}
            <ResponsiveContainer width="100%" height="100%">
                {type === 'pie' ? (
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey={dataKey}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color || '#0074C8'} />
                            ))}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    </PieChart>
                ) : type === 'area' ? (
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0074C8" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#0074C8" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={(val) => `GHS ${val}`} />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            formatter={(value: number) => [`GHS ${value.toFixed(2)}`, 'Revenue']}
                        />
                        <Area type="monotone" dataKey={dataKey} stroke="#0074C8" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                ) : type === 'line' ? (
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                        <Line type="monotone" dataKey={dataKey} stroke="#0074C8" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                ) : (
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis hide />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                        <Bar dataKey={dataKey} radius={[4, 4, 0, 0]}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color || '#0074C8'} />
                            ))}
                        </Bar>
                    </BarChart>
                )}
            </ResponsiveContainer>
        </div>
    );
}

// Keep the old component for backward compatibility if needed, or update it to use the new flexible one
export default function DashboardCharts({ data }: { data: DataPoint[] }) {
    if (!data || data.length === 0) return <div>No Data</div>;
    // Old implementation composite chart
    return (
        <div className="h-full w-full flex flex-col md:flex-row gap-8">
            <div className="flex-1">
                <SimpleChart data={data} type="pie" title="Status Distribution" />
                <div className="flex justify-center gap-4 mt-2 flex-wrap">
                    {data.map((item) => (
                        <div key={item.name} className="flex items-center gap-2 text-xs">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                            <span className="text-gray-600">{item.name} ({item.value})</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex-1 hidden md:block">
                <SimpleChart data={data} type="bar" title="Volume by Status" />
            </div>
        </div>
    )
}
