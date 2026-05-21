// app/case-studies/[slug]/page.js
'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import {
    ArrowLeft,
    Sparkles,
    Quote,
    ArrowRight,
    CheckCircle,
    TrendingUp,
    Users,
    Calendar,
    Star,
    Target,
    Zap,
    Award,
    Lightbulb,
    AlertCircle
} from 'lucide-react'

export default function CaseStudyPage() {
    const params = useParams()
    const [caseStudy, setCaseStudy] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchCaseStudy()
    }, [params.slug])

    const fetchCaseStudy = async () => {
        try {
            const response = await fetch(`/api/case-study/${params.slug}`)
            const data = await response.json()
            if (data.success) {
                setCaseStudy(data.caseStudy)
            } else {
                setError(data.error)
            }
        } catch (error) {
            console.error('Error fetching case study:', error)
            setError('Failed to load case study')
        } finally {
            setLoading(false)
        }
    }

    const getMetricIcon = (iconEmoji) => {
        const iconMap = {
            '📈': <TrendingUp className="w-5 h-5" />,
            '🚀': <Zap className="w-5 h-5" />,
            '✅': <CheckCircle className="w-5 h-5" />,
            '🎯': <Target className="w-5 h-5" />,
            '⭐': <Star className="w-5 h-5" />,
            '🏥': <Users className="w-5 h-5" />,
            '⚡': <Zap className="w-5 h-5" />,
            '🔗': <LinkIcon className="w-5 h-5" />,
            '🔐': <Lock className="w-5 h-5" />,
            '📖': <Book className="w-5 h-5" />,
            '📱': <Smartphone className="w-5 h-5" />
        }
        return iconMap[iconEmoji] || <TrendingUp className="w-5 h-5" />
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#5B8C5A] mb-4"></div>
                    <p className="text-[#888888] text-lg">Loading case study...</p>
                </div>
            </div>
        )
    }

    if (error || !caseStudy) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-4">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-white mb-2">Case Study Not Found</h1>
                    <p className="text-[#888888] mb-6">{error || 'The case study you\'re looking for doesn\'t exist.'}</p>
                    <Link
                        href="/#case-studies"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#5B8C5A] hover:bg-[#4A7349] text-white rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Portfolio
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0A0A0A]">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-32 pb-20 px-6 lg:px-20">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#5B8C5A]/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto">
                    <Link
                        href="/#case-studies"
                        className="inline-flex items-center gap-2 text-[#888888] hover:text-white mb-8 transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Portfolio
                    </Link>

                    <div className="max-w-4xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#5B8C5A]/10 border border-[#5B8C5A]/20 rounded-full">
                                <Sparkles className="w-4 h-4 text-[#5B8C5A]" />
                                <span className="text-sm font-semibold text-[#5B8C5A] uppercase tracking-wider">
                                    {caseStudy.category}
                                </span>
                            </div>
                            <span className="text-sm text-[#888888]">Case Study</span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-bold text-white mt-4 mb-6 leading-tight">
                            {caseStudy.title}
                        </h1>

                        <p className="text-xl text-[#888888] mb-12 leading-relaxed max-w-2xl">
                            {caseStudy.short_description || caseStudy.challenge?.substring(0, 150)}
                        </p>

                        {/* Metrics Grid */}
                        {caseStudy.metrics && caseStudy.metrics.length > 0 && (
                            <div className="grid grid-cols-3 gap-8">
                                {caseStudy.metrics.map((metric, idx) => (
                                    <div key={idx} className="group">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="p-2 bg-[#5B8C5A]/10 rounded-lg border border-[#5B8C5A]/20 group-hover:scale-110 transition-transform">
                                                {getMetricIcon(metric.icon)}
                                            </div>
                                            <span className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#5B8C5A] to-[#3B82F6] bg-clip-text text-transparent">
                                                {metric.value}
                                            </span>
                                        </div>
                                        <div className="text-sm text-[#888888]">{metric.label}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Main Image */}
            {caseStudy.image_url && (
                <section className="px-6 lg:px-20 py-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="relative overflow-hidden rounded-2xl border border-[#222222] bg-[#111111]">
                            <img
                                src={caseStudy.image_url}
                                alt={caseStudy.title}
                                className="w-full object-cover transform hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700" />
                        </div>
                    </div>
                </section>
            )}

            {/* The Story */}
            <section className="py-20 px-6 lg:px-20">
                <div className="max-w-4xl mx-auto">
                    <div className="grid gap-8">
                        {/* Challenge */}
                        <div className="bg-[#111111] rounded-xl border border-[#222222] p-8 hover:border-[#333333] transition-all duration-300">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center border border-red-500/20">
                                    <Target className="w-6 h-6 text-red-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">The Challenge</h2>
                            </div>
                            <p className="text-lg text-[#888888] leading-relaxed whitespace-pre-wrap">
                                {caseStudy.challenge}
                            </p>
                        </div>

                        {/* Solution */}
                        <div className="bg-[#111111] rounded-xl border border-[#222222] p-8 hover:border-[#333333] transition-all duration-300">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center border border-yellow-500/20">
                                    <Lightbulb className="w-6 h-6 text-yellow-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">The Solution</h2>
                            </div>
                            <p className="text-lg text-[#888888] leading-relaxed whitespace-pre-wrap">
                                {caseStudy.solution}
                            </p>

                            {/* Technologies */}
                            {caseStudy.technologies && caseStudy.technologies.length > 0 && (
                                <div className="mt-6">
                                    <h3 className="text-sm font-semibold text-[#888888] uppercase tracking-wider mb-3">
                                        Technologies Used
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {caseStudy.technologies.map((tech, index) => (
                                            <span key={index} className="px-3 py-1.5 bg-[#1A1A1A] text-[#888888] text-sm rounded-lg border border-[#333333]">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Results */}
                        {caseStudy.results && caseStudy.results.length > 0 && (
                            <div className="bg-[#111111] rounded-xl border border-[#222222] p-8 hover:border-[#333333] transition-all duration-300">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-[#5B8C5A]/10 rounded-xl flex items-center justify-center border border-[#5B8C5A]/20">
                                        <Award className="w-6 h-6 text-[#5B8C5A]" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-white">Key Results</h2>
                                </div>
                                <div className="space-y-4">
                                    {caseStudy.results.map((result, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-[#5B8C5A] flex-shrink-0 mt-0.5" />
                                            <span className="text-lg text-[#888888] leading-relaxed">{result}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Testimonial */}
                    {caseStudy.testimonial_quote && (
                        <div className="mt-12 bg-gradient-to-br from-[#111111] to-[#0A0A0A] rounded-xl border border-[#222222] p-8">
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                ))}
                            </div>
                            <div className="flex gap-4 mb-6">
                                <Quote className="w-8 h-8 text-[#5B8C5A] flex-shrink-0" />
                                <p className="text-xl text-[#888888] italic leading-relaxed">
                                    "{caseStudy.testimonial_quote}"
                                </p>
                            </div>
                            <div className="flex items-center gap-4 pt-4 border-t border-[#222222]">
                                {caseStudy.testimonial_avatar && (
                                    <img
                                        src={caseStudy.testimonial_avatar}
                                        alt={caseStudy.testimonial_author}
                                        className="w-12 h-12 rounded-full object-cover border border-[#333333]"
                                    />
                                )}
                                <div>
                                    <p className="font-semibold text-white">{caseStudy.testimonial_author || 'Client'}</p>
                                    <p className="text-sm text-[#888888]">{caseStudy.testimonial_role || 'Client'}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 lg:px-20 border-t border-[#222222]">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-gradient-to-r from-[#5B8C5A] via-[#3B82F6] to-[#8B5CF6] rounded-2xl p-12 relative overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
                            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
                        </div>

                        <div className="relative z-10">
                            <Sparkles className="w-12 h-12 text-white mx-auto mb-6" />
                            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                                Want Similar Results?
                            </h2>
                            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                                Let's discuss how we can transform your project and achieve outstanding results
                            </p>
                            <Link
                                href="/#cta"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#5B8C5A] font-semibold rounded-xl hover:shadow-lg hover:shadow-white/25 transition-all duration-300 group"
                            >
                                Start Your Project
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

// Add missing imports for icons used
function Lock(props) { return <svg {...props} /> }
function Book(props) { return <svg {...props} /> }
function Smartphone(props) { return <svg {...props} /> }
function LinkIcon(props) { return <svg {...props} /> }