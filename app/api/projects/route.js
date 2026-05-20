// app/api/projects/route.js
import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { verifyAdmin } from '@/lib/auth'

// GET /api/projects - Get all projects (with filters) - Public access
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const status = searchParams.get('status')
        const featured = searchParams.get('featured')
        const limit = parseInt(searchParams.get('limit')) || 100
        const offset = parseInt(searchParams.get('offset')) || 0

        let sqlQuery = `
            SELECT id, title, slug, description, full_description, image_url, 
                   project_url, github_url, category, tags, status, 
                   launch_date, featured, display_order, created_at, updated_at
            FROM projects 
            WHERE 1=1
        `
        const params = []

        if (status && status !== 'all') {
            sqlQuery += ' AND status = ?'
            params.push(status)
        }

        if (featured === 'true') {
            sqlQuery += ' AND featured = TRUE'
        }

        sqlQuery += ` ORDER BY display_order ASC, created_at DESC LIMIT ${limit} OFFSET ${offset}`

        const projects = await query(sqlQuery, params)

        // Parse JSON tags for each project
        const parsedProjects = projects.map(project => ({
            ...project,
            tags: project.tags || []
        }))

        // Get total count
        let countQuery = 'SELECT COUNT(*) as total FROM projects WHERE 1=1'
        const countParams = []

        if (status && status !== 'all') {
            countQuery += ' AND status = ?'
            countParams.push(status)
        }

        const totalResult = await query(countQuery, countParams)
        const total = totalResult[0]?.total || 0

        return NextResponse.json({
            success: true,
            projects: parsedProjects,
            pagination: {
                total,
                limit,
                offset,
                hasMore: offset + limit < total
            }
        })

    } catch (error) {
        console.error('Error fetching projects:', error)
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// POST /api/projects - Create new project (Admin only)
export async function POST(request) {
    try {
        // Verify admin authentication using cookie
        const authResult = await verifyAdmin(request)
        if (!authResult.authenticated) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const body = await request.json()
        const {
            title, slug, description, full_description, image_url,
            project_url, github_url, category, tags, status,
            launch_date, featured, display_order
        } = body

        // Validate required fields
        if (!title || !slug || !description) {
            return NextResponse.json(
                { success: false, error: 'Title, slug, and description are required' },
                { status: 400 }
            )
        }

        // Check if slug already exists
        const existing = await query(
            'SELECT id FROM projects WHERE slug = ?',
            [slug]
        )

        if (existing.length > 0) {
            return NextResponse.json(
                { success: false, error: 'Project slug already exists' },
                { status: 400 }
            )
        }

        const result = await query(
            `INSERT INTO projects 
             (title, slug, description, full_description, image_url, project_url, 
              github_url, category, tags, status, launch_date, featured, display_order) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                title, slug, description, full_description || null, image_url || null,
                project_url || null, github_url || null, category || null,
                tags ? JSON.stringify(tags) : null, status || 'planned',
                launch_date || null, featured || false, display_order || 0
            ]
        )

        return NextResponse.json({
            success: true,
            message: 'Project created successfully',
            projectId: result.insertId
        }, { status: 201 })

    } catch (error) {
        console.error('Error creating project:', error)
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}