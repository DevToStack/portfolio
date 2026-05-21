// app/admin/case-study/page.js
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
    Plus, Edit, Trash2, Eye, Calendar, Tag, CheckCircle,
    Clock, AlertCircle, Search, X, RefreshCw, Star, StarOff,
    AlertTriangle, FileText, Sparkles
} from 'lucide-react'

export default function AdminCaseStudiesPage() {
    const [caseStudies, setCaseStudies] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [editingStudy, setEditingStudy] = useState(null)
    const [studyToDelete, setStudyToDelete] = useState(null)
    const [deleting, setDeleting] = useState(false)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        category: '',
        short_description: '',
        challenge: '',
        solution: '',
        results: [],
        technologies: [],
        metrics: [],
        testimonial_quote: '',
        testimonial_author: '',
        testimonial_role: '',
        testimonial_avatar: '',
        image_url: '',
        gallery: [],
        status: 'draft',
        featured: false,
        display_order: 0
    })

    useEffect(() => {
        setLoading(true)
        fetchCaseStudies()
    }, [statusFilter])

    const fetchCaseStudies = async () => {
        try {
            const response = await fetch(`/api/case-study?status=${statusFilter}`)
            const data = await response.json()
            if (data.success) {
                setCaseStudies(data.caseStudies)
            }
        } catch (error) {
            console.error('Error fetching case studies:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const url = editingStudy
            ? `/api/case-study/${editingStudy.slug}`
            : '/api/case-study'

        const method = editingStudy ? 'PUT' : 'POST'

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            const data = await response.json()

            if (data.success) {
                fetchCaseStudies()
                setShowModal(false)
                setEditingStudy(null)
                resetForm()
            } else {
                alert(data.error)
            }
        } catch (error) {
            console.error('Error saving case study:', error)
            alert('Failed to save case study')
        }
    }

    const handleDeleteClick = (study) => {
        setStudyToDelete(study)
        setShowDeleteModal(true)
    }

    const handleDeleteConfirm = async () => {
        if (!studyToDelete) return

        setDeleting(true)
        try {
            const response = await fetch(`/api/case-study/${studyToDelete.slug}`, {
                method: 'DELETE',
            })

            const data = await response.json()

            if (data.success) {
                fetchCaseStudies()
                setShowDeleteModal(false)
                setStudyToDelete(null)
            } else {
                alert(data.error)
            }
        } catch (error) {
            console.error('Error deleting case study:', error)
            alert('Failed to delete case study')
        } finally {
            setDeleting(false)
        }
    }

    const handleEdit = (study) => {
        setEditingStudy(study)
        setFormData({
            title: study.title,
            slug: study.slug,
            category: study.category || '',
            short_description: study.short_description || '',
            challenge: study.challenge || '',
            solution: study.solution || '',
            results: study.results || [],
            technologies: study.technologies || [],
            metrics: study.metrics || [],
            testimonial_quote: study.testimonial_quote || '',
            testimonial_author: study.testimonial_author || '',
            testimonial_role: study.testimonial_role || '',
            testimonial_avatar: study.testimonial_avatar || '',
            image_url: study.image_url || '',
            gallery: study.gallery || [],
            status: study.status || 'draft',
            featured: study.featured || false,
            display_order: study.display_order || 0
        })
        setShowModal(true)
    }

    const resetForm = () => {
        setFormData({
            title: '',
            slug: '',
            category: '',
            short_description: '',
            challenge: '',
            solution: '',
            results: [],
            technologies: [],
            metrics: [],
            testimonial_quote: '',
            testimonial_author: '',
            testimonial_role: '',
            testimonial_avatar: '',
            image_url: '',
            gallery: [],
            status: 'draft',
            featured: false,
            display_order: 0
        })
    }

    const getStatusBadge = (status) => {
        if (status === 'published') {
            return <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs rounded-md border border-green-500/20">Published</span>
        }
        return <span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 text-xs rounded-md border border-yellow-500/20">Draft</span>
    }

    const getRandomHeight = () => {
        const heights = ['h-48', 'h-56', 'h-64', 'h-72']
        return heights[Math.floor(Math.random() * heights.length)]
    }

    // Skeleton Card Component
    const SkeletonCard = () => {
        const randomHeight = getRandomHeight()
        return (
            <div className="break-inside-avoid animate-pulse">
                <div className="bg-[#111111] rounded-xl border border-[#222222] overflow-hidden">
                    {/* Image Skeleton */}
                    <div className={`relative w-full ${randomHeight} bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A]`}>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <FileText className="w-12 h-12 text-[#222222]" />
                        </div>
                    </div>

                    {/* Content Skeleton */}
                    <div className="p-4 space-y-3">
                        {/* Title Skeleton */}
                        <div className="h-5 bg-[#1A1A1A] rounded-lg w-3/4"></div>

                        {/* Description Skeleton */}
                        <div className="space-y-2">
                            <div className="h-3 bg-[#1A1A1A] rounded w-full"></div>
                            <div className="h-3 bg-[#1A1A1A] rounded w-5/6"></div>
                        </div>

                        {/* Technologies Skeleton */}
                        <div className="flex flex-wrap gap-1.5">
                            <div className="h-5 bg-[#1A1A1A] rounded w-12"></div>
                            <div className="h-5 bg-[#1A1A1A] rounded w-16"></div>
                            <div className="h-5 bg-[#1A1A1A] rounded w-10"></div>
                        </div>

                        {/* Footer Skeleton */}
                        <div className="flex items-center justify-between pt-3 border-t border-[#222222]">
                            <div className="flex items-center gap-2">
                                <div className="h-3 bg-[#1A1A1A] rounded w-20"></div>
                            </div>
                            <div className="h-3 bg-[#1A1A1A] rounded w-16"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const filteredStudies = caseStudies.filter(study =>
        study.title.toLowerCase().includes(search.toLowerCase()) ||
        study.category.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-[#0A0A0A]">
            <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Case Study Management</h1>
                        <p className="text-[#888888] mt-1">Manage your portfolio case studies</p>
                    </div>
                    <button
                        onClick={() => {
                            setEditingStudy(null)
                            resetForm()
                            setShowModal(true)
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#5B8C5A] hover:bg-[#4A7349] text-white rounded-lg transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Case Study
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-[#111111] border border-[#222222] rounded-xl p-4 mb-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex items-center gap-2 flex-1">
                            <Search className="w-4 h-4 text-[#888888]" />
                            <input
                                type="text"
                                placeholder="Search case studies..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder-[#888888]"
                            />
                            {search && (
                                <button onClick={() => setSearch('')} className="p-1 hover:bg-[#1A1A1A] rounded-lg">
                                    <X className="w-4 h-4 text-[#888888]" />
                                </button>
                            )}
                        </div>
                        <div className="flex gap-2">
                            {['all', 'published', 'draft'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setStatusFilter(status)}
                                    className={`px-3 py-1.5 rounded-lg capitalize text-sm transition-colors ${statusFilter === status
                                        ? 'bg-[#5B8C5A] text-white'
                                        : 'bg-[#1A1A1A] text-[#888888] hover:text-white'
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Pinterest-style Masonry Grid with Skeletons */}
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-6 space-y-6">
                    {loading ? (
                        // Show 8 skeleton cards while loading
                        Array.from({ length: 8 }).map((_, index) => (
                            <SkeletonCard key={`skeleton-${index}`} />
                        ))
                    ) : (
                        // Show actual case studies
                        filteredStudies.map((study) => (
                            <div
                                key={study.id}
                                className="group break-inside-avoid bg-[#111111] rounded-xl border border-[#222222] overflow-hidden hover:border-[#333333] transition-all duration-300 hover:-translate-y-1"
                            >
                                {/* Image Section */}
                                <div className="relative overflow-hidden">
                                    <div className={`relative w-full ${getRandomHeight()}`}>
                                        {study.image_url ? (
                                            <img
                                                src={study.image_url}
                                                alt={study.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] flex items-center justify-center">
                                                <FileText className="w-12 h-12 text-[#888888]" />
                                            </div>
                                        )}

                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* Category Badge */}
                                        <div className="absolute bottom-3 left-3">
                                            <div className="flex items-center gap-1.5 px-2 py-1 bg-[#5B8C5A]/90 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                                                <Sparkles className="w-3 h-3" />
                                                {study.category}
                                            </div>
                                        </div>

                                        {/* Status Badge */}
                                        <div className="absolute top-3 right-3">
                                            {getStatusBadge(study.status)}
                                        </div>

                                        {/* Featured Badge */}
                                        {study.featured && (
                                            <div className="absolute top-3 left-3">
                                                <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/90 backdrop-blur-sm rounded-full">
                                                    <Star className="w-3 h-3 text-white fill-white" />
                                                    <span className="text-xs font-medium text-white">Featured</span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Action Buttons Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50">
                                            <Link
                                                href={`/case-studies/${study.slug}`}
                                                target="_blank"
                                                className="p-2 bg-[#5B8C5A] hover:bg-[#4A7349] rounded-lg transition-colors"
                                                title="View on site"
                                            >
                                                <Eye className="w-4 h-4 text-white" />
                                            </Link>
                                            <button
                                                onClick={() => handleEdit(study)}
                                                className="p-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Edit className="w-4 h-4 text-white" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(study)}
                                                className="p-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4 text-white" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-4">
                                    <h3 className="font-semibold text-white group-hover:text-[#5B8C5A] transition-colors line-clamp-1 mb-1">
                                        {study.title}
                                    </h3>
                                    <p className="text-sm text-[#888888] line-clamp-2 mb-3">
                                        {study.short_description}
                                    </p>

                                    {/* Technologies */}
                                    {study.technologies && study.technologies.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mb-3">
                                            {study.technologies.slice(0, 3).map((tech, idx) => (
                                                <span key={idx} className="px-1.5 py-0.5 bg-[#1A1A1A] text-[#888888] text-xs rounded">
                                                    {tech}
                                                </span>
                                            ))}
                                            {study.technologies.length > 3 && (
                                                <span className="px-1.5 py-0.5 bg-[#1A1A1A] text-[#888888] text-xs rounded">
                                                    +{study.technologies.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-3 border-t border-[#222222]">
                                        <div className="flex items-center gap-2 text-xs text-[#888888]">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(study.created_at).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-[#5B8C5A]">
                                            <Tag className="w-3 h-3" />
                                            {study.category}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {!loading && filteredStudies.length === 0 && (
                    <div className="bg-[#111111] border border-[#222222] rounded-xl p-12 text-center">
                        <FileText className="w-12 h-12 text-[#888888] mx-auto mb-3" />
                        <p className="text-[#888888]">No case studies found</p>
                    </div>
                )}
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 overflow-y-auto">
                    <div className="bg-[#111111] border border-[#222222] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-[#111111] border-b border-[#222222] p-6 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-white">
                                {editingStudy ? 'Edit Case Study' : 'Add New Case Study'}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="p-1 hover:bg-[#1A1A1A] rounded-lg">
                                <X className="w-5 h-5 text-[#888888]" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {/* Form fields */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#888888] mb-2">Title *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#222222] rounded-lg text-white focus:outline-none focus:border-[#5B8C5A]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#888888] mb-2">Slug *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                                        className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#222222] rounded-lg text-white focus:outline-none focus:border-[#5B8C5A]"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#888888] mb-2">Category *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#222222] rounded-lg text-white focus:outline-none focus:border-[#5B8C5A]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#888888] mb-2">Display Order</label>
                                    <input
                                        type="number"
                                        value={formData.display_order}
                                        onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                                        className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#222222] rounded-lg text-white focus:outline-none focus:border-[#5B8C5A]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#888888] mb-2">Short Description *</label>
                                <textarea
                                    required
                                    rows="2"
                                    value={formData.short_description}
                                    onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#222222] rounded-lg text-white focus:outline-none focus:border-[#5B8C5A]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#888888] mb-2">Challenge *</label>
                                <textarea
                                    required
                                    rows="4"
                                    value={formData.challenge}
                                    onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#222222] rounded-lg text-white focus:outline-none focus:border-[#5B8C5A]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#888888] mb-2">Solution *</label>
                                <textarea
                                    required
                                    rows="4"
                                    value={formData.solution}
                                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#222222] rounded-lg text-white focus:outline-none focus:border-[#5B8C5A]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#888888] mb-2">Results (one per line)</label>
                                <textarea
                                    rows="3"
                                    value={formData.results.join('\n')}
                                    onChange={(e) => setFormData({ ...formData, results: e.target.value.split('\n').filter(r => r.trim()) })}
                                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#222222] rounded-lg text-white focus:outline-none focus:border-[#5B8C5A]"
                                    placeholder="Increased engagement by 70%&#10;Reduced load time by 50%&#10;Improved conversion rate"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#888888] mb-2">Technologies (comma separated)</label>
                                <input
                                    type="text"
                                    value={formData.technologies.join(', ')}
                                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value.split(',').map(t => t.trim()) })}
                                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#222222] rounded-lg text-white focus:outline-none focus:border-[#5B8C5A]"
                                    placeholder="Next.js, React, Tailwind CSS"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#888888] mb-2">Image URL</label>
                                <input
                                    type="url"
                                    value={formData.image_url}
                                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#222222] rounded-lg text-white focus:outline-none focus:border-[#5B8C5A]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#888888] mb-2">Testimonial Author</label>
                                    <input
                                        type="text"
                                        value={formData.testimonial_author}
                                        onChange={(e) => setFormData({ ...formData, testimonial_author: e.target.value })}
                                        className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#222222] rounded-lg text-white focus:outline-none focus:border-[#5B8C5A]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#888888] mb-2">Testimonial Role</label>
                                    <input
                                        type="text"
                                        value={formData.testimonial_role}
                                        onChange={(e) => setFormData({ ...formData, testimonial_role: e.target.value })}
                                        className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#222222] rounded-lg text-white focus:outline-none focus:border-[#5B8C5A]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#888888] mb-2">Testimonial Quote</label>
                                <textarea
                                    rows="2"
                                    value={formData.testimonial_quote}
                                    onChange={(e) => setFormData({ ...formData, testimonial_quote: e.target.value })}
                                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#222222] rounded-lg text-white focus:outline-none focus:border-[#5B8C5A]"
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.featured}
                                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                        className="w-4 h-4 rounded border-[#222222] bg-[#0A0A0A] text-[#5B8C5A]"
                                    />
                                    <span className="text-sm text-[#888888]">Feature this case study</span>
                                </label>

                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.status === 'published'}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.checked ? 'published' : 'draft' })}
                                        className="w-4 h-4 rounded border-[#222222] bg-[#0A0A0A] text-[#5B8C5A]"
                                    />
                                    <span className="text-sm text-[#888888]">Publish</span>
                                </label>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button type="submit" className="flex-1 px-4 py-2 bg-[#5B8C5A] hover:bg-[#4A7349] text-white rounded-lg transition-colors">
                                    {editingStudy ? 'Update Case Study' : 'Create Case Study'}
                                </button>
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#222222] text-white rounded-lg transition-colors">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && studyToDelete && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
                    <div className="bg-[#111111] border border-[#222222] rounded-xl max-w-md w-full">
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20">
                                    <AlertTriangle className="w-6 h-6 text-red-500" />
                                </div>
                                <h3 className="text-xl font-bold text-white">Delete Case Study</h3>
                            </div>
                            <p className="text-[#888888] mb-2">
                                Are you sure you want to delete <span className="text-white font-semibold">"{studyToDelete.title}"</span>?
                            </p>
                            <p className="text-sm text-[#888888] mb-6">
                                This action cannot be undone. The case study will be permanently removed.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleDeleteConfirm}
                                    disabled={deleting}
                                    className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {deleting ? 'Deleting...' : 'Delete'}
                                </button>
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="flex-1 px-4 py-2 bg-[#1A1A1A] hover:bg-[#222222] text-white rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}