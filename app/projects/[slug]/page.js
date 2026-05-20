// app/projects/[slug]/page.js
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import {
    ArrowLeft,
    Calendar,
    Tag,
    ExternalLink,
    CheckCircle,
    Clock,
    AlertCircle,
    Sparkles,
    Heart,
    Share2,
    Eye,
    Code,
    Users,
    Star
} from 'lucide-react'
import { BsGithub } from 'react-icons/bs'

export default function ProjectDetailPage() {
    const params = useParams()
    const router = useRouter()
    const [project, setProject] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchProject()
    }, [params.slug])

    const fetchProject = async () => {
        try {
            const response = await fetch(`/api/projects/${params.slug}`)
            const data = await response.json()

            if (data.success) {
                setProject(data.project)
            } else {
                setError(data.error)
            }
        } catch (error) {
            console.error('Error fetching project:', error)
            setError('Failed to load project')
        } finally {
            setLoading(false)
        }
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <CheckCircle className="w-5 h-5 text-green-500" />
            case 'in-progress':
                return <Clock className="w-5 h-5 text-blue-500" />
            case 'coming-soon':
                return <AlertCircle className="w-5 h-5 text-yellow-500" />
            default:
                return <AlertCircle className="w-5 h-5 text-gray-500" />
        }
    }

    const getStatusText = (status) => {
        switch (status) {
            case 'completed':
                return 'Completed'
            case 'in-progress':
                return 'In Progress'
            case 'coming-soon':
                return 'Coming Soon'
            default:
                return 'Planned'
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-500/10 text-green-500 border-green-500/20'
            case 'in-progress':
                return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
            case 'coming-soon':
                return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
            default:
                return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#5B8C5A] mb-4"></div>
                    <p className="text-[#888888] text-lg">Loading project...</p>
                </div>
            </div>
        )
    }

    if (error || !project) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-4">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-white mb-2">Project Not Found</h1>
                    <p className="text-[#888888] mb-6">{error || 'The project you\'re looking for doesn\'t exist.'}</p>
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#5B8C5A] hover:bg-[#4A7349] text-white rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Projects
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0A0A0A]">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                {/* Background Image */}
                {project.image_url && (
                    <div className="absolute inset-0 z-0">
                        <img
                            src={project.image_url}
                            alt={project.title}
                            className="w-full h-full object-cover opacity-20"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/80 to-[#0A0A0A]" />
                    </div>
                )}

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    {/* Back Button */}
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 text-[#888888] hover:text-white mb-8 transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Projects
                    </Link>

                    {/* Project Header */}
                    <div className="max-w-4xl">
                        {/* Status Badge */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${getStatusColor(project.status)}`}>
                                {getStatusIcon(project.status)}
                                <span className="text-sm font-medium">{getStatusText(project.status)}</span>
                            </div>
                            {project.featured && (
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-yellow-500/20 bg-yellow-500/10 text-yellow-500">
                                    <Star className="w-4 h-4 fill-yellow-500" />
                                    <span className="text-sm font-medium">Featured</span>
                                </div>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                            {project.title}
                        </h1>

                        {/* Description */}
                        <p className="text-lg sm:text-xl text-[#888888] leading-relaxed mb-8 max-w-3xl">
                            {project.description}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4">
                            {project.project_url && (
                                <a
                                    href={project.project_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#5B8C5A] hover:bg-[#4A7349] text-white font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-[#5B8C5A]/25"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    Live Demo
                                </a>
                            )}
                            {project.github_url && (
                                <a
                                    href={project.github_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#111111] border border-[#222222] hover:border-[#333333] text-white font-semibold rounded-lg transition-all"
                                >
                                    <BsGithub className="w-4 h-4" />
                                    View Code
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Project Details */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Full Description */}
                        {project.full_description && (
                            <div className="bg-[#111111] rounded-xl border border-[#222222] p-6 lg:p-8">
                                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-[#5B8C5A]" />
                                    About the Project
                                </h2>
                                <div className="text-[#888888] leading-relaxed space-y-4 whitespace-pre-wrap">
                                    {project.full_description}
                                </div>
                            </div>
                        )}

                        {/* Additional Content Placeholder */}
                        <div className="bg-[#111111] rounded-xl border border-[#222222] p-6 lg:p-8">
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Code className="w-5 h-5 text-[#5B8C5A]" />
                                Technical Highlights
                            </h2>
                            <div className="text-[#888888] leading-relaxed space-y-4">
                                <p>
                                    This project showcases modern web development practices including responsive design,
                                    performance optimization, and clean code architecture.
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-[#5B8C5A]" />
                                        <span>Responsive design that works on all devices</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-[#5B8C5A]" />
                                        <span>Optimized performance with 90+ Lighthouse scores</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-[#5B8C5A]" />
                                        <span>Clean, maintainable code with best practices</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Project Info Card */}
                        <div className="bg-[#111111] rounded-xl border border-[#222222] p-6 sticky top-24">
                            <h3 className="text-lg font-semibold text-white mb-4">Project Info</h3>

                            <div className="space-y-4">
                                {/* Category */}
                                {project.category && (
                                    <div>
                                        <p className="text-xs text-[#888888] uppercase tracking-wider mb-2">Category</p>
                                        <div className="flex items-center gap-2">
                                            <Tag className="w-4 h-4 text-[#5B8C5A]" />
                                            <span className="text-white">{project.category}</span>
                                        </div>
                                    </div>
                                )}

                                {/* Launch Date */}
                                {project.launch_date && (
                                    <div>
                                        <p className="text-xs text-[#888888] uppercase tracking-wider mb-2">Launch Date</p>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-[#5B8C5A]" />
                                            <span className="text-white">
                                                {new Date(project.launch_date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Technologies */}
                                {project.tags && project.tags.length > 0 && (
                                    <div>
                                        <p className="text-xs text-[#888888] uppercase tracking-wider mb-2">Technologies</p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 bg-[#1A1A1A] text-[#888888] text-xs rounded-md border border-[#333333]"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Divider */}
                            <div className="border-t border-[#222222] my-6" />

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center">
                                    <Eye className="w-5 h-5 text-[#5B8C5A] mx-auto mb-2" />
                                    <p className="text-2xl font-bold text-white">1.2k</p>
                                    <p className="text-xs text-[#888888]">Views</p>
                                </div>
                                <div className="text-center">
                                    <Heart className="w-5 h-5 text-[#5B8C5A] mx-auto mb-2" />
                                    <p className="text-2xl font-bold text-white">89</p>
                                    <p className="text-xs text-[#888888]">Likes</p>
                                </div>
                            </div>

                            {/* Share Button */}
                            <button
                                onClick={() => {
                                    navigator.share?.({
                                        title: project.title,
                                        text: project.description,
                                        url: window.location.href
                                    })
                                }}
                                className="w-full mt-4 inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#1A1A1A] hover:bg-[#222222] text-white rounded-lg transition-colors"
                            >
                                <Share2 className="w-4 h-4" />
                                Share Project
                            </button>
                        </div>
                    </div>
                </div>

                {/* Related Projects Section */}
                <div className="mt-16 pt-8 border-t border-[#222222]">
                    <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-[#5B8C5A]" />
                        You Might Also Like
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* You can add related projects here */}
                        <div className="bg-[#111111] rounded-xl border border-[#222222] p-6 text-center">
                            <p className="text-[#888888]">More projects coming soon...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}