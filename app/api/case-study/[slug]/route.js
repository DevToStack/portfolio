// app/api/case-study/[slug]/route.js
import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { verifyAdmin } from '@/lib/auth'

function parseJSONField(field) {
    if (!field) return null
    try {
        return typeof field === 'string' ? JSON.parse(field) : field
    } catch {
        return field
    }
}

function stringifyJSONField(field) {
    if (!field) return null
    return typeof field === 'string' ? field : JSON.stringify(field)
}

// GET /api/case-study/[slug] - Get single case study (Public)
export async function GET(request, { params }) {
    try {
        const { slug } = await params

        const caseStudies = await query(
            `SELECT id, title, slug, category, short_description, challenge, solution,
                    results, technologies, metrics, testimonial_quote, testimonial_author,
                    testimonial_role, testimonial_avatar, image_url, gallery,
                    status, featured, display_order, created_at, updated_at
             FROM case_studies WHERE slug = ?`,
            [slug]
        )

        if (caseStudies.length === 0) {
            return NextResponse.json(
                { success: false, error: 'Case study not found' },
                { status: 404 }
            )
        }

        const caseStudy = {
            ...caseStudies[0],
            results: parseJSONField(caseStudies[0].results),
            technologies: parseJSONField(caseStudies[0].technologies),
            metrics: parseJSONField(caseStudies[0].metrics),
            gallery: parseJSONField(caseStudies[0].gallery)
        }

        return NextResponse.json({
            success: true,
            caseStudy
        })

    } catch (error) {
        console.error('Error fetching case study:', error)
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// PUT /api/case-study/[slug] - Update case study (Admin only)
export async function PUT(request, { params }) {
    try {
        const authResult = await verifyAdmin(request)
        if (!authResult.authenticated) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const { slug } = await params
        const body = await request.json()
        const {
            title, category, short_description, challenge, solution,
            results, technologies, metrics, testimonial_quote, testimonial_author,
            testimonial_role, testimonial_avatar, image_url, gallery,
            status, featured, display_order
        } = body

        await query(
            `UPDATE case_studies SET 
             title = ?, category = ?, short_description = ?, challenge = ?, solution = ?,
             results = ?, technologies = ?, metrics = ?, testimonial_quote = ?,
             testimonial_author = ?, testimonial_role = ?, testimonial_avatar = ?,
             image_url = ?, gallery = ?, status = ?, featured = ?, display_order = ?
             WHERE slug = ?`,
            [
                title, category, short_description, challenge, solution,
                stringifyJSONField(results), stringifyJSONField(technologies),
                stringifyJSONField(metrics), testimonial_quote || null,
                testimonial_author || null, testimonial_role || null,
                testimonial_avatar || null, image_url || null,
                stringifyJSONField(gallery), status || 'draft',
                featured || false, display_order || 0, slug
            ]
        )

        return NextResponse.json({
            success: true,
            message: 'Case study updated successfully'
        })

    } catch (error) {
        console.error('Error updating case study:', error)
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// DELETE /api/case-study/[slug] - Delete case study (Admin only)
export async function DELETE(request, { params }) {
    try {
        const authResult = await verifyAdmin(request)
        if (!authResult.authenticated) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const { slug } = await params

        await query('DELETE FROM case_studies WHERE slug = ?', [slug])

        return NextResponse.json({
            success: true,
            message: 'Case study deleted successfully'
        })

    } catch (error) {
        console.error('Error deleting case study:', error)
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}