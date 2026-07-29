'use client'

import { useMemo, useState } from 'react'
import { ProjectCard } from '@/components/site/ProjectCard'
import { cn } from '@/lib/utils'

export function ProjectsClient({ projects }) {
  const allTech = useMemo(() => {
    const set = new Set()
    projects.forEach((p) => (p.tech || []).forEach((t) => set.add(t)))
    return Array.from(set).sort()
  }, [projects])

  const [active, setActive] = useState('All')

  const filtered = useMemo(() => {
    if (active === 'All') return projects
    return projects.filter((p) => (p.tech || []).includes(active))
  }, [projects, active])

  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-center gap-2">
        {['All', ...allTech].map((tech) => {
          const on = tech === active
          return (
            <button
              key={tech}
              onClick={() => setActive(tech)}
              className={cn(
                'rounded-full border px-3 py-1.5 text-sm transition-colors',
                on
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border bg-background hover:bg-muted'
              )}
            >
              {tech}
            </button>
          )
        })}
      </div>

      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 text-center text-muted-foreground">
          No projects match &quot;{active}&quot; yet.
        </div>
      )}
    </div>
  )
}
