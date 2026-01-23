
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
    Cell
} from 'recharts';

interface ChartProps {
    data: {
        name: string;
        value: number;
        color: string;
    }[];
}

export default function DashboardCharts({ data }: ChartProps) {
    if (!data || data.length === 0) {
        return (
            <div className="h-full flex items-center justify-center text-gray-400">
                No data available for visualization
            </div>
        );
    }

    return (
        <div className="h-full w-full flex flex-col md:flex-row gap-8">
            <div className="flex-1 h-full min-h-[250px]">
                <h4 className="text-sm font-semibold text-gray-500 mb-4 text-center">Status Distribution</h4>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 mt-2">
                    {data.map((item) => (
                        <div key={item.name} className="flex items-center gap-2 text-xs">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                            <span className="text-gray-600">{item.name} ({item.value})</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-1 h-full min-h-[250px] hidden md:block">
                <h4 className="text-sm font-semibold text-gray-500 mb-4 text-center">Volume by Status</h4>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis hide />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
