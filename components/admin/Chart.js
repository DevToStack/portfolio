// components/admin/Chart.js
'use client'

import { format } from 'date-fns'
import { TrendingUp, Calendar } from 'lucide-react'

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

    const maxValue = Math.max(...data.map(d => d.visits))

    return (
        <div className="bg-[#111111] border border-[#222222] rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-5 h-5 text-[#5B8C5A]" />
                <h3 className="text-lg font-semibold text-white">{title}</h3>
            </div>
            <div className="space-y-4">
                {data.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <span className="text-sm text-[#888888] w-28 flex-shrink-0">
                            {format(new Date(item.date), 'EEE, MMM d')}
                        </span>
                        <div className="flex-1 relative">
                            <div className="bg-[#1A1A1A] rounded-full h-8 overflow-hidden">
                                <div
                                    className="bg-gradient-to-r from-[#5B8C5A] to-[#3B82F6] h-full rounded-full transition-all duration-500 flex items-center justify-end px-3"
                                    style={{
                                        width: `${(item.visits / maxValue) * 100}%`,
                                        minWidth: item.visits > 0 ? '40px' : '0'
                                    }}
                                >
                                    {item.visits > 0 && (
                                        <span className="text-white text-xs font-semibold">
                                            {item.visits}
                                        </span>
                                    )}
                                </div>
                            </div>
                            {item.unique_visits && (
                                <div className="mt-1">
                                    <span className="text-xs text-[#888888]">
                                        {item.unique_visits} unique
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}