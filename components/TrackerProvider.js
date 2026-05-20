// components/TrackerProvider.js
'use client'

import { useTracker } from '@/hooks/useTracker'

export default function TrackerProvider({ children }) {
    useTracker()

    return <>{children}</>
}