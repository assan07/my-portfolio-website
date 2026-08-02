import { Download, Github, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  getProfile,
  getExperiences,
  getEducation,
  getCertifications,
  getTechStack,
} from '@/lib/data'
import { dateRange, formatMonthYear } from '@/lib/utils/format'

export const metadata = {
  title: 'Resume',

  description:
    'View the resume of Achmad Hasanudin, including education, technical skills, certifications, and professional experience.',

  alternates: {
    canonical: '/resume',
  },

  openGraph: {
    url: '/resume',
  },
}

async function ResumePage() {
  const [profile, experiences, education, certifications, techStack] = await Promise.all([
    getProfile(),
    getExperiences(),
    getEducation(),
    getCertifications(),
    getTechStack(),
  ])

  return (
    <div className="container py-16 md:py-24">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Resume
          </div>
          <h1 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight">{profile.full_name}</h1>
          <p className="mt-2 text-lg text-muted-foreground">{profile.headline} · {profile.location}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <a href={profile.socials.email} className="inline-flex items-center gap-1 hover:text-foreground"><Mail className="h-4 w-4" /> {profile.email}</a>
            <Link href={profile.socials.github} target="_blank" rel="noopener" className="inline-flex items-center gap-1 hover:text-foreground"><Github className="h-4 w-4" /> GitHub</Link>
            <Link href={profile.socials.linkedin} target="_blank" rel="noopener" className="inline-flex items-center gap-1 hover:text-foreground"><Linkedin className="h-4 w-4" /> LinkedIn</Link>
          </div>
        </div>
        <Button asChild size="lg" className="rounded-full">
          <a
            href={profile.resume_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Download className="mr-1 h-4 w-4" />
            Download PDF
          </a>
        </Button>
      </div>

      <div className="grid lg:grid-cols-[2fr_1fr] gap-10 mt-14">
        <div className="space-y-10">
          <section>
            <h2 className="text-xl font-semibold mb-4">Experience</h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="font-semibold">{exp.role} · <span className="text-muted-foreground font-normal">{exp.company}</span></div>
                      <div className="text-xs text-muted-foreground mt-1">{exp.location}</div>
                    </div>
                    <span className="rounded-full bg-muted px-3 py-1 text-xs">{dateRange(exp.start_date, exp.end_date)}</span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
                  {exp.highlights?.length > 0 && (
                    <ul className="mt-3 space-y-1.5">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="text-sm flex gap-2"><span className="mt-2 h-1 w-1 rounded-full bg-primary shrink-0" /><span>{h}</span></li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Education</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {education.map((edu) => (
                <div key={edu.id} className="rounded-2xl border border-border bg-card p-5">
                  <div className="font-semibold">{edu.degree}</div>
                  <div className="text-sm text-muted-foreground mt-1">{edu.school}</div>
                  <div className="mt-2 text-xs text-muted-foreground">{dateRange(edu.start_date, edu.end_date)}</div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-10">
          <section>
            <h2 className="text-xl font-semibold mb-4">Skills</h2>
            <div className="space-y-4">
              {techStack.map((g) => (
                <div key={g.category}>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{g.category}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {g.items.map((it) => (
                      <Badge key={it.name} variant="secondary" className="rounded-full font-normal">{it.name}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Certifications</h2>
            <ul className="space-y-3">
              {certifications.map((c) => (
                <li key={c.id} className="rounded-xl border border-border bg-card p-4">
                  <div className="font-medium text-sm">{c.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{c.issuer} · {formatMonthYear(c.issued_date)}</div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ResumePage
