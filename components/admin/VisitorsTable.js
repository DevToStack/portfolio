// components/admin/VisitorsTable.js
'use client'

import { format } from 'date-fns'

export default function VisitorsTable({ visitors }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-[#222222] bg-[#0A0A0A]">
                        <th className="text-left py-4 px-4 font-semibold text-[#888888] text-sm">Time</th>
                        <th className="text-left py-4 px-4 font-semibold text-[#888888] text-sm">Page</th>
                        <th className="text-left py-4 px-4 font-semibold text-[#888888] text-sm">Device</th>
                        <th className="text-left py-4 px-4 font-semibold text-[#888888] text-sm">Browser</th>
                        <th className="text-left py-4 px-4 font-semibold text-[#888888] text-sm">IP Address</th>
                        <th className="text-left py-4 px-4 font-semibold text-[#888888] text-sm">Referrer</th>
                    </tr>
                </thead>
                <tbody>
                    {visitors.map((visitor, index) => (
                        <tr
                            key={visitor.id}
                            className={`border-b border-[#222222] hover:bg-[#1A1A1A] transition-colors ${index % 2 === 0 ? 'bg-[#111111]' : 'bg-[#0A0A0A]'
                                }`}
                        >
                            <td className="py-3 px-4 text-sm text-[#888888]">
                                {format(new Date(visitor.visit_timestamp), 'MMM d, yyyy HH:mm')}
                            </td>
                            <td className="py-3 px-4 text-sm font-medium text-white">
                                {visitor.page_visited || '/'}
                            </td>
                            <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${visitor.device_type === 'mobile'
                                        ? 'bg-[#5B8C5A]/20 text-[#5B8C5A]'
                                        : visitor.device_type === 'tablet'
                                            ? 'bg-[#3B82F6]/20 text-[#3B82F6]'
                                            : 'bg-[#8B5CF6]/20 text-[#8B5CF6]'
                                    }`}>
                                    {visitor.device_type}
                                </span>
                            </td>
                            <td className="py-3 px-4 text-sm text-[#888888]">{visitor.browser}</td>
                            <td className="py-3 px-4 text-sm text-[#888888] font-mono">{visitor.ip_address}</td>
                            <td className="py-3 px-4 text-sm text-[#888888] truncate max-w-xs">
                                {visitor.referrer || 'Direct'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}