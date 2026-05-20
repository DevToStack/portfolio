// components/admin/StatsCard.js
'use client'

export default function StatsCard({ icon: Icon, label, value, description, color }) {
    const colors = {
        green: { bg: 'bg-[#5B8C5A]/10', text: 'text-[#5B8C5A]', border: 'border-[#5B8C5A]/20' },
        blue: { bg: 'bg-[#3B82F6]/10', text: 'text-[#3B82F6]', border: 'border-[#3B82F6]/20' },
        purple: { bg: 'bg-[#8B5CF6]/10', text: 'text-[#8B5CF6]', border: 'border-[#8B5CF6]/20' },
        orange: { bg: 'bg-[#F59E0B]/10', text: 'text-[#F59E0B]', border: 'border-[#F59E0B]/20' },
        red: { bg: 'bg-[#EF4444]/10', text: 'text-[#EF4444]', border: 'border-[#EF4444]/20' },
        indigo: { bg: 'bg-[#6366F1]/10', text: 'text-[#6366F1]', border: 'border-[#6366F1]/20' }
    }

    const colorScheme = colors[color] || colors.green

    return (
        <div className="bg-[#111111] border border-[#222222] rounded-xl p-6 hover:border-[#333333] transition-all duration-300">
            <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${colorScheme.bg} ${colorScheme.text} border ${colorScheme.border}`}>
                    <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                    <p className="text-xs font-medium text-[#888888] uppercase tracking-wider">
                        {label}
                    </p>
                    <p className="text-3xl font-bold text-white mt-1">
                        {value}
                    </p>
                    {description && (
                        <p className="text-xs text-[#888888] mt-2">
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}