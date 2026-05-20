// app/api/track/route.js
import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import { headers } from 'next/headers'

export async function POST(request) {
    try {
        const { page, referrer, timestamp } = await request.json()
        const headersList = await headers()

        const ip = headersList.get('x-forwarded-for') || 'unknown'
        const userAgent = headersList.get('user-agent') || 'unknown'

        // Parse user agent for device/browser info
        const isMobile = /mobile|android|iphone|ipad/i.test(userAgent)
        const isTablet = /tablet|ipad/i.test(userAgent)
        const deviceType = isTablet ? 'tablet' : isMobile ? 'mobile' : 'desktop'

        let browser = 'Unknown'
        if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) browser = 'Chrome'
        else if (userAgent.includes('Firefox')) browser = 'Firefox'
        else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) browser = 'Safari'
        else if (userAgent.includes('Edg')) browser = 'Edge'

        // Generate simple session ID
        const sessionId = `${ip}-${Math.floor(Date.now() / 1800000)}`

        // Convert ISO timestamp to MySQL DATETIME format
        const mysqlTimestamp = new Date(timestamp)
            .toISOString()
            .slice(0, 19)
            .replace('T', ' ')

        await pool.execute(
            `INSERT INTO visitors (ip_address, user_agent, page_visited, referrer, device_type, browser, session_id, visit_timestamp)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [ip, userAgent, page, referrer, deviceType, browser, sessionId, mysqlTimestamp]
        )

        // Update daily stats
        const today = new Date().toISOString().split('T')[0]

        await pool.execute(
            `INSERT INTO daily_stats (visit_date, total_visits, unique_visitors)
             VALUES (?, 1, 1)
             ON DUPLICATE KEY UPDATE
             total_visits = total_visits + 1,
             unique_visitors = (
                 SELECT COUNT(DISTINCT session_id)
                 FROM visitors
                 WHERE DATE(visit_timestamp) = ?
             )`,
            [today, today]
        )

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Tracking error:', error)
        return NextResponse.json({ error: 'Tracking failed' }, { status: 500 })
    }
}