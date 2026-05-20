// app/api/bookings/route.js
import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function POST(request) {
    let connection
    try {
        const body = await request.json()
        const { name, email, phone, date, timeSlot, message } = body

        // Validate required fields
        if (!name || !email || !date || !timeSlot) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Get connection from pool
        connection = await pool.getConnection()

        // Start transaction
        await connection.beginTransaction()

        try {
            // Check if slot is still available (MySQL uses FOR UPDATE)
            const [slotCheck] = await connection.query(
                `SELECT id, is_booked FROM available_slots 
                 WHERE slot_date = ? AND start_time = ? AND is_booked = FALSE
                 FOR UPDATE`,
                [date, timeSlot]
            )

            if (slotCheck.length === 0) {
                await connection.rollback()
                return NextResponse.json(
                    { success: false, error: 'Time slot is no longer available' },
                    { status: 409 }
                )
            }

            // Create booking (MySQL uses ? instead of $1, no RETURNING)
            const [bookingResult] = await connection.query(
                `INSERT INTO bookings (name, email, phone, date, time_slot, message, status)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [name, email, phone || null, date, timeSlot, message || null, 'CONFIRMED']
            )

            const bookingId = bookingResult.insertId  // MySQL uses insertId instead of RETURNING

            // Mark slot as booked
            await connection.query(
                `UPDATE available_slots 
                 SET is_booked = TRUE, booking_id = ?, updated_at = CURRENT_TIMESTAMP
                 WHERE slot_date = ? AND start_time = ?`,
                [bookingId, date, timeSlot]
            )

            await connection.commit()

            return NextResponse.json({
                success: true,
                bookingId: bookingId,
                message: 'Booking created successfully'
            })

        } catch (error) {
            await connection.rollback()
            throw error
        }

    } catch (error) {
        console.error('Error creating booking:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to create booking' },
            { status: 500 }
        )
    } finally {
        // Always release the connection back to the pool
        if (connection) {
            connection.release()
        }
    }
}

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const email = searchParams.get('email')

        let sql = `SELECT * FROM bookings ORDER BY date DESC, time_slot ASC`
        let params = []

        if (email) {
            sql = `SELECT * FROM bookings WHERE email = ? ORDER BY date DESC, time_slot ASC`
            params = [email]
        }

        // pool.query() automatically handles connection release
        const [rows] = await pool.query(sql, params)

        return NextResponse.json({
            success: true,
            bookings: rows
        })
    } catch (error) {
        console.error('Error fetching bookings:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch bookings' },
            { status: 500 }
        )
    }
}