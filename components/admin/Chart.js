// components/admin/Chart.js
'use client'

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts'
import { format } from 'date-fns'
import { TrendingUp } from 'lucide-react'

export default function Chart({ data, title }) {
    if (!data || data.length === 0) {
        return (
            <div className="bg-[#111111] border border-[#222222] rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-[#5B8C5A]" />
                    <h3 className="text-lg font-semibold text-white">{title}</h3>
                </div>
                <p className="text-[#888888] text-center py-8">No data available</p>
            </div>
        )
    }

    // Sort data by date (oldest to newest)
    const sortedData = [...data].sort((a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    )

    // Format data for Recharts
    const chartData = sortedData.map(item => ({
        ...item,
        formattedDate: format(new Date(item.date), 'MMM dd'),
        fullDate: format(new Date(item.date), 'EEE, MMM dd')
    }))

    // Custom tooltip
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#1A1A1A] border border-[#333333] rounded-lg p-3">
                    <p className="text-[#888888] text-xs mb-2">{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} className="text-sm" style={{ color: entry.color }}>
                            {entry.name}: {entry.value}
                        </p>
                    ))}
                </div>
            )
        }
        return null
    }

    return (
        <div className="bg-[#111111] border border-[#222222] rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-[#5B8C5A]" />
                <h3 className="text-lg font-semibold text-white">{title}</h3>
            </div>

            <ResponsiveContainer width="100%" height={400}>
                <AreaChart
                    data={chartData}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <defs>
                        <linearGradient id="pageViewsGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.5} />
                            <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                        </linearGradient>

                        <linearGradient id="visitorsGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#5B8C5A" stopOpacity={0.5} />
                            <stop offset="100%" stopColor="#5B8C5A" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#222222"
                        vertical={false}
                    />
                    <XAxis
                        dataKey="formattedDate"
                        stroke="#888888"
                        tick={{ fill: '#888888', fontSize: 12 }}
                        tickLine={{ stroke: '#333333' }}
                    />
                    <YAxis
                        stroke="#888888"
                        tick={{ fill: '#888888', fontSize: 12 }}
                        tickLine={{ stroke: '#333333' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        wrapperStyle={{
                            paddingTop: '20px'
                        }}
                        formatter={(value) => (
                            <span className="text-white text-sm">{value}</span>
                        )}
                    />
                    <Area
                        type="monotone"
                        dataKey="page_views"
                        name="Page Views"
                        stroke="#3B82F6"
                        fill="url(#pageViewsGradient)"
                        strokeWidth={3}
                    />
                    <Area
                        type="monotone"
                        dataKey="unique_visitors"
                        name="Unique Visitors"
                        stroke="#5B8C5A"
                        fill="url(#visitorsGradient)"
                        strokeWidth={3}
                    />
                </AreaChart>
            </ResponsiveContainer>

            {/* Summary Stats */}
            <div className="mt-6 pt-4 border-t border-[#222222] grid grid-cols-2 gap-4">
                <div>
                    <p className="text-[#888888] text-sm">Total Page Views</p>
                    <p className="text-white text-2xl font-semibold">
                        {sortedData.reduce((sum, item) => sum + item.page_views, 0)}
                    </p>
                </div>
                <div>
                    <p className="text-[#888888] text-sm">Total Unique Visitors</p>
                    <p className="text-white text-2xl font-semibold">
                        {sortedData.reduce((sum, item) => sum + item.unique_visitors, 0)}
                    </p>
                </div>
            </div>
        </div>
    )
}