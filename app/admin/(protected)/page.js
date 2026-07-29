import { FolderKanban, Inbox, Sparkles, Star } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

async function safeCount(supabase, table, filter) {
  try {
    let q = supabase.from(table).select('id', { count: 'exact', head: true })
    if (filter) q = filter(q)
    const { count, error } = await q
    if (error) return null
    return count || 0
  } catch { return null }
}

async function AdminDashboard() {
  const supabase = await createClient()
  const [projects, featured, messages, unread] = await Promise.all([
    safeCount(supabase, 'projects'),
    safeCount(supabase, 'projects', (q) => q.eq('featured', true)),
    safeCount(supabase, 'messages'),
    safeCount(supabase, 'messages', (q) => q.eq('is_read', false)),
  ])

  const stats = [
    { label: 'Total Projects', value: projects, icon: FolderKanban, tint: 'bg-primary/10 text-primary' },
    { label: 'Featured Projects', value: featured, icon: Star, tint: 'bg-amber-500/10 text-amber-600' },
    { label: 'Messages', value: messages, icon: Inbox, tint: 'bg-emerald-500/10 text-emerald-600' },
    { label: 'Unread Messages', value: unread, icon: Sparkles, tint: 'bg-violet-500/10 text-violet-600' },
  ]

  const anyNull = stats.some((s) => s.value === null)

  return (
    <div>
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="text-sm text-muted-foreground mt-1">Overview of your content and inbox.</p>

      {anyNull && (
        <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          Some tables are not ready yet. Run <code className="font-mono">supabase/schema.sql</code> in the Supabase SQL Editor to enable full admin functionality.
        </div>
      )}

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${s.tint}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="mt-4 text-3xl font-semibold">{s.value ?? '—'}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AdminDashboard
