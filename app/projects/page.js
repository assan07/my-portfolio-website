import { ProjectsClient } from './ProjectsClient'
import { getProjects } from '@/lib/data'

export const metadata = {
  title: 'Projects',

  description:
    'Explore software projects built by Achmad Hasanudin using Next.js, React, Flutter, JavaScript, and modern web technologies.',

  alternates: {
    canonical: '/projects',
  },

  openGraph: {
    url: '/projects',
  },
}

async function ProjectsPage() {
  const projects = await getProjects({ featuredOnly: false })
  return (
    <div className="container py-16 md:py-24">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          All Projects
        </div>
        <h1 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight text-balance">
          A closer look at what I&apos;ve built.
        </h1>
        <p className="mt-3 text-muted-foreground text-balance">
          A collection of the projects I&apos;ve worked on — filter by the tech you care about.
        </p>
      </div>
      <ProjectsClient projects={projects} />
    </div>
  )
}

export default ProjectsPage
