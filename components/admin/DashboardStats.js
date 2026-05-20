// components/admin/DashboardStats.js
'use client'

import StatsCard from './StatsCard'
import Chart from './Chart'
import VisitorsTable from './VisitorsTable'
import VisitorBreakdown from '@/components/admin/VisitorBreakdown'
import { Users, Eye, Target, BarChart3, Smartphone, Tablet, Monitor, TrendingUp, Clock } from 'lucide-react'

export default function DashboardStats({ stats }) {
    return (
        <div className="space-y-8">
            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    icon={Users}
                    label="Total Visitors"
                    value={stats.totalVisitors}
                    color="green"
                />
                <StatsCard
                    icon={Eye}
                    label="Today's Visits"
                    value={stats.todayVisitors}
                    color="blue"
                />
                <StatsCard
                    icon={Target}
                    label="Unique Today"
                    value={stats.uniqueToday}
                    color="purple"
                />
                <StatsCard
                    icon={BarChart3}
                    label="Engagement Rate"
                    value={`${stats.todayVisitors > 0
                        ? ((stats.uniqueToday / stats.todayVisitors) * 100).toFixed(1)
                        : 0}%`}
                    color="orange"
                />
            </div>

            {/* Charts Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
                <VisitorBreakdown stats={stats} />
                <Chart data={stats.weeklyStats} title="Last 7 Days Traffic" />

                {/* Device Distribution */}
                <div className="bg-[#111111] border border-[#222222] rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <Smartphone className="w-5 h-5 text-[#5B8C5A]" />
                        <h3 className="text-lg font-semibold text-white">Device Distribution</h3>
                    </div>
                    <div className="space-y-6">
                        {stats.deviceStats.map((device) => {
                            const total = stats.deviceStats.reduce((sum, d) => sum + d.count, 0)
                            const percentage = ((device.count / total) * 100).toFixed(1)

                            const getDeviceIcon = () => {
                                switch (device.device_type) {
                                    case 'mobile':
                                        return <Smartphone className="w-4 h-4" />
                                    case 'tablet':
                                        return <Tablet className="w-4 h-4" />
                                    default:
                                        return <Monitor className="w-4 h-4" />
                                }
                            }

                            return (
                                <div key={device.device_type}>
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[#888888]">
                                                {getDeviceIcon()}
                                            </span>
                                            <span className="text-sm font-medium text-[#888888] capitalize">
                                                {device.device_type}
                                            </span>
                                        </div>
                                        <span className="text-sm text-[#888888]">
                                            {device.count} ({percentage}%)
                                        </span>
                                    </div>
                                    <div className="bg-[#1A1A1A] rounded-full h-2 overflow-hidden">
                                        <div
                                            className={`h-2 rounded-full transition-all duration-500 ${device.device_type === 'mobile'
                                                    ? 'bg-[#5B8C5A]'
                                                    : device.device_type === 'tablet'
                                                        ? 'bg-[#3B82F6]'
                                                        : 'bg-[#8B5CF6]'
                                                }`}
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Top Pages */}
            <div className="bg-[#111111] border border-[#222222] rounded-xl p-6">
                <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="w-5 h-5 text-[#5B8C5A]" />
                    <h3 className="text-lg font-semibold text-white">Most Visited Pages</h3>
                </div>
                <div className="grid gap-4">
                    {stats.topPages.map((page, index) => {
                        const total = stats.topPages.reduce((sum, p) => sum + p.count, 0)
                        const percentage = ((page.count / total) * 100).toFixed(1)

                        return (
                            <div key={page.page_visited} className="flex items-center gap-4">
                                <span className="text-sm font-bold text-[#5B8C5A] w-6">#{index + 1}</span>
                                <div className="flex-1">
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium text-white">
                                            {page.page_visited || 'Homepage'}
                                        </span>
                                        <span className="text-sm text-[#888888]">{page.count} visits</span>
                                    </div>
                                    <div className="bg-[#1A1A1A] rounded-full h-2">
                                        <div
                                            className="bg-[#5B8C5A] h-2 rounded-full transition-all duration-500"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Recent Visitors Table */}
            <div className="bg-[#111111] border border-[#222222] rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-[#5B8C5A]" />
                        <h3 className="text-lg font-semibold text-white">Recent Visitors</h3>
                    </div>
                    <span className="text-sm text-[#888888]">Showing last 20 visitors</span>
                </div>
                <VisitorsTable visitors={stats.recentVisitors.slice(0, 20)} />
            </div>
        </div>
    )
}