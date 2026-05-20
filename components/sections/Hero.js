// components/sections/Hero.js
'use client'

import { useEffect, useRef } from 'react'
import {
    ArrowRight,
    Eye,
    Briefcase,
    Users,
    TrendingUp,
    Star,
    ShieldCheck,
    ChevronDown
} from 'lucide-react'

export default function Hero({ data }) {
    const heroRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.querySelectorAll('.reveal').forEach((el, i) => {
                            setTimeout(() => {
                                el.style.opacity = '1'
                                el.style.transform = 'translateY(0)'
                            }, i * 150)
                        })
                    }
                })
            },
            { threshold: 0.1 }
        )

        if (heroRef.current) {
            observer.observe(heroRef.current)
        }

        return () => observer.disconnect()
    }, [])

    // Default data if not provided
    const heroData = {
        headline: "Crafting Digital",
        highlightedWord: "Experiences",
        subheadline: "I'm a front-end developer specializing in building exceptional digital experiences with React, Next.js, and modern web technologies.",
        cta: {
            primary: "Start Your Project",
            secondary: "View Work"
        },
        stats: [
            { value: "50+", label: "Projects Completed" },
            { value: "98%", label: "Client Satisfaction" },
            { value: "24/7", label: "Support" }
        ],
        ...data
    }

    return (
        <section
            ref={heroRef}
            className="min-h-screen flex flex-col justify-center bg-[#0A0A0A] relative overflow-hidden"
        >
            {/* Background Gradient Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#5B8C5A]/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            <div className="flex-1" />

            <div className="container-max px-6 lg:px-20 w-full relative z-10">
                <div className="max-w-7xl mx-auto">

                    {/* Badge */}
                    <div className="reveal opacity-0 translate-y-4 transition-all duration-700 flex items-center gap-3 mb-8">
                        <div className="flex items-center gap-2 px-4 py-2 bg-[#5B8C5A]/10 border border-[#5B8C5A]/20 rounded-full">
                            <span className="w-2 h-2 bg-[#5B8C5A] rounded-full animate-pulse" />
                            <span className="text-sm text-[#5B8C5A] font-medium">Available for projects</span>
                        </div>
                        <div className="flex items-center gap-1 px-3 py-1.5 bg-[#1A1A1A] border border-[#222222] rounded-full">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            <span className="text-xs text-[#888888]">5.0 Rating</span>
                        </div>
                    </div>

                    {/* Headline */}
                    <h1 className="reveal opacity-0 translate-y-4 transition-all duration-700 text-5xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] tracking-tight mb-6">
                        {heroData.headline}{' '}
                        <span className="bg-gradient-to-r from-[#5B8C5A] via-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
                            {heroData.highlightedWord}
                        </span>
                    </h1>

                    {/* Underline */}
                    <div className="reveal opacity-0 translate-y-4 transition-all duration-700 h-1 w-32 bg-gradient-to-r from-[#5B8C5A] to-[#3B82F6] rounded-full mb-6" />

                    {/* Subheadline */}
                    <p className="reveal opacity-0 translate-y-4 transition-all duration-700 text-lg lg:text-xl text-[#888888] max-w-2xl leading-relaxed mb-10">
                        {heroData.subheadline}
                    </p>

                    {/* Buttons */}
                    <div className="reveal opacity-0 translate-y-4 transition-all duration-700 flex flex-col sm:flex-row gap-4 mb-16">
                        <a
                            href="#cta"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#5B8C5A] hover:bg-[#4A7349] text-white text-lg font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#5B8C5A]/25 hover:-translate-y-0.5 group"
                        >
                            {heroData.cta.primary}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>

                        <a
                            href="#case-studies"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#111111] border border-[#222222] hover:border-[#333333] text-[#888888] hover:text-white text-lg font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                        >
                            <Eye className="w-5 h-5" />
                            {heroData.cta.secondary}
                        </a>
                    </div>

                    {/* Stats */}
                    <div className="reveal opacity-0 translate-y-4 transition-all duration-700 flex flex-wrap gap-8 lg:gap-16">
                        {heroData.stats.map((stat, index) => {
                            const icons = [Briefcase, TrendingUp, Users]
                            const IconComponent = icons[index % icons.length]
                            return (
                                <div key={stat.label} className="flex flex-col group cursor-pointer">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="p-2 bg-[#5B8C5A]/10 rounded-lg border border-[#5B8C5A]/20 group-hover:scale-110 transition-transform">
                                            <IconComponent className="w-4 h-4 text-[#5B8C5A]" />
                                        </div>
                                        <span className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#5B8C5A] to-[#3B82F6] bg-clip-text text-transparent">
                                            {stat.value}
                                        </span>
                                    </div>
                                    <span className="text-sm text-[#888888] mt-1">{stat.label}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="reveal opacity-0 translate-y-4 transition-all duration-700 flex flex-col items-center gap-2 py-8">
                <span className="text-xs uppercase tracking-widest text-[#888888]">Scroll</span>
                <ChevronDown className="w-4 h-4 text-[#888888] animate-bounce" />
            </div>

            <div className="flex-1" />
        </section>
    )
}