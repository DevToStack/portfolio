// app/admin/schedule/page.js
'use client'

import { useState, useEffect } from 'react'
import {
    Calendar,
    Clock,
    User,
    Mail,
    Phone,
    MessageSquare,
    CheckCircle,
    XCircle,
    Clock as ClockIcon,
    Users,
    TrendingUp,
    Filter,
    X,
    Eye
} from 'lucide-react'

export default function AdminSchedulePage() {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('all')
    const [selectedBooking, setSelectedBooking] = useState(null)

    useEffect(() => {
        fetchBookings()
    }, [])

    const fetchBookings = async () => {
        try {
            const response = await fetch('/api/bookings')
            const data = await response.json()

            if (data.success) {
                setBookings(data.bookings)
            }
        } catch (error) {
            console.error('Error fetching bookings:', error)
        } finally {
            setLoading(false)
        }
    }

    const updateBookingStatus = async (bookingId, newStatus) => {
        try {
            const response = await fetch(`/api/bookings/${bookingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus })
            })

            const data = await response.json()

            if (data.success) {
                fetchBookings()
                setSelectedBooking(null)
            } else {
                alert('Failed to update booking status')
            }
        } catch (error) {
            console.error('Error updating booking:', error)
            alert('Failed to update booking status')
        }
    }

    const getStatusBadge = (status) => {
        const badges = {
            PENDING: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
            CONFIRMED: 'bg-green-500/10 text-green-500 border-green-500/20',
            CANCELLED: 'bg-red-500/10 text-red-500 border-red-500/20',
            COMPLETED: 'bg-blue-500/10 text-blue-500 border-blue-500/20'
        }

        const icons = {
            PENDING: <ClockIcon className="w-3 h-3" />,
            CONFIRMED: <CheckCircle className="w-3 h-3" />,
            CANCELLED: <XCircle className="w-3 h-3" />,
            COMPLETED: <CheckCircle className="w-3 h-3" />
        }

        return (
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${badges[status]}`}>
                {icons[status]}
                {status}
            </span>
        )
    }

    const filteredBookings = bookings.filter(booking => {
        if (filter === 'all') return true
        return booking.status === filter.toUpperCase()
    })

    const stats = {
        total: bookings.length,
        confirmed: bookings.filter(b => b.status === 'CONFIRMED').length,
        pending: bookings.filter(b => b.status === 'PENDING').length,
        completed: bookings.filter(b => b.status === 'COMPLETED').length
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#5B8C5A] mb-4"></div>
                    <p className="text-[#888888] text-lg">Loading bookings...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0A0A0A]">
            <div>
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <Calendar className="w-8 h-8 text-[#5B8C5A]" />
                        <h1 className="text-3xl font-bold text-white">Schedule Management</h1>
                    </div>
                    <p className="text-[#888888]">View and manage all your bookings</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-[#111111] border border-[#222222] rounded-xl p-6 hover:border-[#333333] transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#888888]">Total Bookings</p>
                                <p className="text-3xl font-bold text-white mt-1">{stats.total}</p>
                            </div>
                            <div className="bg-[#5B8C5A]/10 rounded-xl p-3 border border-[#5B8C5A]/20">
                                <Calendar className="w-6 h-6 text-[#5B8C5A]" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#111111] border border-[#222222] rounded-xl p-6 hover:border-[#333333] transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#888888]">Confirmed</p>
                                <p className="text-3xl font-bold text-[#5B8C5A] mt-1">{stats.confirmed}</p>
                            </div>
                            <div className="bg-[#5B8C5A]/10 rounded-xl p-3 border border-[#5B8C5A]/20">
                                <CheckCircle className="w-6 h-6 text-[#5B8C5A]" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#111111] border border-[#222222] rounded-xl p-6 hover:border-[#333333] transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#888888]">Pending</p>
                                <p className="text-3xl font-bold text-yellow-500 mt-1">{stats.pending}</p>
                            </div>
                            <div className="bg-yellow-500/10 rounded-xl p-3 border border-yellow-500/20">
                                <ClockIcon className="w-6 h-6 text-yellow-500" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#111111] border border-[#222222] rounded-xl p-6 hover:border-[#333333] transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#888888]">Completed</p>
                                <p className="text-3xl font-bold text-blue-500 mt-1">{stats.completed}</p>
                            </div>
                            <div className="bg-blue-500/10 rounded-xl p-3 border border-blue-500/20">
                                <TrendingUp className="w-6 h-6 text-blue-500" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-[#111111] border border-[#222222] rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-2 mb-3 lg:mb-0">
                        <Filter className="w-4 h-4 text-[#888888]" />
                        <span className="text-sm text-[#888888]">Filter by:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {['all', 'pending', 'confirmed', 'cancelled', 'completed'].map((filterOption) => (
                            <button
                                key={filterOption}
                                onClick={() => setFilter(filterOption)}
                                className={`px-4 py-2 rounded-lg capitalize text-sm font-medium transition-all duration-200 ${filter === filterOption
                                        ? 'bg-[#5B8C5A] text-white shadow-lg shadow-[#5B8C5A]/20'
                                        : 'bg-[#1A1A1A] text-[#888888] hover:bg-[#222222] hover:text-white'
                                    }`}
                            >
                                {filterOption}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Bookings Table */}
                <div className="bg-[#111111] border border-[#222222] rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-[#0A0A0A] border-b border-[#222222]">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-[#888888] uppercase tracking-wider">
                                        Client
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-[#888888] uppercase tracking-wider">
                                        Date & Time
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-[#888888] uppercase tracking-wider">
                                        Contact
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-[#888888] uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-[#888888] uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#222222]">
                                {filteredBookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-[#1A1A1A] transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex-shrink-0 w-10 h-10 bg-[#5B8C5A]/10 rounded-xl flex items-center justify-center border border-[#5B8C5A]/20">
                                                    <User className="w-5 h-5 text-[#5B8C5A]" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-white">
                                                        {booking.name}
                                                    </div>
                                                    {booking.message && (
                                                        <div className="text-xs text-[#888888] mt-1 flex items-center gap-1">
                                                            <MessageSquare className="w-3 h-3" />
                                                            {booking.message.substring(0, 50)}...
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-white">
                                                {new Date(booking.date).toLocaleDateString('en-US', {
                                                    weekday: 'short',
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </div>
                                            <div className="text-xs text-[#888888] mt-1 flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {booking.time_slot}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-white flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-[#888888]" />
                                                {booking.email}
                                            </div>
                                            {booking.phone && (
                                                <div className="text-xs text-[#888888] flex items-center gap-2 mt-1">
                                                    <Phone className="w-3 h-3" />
                                                    {booking.phone}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(booking.status)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => setSelectedBooking(booking)}
                                                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#222222] text-[#5B8C5A] rounded-lg text-sm font-medium transition-colors border border-[#333333]"
                                            >
                                                <Eye className="w-4 h-4" />
                                                Manage
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredBookings.length === 0 && (
                        <div className="text-center py-12">
                            <Calendar className="w-12 h-12 text-[#888888] mx-auto mb-3" />
                            <p className="text-[#888888]">No bookings found</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Manage Booking Modal */}
            {selectedBooking && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
                    <div className="bg-[#111111] border border-[#222222] rounded-xl max-w-md w-full p-6 shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-white">Manage Booking</h3>
                            <button
                                onClick={() => setSelectedBooking(null)}
                                className="p-1 hover:bg-[#1A1A1A] rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-[#888888]" />
                            </button>
                        </div>

                        <div className="space-y-5 mb-6">
                            <div className="bg-[#0A0A0A] rounded-lg p-4 border border-[#222222]">
                                <div className="flex items-center gap-2 mb-2">
                                    <User className="w-4 h-4 text-[#5B8C5A]" />
                                    <p className="text-xs text-[#888888] uppercase tracking-wider">Client</p>
                                </div>
                                <p className="text-white font-medium">{selectedBooking.name}</p>
                            </div>

                            <div className="bg-[#0A0A0A] rounded-lg p-4 border border-[#222222]">
                                <div className="flex items-center gap-2 mb-2">
                                    <Calendar className="w-4 h-4 text-[#5B8C5A]" />
                                    <p className="text-xs text-[#888888] uppercase tracking-wider">Date & Time</p>
                                </div>
                                <p className="text-white font-medium">
                                    {new Date(selectedBooking.date).toLocaleDateString()} at {selectedBooking.time_slot}
                                </p>
                            </div>

                            <div className="bg-[#0A0A0A] rounded-lg p-4 border border-[#222222]">
                                <div className="flex items-center gap-2 mb-2">
                                    <Mail className="w-4 h-4 text-[#5B8C5A]" />
                                    <p className="text-xs text-[#888888] uppercase tracking-wider">Contact</p>
                                </div>
                                <p className="text-white font-medium">{selectedBooking.email}</p>
                                {selectedBooking.phone && (
                                    <p className="text-[#888888] text-sm mt-1">{selectedBooking.phone}</p>
                                )}
                            </div>

                            {selectedBooking.message && (
                                <div className="bg-[#0A0A0A] rounded-lg p-4 border border-[#222222]">
                                    <div className="flex items-center gap-2 mb-2">
                                        <MessageSquare className="w-4 h-4 text-[#5B8C5A]" />
                                        <p className="text-xs text-[#888888] uppercase tracking-wider">Notes</p>
                                    </div>
                                    <p className="text-[#888888] text-sm">{selectedBooking.message}</p>
                                </div>
                            )}

                            <div>
                                <p className="text-sm text-[#888888] mb-3">Update Status</p>
                                <div className="grid grid-cols-3 gap-2">
                                    {['CONFIRMED', 'CANCELLED', 'COMPLETED'].map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => updateBookingStatus(selectedBooking.id, status)}
                                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${selectedBooking.status === status
                                                    ? 'bg-[#1A1A1A] text-[#888888] cursor-not-allowed'
                                                    : status === 'CONFIRMED'
                                                        ? 'bg-[#5B8C5A] text-white hover:bg-[#4A7349]'
                                                        : status === 'CANCELLED'
                                                            ? 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20'
                                                            : 'bg-blue-500/10 text-blue-500 border border-blue-500/20 hover:bg-blue-500/20'
                                                }`}
                                            disabled={selectedBooking.status === status}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setSelectedBooking(null)}
                            className="w-full px-4 py-2.5 bg-[#1A1A1A] border border-[#333333] rounded-lg text-white hover:bg-[#222222] transition-colors font-medium"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}