// components/sections/Process.js
'use client'

import { useState } from 'react'
import {
    ArrowRight,
    ShieldCheck,
    Clock,
    MessageCircle,
    Eye,
    Code,
    Sparkles,
    CheckCircle,
    Search,
    Zap,
    Star
} from 'lucide-react'

export default function Process({ data }) {
    const [activeStep, setActiveStep] = useState(0)

    const icons = [Eye, Code, Sparkles]

    // Map emoji icons to Lucide icons for the detail panel
    const getDetailIcon = (iconEmoji) => {
        const iconMap = {
            '🔍': <Search className="w-6 h-6 text-[#5B8C5A]" />,
            '⚡': <Zap className="w-6 h-6 text-[#5B8C5A]" />,
            '✨': <Sparkles className="w-6 h-6 text-[#5B8C5A]" />
        }
        return iconMap[iconEmoji] || <span className="text-3xl">{iconEmoji}</span>
    }

    return (
        <section id="process" className="py-16 sm:py-20 lg:py-32 bg-[#0A0A0A] border-t border-[#222222]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20">
                    <div className="hidden sm:flex items-center justify-center gap-3 mb-4">
                        <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-r from-[#5B8C5A] to-[#3B82F6] rounded-full" />
                        <span className="text-xs sm:text-sm font-semibold text-[#5B8C5A] uppercase tracking-wider">
                            Process
                        </span>
                        <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-r from-[#5B8C5A] to-[#3B82F6] rounded-full" />
                    </div>

                    <span className="sm:hidden text-xs font-semibold text-[#5B8C5A] uppercase tracking-wider mb-3 block">
                        Process
                    </span>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 px-2">
                        Your Journey from Idea to Launch
                    </h2>
                    <p className="text-base sm:text-lg text-[#888888] px-2">
                        A proven system that turns vision into reality
                    </p>
                </div>

                {/* Process Steps */}
                <div className="flex flex-col lg:flex-row gap-6 mb-12 sm:mb-16">
                    {data.map((step, index) => {
                        const Icon = icons[index]
                        const isActive = activeStep === index
                        const isLast = index === data.length - 1

                        return (
                            <div
                                key={step.step}
                                className="flex-1 flex flex-row lg:flex-col"
                            >
                                <div
                                    className={`flex-1 flex flex-col p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl transition-all duration-300 cursor-pointer ${isActive
                                            ? 'bg-[#111111] border border-[#333333] shadow-xl'
                                            : 'bg-[#0A0A0A] border border-[#222222] hover:border-[#333333] hover:bg-[#111111]'
                                        }`}
                                    onClick={() => setActiveStep(index)}
                                    onMouseEnter={() => setActiveStep(index)}
                                >
                                    <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0 ${isActive
                                                ? 'bg-[#5B8C5A] text-white shadow-lg shadow-[#5B8C5A]/25'
                                                : 'bg-[#1A1A1A] text-[#888888] border border-[#333333]'
                                            }`}>
                                            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                                        </div>
                                        <div className="min-w-0">
                                            <span className="text-xs font-semibold text-[#5B8C5A] uppercase tracking-wider">
                                                {step.duration}
                                            </span>
                                            <p className="text-xs sm:text-sm text-[#888888] font-medium">
                                                Step {step.step}
                                            </p>
                                        </div>
                                    </div>

                                    <h3 className={`text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 transition-colors ${isActive ? 'text-white' : 'text-[#888888]'
                                        }`}>
                                        {step.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-[#888888] leading-relaxed flex-1">
                                        {step.description}
                                    </p>

                                    <div className={`mt-4 sm:mt-6 h-0.5 rounded-full transition-all duration-500 ${isActive
                                            ? 'bg-gradient-to-r from-[#5B8C5A] to-[#3B82F6] w-full'
                                            : 'bg-[#222222] w-0'
                                        }`} />
                                </div>

                                {!isLast && (
                                    <>
                                        <div className="hidden lg:flex items-center justify-center px-2">
                                            <ArrowRight className="w-5 h-5 text-[#333333]" />
                                        </div>
                                        <div className="flex lg:hidden items-center justify-center w-8 sm:w-10 flex-shrink-0">
                                            <div className="h-full flex items-center">
                                                <div className="w-0.5 h-12 sm:h-16 bg-gradient-to-b from-[#5B8C5A] to-[#3B82F6] rounded-full" />
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* Step Detail Panel */}
                <div className="bg-[#111111] rounded-xl sm:rounded-2xl p-5 sm:p-8 lg:p-10 border border-[#222222] mb-8 sm:mb-12">
                    <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">
                        {/* Timeline Tabs */}
                        <div className="w-full lg:w-56 xl:w-64 flex-shrink-0">
                            <div className="flex lg:hidden gap-2 overflow-x-auto pb-2 -mx-1 px-1">
                                {data.map((step, index) => (
                                    <button
                                        key={step.step}
                                        onClick={() => setActiveStep(index)}
                                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all whitespace-nowrap flex-shrink-0 ${activeStep === index
                                                ? 'bg-[#5B8C5A]/10 text-[#5B8C5A] border border-[#5B8C5A]/20'
                                                : 'hover:bg-[#1A1A1A] text-[#888888] border border-transparent'
                                            }`}
                                    >
                                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${activeStep === index
                                                ? 'bg-[#5B8C5A] text-white'
                                                : 'bg-[#1A1A1A] text-[#888888]'
                                            }`}>
                                            {step.step}
                                        </span>
                                        <span className="text-xs sm:text-sm font-medium">{step.title}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="hidden lg:flex lg:flex-col gap-2">
                                {data.map((step, index) => (
                                    <button
                                        key={step.step}
                                        onClick={() => setActiveStep(index)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all w-full ${activeStep === index
                                                ? 'bg-[#5B8C5A]/10 text-[#5B8C5A] border border-[#5B8C5A]/20'
                                                : 'hover:bg-[#1A1A1A] text-[#888888] border border-transparent'
                                            }`}
                                    >
                                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${activeStep === index
                                                ? 'bg-[#5B8C5A] text-white'
                                                : 'bg-[#1A1A1A] text-[#888888]'
                                            }`}>
                                            {step.step}
                                        </span>
                                        <span className="text-sm font-medium">{step.title}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Detail Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                                <div className="flex-shrink-0 p-3 bg-[#1A1A1A] rounded-xl border border-[#333333]">
                                    {getDetailIcon(data[activeStep].icon)}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs sm:text-sm font-semibold text-[#5B8C5A] mb-1">
                                        {data[activeStep].duration}
                                    </p>
                                    <h4 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
                                        {data[activeStep].title}
                                    </h4>
                                    <p className="text-sm sm:text-base text-[#888888] leading-relaxed mb-4 sm:mb-6">
                                        {data[activeStep].description}
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                                        {[
                                            'Initial consultation',
                                            'Research & discovery',
                                            'Strategy development',
                                            'Implementation'
                                        ].map((item) => (
                                            <div key={item} className="flex items-center gap-2 group">
                                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#5B8C5A] flex-shrink-0 group-hover:scale-110 transition-transform" />
                                                <span className="text-xs sm:text-sm text-[#888888] group-hover:text-white transition-colors">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Guarantee Section */}
                <div className="bg-gradient-to-br sm:bg-gradient-to-r from-[#5B8C5A] via-[#3B82F6] to-[#8B5CF6] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 relative overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
                        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
                    </div>

                    <div className="relative z-10 max-w-3xl mx-auto text-center">
                        <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
                            <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                                Communication Guarantee
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
                            {[
                                { icon: Eye, text: 'Live preview updated daily' },
                                { icon: MessageCircle, text: 'Dedicated Slack channel' },
                                { icon: Clock, text: '24-hour response time' }
                            ].map((item, index) => {
                                const Icon = item.icon
                                return (
                                    <div
                                        key={index}
                                        className="flex flex-row sm:flex-col items-center gap-3 sm:gap-3 p-3 sm:p-4 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                                    >
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                        </div>
                                        <p className="text-sm text-white/90 text-left sm:text-center group-hover:text-white transition-colors">
                                            {item.text}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>

                        <p className="text-white/80 mt-4 sm:mt-6 text-xs sm:text-sm">
                            No project ever goes dark. You'll always know exactly what's happening.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}