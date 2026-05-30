// components/admin/TopPagesBarChart.js
'use client'

import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { TrendingUp, Eye, Award, TrendingDown } from 'lucide-react'

export default function TopPagesBarChart({ topPages }) {
    const [hoveredBar, setHoveredBar] = useState(null)

    if (!topPages || topPages.length === 0) {
        return (
            <div className="bg-[#111111] border border-[#222222] rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-[#5B8C5A]" />
                    <h3 className="text-lg font-semibold text-white">Most Visited Pages</h3>
                </div>
                <p className="text-[#888888] text-center py-8">No page data available</p>
            </div>
        )
    }

    const total = topPages.reduce((sum, page) => sum + page.count, 0)
    const maxCount = Math.max(...topPages.map(page => page.count))

    // Prepare chart data with percentages
    const chartData = topPages.map((page, index) => ({
        name: page.page_visited || 'Homepage',
        shortName: (page.page_visited || 'Homepage').length > 20
            ? (page.page_visited || 'Homepage').substring(0, 17) + '...'
            : (page.page_visited || 'Homepage'),
        count: page.count,
        percentage: ((page.count / total) * 100).toFixed(1),
        rank: index + 1
    }))

    // Gradient colors based on rank
    const getBarColor = (rank) => {
        const colors = [
            '#5B8C5A', // 1st - Green
            '#3B82F6', // 2nd - Blue
            '#8B5CF6', // 3rd - Purple
            '#EC4899', // 4th - Pink
            '#F59E0B', // 5th - Orange
            '#6B7280'  // 6th+ - Gray
        ]
        return colors[Math.min(rank - 1, colors.length - 1)]
    }

    // Custom Tooltip
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload
            return (
                <div className="bg-[#1A1A1A] border border-[#333333] rounded-lg p-4 shadow-xl">
                    <div className="flex items-center gap-2 mb-2">
                        <Award className="w-4 h-4 text-[#5B8C5A]" />
                        <p className="text-white font-semibold">{data.name}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-[#888888]">
                            <span className="text-white font-semibold">{data.count}</span> visits
                        </p>
                        <p className="text-sm text-[#888888]">
                            <span className="text-white font-semibold">{data.percentage}%</span> of total traffic
                        </p>
                        <p className="text-xs text-[#5B8C5A] mt-1">
                            Rank #{data.rank}
                        </p>
                    </div>
                </div>
            )
        }
        return null
    }

    return (
        <div className="bg-[#111111] border border-[#222222] rounded-xl p-6 col-span-1 xl:col-span-2">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#5B8C5A]" />
                    <h3 className="text-lg font-semibold text-white">Most Visited Pages</h3>
                </div>
                <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-[#5B8C5A]"></div>
                        <span className="text-[#888888]">Most Popular</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-[#6B7280]"></div>
                        <span className="text-[#888888]">Less Popular</span>
                    </div>
                </div>
            </div>

            {/* Bar Chart */}
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={chartData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                    barSize={30}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#222222"
                        horizontal={false}
                    />
                    <XAxis
                        type="number"
                        stroke="#888888"
                        tick={{ fill: '#888888', fontSize: 12 }}
                        tickLine={{ stroke: '#333333' }}
                        axisLine={{ stroke: '#333333' }}
                        label={{
                            value: 'Number of Visits',
                            position: 'bottom',
                            fill: '#888888',
                            fontSize: 12,
                            offset: 0
                        }}
                    />
                    <YAxis
                        type="category"
                        dataKey="shortName"
                        stroke="#888888"
                        tick={{ fill: '#888888', fontSize: 12 }}
                        tickLine={{ stroke: '#333333' }}
                        axisLine={{ stroke: '#333333' }}
                        width={100}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1A1A1A' }} />
                    <Bar
                        dataKey="count"
                        radius={[0, 4, 4, 0]}
                        animationBegin={0}
                        animationDuration={1000}
                        animationEasing="ease-out"
                        onMouseEnter={(data) => setHoveredBar(data.rank)}
                        onMouseLeave={() => setHoveredBar(null)}
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={getBarColor(entry.rank)}
                                opacity={hoveredBar ? (hoveredBar === entry.rank ? 1 : 0.6) : 0.85}
                                style={{
                                    cursor: 'pointer',
                                    transition: 'opacity 0.2s ease-in-out'
                                }}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>

            {/* Summary Stats */}
            <div className="mt-6 pt-4 border-t border-[#222222] grid grid-cols-3 gap-4">
                <div>
                    <p className="text-[#888888] text-xs">Total Pages Views</p>
                    <p className="text-white text-xl font-semibold">{total}</p>
                </div>
                <div>
                    <p className="text-[#888888] text-xs">Most Popular Page</p>
                    <p className="text-white text-sm font-semibold truncate" title={chartData[0]?.name}>
                        {chartData[0]?.name}
                    </p>
                    <p className="text-[#5B8C5A] text-xs">{chartData[0]?.count} visits</p>
                </div>
                <div>
                    <p className="text-[#888888] text-xs">Top Page Share</p>
                    <p className="text-white text-xl font-semibold">{chartData[0]?.percentage}%</p>
                    <p className="text-[#888888] text-xs">of total traffic</p>
                </div>
            </div>

            {/* Alternative: Compact List View (optional - can be toggled) */}
            <details className="mt-4">
                <summary className="text-xs text-[#5B8C5A] cursor-pointer hover:text-[#7CB342] transition-colors">
                    View detailed breakdown
                </summary>
                <div className="mt-3 space-y-2">
                    {chartData.map((page) => (
                        <div key={page.name} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <span className="text-[#888888] w-6">#{page.rank}</span>
                                <span className="text-white">{page.name}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-[#888888]">{page.count} views</span>
                                <span className="text-[#5B8C5A] w-12 text-right">{page.percentage}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </details>
        </div>
    )
}