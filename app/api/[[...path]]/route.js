import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables.')
}

/**
 * Apply CORS headers
 */
function handleCORS(response) {
  response.headers.set(
    'Access-Control-Allow-Origin',
    process.env.CORS_ORIGINS || '*'
  )
  response.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  )
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  )
  response.headers.set(
    'Access-Control-Allow-Credentials',
    'true'
  )

  return response
}

export async function OPTIONS() {
  return handleCORS(new NextResponse(null, { status: 200 }))
}

async function handleRoute(request, { params }) {
  const { path = [] } = await params
  const route = `/${path.join('/')}`
  const method = request.method

  try {
    const supabase = createAdminClient()

    /**
     * Health Check
     */
    if ((route === '/' || route === '/root') && method === 'GET') {
      return handleCORS(
        NextResponse.json({
          message: 'ok',
          service: 'achmad-personal-site',
        })
      )
    }

    /**
     * Contact Form
     */
    if (route === '/messages' && method === 'POST') {
      const body = await request.json().catch(() => ({}))

      const { name, email, subject, message } = body

      if (!name || !email || !message) {
        return handleCORS(
          NextResponse.json(
            {
              error: 'name, email and message are required',
            },
            {
              status: 400,
            }
          )
        )
      }

      const { data, error } = await supabase
        .from('messages')
        .insert({
          name,
          email,
          subject: subject || null,
          message,
          is_read: false,
        })
        .select('id')
        .single()

      if (error) {
        console.error('Supabase insert error:', error)

        return handleCORS(
          NextResponse.json(
            {
              error: error.message,
            },
            {
              status: 500,
            }
          )
        )
      }

      return handleCORS(
        NextResponse.json({
          ok: true,
          stored: true,
          id: data.id,
        })
      )
    }

    /**
     * Projects
     */
    if (route === '/projects' && method === 'GET') {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', {
          ascending: false,
        })

      if (error) {
        console.error(error)

        return handleCORS(
          NextResponse.json(
            {
              projects: [],
              error: error.message,
            },
            {
              status: 500,
            }
          )
        )
      }

      return handleCORS(
        NextResponse.json({
          projects: data ?? [],
        })
      )
    }

    /**
     * Unknown Route
     */
    return handleCORS(
      NextResponse.json(
        {
          error: `Route ${route} not found`,
        },
        {
          status: 404,
        }
      )
    )
  } catch (error) {
    console.error('API Error:', error)

    return handleCORS(
      NextResponse.json(
        {
          error: 'Internal server error',
        },
        {
          status: 500,
        }
      )
    )
  }
}

export const GET = handleRoute
export const POST = handleRoute
export const PUT = handleRoute
export const PATCH = handleRoute
export const DELETE = handleRoute
