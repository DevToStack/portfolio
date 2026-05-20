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
                router.push('/admin/login')
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
        router.push('/admin/login')
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
            <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
                <div className="bg-[#111111] border border-[#222222] rounded-xl p-8 max-w-md">
                    <h2 className="text-2xl font-bold text-red-500 mb-4">Error Loading Dashboard</h2>
                    <p className="text-[#888888] mb-6">{error}</p>
                    <button
                        onClick={fetchStats}
                        className="w-full bg-[#5B8C5A] text-white py-3 rounded-lg font-semibold hover:bg-[#4A7349] transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        )
    }

    return <DashboardStats stats={stats} />
}