// app/projects/page.js
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
    Search,
    Calendar,
    Tag,
    ExternalLink,
    Clock,
    CheckCircle,
    AlertCircle,
    ArrowLeft,
    Sparkles,
    Eye,
    ArrowRight,
    Heart
} from 'lucide-react'

export default function ProjectsPage() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')

    useEffect(() => {
        setLoading(true)
        fetchProjects()
    }, [statusFilter])

    const fetchProjects = async () => {
        try {
            const response = await fetch(`/api/projects?status=${statusFilter}&limit=100`)
            const data = await response.json()
            if (data.success) {
                setProjects(data.projects)
            }
        } catch (error) {
            console.error('Error fetching projects:', error)
        } finally {
            setLoading(false)
        }
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <CheckCircle className="w-4 h-4 text-green-500" />
            case 'in-progress':
                return <Clock className="w-4 h-4 text-blue-500" />
            case 'coming-soon':
                return <AlertCircle className="w-4 h-4 text-yellow-500" />
            default:
                return <AlertCircle className="w-4 h-4 text-gray-500" />
        }
    }

    const getRandomHeight = () => {
        const heights = ['h-72', 'h-80', 'h-88', 'h-96']
        return heights[Math.floor(Math.random() * heights.length)]
    }

    const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase()) ||
        (project.category && project.category.toLowerCase().includes(search.toLowerCase()))
    )

    // Skeleton Card Component
    const SkeletonCard = () => (
        <div className="break-inside-avoid animate-pulse">
            <div className="bg-[#111111] rounded-xl border border-[#222222] overflow-hidden">
                {/* Image Skeleton */}
                <div className={`relative w-full ${getRandomHeight()} bg-[#1A1A1A]`} suppressHydrationWarning>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A]" />
                </div>

                {/* Content Skeleton */}
                <div className="p-5 sm:p-6 space-y-4">
                    {/* Title and Date */}
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="h-6 bg-[#1A1A1A] rounded-lg w-3/4"></div>
                        </div>
                        <div className="h-4 bg-[#1A1A1A] rounded w-16 ml-2"></div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <div className="h-4 bg-[#1A1A1A] rounded w-full"></div>
                        <div className="h-4 bg-[#1A1A1A] rounded w-5/6"></div>
                        <div className="h-4 bg-[#1A1A1A] rounded w-4/6"></div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        <div className="h-6 bg-[#1A1A1A] rounded w-16"></div>
                        <div className="h-6 bg-[#1A1A1A] rounded w-20"></div>
                        <div className="h-6 bg-[#1A1A1A] rounded w-14"></div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-[#222222]">
                        <div className="flex items-center gap-3">
                            <div className="h-4 bg-[#1A1A1A] rounded w-20"></div>
                        </div>
                        <div className="h-4 bg-[#1A1A1A] rounded w-8"></div>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-[#0A0A0A]">
            {/* Header */}
            <div className="border-b border-[#222222] bg-[#0A0A0A]/95 sticky top-0 z-50 backdrop-blur-sm">
                <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-[#888888] hover:text-white mb-6 transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                    <div className="flex items-center gap-3">
                        <Sparkles className="w-8 h-8 text-[#5B8C5A]" />
                        <h1 className="text-3xl sm:text-4xl font-bold text-white">All Projects</h1>
                    </div>
                    <p className="text-[#888888] mt-2">Explore my complete portfolio of work</p>
                </div>
            </div>

            <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#888888]" />
                        <input
                            type="text"
                            placeholder="Search projects by title, description, or category..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-[#111111] border border-[#222222] rounded-lg text-white placeholder-[#888888] focus:outline-none focus:border-[#5B8C5A] transition-colors"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                        {['all', 'completed', 'in-progress', 'coming-soon'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-4 py-2 rounded-lg capitalize text-sm transition-colors whitespace-nowrap ${statusFilter === status
                                        ? 'bg-[#5B8C5A] text-white'
                                        : 'bg-[#111111] text-[#888888] hover:text-white border border-[#222222]'
                                    }`}
                            >
                                {status === 'all' ? 'All Projects' : status}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Pinterest-style Masonry Grid using CSS columns */}
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-6 space-y-6">
                    {/* Show skeletons while loading */}
                    {loading ? (
                        // Show 10 skeleton cards while loading
                        Array.from({ length: 10 }).map((_, index) => (
                            <SkeletonCard key={`skeleton-${index}`} />
                        ))
                    ) : (
                        // Show actual projects
                        filteredProjects.map((item, index) => (
                            <div
                                key={item.id || index}
                                className="group cursor-pointer break-inside-avoid hover:-translate-y-1 transition-transform duration-300"
                            >
                                <div className="bg-[#111111] rounded-xl border border-[#222222] overflow-hidden hover:border-[#333333] transition-colors duration-200">
                                    {/* Image Container */}
                                    <div className="relative overflow-hidden bg-[#111111]">
                                        <div className={`relative w-full ${getRandomHeight()}`}>
                                            <img
                                                src={item.image_url || item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover transition-transform duration-500 will-change-transform"
                                                loading="lazy"
                                            />

                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                            {/* View Project Button */}
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-30">
                                                <Link
                                                    href={`/projects/${item.slug || item.id}`}
                                                    className="pointer-events-auto inline-flex items-center gap-2 px-5 py-2.5 bg-[#5B8C5A] hover:bg-[#4A7349] text-white text-sm font-medium rounded-lg shadow-lg shadow-[#5B8C5A]/25 transition-colors duration-200 transform translate-y-4 group-hover:translate-y-0 transition-transform"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    View Project
                                                    <ExternalLink className="w-3.5 h-3.5" />
                                                </Link>
                                            </div>

                                            {/* Category Badge */}
                                            <div className="absolute top-4 left-4 z-20">
                                                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#5B8C5A]/90 backdrop-blur-sm rounded-full border border-[#5B8C5A]/20">
                                                    <Sparkles className="w-3 h-3 text-white" />
                                                    <span className="text-xs font-medium text-white">
                                                        {item.category || "Experiment"}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Status Badge */}
                                            {item.status && item.status !== 'completed' && (
                                                <div className="absolute top-4 right-4 z-20">
                                                    <div className="px-2 py-1 bg-black/70 backdrop-blur-sm rounded-full text-xs font-medium text-white capitalize">
                                                        {item.status.replace('-', ' ')}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 sm:p-6">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#5B8C5A] transition-colors duration-200 line-clamp-2">
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
                                        <p className="text-sm text-[#888888] leading-relaxed mb-4 line-clamp-3">
                                            {item.description}
                                        </p>

                                        {/* Tags */}
                                        {item.tags && item.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {item.tags.slice(0, 3).map((tag, idx) => (
                                                    <span key={idx} className="px-2 py-0.5 bg-[#1A1A1A] text-[#888888] text-xs rounded-md">
                                                        {tag}
                                                    </span>
                                                ))}
                                                {item.tags.length > 3 && (
                                                    <span className="px-2 py-0.5 bg-[#1A1A1A] text-[#888888] text-xs rounded-md">
                                                        +{item.tags.length - 3}
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
                            </div>
                        ))
                    )}
                </div>

                {/* No Results */}
                {!loading && filteredProjects.length === 0 && (
                    <div className="bg-[#111111] border border-[#222222] rounded-xl p-12 text-center">
                        <p className="text-[#888888]">No projects found matching your criteria</p>
                    </div>
                )}
            </div>
        </div>
    )
}