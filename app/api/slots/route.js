// app/api/slots/route.js
import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET(request) {
    let connection
    try {
        const { searchParams } = new URL(request.url)
        const date = searchParams.get('date')

        // Get a connection from the pool
        connection = await pool.getConnection()

        let sql = `
            SELECT 
                id, 
                DATE_FORMAT(slot_date, '%Y-%m-%d') as date,
                start_time, 
                end_time, 
                is_booked
            FROM available_slots 
            WHERE slot_date >= CURDATE()
        `
        const params = []

        if (date) {
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/
            if (!dateRegex.test(date)) {
                return NextResponse.json(
                    { success: false, error: 'Invalid date format. Use YYYY-MM-DD' },
                    { status: 400 }
                )
            }
            sql += ` AND slot_date = ?`
            params.push(date)
        }

        sql += ` ORDER BY slot_date, start_time`

        const [rows] = await connection.query(sql, params)

        // Group slots by date
        const slotsByDate = {}
        rows.forEach(slot => {
            if (!slotsByDate[slot.date]) {
                slotsByDate[slot.date] = []
            }
            slotsByDate[slot.date].push({
                id: slot.id,
                startTime: slot.start_time,
                endTime: slot.end_time,
                isBooked: Boolean(slot.is_booked)
            })
        })

        return NextResponse.json({
            success: true,
            slots: slotsByDate,
            availableDates: Object.keys(slotsByDate)
        })

    } catch (error) {
        console.error('Error fetching slots:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch slots' },
            { status: 500 }
        )
    } finally {
        // Always release the connection back to the pool
        if (connection) {
            connection.release()
        }
    }
}