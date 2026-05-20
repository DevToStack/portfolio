// app/admin/projects/page.js
'use client'

import { useState, useEffect } from 'react'
import {
    Plus,
    Edit,
    Trash2,
    Eye,
    Github,
    ExternalLink,
    Calendar,
    Tag,
    CheckCircle,
    Clock,
    AlertCircle,
    Search,
    Filter,
    X,
    RefreshCw,
    Star,
    StarOff,
    AlertTriangle
} from 'lucide-react'

export default function AdminProjectsPage() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [projectToDelete, setProjectToDelete] = useState(null)
    const [deleting, setDeleting] = useState(false)
    const [editingProject, setEditingProject] = useState(null)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
        full_description: '',
        image_url: '',
        project_url: '',
        github_url: '',
        category: '',
        tags: [],
        status: 'planned',
        launch_date: '',
        featured: false,
        display_order: 0
    })

    useEffect(() => {
        fetchProjects()
    }, [statusFilter])

    const fetchProjects = async () => {
        try {
            const response = await fetch(`/api/projects?status=${statusFilter}`)
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

    const handleSubmit = async (e) => {
        e.preventDefault()

        const url = editingProject
            ? `/api/projects/${editingProject.id}`
            : '/api/projects'

        const method = editingProject ? 'PUT' : 'POST'

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json()

            if (data.success) {
                fetchProjects()
                setShowModal(false)
                setEditingProject(null)
                resetForm()
            } else {
                alert(data.error)
            }
        } catch (error) {
            console.error('Error saving project:', error)
            alert('Failed to save project')
        }
    }

    const handleDeleteClick = (project) => {
        setProjectToDelete(project)
        setShowDeleteModal(true)
    }

    const handleDeleteConfirm = async () => {
        if (!projectToDelete) return

        setDeleting(true)
        try {
            const response = await fetch(`/api/projects/${projectToDelete.id}`, {
                method: 'DELETE',
            })

            const data = await response.json()

            if (data.success) {
                fetchProjects()
                setShowDeleteModal(false)
                setProjectToDelete(null)
            } else {
                alert(data.error)
            }
        } catch (error) {
            console.error('Error deleting project:', error)
            alert('Failed to delete project')
        } finally {
            setDeleting(false)
        }
    }

    const handleEdit = (project) => {
        setEditingProject(project)
        setFormData({
            title: project.title,
            slug: project.slug,
            description: project.description,
            full_description: project.full_description || '',
            image_url: project.image_url || '',
            project_url: project.project_url || '',
            github_url: project.github_url || '',
            category: project.category || '',
            tags: project.tags || [],
            status: project.status,
            launch_date: project.launch_date || '',
            featured: project.featured,
            display_order: project.display_order
        })
        setShowModal(true)
    }

    const resetForm = () => {
        setFormData({
            title: '',
            slug: '',
            description: '',
            full_description: '',
            image_url: '',
            project_url: '',
            github_url: '',
            category: '',
            tags: [],
            status: 'planned',
            launch_date: '',
            featured: false,
            display_order: 0
        })
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

    const getStatusText = (status) => {
        return status.replace('-', ' ').toUpperCase()
    }

    const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase())
    )

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#5B8C5A] mb-4"></div>
                    <p className="text-[#888888] text-lg">Loading projects...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0A0A0A]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Project Management</h1>
                        <p className="text-[#888888] mt-1">Manage your portfolio projects</p>
                    </div>
                    <button
                        onClick={() => {
                            setEditingProject(null)
                            resetForm()
                            setShowModal(true)
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#5B8C5A] hover:bg-[#4A7349] text-white rounded-lg transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Project
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-[#111111] border border-[#222222] rounded-xl p-4 mb-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex items-center gap-2 flex-1">
                            <Search className="w-4 h-4 text-[#888888]" />
                            <input
                                type="text"
                                placeholder="Search projects..."
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
                            {['all', 'completed', 'in-progress', 'coming-soon', 'planned'].map((status) => (
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

                {/* Projects Grid */}
                <div className="grid gap-4">
                    {filteredProjects.map((project) => (
                        <div key={project.id} className="bg-[#111111] border border-[#222222] rounded-xl p-6 hover:border-[#333333] transition-all">
                            <div className="flex flex-col lg:flex-row gap-6">
                                {/* Image */}
                                {project.image_url && (
                                    <img
                                        src={project.image_url}
                                        alt={project.title}
                                        className="w-full lg:w-48 h-32 object-cover rounded-lg"
                                    />
                                )}

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                                                {project.featured && (
                                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                                )}
                                                {project.category && (
                                                    <div className="flex items-center gap-1 text-xs text-[#5B8C5A]">
                                                        <Tag className="w-3 h-3" />
                                                        {project.category}
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-sm text-[#888888] mb-2">{project.description}</p>
                                            {project.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {project.tags.map((tag, index) => (
                                                        <span key={index} className="px-2 py-1 bg-[#1A1A1A] text-[#888888] text-xs rounded">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                            <div className="flex items-center gap-4 mt-3">
                                                <div className="flex items-center gap-1">
                                                    {getStatusIcon(project.status)}
                                                    <span className="text-xs text-[#888888]">{getStatusText(project.status)}</span>
                                                </div>
                                                {project.launch_date && (
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="w-3 h-3 text-[#888888]" />
                                                        <span className="text-xs text-[#888888]">{project.launch_date}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(project)}
                                                className="p-2 bg-[#1A1A1A] hover:bg-[#222222] rounded-lg transition-colors"
                                            >
                                                <Edit className="w-4 h-4 text-[#5B8C5A]" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(project)}
                                                className="p-2 bg-[#1A1A1A] hover:bg-red-500/10 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4 text-red-500" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <div className="bg-[#111111] border border-[#222222] rounded-xl p-12 text-center">
                        <Eye className="w-12 h-12 text-[#888888] mx-auto mb-3" />
                        <p className="text-[#888888]">No projects found</p>
                    </div>
                )}
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 overflow-y-auto">
                    <div className="bg-[#111111] border border-[#222222] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-[#111111] border-b border-[#222222] p-6 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-white">
                                {editingProject ? 'Edit Project' : 'Add New Project'}
                            </h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-1 hover:bg-[#1A1A1A] rounded-lg"
                            >
                                <X className="w-5 h-5 text-[#888888]" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {/* Form fields remain the same */}
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

                            <div>
                                <label className="block text-sm font-medium text-[#888888] mb-2">Description *</label>
                                <textarea
                                    required
                                    rows="3"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#222222] rounded-lg text-white focus:outline-none focus:border-[#5B8C5A]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#888888] mb-2">Full Description</label>
                                <textarea
                                    rows="5"
                                    value={formData.full_description}
                                    onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#222222] rounded-lg text-white focus:outline-none focus:border-[#5B8C5A]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#888888] mb-2">Image URL</label>
                                <input
                                    type="text"
                                    value={formData.image_url}
                                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#222222] rounded-lg text-white focus:outline-none focus:border-[#5B8C5A]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#888888] mb-2">Project URL</label>
                                    <input
                                        type="url"
                                        value={formData.project_url}
                                        onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
                                        className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#222222] rounded-lg text-white focus:outline-none focus:border-[#5B8C5A]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#888888] mb-2">GitHub URL</label>
                                    <input
                                        type="url"
                                        value={formData.github_url}
                                        onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                                        className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#222222] rounded-lg text-white focus:outline-none focus:border-[#5B8C5A]"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#888888] mb-2">Category</label>
                                    <input
                                        type="text"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#222222] rounded-lg text-white focus:outline-none focus:border-[#5B8C5A]"
                                        placeholder="e.g., FinTech, Healthcare"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#888888] mb-2">Tags (comma-separated)</label>
                                    <input
                                        type="text"
                                        value={formData.tags.join(', ')}
                                        onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(t => t.trim()) })}
                                        className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#222222] rounded-lg text-white focus:outline-none focus:border-[#5B8C5A]"
                                        placeholder="React, Next.js, Tailwind"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#888888] mb-2">Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#222222] rounded-lg text-white focus:outline-none focus:border-[#5B8C5A]"
                                    >
                                        <option value="completed">Completed</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="coming-soon">Coming Soon</option>
                                        <option value="planned">Planned</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#888888] mb-2">Launch Date</label>
                                    <input
                                        type="date"
                                        value={formData.launch_date}
                                        onChange={(e) => setFormData({ ...formData, launch_date: e.target.value })}
                                        className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#222222] rounded-lg text-white focus:outline-none focus:border-[#5B8C5A]"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.featured}
                                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                        className="w-4 h-4 rounded border-[#222222] bg-[#0A0A0A] text-[#5B8C5A] focus:ring-[#5B8C5A]"
                                    />
                                    <span className="text-sm text-[#888888]">Feature this project</span>
                                </label>

                                <div>
                                    <label className="block text-sm font-medium text-[#888888] mb-2">Display Order</label>
                                    <input
                                        type="number"
                                        value={formData.display_order}
                                        onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                                        className="w-24 px-3 py-2 bg-[#0A0A0A] border border-[#222222] rounded-lg text-white focus:outline-none focus:border-[#5B8C5A]"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-[#5B8C5A] hover:bg-[#4A7349] text-white rounded-lg transition-colors"
                                >
                                    {editingProject ? 'Update Project' : 'Create Project'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#222222] text-white rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && projectToDelete && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
                    <div className="bg-[#111111] border border-[#222222] rounded-xl max-w-md w-full">
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20">
                                    <AlertTriangle className="w-6 h-6 text-red-500" />
                                </div>
                                <h3 className="text-xl font-bold text-white">Delete Project</h3>
                            </div>

                            <p className="text-[#888888] mb-2">
                                Are you sure you want to delete <span className="text-white font-semibold">"{projectToDelete.title}"</span>?
                            </p>
                            <p className="text-sm text-[#888888] mb-6">
                                This action cannot be undone. The project will be permanently removed from your portfolio.
                            </p>

                            <div className="flex gap-3">
                                <button
                                    onClick={handleDeleteConfirm}
                                    disabled={deleting}
                                    className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {deleting ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Deleting...
                                        </div>
                                    ) : (
                                        'Delete Project'
                                    )}
                                </button>
                                <button
                                    onClick={() => {
                                        setShowDeleteModal(false)
                                        setProjectToDelete(null)
                                    }}
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