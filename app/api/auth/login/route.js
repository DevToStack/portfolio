// app/api/auth/login/route.js
import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(request) {
    try {
        const { username, password } = await request.json()

        const [rows] = await pool.execute(
            'SELECT * FROM admin_users WHERE username = ? OR email = ?',
            [username, username]
        )

        if (rows.length === 0) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
        }

        const user = rows[0]
        const validPassword = await bcrypt.compare(password, user.password_hash)

        if (!validPassword) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
        }

        const token = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.JWT_SECRET || 'your-secret-key-change-in-production',
            { expiresIn: '24h' }
        )

        const response = NextResponse.json({ success: true, token })

        response.cookies.set('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 86400
        })

        return response
    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json({ error: 'Login failed' }, { status: 500 })
    }
}