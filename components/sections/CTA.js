// components/sections/CTA.js
'use client'

import { HiArrowRight, HiCalendar, HiShieldCheck, HiStar, HiUser, HiClock, HiMail } from 'react-icons/hi'

export default function CTA({ data }) {
    return (
        <section id="cta" className="py-16 sm:py-20 lg:py-28 bg-[#0A0A0A] border-t border-[#222222]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Main Grid - Stacks on mobile, side by side on desktop */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* Left Content */}
                    <div className="w-full">
                        {/* Badge Row */}
                        <div className="flex flex-wrap items-center gap-2 mb-5">
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#5B8C5A]/10 border border-[#5B8C5A]/20 rounded-full">
                                <span className="w-2 h-2 bg-[#5B8C5A] rounded-full animate-pulse" />
                                <span className="text-xs text-[#5B8C5A] font-medium">Available Now</span>
                            </span>
                            <span className="text-xs text-[#888888]">2 slots left</span>
                        </div>

                        {/* Headline */}
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                            {data.headline}
                        </h2>

                        {/* Subheadline */}
                        <p className="text-sm sm:text-base md:text-lg text-[#888888] leading-relaxed mb-6 max-w-xl">
                            {data.subheadline}
                        </p>

                        {/* Trust Signals */}
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-6">
                            <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                    {[...Array(3)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1A1A1A] border-2 border-[#111111] flex items-center justify-center"
                                        >
                                            <HiUser className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#888888]" />
                                        </div>
                                    ))}
                                </div>
                                <span className="text-xs sm:text-sm text-[#888888]">50+ clients</span>
                            </div>

                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <HiStar key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-500" />
                                ))}
                                <span className="text-xs sm:text-sm text-[#888888] ml-1">5.0</span>
                            </div>
                        </div>

                        {/* Button */}
                        <div className="flex flex-col sm:flex-row gap-3 mb-5">
                            <a
                                href="/schedule"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#5B8C5A] hover:bg-[#4A7349] text-white text-sm sm:text-base font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-[#5B8C5A]/25 group"
                            >
                                <HiCalendar className="w-5 h-5 flex-shrink-0" />
                                <span>{data.buttonText || 'Start Your Project Today'}</span>
                                <HiArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>

                        {/* Note */}
                        <p className="flex items-center gap-2 text-xs sm:text-sm text-[#888888]">
                            <HiShieldCheck className="w-4 h-4 text-[#5B8C5A] flex-shrink-0" />
                            <span>No pressure, no pitch. Just a conversation.</span>
                        </p>
                    </div>

                    {/* Right - Contact Info Card */}
                    <div className="w-full">
                        <div className="bg-[#111111] rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border border-[#222222] w-full max-w-md lg:max-w-none mx-auto">

                            {/* Contact Info */}
                            <div className="space-y-4">
                                {/* Email */}
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#5B8C5A]/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-[#5B8C5A]/20">
                                        <HiMail className="w-5 h-5 text-[#5B8C5A]" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs text-[#888888]">Email</p>
                                        <p className="text-sm sm:text-base text-white font-medium break-all">mohammed.rabi.dev@gmail.com</p>
                                    </div>
                                </div>

                                {/* Response Time */}
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-blue-500/20">
                                        <HiClock className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs text-[#888888]">Response Time</p>
                                        <p className="text-sm sm:text-base text-white font-medium">Within 24 hours</p>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="border-t border-[#222222] my-5" />

                                {/* Quick Message */}
                                <div className="bg-[#0A0A0A] rounded-xl p-4 border border-[#222222]">
                                    <p className="text-sm text-[#888888] text-center">
                                        Have questions?{' '}
                                        <a
                                            href="mailto:mohammed.rabi.dev@gmail.com"
                                            className="text-[#5B8C5A] hover:text-[#4A7349] transition-colors"
                                        >
                                            Email me directly
                                        </a>
                                        <br />
                                        <span className="text-xs">or use the booking form to schedule a call</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 sm:mt-16 pt-6 border-t border-[#222222]">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-xs sm:text-sm text-[#888888] text-center sm:text-left">
                            © 2026 Mohammed Rabi. All rights reserved.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                            {['Twitter', 'LinkedIn', 'Dribbble', 'Email'].map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    className="text-xs sm:text-sm text-[#888888] hover:text-white transition-colors"
                                >
                                    {social}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}