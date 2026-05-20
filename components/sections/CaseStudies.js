// components/sections/CaseStudies.js
'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
    ArrowRight,
    Zap,
    Lightbulb,
    TrendingUp,
    Users,
    Star,
    Quote,
    Eye,
    Link as LinkIcon,
    BarChart3,
    Rocket,
    CheckCircle,
    Target,
    Trophy,
    Users2,
    Heart,
    GraduationCap,
    RefreshCw,
    Award,
    User,
    Shield,
    Book,
    Tablet
} from 'lucide-react'
import { BiMobile } from 'react-icons/bi'

export default function CaseStudies({ data }) {
    const [activeStudy, setActiveStudy] = useState(null)

    // Map metric emojis to Lucide icons
    const getMetricIcon = (iconEmoji) => {
        const iconMap = {
            '📈': BarChart3,
            '🚀': Rocket,
            '✅': CheckCircle,
            '🎯': Target,
            '⭐': Star,
            '🏥': Heart,
            '🎓': GraduationCap,
            '🔄': RefreshCw,
            '💚': Heart,
            "⚡": Zap,
            "💡": Lightbulb,
            "📊": BarChart3,
            '🔗': LinkIcon,
            "🔐": Shield,
            "📖":Book,
            "📱": Tablet
        }
        const IconComponent = iconMap[iconEmoji] || TrendingUp
        return <IconComponent className="w-4 h-4" />
    }

    return (
        <section id="case-studies" className="py-24 lg:py-32 bg-[#0A0A0A] border-t border-[#222222]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* Section Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 lg:mb-20">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-0.5 bg-gradient-to-r from-[#5B8C5A] to-[#3B82F6] rounded-full" />
                            <span className="text-sm font-semibold text-[#5B8C5A] uppercase tracking-wider">Portfolio</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold text-white">
                            Selected Work
                        </h2>
                    </div>
                    <p className="text-lg text-[#888888] mt-4 lg:mt-0 max-w-md">
                        Projects that transformed businesses and delighted users
                    </p>
                </div>

                {/* Case Studies Grid */}
                <div className="flex flex-col gap-24 lg:gap-32">
                    {data.map((study, index) => (
                        <div
                            key={study.id}
                            className="group"
                            onMouseEnter={() => setActiveStudy(study.id)}
                            onMouseLeave={() => setActiveStudy(null)}
                        >
                            <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${index % 2 !== 0 ? 'lg:direction-rtl' : ''}`}>

                                {/* Image Side */}
                                <div className={`${index % 2 !== 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                                    <div className="relative">
                                        {/* Image Container */}
                                        <div className="relative overflow-hidden rounded-2xl border border-[#222222] bg-[#111111]">
                                            <img
                                                src={study.image}
                                                alt={study.title}
                                                className="w-full h-[400px] lg:h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                                            />
                                            {/* Overlay gradient */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                        </div>

                                        {/* Floating Stats Card */}
                                        <div className="flex flex-wrap gap-3 mt-6">
                                            {study.metrics.map((metric) => (
                                                <div
                                                    key={metric.label}
                                                    className="flex items-center gap-2 px-4 py-2 bg-[#111111] rounded-full border border-[#222222] hover:border-[#333333] transition-all duration-300"
                                                >
                                                    <span className="text-[#5B8C5A]">
                                                        {getMetricIcon(metric.icon)}
                                                    </span>
                                                    <span className="text-sm font-semibold text-white">{metric.value}</span>
                                                    <span className="text-xs text-[#888888]">{metric.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div className={`${index % 2 !== 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                                    {/* Category & Title */}
                                    <div className="mb-8">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="px-3 py-1 bg-[#5B8C5A]/10 text-[#5B8C5A] text-xs font-semibold rounded-full border border-[#5B8C5A]/20">
                                                {study.category}
                                            </span>
                                            <span className="text-sm text-[#888888]">Case Study 0{index + 1}</span>
                                        </div>
                                        <h3 className="text-3xl lg:text-4xl font-bold text-white">
                                            {study.title}
                                        </h3>
                                    </div>

                                    {/* Problem - Solution - Result */}
                                    <div className="flex flex-col gap-6 mb-8">
                                        {/* Problem */}
                                        <div className="flex gap-4 group/item">
                                            <div className="flex-shrink-0 w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center border border-red-500/20 group-hover/item:scale-110 transition-transform">
                                                <Zap className="w-5 h-5 text-red-500" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-red-500 mb-1">THE PROBLEM</p>
                                                <p className="text-[#888888] leading-relaxed">{study.nightmare}</p>
                                            </div>
                                        </div>

                                        {/* Solution */}
                                        <div className="flex gap-4 group/item">
                                            <div className="flex-shrink-0 w-10 h-10 bg-yellow-500/10 rounded-xl flex items-center justify-center border border-yellow-500/20 group-hover/item:scale-110 transition-transform">
                                                <Lightbulb className="w-5 h-5 text-yellow-500" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-yellow-500 mb-1">THE INSIGHT</p>
                                                <p className="text-[#888888] leading-relaxed">{study.insight}</p>
                                            </div>
                                        </div>

                                        {/* Result */}
                                        <div className="flex gap-4 group/item">
                                            <div className="flex-shrink-0 w-10 h-10 bg-[#5B8C5A]/10 rounded-xl flex items-center justify-center border border-[#5B8C5A]/20 group-hover/item:scale-110 transition-transform">
                                                <TrendingUp className="w-5 h-5 text-[#5B8C5A]" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-[#5B8C5A] mb-1">THE RESULT</p>
                                                <p className="text-white font-semibold leading-relaxed">{study.result}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Testimonial */}
                                    <div className="bg-[#111111] rounded-xl p-6 mb-8 border border-[#222222] hover:border-[#333333] transition-all duration-300">
                                        <div className="flex gap-1 mb-3">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                            ))}
                                        </div>
                                        <div className="flex gap-3 mb-4">
                                            <Quote className="w-6 h-6 text-[#5B8C5A] flex-shrink-0" />
                                            <p className="text-[#888888] italic leading-relaxed">
                                                "{study.testimonial.quote}"
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {/* <img
                                                src={study.testimonial.avatar}
                                                alt={study.testimonial.author}
                                                className="w-10 h-10 rounded-full object-cover border border-[#333333]"
                                            /> */}
                                            <User className='text-white'/>
                                            <div>
                                                <p className="font-semibold text-sm text-white">
                                                    {study.testimonial.author}
                                                </p>
                                                <p className="text-xs text-[#888888]">
                                                    {study.testimonial.role}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-wrap items-center gap-4">
                                        <Link
                                            href={`/case-studies/${study.slug}`}
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#5B8C5A] hover:bg-[#4A7349] text-white text-sm font-medium rounded-lg transition-all hover:shadow-lg hover:shadow-[#5B8C5A]/25 group/link"
                                        >
                                            <Eye className="w-4 h-4" />
                                            View Full Study
                                            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                        </Link>
                                        <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#111111] border border-[#222222] text-[#888888] text-sm font-medium rounded-lg hover:border-[#333333] hover:text-white transition-all">
                                            <Users className="w-4 h-4" />
                                            Client Review
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Divider */}
                            {index < data.length - 1 && (
                                <div className="mt-24 lg:mt-32 h-px bg-gradient-to-r from-transparent via-[#222222] to-transparent" />
                            )}
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-20 text-center">
                    <p className="text-[#888888] mb-6">Have a project in mind?</p>
                    <Link
                        href="#cta"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-[#5B8C5A] hover:bg-[#4A7349] text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-[#5B8C5A]/25 group"
                    >
                        Start Your Project
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    )
}