// hooks/useTracker.js
'use client'

import { useEffect } from 'react'

export function useTracker() {
    useEffect(() => {
        // Generate or retrieve persistent session ID
        let sessionId = localStorage.getItem('visitor_session_id')

        if (!sessionId) {
            // Create a truly unique session ID
            sessionId = crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).substr(2, 16)}`
            localStorage.setItem('visitor_session_id', sessionId)
        }

        const trackVisit = async () => {
            try {
                await fetch('/api/track', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        page: window.location.pathname,
                        referrer: document.referrer || 'direct',
                        timestamp: new Date().toISOString(),
                        sessionId: sessionId, // Add session ID to the request
                    }),
                })
            } catch (error) {
                console.error('Tracking failed:', error)
            }
        }

        trackVisit()
    }, [])
}