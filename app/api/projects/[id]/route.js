// app/api/projects/[id]/route.js
import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { verifyAdmin } from '@/lib/auth'

// GET /api/projects/[id] - Get single project - Public access
export async function GET(request, { params }) {
    try {
        const { id } = await params

        const projects = await query(
            `SELECT id, title, slug, description, full_description, image_url, 
                    project_url, github_url, category, tags, status, 
                    launch_date, featured, display_order, created_at, updated_at
             FROM projects WHERE id = ? OR slug = ?`,
            [id, id]
        )

        if (projects.length === 0) {
            return NextResponse.json(
                { success: false, error: 'Project not found' },
                { status: 404 }
            )
        }

        const project = {
            ...projects[0],
            tags: projects[0].tags || []
        }

        return NextResponse.json({
            success: true,
            project
        })

    } catch (error) {
        console.error('Error fetching project:', error)
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// PUT /api/projects/[id] - Update project (Admin only)
export async function PUT(request, { params }) {
    try {
        // Verify admin authentication using cookie
        const authResult = await verifyAdmin(request)
        if (!authResult.authenticated) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const { id } = await params
        const body = await request.json()
        const {
            title, slug, description, full_description, image_url,
            project_url, github_url, category, tags, status,
            launch_date, featured, display_order
        } = body

        await query(
            `UPDATE projects SET 
             title = ?, slug = ?, description = ?, full_description = ?, 
             image_url = ?, project_url = ?, github_url = ?, category = ?, 
             tags = ?, status = ?, launch_date = ?, featured = ?, display_order = ?
             WHERE id = ?`,
            [
                title, slug, description, full_description || null,
                image_url || null, project_url || null, github_url || null,
                category || null, tags ? JSON.stringify(tags) : null,
                status || 'planned', launch_date || null, featured || false,
                display_order || 0, id
            ]
        )

        return NextResponse.json({
            success: true,
            message: 'Project updated successfully'
        })

    } catch (error) {
        console.error('Error updating project:', error)
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// DELETE /api/projects/[id] - Delete project (Admin only)
export async function DELETE(request, { params }) {
    try {
        // Verify admin authentication using cookie
        const authResult = await verifyAdmin(request)
        if (!authResult.authenticated) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const { id } = await params

        await query('DELETE FROM projects WHERE id = ?', [id])

        return NextResponse.json({
            success: true,
            message: 'Project deleted successfully'
        })

    } catch (error) {
        console.error('Error deleting project:', error)
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}