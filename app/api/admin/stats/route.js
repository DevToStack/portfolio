// app/api/admin/stats/route.js - Updated
import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function GET(request) {
    try {
        // Verify auth
        const cookieStore = await cookies()
        const token = cookieStore.get('admin_token')?.value

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        try {
            jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production')
        } catch {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
        }

        // Get ALL visitors (total page views)
        const [totalVisitors] = await pool.execute(
            'SELECT COUNT(DISTINCT session_id) as count FROM visitors'
        )

        // Today's total page views
        const [todayVisitors] = await pool.execute(
            'SELECT COUNT(*) as count FROM visitors WHERE DATE(visit_timestamp) = CURDATE()'
        )

        // Today's unique visitors (distinct people/sessions)
        const [uniqueToday] = await pool.execute(
            'SELECT COUNT(DISTINCT session_id) as count FROM visitors WHERE DATE(visit_timestamp) = CURDATE()'
        )

        // New: Average pages per visitor today
        const [avgPages] = await pool.execute(`
      SELECT AVG(page_count) as avg_pages
      FROM (
        SELECT session_id, COUNT(*) as page_count
        FROM visitors
        WHERE DATE(visit_timestamp) = CURDATE()
        GROUP BY session_id
      ) as session_stats
    `)

        // New: Visitors with their page counts
        const [visitorDetails] = await pool.execute(`
      SELECT 
        session_id,
        COUNT(*) as total_pages,
        COUNT(DISTINCT page_visited) as unique_pages,
        MIN(visit_timestamp) as first_visit,
        MAX(visit_timestamp) as last_visit,
        TIMESTAMPDIFF(MINUTE, MIN(visit_timestamp), MAX(visit_timestamp)) as time_on_site
      FROM visitors
      WHERE DATE(visit_timestamp) = CURDATE()
      GROUP BY session_id
      ORDER BY first_visit DESC
    `)

        // Weekly stats
        const [weeklyStats] = await pool.execute(`
      SELECT 
        DATE(visit_timestamp) as date, 
        COUNT(*) as page_views,
        COUNT(DISTINCT session_id) as unique_visitors
      FROM visitors
      WHERE visit_timestamp >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
      GROUP BY DATE(visit_timestamp)
      ORDER BY date DESC
    `)

        // Device stats
        const [deviceStats] = await pool.execute(`
      SELECT device_type, COUNT(*) as count
      FROM visitors
      GROUP BY device_type
    `)

        // Recent visitors
        const [recentVisitors] = await pool.execute(`
      SELECT * FROM visitors
      ORDER BY visit_timestamp DESC
      LIMIT 50
    `)

        // Top pages
        const [topPages] = await pool.execute(`
      SELECT page_visited, COUNT(*) as count
      FROM visitors
      GROUP BY page_visited
      ORDER BY count DESC
      LIMIT 10
    `)

        return NextResponse.json({
            totalVisitors: totalVisitors[0].count,
            todayVisitors: todayVisitors[0].count,
            uniqueToday: uniqueToday[0].count,
            avgPagesPerVisitor: avgPages[0].avg_pages || 0,
            visitorDetails,
            weeklyStats,
            deviceStats,
            recentVisitors,
            topPages
        })
    } catch (error) {
        console.error('Stats error:', error)
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
    }
}