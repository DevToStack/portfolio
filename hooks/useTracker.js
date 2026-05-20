// hooks/useTracker.js
'use client'

import { useEffect } from 'react'

export function useTracker() {
    useEffect(() => {
        const trackVisit = async () => {
            try {
                await fetch('/api/track', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        page: window.location.pathname,
                        referrer: document.referrer,
                        timestamp: new Date().toISOString(),
                    }),
                })
            } catch (error) {
                console.error('Tracking failed:', error)
            }
        }

        trackVisit()
    }, [])
}