// Data access layer. Tries Supabase first (if tables exist), falls back to seed data.
import { profile as seedProfile } from './profile'
import { techStack as seedTechStack } from './skills'
import { experiences as seedExperiences } from './experience'
import { education as seedEducation } from './education'
import { certifications as seedCertifications } from './certifications'
import { projects as seedProjects } from './projects'

async function trySupabase(fn) {
  try {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()
    return await fn(supabase)
  } catch {
    return null
  }
}

export async function getProfile() {
  const remote = await trySupabase(async (supabase) => {
    const { data, error } = await supabase.from('profiles').select('*').limit(1).maybeSingle()
    if (error || !data) return null
    return data
  })
  return remote || seedProfile
}

export async function getTechStack() {
  const remote = await trySupabase(async (supabase) => {
    const { data, error } = await supabase.from('skills').select('*').order('category')
    if (error || !data || data.length === 0) return null
    const grouped = {}
    for (const row of data) {
      grouped[row.category] = grouped[row.category] || { category: row.category, items: [] }
      grouped[row.category].items.push({
        name: row.name,
        slug: row.slug,
        color: row.color,
        level: row.level,
      })
    }
    return Object.values(grouped)
  })
  return remote || seedTechStack
}

export async function getExperiences() {
  const remote = await trySupabase(async (supabase) => {
    const { data, error } = await supabase.from('experiences').select('*').order('start_date', { ascending: false })
    if (error || !data || data.length === 0) return null
    return data
  })
  return remote || seedExperiences
}

export async function getEducation() {
  const remote = await trySupabase(async (supabase) => {
    const { data, error } = await supabase.from('education').select('*').order('start_date', { ascending: false })
    if (error || !data || data.length === 0) return null
    return data
  })
  return remote || seedEducation
}

export async function getCertifications() {
  const remote = await trySupabase(async (supabase) => {
    const { data, error } = await supabase.from('certifications').select('*').order('issued_date', { ascending: false })
    if (error || !data || data.length === 0) return null
    return data
  })
  return remote || seedCertifications
}

export async function getProjects({ featuredOnly = false } = {}) {
  const remote = await trySupabase(async (supabase) => {
    let q = supabase.from('projects').select('*').order('created_at', { ascending: false })
    if (featuredOnly) q = q.eq('featured', true)
    const { data, error } = await q
    if (error || !data || data.length === 0) return null
    return data
  })
  const list = remote || seedProjects
  return featuredOnly ? list.filter((p) => p.featured) : list
}
