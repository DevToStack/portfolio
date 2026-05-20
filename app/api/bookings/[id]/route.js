// app/api/bookings/[id]/route.js
import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function PUT(request, { params }) {
    let connection
    try {
        const { id } = await params
        const body = await request.json()
        const { status } = body

        // Validate status
        const validStatuses = ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']
        if (!validStatuses.includes(status)) {
            return NextResponse.json(
                { success: false, error: 'Invalid status' },
                { status: 400 }
            )
        }

        // Get connection from pool
        connection = await pool.getConnection()

        // Start transaction (optional but good for data consistency)
        await connection.beginTransaction()

        try {
            // Update booking
            const [result] = await connection.query(
                `UPDATE bookings 
                 SET status = ?, updated_at = CURRENT_TIMESTAMP
                 WHERE id = ?`,
                [status, id]
            )

            // Check if any row was affected
            if (result.affectedRows === 0) {
                await connection.rollback()
                return NextResponse.json(
                    { success: false, error: 'Booking not found' },
                    { status: 404 }
                )
            }

            // Fetch the updated booking
            const [rows] = await connection.query(
                `SELECT * FROM bookings WHERE id = ?`,
                [id]
            )

            await connection.commit()

            return NextResponse.json({
                success: true,
                booking: rows[0]
            })

        } catch (error) {
            await connection.rollback()
            throw error
        }

    } catch (error) {
        console.error('Error updating booking:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to update booking' },
            { status: 500 }
        )
    } finally {
        // Always release the connection back to the pool
        if (connection) {
            connection.release()
        }
    }
}

export async function DELETE(request, { params }) {
    let connection
    try {
        const { id } = await params

        // Get connection from pool
        connection = await pool.getConnection()

        // Start transaction
        await connection.beginTransaction()

        try {
            // Free up the time slot
            await connection.query(
                `UPDATE available_slots 
                 SET is_booked = FALSE, booking_id = NULL, updated_at = CURRENT_TIMESTAMP
                 WHERE booking_id = ?`,
                [id]
            )

            // Delete booking
            const [result] = await connection.query(
                `DELETE FROM bookings WHERE id = ?`,
                [id]
            )

            // Check if booking was deleted
            if (result.affectedRows === 0) {
                await connection.rollback()
                return NextResponse.json(
                    { success: false, error: 'Booking not found' },
                    { status: 404 }
                )
            }

            await connection.commit()

            return NextResponse.json({
                success: true,
                message: 'Booking deleted successfully'
            })

        } catch (error) {
            await connection.rollback()
            throw error
        }

    } catch (error) {
        console.error('Error deleting booking:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to delete booking' },
            { status: 500 }
        )
    } finally {
        // Always release the connection back to the pool
        if (connection) {
            connection.release()
        }
    }
}