'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

const ALLOWED_TABLES = new Set([
  'projects',
  'skills',
  'experiences',
  'education',
  'certifications',
  'messages',
])

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '')
  .split(',')
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean)

export async function signIn(_prev, formData) {
  const supabase = await createClient()
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase()
  const password = String(formData.get('password') || '')
  if (!email || !password) {
    return {
      error: "Email and password are required.",
    }
  }

  if (password.length < 8) {
    return {
      error: "Invalid email or password.",
    }
  }
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    logServerError('AUTH_LOGIN', error)

    return {
      error: "Invalid email or password.",
    }
  }
  redirect('/admin')
}


export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/admin/login')
}

// -----------------------------
// Generic resource CRUD actions
// -----------------------------
async function requireAuth() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  if (
    ADMIN_EMAILS.length > 0 &&
    !ADMIN_EMAILS.includes((user.email || '').toLowerCase())
  ) {
    await supabase.auth.signOut()
    redirect('/admin/login?error=unauthorized')
  }

  return { supabase, user }
}

function toNumOrNull(v) {
  if (v === '' || v == null) return null
  const n = Number(v)
  return Number.isNaN(n) ? null : n
}

function toArr(v) {
  if (!v) return []

  return [
    ...new Set(
      String(v)
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    ),
  ]
}

function cleanPayload(obj) {
  const out = {}
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined) continue
    out[k] = v === '' ? null : v
  }
  return out
}

function assertAllowedTable(table) {
  if (!ALLOWED_TABLES.has(table)) {
    throw new Error(`Invalid table: ${table}`)
  }
}

function logServerError(context, error) {
  if (process.env.NODE_ENV === 'development') {
    console.error(`[${context}]`, error)
  }
}

export async function upsertRow(table, payload, revalidate) {

  assertAllowedTable(table)
  const { supabase } = await requireAuth()
  const now = new Date().toISOString()
  const row = { ...cleanPayload(payload), updated_at: now }
  if (!row.id) delete row.id
  const { error } = await supabase.from(table).upsert(row)
  if (error) {
    logServerError(`UPSERT:${table}`, error)

    return {
      error: 'Failed to save data.',
    }
  }
  if (revalidate) revalidatePath(revalidate)
  revalidatePath('/', 'layout')
  return { success: true }
}

export async function deleteRow(table, id, revalidate) {
  assertAllowedTable(table)

  if (!id) {
    return {
      error: 'Invalid request.',
    }
  }
  const { supabase } = await requireAuth()
  const { error } = await supabase.from(table).delete().eq('id', id)
  if (error) {
    logServerError(`DELETE:${table}`, error)

    return {
      error: 'Failed to delete data.',
    }
  }
  if (revalidate) revalidatePath(revalidate)
  revalidatePath('/', 'layout')
  return { success: true }
}

export async function saveProject(_prev, formData) {
  const payload = {
    id: formData.get('id') || undefined,
    title: formData.get('title'),
    description: formData.get('description'),
    thumbnail: formData.get('thumbnail'),
    tech: toArr(formData.get('tech')),
    github_url: formData.get('github_url'),
    live_url: formData.get('live_url'),
    featured: formData.get('featured') === 'on',
  }
  return upsertRow('projects', payload, '/admin/projects')
}

export async function saveExperience(_prev, formData) {
  const payload = {
    id: formData.get('id') || undefined,
    role: formData.get('role'),
    company: formData.get('company'),
    location: formData.get('location'),
    start_date: formData.get('start_date'),
    end_date: formData.get('end_date'),
    description: formData.get('description'),
    highlights: toArr(formData.get('highlights')),
  }
  return upsertRow('experiences', payload, '/admin/experience')
}

export async function saveEducation(_prev, formData) {
  const payload = {
    id: formData.get('id') || undefined,
    degree: formData.get('degree'),
    school: formData.get('school'),
    location: formData.get('location'),
    start_date: formData.get('start_date'),
    end_date: formData.get('end_date'),
    description: formData.get('description'),
  }
  return upsertRow('education', payload, '/admin/education')
}

export async function saveCertification(_prev, formData) {
  const payload = {
    id: formData.get('id') || undefined,
    name: formData.get('name'),
    issuer: formData.get('issuer'),
    issued_date: formData.get('issued_date'),
    credential_url: formData.get('credential_url'),
  }
  return upsertRow('certifications', payload, '/admin/certifications')
}

export async function saveSkill(_prev, formData) {
  const payload = {
    id: formData.get('id') || undefined,
    category: formData.get('category'),
    name: formData.get('name'),
    slug: formData.get('slug'),
    color: formData.get('color') || '000000',
    level: formData.get('level'),
    sort_order: toNumOrNull(formData.get('sort_order')) ?? 0,
  }
  return upsertRow('skills', payload, '/admin/skills')
}

export async function saveProfile(_prev, formData) {
  const { supabase, user } = await requireAuth()

  const socials = {
    github: formData.get('social_github') || '',
    linkedin: formData.get('social_linkedin') || '',
    email: formData.get('social_email') || '',
  }

  const payload = cleanPayload({
    full_name: formData.get('full_name'),
    headline: formData.get('headline'),
    tagline: formData.get('tagline'),
    bio: formData.get('bio'),
    location: formData.get('location'),
    email: String(formData.get('email') || '')
      .trim()
      .toLowerCase(),
    avatar_url: formData.get('avatar_url'),
    resume_url: formData.get('resume_url'),
    socials,
    updated_at: new Date().toISOString(),
  })

  const { error } = await supabase
    .from('profiles')
    .update(payload)
    .eq('user_id', user.id)

  if (error) {
    logServerError('PROFILE_UPDATE', error)

    return {
      error: 'Failed to update profile.',
    }
  }

  revalidatePath('/admin/profile')
  revalidatePath('/', 'layout')

  return { success: true }
}

export async function deleteMessage(formData) {
  return deleteRow('messages', formData.get('id'), '/admin/messages')
}

export async function toggleMessageRead(formData) {

  const id = formData.get('id')
  if (!id) {
    return {
      error: 'Invalid request.',
    }
  }
  const { supabase } = await requireAuth()
  const is_read = formData.get('is_read') === 'true'

  const { error } = await supabase.from('messages').update({ is_read }).eq('id', id)
  if (error) {
    logServerError('MESSAGE_READ', error)

    return {
      error: 'Failed to update message.',
    }
  }
  revalidatePath('/admin/messages')
  return { success: true }
}


