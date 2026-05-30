// app/admin/page.js
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DashboardStats from '@/components/admin/DashboardStats'

export default function AdminDashboard() {
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const router = useRouter()

    useEffect(() => {
        fetchStats()
        const interval = setInterval(fetchStats, 30000)
        return () => clearInterval(interval)
    }, [])

    const fetchStats = async () => {
        try {
            const res = await fetch('/api/admin/stats')

            if (res.status === 401) {
                router.push('/login')
                return
            }

            if (!res.ok) {
                throw new Error('Failed to fetch stats')
            }

            const data = await res.json()
            setStats(data)
            setError(null)
        } catch (error) {
            console.error('Failed to fetch stats:', error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = () => {
        document.cookie = 'admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        router.push('/login')
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#5B8C5A] mb-4"></div>
                    <p className="text-[#888888] text-lg">Loading dashboard...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6">
                <div className="max-w-2xl w-full">
                    <div className="flex flex-col items-center text-center">



                        {/* Large Icon */}
                        <div className="mt-6 relative flex flex-col items-center gap-4 justify-center">
                            <div className="w-32 h-32 rounded-full border border-red-500/20 flex items-center justify-center">
                                <svg
                                    className="w-16 h-16 text-red-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M12 9v4m0 4h.01M10.29 3.86L1.82 18A2 2 0 003.53 21h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                                    />
                                </svg>
                            </div>
                            {/* Error Code */}
                            <span className="text-red-500 text-sm font-medium tracking-[0.3em] uppercase">
                                Dashboard Error
                            </span>
                        </div>

                        {/* Main Content */}
                        <h1 className="mt-10 text-5xl font-bold text-white">
                            Unable to load dashboard
                        </h1>

                        {/* Error Message */}
                        {error && (
                            <p className="mt-8 text-sm text-red-400 font-mono">
                                {error}
                            </p>
                        )}

                        {/* Actions */}
                        <div className="mt-12 flex gap-4">
                            <button
                                onClick={fetchStats}
                                className="px-8 py-3 bg-white text-black rounded-lg font-semibold hover:bg-[#e5e5e5] transition"
                            >
                                Try Again
                            </button>

                            <button
                                onClick={() => window.location.reload()}
                                className="px-8 py-3 text-white border border-[#333333] rounded-lg hover:border-[#555555] transition"
                            >
                                Refresh
                            </button>
                        </div>

                        {/* Footer */}
                        <p className="mt-12 text-xs text-[#555555]">
                            If the problem persists, check your network connection or try again later.
                        </p>

                    </div>
                </div>
            </div>
        )
    }

    return <DashboardStats stats={stats} />
}