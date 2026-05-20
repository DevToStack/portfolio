// app/schedule/page.js
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
    Calendar,
    Clock,
    User,
    Mail,
    Phone,
    MessageSquare,
    CheckCircle,
    ArrowLeft,
    Sparkles,
    ChevronRight,
    AlertCircle
} from 'lucide-react'

export default function SchedulePage() {
    const router = useRouter()
    const [selectedDate, setSelectedDate] = useState('')
    const [selectedSlot, setSelectedSlot] = useState(null)
    const [availableDates, setAvailableDates] = useState([])
    const [slotsByDate, setSlotsByDate] = useState({})
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    })
    const [success, setSuccess] = useState(false)

    // Fetch available slots
    useEffect(() => {
        fetchAvailableSlots()
    }, [])

    const fetchAvailableSlots = async () => {
        try {
            const response = await fetch('/api/slots')
            const data = await response.json()

            if (data.success) {
                setAvailableDates(data.availableDates)
                setSlotsByDate(data.slots)
                if (data.availableDates.length > 0) {
                    setSelectedDate(data.availableDates[0])
                }
            }
        } catch (error) {
            console.error('Error fetching slots:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!selectedSlot) {
            alert('Please select a time slot')
            return
        }

        setSubmitting(true)

        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    date: selectedDate,
                    timeSlot: selectedSlot
                })
            })

            const data = await response.json()

            if (data.success) {
                setSuccess(true)
                setTimeout(() => {
                    router.push('/schedule/confirmation')
                }, 2000)
            } else {
                alert(data.error || 'Failed to book appointment')
            }
        } catch (error) {
            console.error('Error booking:', error)
            alert('Failed to book appointment. Please try again.')
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#5B8C5A] mb-4"></div>
                    <p className="text-[#888888] text-lg">Loading available slots...</p>
                </div>
            </div>
        )
    }

    if (success) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
                <div className="max-w-md w-full text-center">
                    <div className="bg-[#5B8C5A]/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 border border-[#5B8C5A]/20">
                        <CheckCircle className="w-12 h-12 text-[#5B8C5A]" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Booking Confirmed!</h2>
                    <p className="text-[#888888] mb-6">
                        Your appointment has been scheduled. You'll receive a confirmation email shortly.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#5B8C5A] hover:bg-[#4A7349] text-white rounded-lg transition-all duration-200"
                    >
                        Return Home
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0A0A0A] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/#cta"
                        className="inline-flex items-center gap-2 text-[#888888] hover:text-white mb-4 transition-colors duration-200 group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                    <div className="flex items-center gap-3 mb-2">
                        <Calendar className="w-8 h-8 text-[#5B8C5A]" />
                        <h1 className="text-4xl font-bold text-white">Schedule a Meeting</h1>
                    </div>
                    <p className="text-[#888888]">Choose your preferred date and time for a consultation</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Calendar and Time Slots */}
                    <div className="lg:col-span-2">
                        <div className="bg-[#111111] rounded-2xl border border-[#222222] p-6">
                            {/* Date Selection */}
                            <div className="mb-8">
                                <label className="block text-sm font-medium text-[#888888] mb-3">
                                    Select Date
                                </label>
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                    {availableDates.map((date) => (
                                        <button
                                            key={date}
                                            onClick={() => {
                                                setSelectedDate(date)
                                                setSelectedSlot(null)
                                            }}
                                            className={`p-3 rounded-xl border-2 transition-all duration-200 ${selectedDate === date
                                                    ? 'border-[#5B8C5A] bg-[#5B8C5A]/10 text-[#5B8C5A]'
                                                    : 'border-[#222222] bg-[#0A0A0A] text-[#888888] hover:border-[#333333] hover:text-white'
                                                }`}
                                        >
                                            <div className="font-semibold text-sm">
                                                {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                                            </div>
                                            <div className="text-xs mt-1">
                                                {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Time Slots */}
                            {selectedDate && slotsByDate[selectedDate] && (
                                <div>
                                    <label className="block text-sm font-medium text-[#888888] mb-3">
                                        Select Time Slot
                                    </label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                        {slotsByDate[selectedDate].map((slot) => (
                                            <button
                                                key={slot.id}
                                                onClick={() => !slot.isBooked && setSelectedSlot(slot.startTime)}
                                                disabled={slot.isBooked}
                                                className={`p-3 rounded-xl border-2 transition-all duration-200 ${selectedSlot === slot.startTime
                                                        ? 'border-[#5B8C5A] bg-[#5B8C5A]/10 text-[#5B8C5A]'
                                                        : slot.isBooked
                                                            ? 'border-[#222222] bg-[#0A0A0A] text-[#444444] cursor-not-allowed opacity-50'
                                                            : 'border-[#222222] bg-[#0A0A0A] text-[#888888] hover:border-[#333333] hover:text-white'
                                                    }`}
                                            >
                                                <div className="flex items-center justify-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    <span className="text-sm font-semibold">
                                                        {slot.startTime}
                                                    </span>
                                                </div>
                                                <div className="text-xs mt-1 text-[#666666]">
                                                    {slot.endTime}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                    {selectedSlot && (
                                        <div className="mt-4 p-4 bg-[#5B8C5A]/10 border border-[#5B8C5A]/20 rounded-xl">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-[#5B8C5A]" />
                                                <p className="text-sm text-[#5B8C5A]">
                                                    Selected: {selectedSlot} on {new Date(selectedDate).toLocaleDateString('en-US', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Booking Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-[#111111] rounded-2xl border border-[#222222] p-6 sticky top-24">
                            <div className="flex items-center gap-2 mb-6">
                                <Sparkles className="w-5 h-5 text-[#5B8C5A]" />
                                <h3 className="text-xl font-bold text-white">Your Information</h3>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#888888] mb-2">
                                        Full Name *
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#888888] w-4 h-4" />
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full pl-10 pr-3 py-2.5 bg-[#0A0A0A] border border-[#222222] rounded-lg text-white placeholder-[#888888] focus:outline-none focus:border-[#5B8C5A] transition-colors duration-200"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#888888] mb-2">
                                        Email Address *
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#888888] w-4 h-4" />
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full pl-10 pr-3 py-2.5 bg-[#0A0A0A] border border-[#222222] rounded-lg text-white placeholder-[#888888] focus:outline-none focus:border-[#5B8C5A] transition-colors duration-200"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#888888] mb-2">
                                        Phone Number
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#888888] w-4 h-4" />
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full pl-10 pr-3 py-2.5 bg-[#0A0A0A] border border-[#222222] rounded-lg text-white placeholder-[#888888] focus:outline-none focus:border-[#5B8C5A] transition-colors duration-200"
                                            placeholder="+1 234 567 8900"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#888888] mb-2">
                                        Additional Notes
                                    </label>
                                    <div className="relative">
                                        <MessageSquare className="absolute left-3 top-3 text-[#888888] w-4 h-4" />
                                        <textarea
                                            rows="3"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full pl-10 pr-3 py-2 bg-[#0A0A0A] border border-[#222222] rounded-lg text-white placeholder-[#888888] focus:outline-none focus:border-[#5B8C5A] transition-colors duration-200 resize-none"
                                            placeholder="Anything you'd like to discuss?"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={!selectedSlot || submitting}
                                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${!selectedSlot || submitting
                                            ? 'bg-[#1A1A1A] text-[#888888] cursor-not-allowed border border-[#222222]'
                                            : 'bg-[#5B8C5A] hover:bg-[#4A7349] text-white shadow-lg shadow-[#5B8C5A]/25'
                                        }`}
                                >
                                    {submitting ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Booking...
                                        </div>
                                    ) : (
                                        'Confirm Booking'
                                    )}
                                </button>
                            </form>

                            {/* Trust Badge */}
                            <div className="mt-6 pt-6 border-t border-[#222222]">
                                <div className="flex items-center justify-center gap-2">
                                    <AlertCircle className="w-4 h-4 text-[#5B8C5A]" />
                                    <p className="text-xs text-[#888888] text-center">
                                        Free consultation • No obligation • Cancel anytime
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}