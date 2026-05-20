// lib/auth.js
import jwt from 'jsonwebtoken'

export async function verifyAdmin(request) {
    try {
        // Get token from cookies
        const token = request.cookies.get('admin_token')?.value

        if (!token) {
            return { authenticated: false, error: 'No token provided' }
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production')

        if (!decoded || !decoded.userId) {
            return { authenticated: false, error: 'Invalid token' }
        }

        return { authenticated: true, user: decoded }
    } catch (error) {
        console.error('Auth verification error:', error)
        return { authenticated: false, error: 'Invalid or expired token' }
    }
}

// Optional: Middleware for protecting routes
export async function requireAdmin(request) {
    const auth = await verifyAdmin(request)
    if (!auth.authenticated) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
        })
    }
    return null
}