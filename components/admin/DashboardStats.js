// components/admin/DashboardStats.js
'use client'

import StatsCard from './StatsCard'
import Chart from './Chart'
import VisitorsTable from './VisitorsTable'
import VisitorBreakdown from '@/components/admin/VisitorBreakdown'
import { Users, Eye, Target, BarChart3, Smartphone, Tablet, Monitor, TrendingUp, Clock } from 'lucide-react'
import DeviceDonutChart from './DeviceDonutChart'
import TopPagesBarChart from './TopPagesBarChart'

export default function DashboardStats({ stats }) {
    return (
        <div className="space-y-8">
            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    icon={Users}
                    label="Total Visitors"
                    value={stats?.totalVisitors}
                    color="green"
                />
                <StatsCard
                    icon={Eye}
                    label="Today's Visits"
                    value={stats?.todayVisitors}
                    color="blue"
                />
                <StatsCard
                    icon={Target}
                    label="Unique Today"
                    value={stats?.uniqueToday}
                    color="purple"
                />
                <StatsCard
                    icon={BarChart3}
                    label="Engagement Rate"
                    value={`${stats?.todayVisitors > 0
                        ? ((stats?.uniqueToday / stats?.todayVisitors) * 100).toFixed(1)
                        : 0}%`}
                    color="orange"
                />
            </div>

            {/* Charts Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
                <VisitorBreakdown stats={stats} />
                <Chart data={stats.weeklyStats} title="Last 7 Days Traffic" />
            </div>
            {/* Charts Grid */}
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">

                <DeviceDonutChart deviceStats={stats.deviceStats} />
                {/* Top Pages */}
                <TopPagesBarChart topPages={stats.topPages} />
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