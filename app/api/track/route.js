// app/api/track/route.js
import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import { headers } from 'next/headers'

export async function POST(request) {
    try {
        const { page, referrer, timestamp, sessionId: clientSessionId } = await request.json()
        const headersList = await headers()

        const ip = headersList.get('x-forwarded-for')?.split(',')[0] || 'unknown'
        const userAgent = headersList.get('user-agent') || 'unknown'

        // Check if admin (skip tracking)
        const isAdminRequest = page?.startsWith('/admin') || referrer?.includes('/admin')
        if (isAdminRequest) {
            return NextResponse.json({ success: true, skipped: true })
        }

        // Parse device info
        const isMobile = /mobile|android|iphone|ipad/i.test(userAgent)
        const isTablet = /tablet|ipad/i.test(userAgent)
        const deviceType = isTablet ? 'tablet' : isMobile ? 'mobile' : 'desktop'

        let browser = 'Unknown'
        if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) browser = 'Chrome'
        else if (userAgent.includes('Firefox')) browser = 'Firefox'
        else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) browser = 'Safari'
        else if (userAgent.includes('Edg')) browser = 'Edge'

        const mysqlTimestamp = new Date(timestamp).toISOString().slice(0, 19).replace('T', ' ')

        // HYBRID UNIQUE VISITOR DETECTION
        let isNewVisitor = true
        let existingSessionId = null
        let matchedBy = null

        // Step 1: Check if session ID exists (most accurate)
        if (clientSessionId) {
            const [existingSession] = await pool.execute(
                `SELECT session_id, ip_address FROM visitors 
                 WHERE session_id = ? 
                 LIMIT 1`,
                [clientSessionId]
            )

            if (existingSession.length > 0) {
                isNewVisitor = false
                existingSessionId = existingSession[0].session_id
                matchedBy = 'session_id'
            }
        }

        // Step 2: If not found by session, check by IP in last 24 hours
        if (isNewVisitor && ip !== 'unknown') {
            const [existingByIP] = await pool.execute(
                `SELECT session_id, ip_address FROM visitors 
                 WHERE ip_address = ? 
                 AND visit_timestamp > DATE_SUB(NOW(), INTERVAL 24 HOUR)
                 LIMIT 1`,
                [ip]
            )

            if (existingByIP.length > 0) {
                isNewVisitor = false
                existingSessionId = existingByIP[0].session_id
                matchedBy = 'ip_address'
            }
        }

        // Step 3: Determine final session ID
        const finalSessionId = existingSessionId || clientSessionId || `${ip}-${Date.now()}`

        // Insert the visit record
        await pool.execute(
            `INSERT INTO visitors (ip_address, user_agent, page_visited, referrer, device_type, browser, session_id, visit_timestamp, is_new_visitor, matched_by)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [ip, userAgent, page, referrer, deviceType, browser, finalSessionId, mysqlTimestamp, isNewVisitor ? 1 : 0, matchedBy]
        )

        // Update daily stats with accurate unique visitor count
        const today = new Date().toISOString().split('T')[0]

        // Get unique visitors using hybrid logic (session_id OR unique IPs within 24h)
        await pool.execute(
            `INSERT INTO daily_stats (visit_date, total_visits, unique_visitors)
             VALUES (?, 1, 1)
             ON DUPLICATE KEY UPDATE
             total_visits = total_visits + 1,
             unique_visitors = (
                 SELECT COUNT(DISTINCT 
                     CASE 
                         WHEN session_id IS NOT NULL THEN session_id 
                         ELSE CONCAT(ip_address, '-', DATE(visit_timestamp))
                     END
                 ) 
                 FROM visitors 
                 WHERE DATE(visit_timestamp) = ?
             )`,
            [today, today]
        )

        return NextResponse.json({
            success: true,
            isNewVisitor,
            matchedBy,
            sessionId: finalSessionId
        })
    } catch (error) {
        console.error('Tracking error:', error)
        return NextResponse.json({ error: 'Tracking failed' }, { status: 500 })
    }
}