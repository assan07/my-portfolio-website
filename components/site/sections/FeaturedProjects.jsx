import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Section } from '../Section'
import { SectionHeading } from '../SectionHeading'
import { ProjectCard } from '../ProjectCard'
import { Button } from '@/components/ui/button'

export function FeaturedProjects({ projects }) {
  return (
    <Section id="projects">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Featured Projects"
          title="Selected work from recent years."
          description="A few projects I'm proud of. See the projects page for the full list."
          className="mb-0"
        />
        <Button asChild variant="outline" className="rounded-full">
          <Link href="/projects">
            View all projects <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </Section>
  )
}
