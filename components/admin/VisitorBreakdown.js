// components/admin/VisitorBreakdown.js
'use client'

import { Users, UserCheck, PieChart, Info } from 'lucide-react'

export default function VisitorBreakdown({ stats }) {
    const repeatRate = stats.uniqueToday > 0
        ? (((stats.todayVisitors - stats.uniqueToday) / stats.todayVisitors) * 100).toFixed(1)
        : 0

    const uniquePercentage = stats.uniqueToday > 0
        ? (stats.uniqueToday / stats.todayVisitors) * 100
        : 0

    return (
        <div className="bg-[#111111] border border-[#222222] rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
                <PieChart className="w-5 h-5 text-[#5B8C5A]" />
                <h3 className="text-lg font-semibold text-white">Visitor Analysis</h3>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#0A0A0A] border border-[#222222] p-4 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                            <Users className="w-4 h-4 text-[#5B8C5A]" />
                            <p className="text-xs text-[#5B8C5A] font-medium">Total Visits Today</p>
                        </div>
                        <p className="text-2xl font-bold text-white mt-1">
                            {stats.todayVisitors}
                        </p>
                        <p className="text-xs text-[#888888] mt-1">All page views</p>
                    </div>

                    <div className="bg-[#0A0A0A] border border-[#222222] p-4 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                            <UserCheck className="w-4 h-4 text-[#8B5CF6]" />
                            <p className="text-xs text-[#8B5CF6] font-medium">Unique Visitors</p>
                        </div>
                        <p className="text-2xl font-bold text-white mt-1">
                            {stats.uniqueToday}
                        </p>
                        <p className="text-xs text-[#888888] mt-1">Distinct people</p>
                    </div>
                </div>

                {/* Visual representation */}
                <div className="bg-[#0A0A0A] border border-[#222222] p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-[#888888]">Unique Rate</span>
                        <span className="text-sm font-semibold text-white">
                            {stats.uniqueToday > 0 ? `${((stats.uniqueToday / stats.todayVisitors) * 100).toFixed(1)}%` : '0%'}
                        </span>
                    </div>
                    <div className="bg-[#1A1A1A] rounded-full h-2 overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-[#5B8C5A] to-[#3B82F6] h-2 rounded-full transition-all duration-500"
                            style={{ width: `${uniquePercentage}%` }}
                        />
                    </div>
                    <div className="flex justify-between mt-2">
                        <span className="text-xs text-[#888888]">Unique: {stats.uniqueToday}</span>
                        <span className="text-xs text-[#888888]">Total: {stats.todayVisitors}</span>
                    </div>
                </div>

                {/* Explanation */}
                <div className="bg-[#5B8C5A]/10 border border-[#5B8C5A]/20 p-4 rounded-xl">
                    <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-[#5B8C5A] mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-[#5B8C5A]">
                            <strong>How to read this:</strong> {stats.uniqueToday} unique
                            {stats.uniqueToday === 1 ? ' person has' : ' people have'} made{' '}
                            {stats.todayVisitors} total page views. On average, each visitor
                            viewed {(stats.todayVisitors / stats.uniqueToday).toFixed(1)} pages.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}