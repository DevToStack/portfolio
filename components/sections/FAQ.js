// components/sections/FAQ.js
'use client'

import { useState } from 'react'
import {
    HelpCircle,
    Minus,
    Plus,
    Lightbulb,
    DollarSign,
    Users,
    Rocket,
    ShieldCheck,
    MessageCircle,
    Zap,
    Clock,
    CheckCircle
} from 'lucide-react'

export default function FAQ({ data }) {
    const [openIndex, setOpenIndex] = useState(null)

    const categoryIcons = [
        DollarSign,   // Pricing
        Lightbulb,    // Process
        Rocket,       // Timeline
        Users         // Team
    ]

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <section id="faq" className="py-24 lg:py-32 bg-[#0A0A0A] border-t border-[#222222]">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-[#5B8C5A]/10 border border-[#5B8C5A]/20 rounded-full">
                            <HelpCircle className="w-4 h-4 text-[#5B8C5A]" />
                            <span className="text-xs font-semibold text-[#5B8C5A] uppercase tracking-wider">
                                FAQ
                            </span>
                        </div>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                        Questions & <span className="bg-gradient-to-r from-[#5B8C5A] to-[#3B82F6] bg-clip-text text-transparent">Answers</span>
                    </h2>
                    <p className="text-lg text-[#888888] max-w-2xl mx-auto">
                        Everything you need to know before we start working together
                    </p>
                </div>

                {/* FAQ List */}
                <div className="flex flex-col gap-4">
                    {data.map((item, index) => {
                        const isOpen = openIndex === index
                        const Icon = categoryIcons[index % categoryIcons.length]

                        return (
                            <div
                                key={index}
                                className={`rounded-xl border transition-all duration-300 ${isOpen
                                        ? 'border-[#5B8C5A]/30 bg-[#111111] shadow-lg shadow-[#5B8C5A]/5'
                                        : 'border-[#222222] bg-[#0A0A0A] hover:border-[#333333] hover:bg-[#111111]'
                                    }`}
                            >
                                <button
                                    onClick={() => handleToggle(index)}
                                    className="w-full flex items-center gap-4 p-5 lg:p-6 text-left group"
                                >
                                    {/* Category Icon */}
                                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${isOpen
                                            ? 'bg-[#5B8C5A] text-white shadow-lg shadow-[#5B8C5A]/25'
                                            : 'bg-[#1A1A1A] text-[#888888] group-hover:bg-[#222222] group-hover:text-white'
                                        }`}>
                                        <Icon className="w-5 h-5" />
                                    </div>

                                    {/* Question */}
                                    <span className={`flex-1 text-base lg:text-lg font-semibold transition-colors ${isOpen ? 'text-white' : 'text-[#888888] group-hover:text-white'
                                        }`}>
                                        {item.question}
                                    </span>

                                    {/* Toggle Icon */}
                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen
                                            ? 'bg-[#5B8C5A]/10 text-[#5B8C5A]'
                                            : 'bg-[#1A1A1A] text-[#888888] group-hover:bg-[#222222] group-hover:text-white'
                                        }`}>
                                        {isOpen ? (
                                            <Minus className="w-4 h-4" />
                                        ) : (
                                            <Plus className="w-4 h-4" />
                                        )}
                                    </div>
                                </button>

                                {/* Answer */}
                                <div
                                    className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <div className="px-5 lg:px-6 pb-5 lg:pb-6 pl-20 lg:pl-20">
                                        <div className="flex gap-4">
                                            <div className="flex-shrink-0 w-0.5 bg-gradient-to-b from-[#5B8C5A] to-[#3B82F6] rounded-full" />
                                            <div className="flex-1">
                                                <p className="text-[#888888] leading-relaxed mb-4">
                                                    {item.answer}
                                                </p>

                                                {/* Quick Action Link */}
                                                <div className="flex items-center gap-2 text-sm">
                                                    <MessageCircle className="w-4 h-4 text-[#5B8C5A]" />
                                                    <span className="text-[#888888]">Still have questions?</span>
                                                    <a
                                                        href="#cta"
                                                        className="text-[#5B8C5A] font-medium hover:text-[#4A7349] transition-colors inline-flex items-center gap-1"
                                                    >
                                                        Let's talk
                                                        <Rocket className="w-3.5 h-3.5" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Bottom Help Section */}
                <div className="mt-12 text-center">
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#111111] border border-[#222222] rounded-full hover:border-[#333333] transition-colors">
                        <Lightbulb className="w-5 h-5 text-yellow-500" />
                        <span className="text-sm text-[#888888]">
                            Don't see your question?
                        </span>
                        <a
                            href="#cta"
                            className="text-sm font-semibold text-[#5B8C5A] hover:text-[#4A7349] transition-colors inline-flex items-center gap-1"
                        >
                            Ask me directly
                            <Zap className="w-3.5 h-3.5" />
                        </a>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-6 mt-16 pt-12 border-t border-[#222222]">
                    {[
                        { value: '100%', label: 'Response Rate', icon: CheckCircle },
                        { value: '<24hrs', label: 'Reply Time', icon: Clock },
                        { value: '50+', label: 'Projects Done', icon: Rocket }
                    ].map((stat) => {
                        const Icon = stat.icon
                        return (
                            <div key={stat.label} className="text-center group">
                                <div className="flex items-center justify-center mb-3">
                                    <div className="p-2 bg-[#5B8C5A]/10 rounded-lg border border-[#5B8C5A]/20 group-hover:scale-110 transition-transform">
                                        <Icon className="w-5 h-5 text-[#5B8C5A]" />
                                    </div>
                                </div>
                                <p className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#5B8C5A] to-[#3B82F6] bg-clip-text text-transparent">
                                    {stat.value}
                                </p>
                                <p className="text-sm text-[#888888] mt-1">{stat.label}</p>
                            </div>
                        )
                    })}
                </div>

                {/* Trust Badge */}
                <div className="mt-12 pt-8 text-center">
                    <div className="inline-flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#5B8C5A]" />
                        <span className="text-xs text-[#888888]">
                            All consultations are confidential and obligation-free
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}