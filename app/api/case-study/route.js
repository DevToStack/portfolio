// app/api/case-study/route.js
import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { verifyAdmin } from '@/lib/auth'

// Helper function to parse JSON fields
function parseJSONField(field) {
    if (!field) return null
    try {
        return typeof field === 'string' ? JSON.parse(field) : field
    } catch {
        return field
    }
}

// Helper function to stringify JSON fields
function stringifyJSONField(field) {
    if (!field) return null
    return typeof field === 'string' ? field : JSON.stringify(field)
}

// GET /api/case-study - Get all case studies (Public)
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const status = searchParams.get('status')
        const featured = searchParams.get('featured')
        const limit = parseInt(searchParams.get('limit')) || 100
        const offset = parseInt(searchParams.get('offset')) || 0

        let sqlQuery = `
            SELECT id, title, slug, category, short_description, challenge, solution,
                   results, technologies, metrics, testimonial_quote, testimonial_author,
                   testimonial_role, testimonial_avatar, image_url, gallery,
                   status, featured, display_order, created_at, updated_at
            FROM case_studies 
            WHERE 1=1
        `
        const params = []

        if (status && status !== 'all') {
            sqlQuery += ' AND status = ?'
            params.push(status)
        } else {
            sqlQuery += ` AND status = 'published'`
        }

        if (featured === 'true') {
            sqlQuery += ' AND featured = TRUE'
        }

        sqlQuery += ` ORDER BY display_order ASC, created_at DESC LIMIT ${limit} OFFSET ${offset}`

        const caseStudies = await query(sqlQuery, params)

        // Parse JSON fields
        const parsedCaseStudies = caseStudies.map(study => ({
            ...study,
            results: parseJSONField(study.results),
            technologies: parseJSONField(study.technologies),
            metrics: parseJSONField(study.metrics),
            gallery: parseJSONField(study.gallery)
        }))

        // Get total count
        let countQuery = "SELECT COUNT(*) as total FROM case_studies WHERE status = 'published'"
        const countParams = []

        if (status && status !== 'all') {
            countQuery = "SELECT COUNT(*) as total FROM case_studies WHERE 1=1"
            if (status !== 'all') {
                countQuery += ' AND status = ?'
                countParams.push(status)
            }
        }

        const totalResult = await query(countQuery, countParams)
        const total = totalResult[0]?.total || 0

        return NextResponse.json({
            success: true,
            caseStudies: parsedCaseStudies,
            pagination: {
                total,
                limit,
                offset,
                hasMore: offset + limit < total
            }
        })

    } catch (error) {
        console.error('Error fetching case studies:', error)
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// POST /api/case-study - Create new case study (Admin only)
export async function POST(request) {
    try {
        const authResult = await verifyAdmin(request)
        if (!authResult.authenticated) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const body = await request.json()
        const {
            title, slug, category, short_description, challenge, solution,
            results, technologies, metrics, testimonial_quote, testimonial_author,
            testimonial_role, testimonial_avatar, image_url, gallery,
            status, featured, display_order
        } = body

        // Validate required fields
        if (!title || !slug || !category || !short_description || !challenge || !solution) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Check if slug already exists
        const existing = await query(
            'SELECT id FROM case_studies WHERE slug = ?',
            [slug]
        )

        if (existing.length > 0) {
            return NextResponse.json(
                { success: false, error: 'Case study slug already exists' },
                { status: 400 }
            )
        }

        const result = await query(
            `INSERT INTO case_studies 
             (title, slug, category, short_description, challenge, solution,
              results, technologies, metrics, testimonial_quote, testimonial_author,
              testimonial_role, testimonial_avatar, image_url, gallery,
              status, featured, display_order) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                title, slug, category, short_description, challenge, solution,
                stringifyJSONField(results), stringifyJSONField(technologies),
                stringifyJSONField(metrics), testimonial_quote || null,
                testimonial_author || null, testimonial_role || null,
                testimonial_avatar || null, image_url || null,
                stringifyJSONField(gallery), status || 'draft',
                featured || false, display_order || 0
            ]
        )

        return NextResponse.json({
            success: true,
            message: 'Case study created successfully',
            caseStudyId: result.insertId
        }, { status: 201 })

    } catch (error) {
        console.error('Error creating case study:', error)
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}