'use client'

import { useState } from 'react'

export default function Tabs({ tabs, defaultTab = 0, className = '' }) {
    const [activeTab, setActiveTab] = useState(defaultTab)

    return (
        <div className={className}>
            <div className="flex border-b border-gray-200 mb-6">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className={`px-6 py-3 text-sm font-medium transition-all relative ${activeTab === index
                                ? 'text-[var(--accent)]'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {tab.label}
                        {activeTab === index && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent)]" />
                        )}
                    </button>
                ))}
            </div>
            <div className="transition-all duration-300">
                {tabs[activeTab].content}
            </div>
        </div>
    )
}