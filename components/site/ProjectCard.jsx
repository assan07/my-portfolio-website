import Image from 'next/image'
import Link from 'next/link'
import { Github, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export function ProjectCard({ project }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-card transition-all">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {project.thumbnail && (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-3 flex-1">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {(project.tech || []).slice(0, 5).map((t) => (
            <Badge key={t} variant="secondary" className="rounded-full font-normal">{t}</Badge>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-2">
          {project.github_url && (
            <Link
              href={project.github_url}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 text-sm font-medium rounded-full border border-border px-3 py-1.5 hover:bg-muted transition-colors"
            >
              <Github className="h-3.5 w-3.5" /> Code
            </Link>
          )}
          {project.live_url && (
            <Link
              href={project.live_url}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 text-sm font-medium rounded-full bg-primary text-primary-foreground px-3 py-1.5 hover:opacity-90 transition-opacity"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Live Demo
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
