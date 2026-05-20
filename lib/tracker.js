import pool from './db'

export async function trackVisit(requestData) {
    try {
        const { page, referrer, timestamp, ip, userAgent } = requestData

        // Parse device type
        let deviceType = 'desktop'
        if (/mobile|android|iphone|ipod/i.test(userAgent)) {
            deviceType = 'mobile'
        } else if (/tablet|ipad/i.test(userAgent)) {
            deviceType = 'tablet'
        }

        // Parse browser
        let browser = 'Unknown'
        if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
            browser = 'Chrome'
        } else if (userAgent.includes('Firefox')) {
            browser = 'Firefox'
        } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
            browser = 'Safari'
        } else if (userAgent.includes('Edg')) {
            browser = 'Edge'
        } else if (userAgent.includes('Opera') || userAgent.includes('OPR')) {
            browser = 'Opera'
        }

        // Generate session ID (30-minute sessions)
        const sessionId = `${ip}-${Math.floor(new Date(timestamp).getTime() / 1800000)}`

        // Insert visitor record
        await pool.execute(
            `INSERT INTO visitors (
        ip_address, 
        user_agent, 
        page_visited, 
        referrer, 
        device_type, 
        browser, 
        session_id, 
        visit_timestamp
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [ip, userAgent, page, referrer, deviceType, browser, sessionId, timestamp]
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

        return { success: true }
    } catch (error) {
        console.error('Tracking error:', error)
        throw error
    }
}

export async function getStats() {
    try {
        const [totalVisitors] = await pool.execute(
            'SELECT COUNT(*) as count FROM visitors'
        )

        const [todayVisitors] = await pool.execute(
            'SELECT COUNT(*) as count FROM visitors WHERE DATE(visit_timestamp) = CURDATE()'
        )

        const [uniqueToday] = await pool.execute(
            'SELECT COUNT(DISTINCT session_id) as count FROM visitors WHERE DATE(visit_timestamp) = CURDATE()'
        )

        const [weeklyStats] = await pool.execute(`
      SELECT 
        DATE(visit_timestamp) as date, 
        COUNT(*) as visits,
        COUNT(DISTINCT session_id) as unique_visits
      FROM visitors
      WHERE visit_timestamp >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
      GROUP BY DATE(visit_timestamp)
      ORDER BY date DESC
    `)

        const [deviceStats] = await pool.execute(`
      SELECT device_type, COUNT(*) as count
      FROM visitors
      GROUP BY device_type
    `)

        const [recentVisitors] = await pool.execute(`
      SELECT * FROM visitors
      ORDER BY visit_timestamp DESC
      LIMIT 50
    `)

        const [topPages] = await pool.execute(`
      SELECT page_visited, COUNT(*) as count
      FROM visitors
      GROUP BY page_visited
      ORDER BY count DESC
      LIMIT 10
    `)

        return {
            totalVisitors: totalVisitors[0].count,
            todayVisitors: todayVisitors[0].count,
            uniqueToday: uniqueToday[0].count,
            weeklyStats,
            deviceStats,
            recentVisitors,
            topPages
        }
    } catch (error) {
        console.error('Error fetching stats:', error)
        throw error
    }
}

export async function getVisitorDetails(visitorId) {
    try {
        const [visitor] = await pool.execute(
            'SELECT * FROM visitors WHERE id = ?',
            [visitorId]
        )

        if (visitor.length === 0) {
            return null
        }

        // Get visitor's session history
        const [sessionHistory] = await pool.execute(
            `SELECT * FROM visitors 
       WHERE session_id = ? 
       ORDER BY visit_timestamp DESC`,
            [visitor[0].session_id]
        )

        return {
            ...visitor[0],
            sessionHistory
        }
    } catch (error) {
        console.error('Error fetching visitor details:', error)
        throw error
    }
}