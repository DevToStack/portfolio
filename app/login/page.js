// app/admin/login/page.js
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Mail } from 'lucide-react'

export default function AdminLogin() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            })

            const data = await res.json()

            if (data.success) {
                router.push('/admin')
            } else {
                setError(data.error || 'Login failed')
            }
        } catch (err) {
            setError('Network error. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6">
            <div className="bg-[#111111] rounded-2xl shadow-xl p-8 w-full max-w-md border border-[#222222] shadow-[#5B8C5A]/20">
                <h1 className="text-3xl font-bold mb-2 text-white">Admin Login</h1>
                <p className="text-gray-200 mb-8">Track your portfolio performance</p>

                <form onSubmit={handleSubmit} className="space-y-6 text-black">
                    {error && (
                        <div className="bg-red-50 text-red-700 p-4 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-[#888888] mb-2">
                            Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#888888] w-4 h-4" />
                            <input
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full pl-10 pr-3 py-2.5 bg-[#0A0A0A] border border-[#222222] rounded-lg text-white placeholder-[#888888] focus:outline-none focus:border-[#5B8C5A] transition-colors duration-200"
                                placeholder="admin@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#888888] mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#888888] w-4 h-4" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-3 py-2.5 bg-[#0A0A0A] border border-[#222222] rounded-lg text-white placeholder-[#888888] focus:outline-none focus:border-[#5B8C5A] transition-colors duration-200"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#5B8C5A] text-white py-3 rounded-lg font-semibold hover:bg-[#4A7A49] transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    )
}