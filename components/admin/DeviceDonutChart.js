// components/admin/DeviceDonutChart.js
'use client'

import { useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { Smartphone, Tablet, Monitor, TrendingUp } from 'lucide-react'

const DEVICE_CONFIG = {
    mobile: {
        icon: Smartphone,
        color: '#5B8C5A',
        gradient: ['#5B8C5A', '#7CB342'],
        label: 'Mobile'
    },
    tablet: {
        icon: Tablet,
        color: '#3B82F6',
        gradient: ['#3B82F6', '#60A5FA'],
        label: 'Tablet'
    },
    desktop: {
        icon: Monitor,
        color: '#8B5CF6',
        gradient: ['#8B5CF6', '#A78BFA'],
        label: 'Desktop'
    }
}

export default function DeviceDonutChart({ deviceStats }) {
    const [hoveredDevice, setHoveredDevice] = useState(null)

    if (!deviceStats || deviceStats.length === 0) {
        return (
            <div className="bg-[#111111] border border-[#222222] rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-[#5B8C5A]" />
                    <h3 className="text-lg font-semibold text-white">Device Distribution</h3>
                </div>
                <p className="text-[#888888] text-center py-8">No device data available</p>
            </div>
        )
    }

    // Calculate total and prepare chart data
    const total = deviceStats.reduce((sum, device) => sum + device.count, 0)

    const chartData = deviceStats.map(device => ({
        name: DEVICE_CONFIG[device.device_type]?.label || device.device_type,
        value: device.count,
        percentage: ((device.count / total) * 100).toFixed(1),
        device_type: device.device_type,
        count: device.count
    }))

    // Custom Tooltip
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload
            return (
                <div className="bg-[#1A1A1A] border border-[#333333] rounded-lg p-3 shadow-xl z-50">
                    <div className="flex items-center gap-2 mb-2">
                        {(() => {
                            const DeviceIcon = DEVICE_CONFIG[data.device_type]?.icon || Monitor
                            return <DeviceIcon className="w-4 h-4" style={{ color: payload[0].color }} />
                        })()}
                        <p className="text-white font-semibold">{data.name}</p>
                    </div>
                    <p className="text-sm text-[#888888]">
                        <span className="text-white">{data.count}</span> visits ({data.percentage}%)
                    </p>
                </div>
            )
        }
        return null
    }

    // Custom Legend
    const renderLegend = (props) => {
        const { payload } = props
        return (
            <div className="flex flex-wrap justify-center gap-4 mt-6">
                {payload.map((entry, index) => {
                    const deviceType = chartData.find(d => d.name === entry.value)?.device_type
                    const DeviceIcon = deviceType ? DEVICE_CONFIG[deviceType]?.icon : Monitor
                    const percentage = chartData.find(d => d.name === entry.value)?.percentage

                    return (
                        <div
                            key={`legend-${index}`}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1A1A1A] border border-[#222222]"
                            onMouseEnter={() => setHoveredDevice(deviceType)}
                            onMouseLeave={() => setHoveredDevice(null)}
                        >
                            <DeviceIcon className="w-3.5 h-3.5" style={{ color: entry.color }} />
                            <span className="text-sm text-[#888888]">{entry.value}</span>
                            <span className="text-sm font-semibold text-white">{percentage}%</span>
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div className="bg-[#111111] border border-[#222222] rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
                <Smartphone className="w-5 h-5 text-[#5B8C5A]" />
                <h3 className="text-lg font-semibold text-white">Device Distribution</h3>
            </div>

            <div className="relative h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={75}
                            outerRadius={110}
                            paddingAngle={4}
                            onMouseEnter={(_, index) =>
                                setHoveredDevice(chartData[index].device_type)
                            }
                            onMouseLeave={() => setHoveredDevice(null)}
                        >
                            {chartData.map((entry) => (
                                <Cell
                                    key={entry.device_type}
                                    fill={
                                        DEVICE_CONFIG[entry.device_type]?.color || "#888888"
                                    }
                                    opacity={
                                        hoveredDevice
                                            ? hoveredDevice === entry.device_type
                                                ? 1
                                                : 0.35
                                            : 1
                                    }
                                />
                            ))}
                        </Pie>

                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                </ResponsiveContainer>

                {/* Center Content */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                        <p className="text-xs uppercase tracking-wider text-[#666]">
                            Total Visits
                        </p>
                        <p className="text-4xl font-bold text-white">
                            {total}
                        </p>
                    </div>
                </div>
            </div>

            {/* Alternative: Detailed stats list (optional) */}
            <div className="mt-8 pt-4 border-t border-[#222222] space-y-3">
                {deviceStats.map((device) => {
                    const percentage = ((device.count / total) * 100).toFixed(1)
                    const config = DEVICE_CONFIG[device.device_type]
                    const DeviceIcon = config?.icon || Monitor
                    const color = config?.color || '#888888'

                    return (
                        <div key={device.device_type} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: color }}
                                />
                                <DeviceIcon className="w-4 h-4" style={{ color }} />
                                <span className="text-sm text-[#888888] capitalize">
                                    {device.device_type}
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-white">{device.count}</span>
                                <span className="text-sm text-[#5B8C5A] w-12 text-right">
                                    {percentage}%
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}