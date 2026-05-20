// components/sections/Authority.js
'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Clock, BookOpen, Lightbulb, TrendingUp, Zap } from 'lucide-react'

export default function Authority({ data }) {
    // Default data if not provided
    const articles = data || [
        {
            title: "The Art of Modern Web Design",
            description: "Exploring the principles that make websites not just beautiful, but functional and user-friendly.",
            readTime: "5 min read",
            link: "#",
            category: "Design"
        },
        {
            title: "Performance Optimization Guide",
            description: "Learn how to make your Next.js applications load faster and perform better.",
            readTime: "8 min read",
            link: "#",
            category: "Performance"
        },
        {
            title: "UX Psychology Principles",
            description: "Understanding user behavior to create more intuitive and engaging digital experiences.",
            readTime: "6 min read",
            link: "#",
            category: "UX Design"
        }
    ]

    const getCategoryIcon = (category) => {
        switch (category?.toLowerCase()) {
            case 'design':
                return <Lightbulb className="w-4 h-4" />
            case 'performance':
                return <Zap className="w-4 h-4" />
            case 'ux design':
                return <TrendingUp className="w-4 h-4" />
            default:
                return <BookOpen className="w-4 h-4" />
        }
    }

    return (
        <section id="authority" className="py-16 sm:py-20 lg:py-32 bg-[#0A0A0A] border-t border-[#222222]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 sm:mb-16 lg:mb-20"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-0.5 bg-gradient-to-r from-[#5B8C5A] to-[#3B82F6] rounded-full" />
                        <span className="text-sm font-semibold text-[#5B8C5A] uppercase tracking-wider">
                            Insight Library
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Deep Dives into <span className="bg-gradient-to-r from-[#5B8C5A] to-[#3B82F6] bg-clip-text text-transparent">Design Thinking</span>
                    </h2>
                    <p className="text-base sm:text-lg text-[#888888] max-w-2xl">
                        Explore our collection of articles, case studies, and insights on modern web development and design
                    </p>
                </motion.div>

                {/* Articles Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {articles.map((article, index) => (
                        <motion.a
                            key={index}
                            href={article.link}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group block bg-[#111111] rounded-xl border border-[#222222] hover:border-[#333333] transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="p-6 sm:p-8">
                                {/* Category Badge */}
                                {article.category && (
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#5B8C5A]/10 rounded-full border border-[#5B8C5A]/20">
                                            {getCategoryIcon(article.category)}
                                            <span className="text-xs font-medium text-[#5B8C5A]">
                                                {article.category}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Title */}
                                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-[#5B8C5A] transition-colors duration-300">
                                    {article.title}
                                </h3>

                                {/* Description */}
                                <p className="text-[#888888] leading-relaxed mb-4">
                                    {article.description}
                                </p>

                                {/* Footer */}
                                <div className="flex items-center justify-between pt-4 border-t border-[#222222] group-hover:border-[#333333] transition-colors">
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5 text-[#888888]" />
                                        <span className="text-xs text-[#888888]">{article.readTime}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-[#5B8C5A] group-hover:gap-2 transition-all">
                                        <span className="text-sm font-medium">Read More</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>

                            {/* Hover Gradient Effect */}
                            <div className="h-0.5 bg-gradient-to-r from-[#5B8C5A] to-[#3B82F6] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-xl" />
                        </motion.a>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-12 sm:mt-16"
                >
                    <div className="bg-gradient-to-r from-[#111111] to-[#0A0A0A] rounded-xl border border-[#222222] p-6 sm:p-8">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                            {/* Text Content */}
                            <div className="flex-1">
                                <h4 className="text-lg sm:text-xl font-semibold text-white mb-1">
                                    Want more insights?
                                </h4>
                                <p className="text-sm text-[#888888]">
                                    Subscribe to get the latest articles directly in your inbox
                                </p>
                            </div>

                            {/* Form */}
                            <div className="w-full lg:w-auto">
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        className="flex-1 sm:min-w-[240px] px-4 py-2.5 bg-[#0A0A0A] border border-[#222222] rounded-lg text-white placeholder-[#888888] text-sm focus:outline-none focus:border-[#5B8C5A] transition-colors"
                                    />
                                    <button className="px-6 py-2.5 bg-[#5B8C5A] hover:bg-[#4A7349] text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap">
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}