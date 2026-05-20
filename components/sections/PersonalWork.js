// components/sections/PersonalWork.js
'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Eye, ExternalLink, Clock, Heart } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function PersonalWork() {
    const [hoveredIndex, setHoveredIndex] = useState(null)
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchFeaturedProjects()
    }, [])

    const fetchFeaturedProjects = async () => {
        try {
            const response = await fetch('/api/projects?featured=true&limit=3')
            const data = await response.json()
            if (data.success && data.projects.length > 0) {
                setProjects(data.projects)
            } else {
                // Fallback to default data if no projects in database
                setProjects([
                    {
                        title: "Experimental UI Library",
                        description: "A collection of unique, interactive components built with React and Framer Motion",
                        image_url: "/api/placeholder/400/300",
                        category: "Design System",
                        launch_date: "2024",
                        status: "completed"
                    },
                    {
                        title: "AI Image Generator",
                        description: "Exploring the intersection of AI and creative expression",
                        image_url: "/api/placeholder/400/300",
                        category: "AI/ML",
                        launch_date: "2024",
                        status: "completed"
                    },
                    {
                        title: "3D Portfolio Concept",
                        description: "Immersive 3D experience using Three.js and WebGL",
                        image_url: "/api/placeholder/400/300",
                        category: "3D Design",
                        launch_date: "2023",
                        status: "completed"
                    }
                ])
            }
        } catch (error) {
            console.error('Error fetching featured projects:', error)
            // Use fallback data on error
            setProjects([
                {
                    title: "Experimental UI Library",
                    description: "A collection of unique, interactive components built with React and Framer Motion",
                    image_url: "/api/placeholder/400/300",
                    category: "Design System",
                    launch_date: "2024",
                    status: "completed"
                },
                {
                    title: "AI Image Generator",
                    description: "Exploring the intersection of AI and creative expression",
                    image_url: "/api/placeholder/400/300",
                    category: "AI/ML",
                    launch_date: "2024",
                    status: "completed"
                },
                {
                    title: "3D Portfolio Concept",
                    description: "Immersive 3D experience using Three.js and WebGL",
                    image_url: "/api/placeholder/400/300",
                    category: "3D Design",
                    launch_date: "2023",
                    status: "completed"
                }
            ])
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <section id="personal-work" className="py-16 sm:py-20 lg:py-32 bg-[#0A0A0A] border-t border-[#222222]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#5B8C5A] mb-4"></div>
                        <p className="text-[#888888]">Loading projects...</p>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section id="personal-work" className="py-16 sm:py-20 lg:py-32 bg-[#0A0A0A] border-t border-[#222222]">
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
                            Creative Exploration
                        </span>
                        <Sparkles className="w-4 h-4 text-[#5B8C5A]" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                        The <span className="bg-gradient-to-r from-[#5B8C5A] to-[#3B82F6] bg-clip-text text-transparent">Shadow Portfolio</span>
                    </h2>
                    <p className="text-base sm:text-lg text-[#888888] max-w-2xl">
                        Personal experiments that reveal my true taste and push creative boundaries
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {projects.map((item, index) => (
                        <motion.div
                            key={item.id || index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group cursor-pointer hover:-translate-y-1 transition-transform duration-300"
                        >
                            <div className="bg-[#111111] rounded-xl border border-[#222222] overflow-hidden hover:border-[#333333] transition-colors duration-200">
                                {/* Image Container - No gap, no translate */}
                                <div className="relative overflow-hidden h-64 bg-[#111111]">
                                    {/* View Project Button */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30">
                                        <Link
                                            href={`/projects/${item.slug || item.id}`}
                                            className="pointer-events-auto inline-flex items-center gap-2 px-5 py-2.5 bg-[#5B8C5A] hover:bg-[#4A7349] text-white text-sm font-medium rounded-lg shadow-lg shadow-[#5B8C5A]/25 transition-colors duration-200"
                                        >
                                            <Eye className="w-4 h-4" />
                                            View Project
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>

                                    <img
                                        src={item.image_url || item.image}
                                        alt={item.title}
                                        className="
                                            w-full
                                            h-full
                                            object-cover
                                            transition-transform
                                            duration-500
                                            will-change-transform
                                            [transform:translateZ(0)]
                                            [backface-visibility:hidden]
                                        "
                                    />

                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4 z-20">
                                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#5B8C5A]/90 backdrop-blur-sm rounded-full border border-[#5B8C5A]/20">
                                            <Sparkles className="w-3 h-3 text-white" />
                                            <span className="text-xs font-medium text-white">
                                                {item.category || "Experiment"}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Status Badge (if not completed) */}
                                    {item.status && item.status !== 'completed' && (
                                        <div className="absolute top-4 right-4 z-20">
                                            <div className="px-2 py-1 bg-black/70 backdrop-blur-sm rounded-full text-xs font-medium text-white capitalize">
                                                {item.status.replace('-', ' ')}
                                            </div>
                                        </div>
                                    )}


                                </div>

                                {/* Content - Directly attached, no gap */}
                                <div className="p-5 sm:p-6">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#5B8C5A] transition-colors duration-200">
                                            {item.title}
                                        </h3>
                                        <span className="text-xs text-[#888888] flex-shrink-0 ml-2">
                                            {item.launch_date
                                                ? (() => {
                                                    const date = new Date(item.launch_date)
                                                    const isValidDate = !isNaN(date.getTime())

                                                    if (!isValidDate) return 'Invalid date'

                                                    const hasMonthDay = item.launch_date.includes('-') &&
                                                        item.launch_date.split('-').length >= 2

                                                    if (hasMonthDay) {
                                                        return date.toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })
                                                    } else {
                                                        return date.getFullYear()
                                                    }
                                                })()
                                                : 'Coming Soon'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-[#888888] leading-relaxed mb-4 line-clamp-2">
                                        {item.description}
                                    </p>

                                    {/* Tags */}
                                    {item.tags && item.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {item.tags.slice(0, 4).map((tag, idx) => (
                                                <span key={idx} className="px-2 py-0.5 bg-[#1A1A1A] text-[#888888] text-xs rounded-md">
                                                    {tag}
                                                </span>
                                            ))}
                                            {item.tags.length > 4 && (
                                                <span className="px-2 py-0.5 bg-[#1A1A1A] text-[#888888] text-xs rounded-md">
                                                    +{item.tags.length - 4}
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    {/* Footer Stats */}
                                    <div className="flex items-center justify-between pt-4 border-t border-[#222222] group-hover:border-[#333333] transition-colors duration-200">
                                        <div className="flex items-center gap-3">
                                            {item.status === 'completed' && (
                                                <div className="flex items-center gap-1">
                                                    <Heart className="w-3.5 h-3.5 text-[#888888] group-hover:text-red-500 transition-colors duration-200" />
                                                    <span className="text-xs text-[#888888]">Featured</span>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-3.5 h-3.5 text-[#888888]" />
                                                <span className="text-xs text-[#888888] capitalize">
                                                    {item.status === 'completed' ? 'Completed' :
                                                        item.status === 'in-progress' ? 'In Progress' :
                                                            item.status === 'coming-soon' ? 'Coming Soon' : 'Planned'}
                                                </span>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-[#5B8C5A] opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View All Button - Link to projects page */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-12 sm:mt-16 text-center"
                >
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#111111] hover:bg-[#1A1A1A] border border-[#222222] hover:border-[#333333] text-white font-semibold rounded-xl transition-all duration-300 group"
                    >
                        <Sparkles className="w-5 h-5 text-[#5B8C5A]" />
                        Explore All Projects
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                {/* Note */}
                <div className="mt-8 text-center">
                    <p className="text-xs text-[#888888]">
                        These are personal projects and experiments. Some may be works in progress.
                    </p>
                </div>
            </div>
        </section>
    )
}