import { Section } from '../Section'
import { SectionHeading } from '../SectionHeading'
import { Briefcase, MapPin } from 'lucide-react'
import { dateRange } from '@/lib/utils/format'

export function Experience({ experiences }) {
  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Experience"
        title="Where I've worked and what I've shipped."
      />

      <ol className="relative border-l border-border ml-3 md:ml-6 space-y-10">
        {experiences.map((exp) => (
          <li key={exp.id} className="pl-6 md:pl-10">
            <span className="absolute -left-[9px] mt-2 flex h-4 w-4 items-center justify-center rounded-full border-2 border-background bg-primary" />
            <div className="rounded-2xl border border-border bg-card p-5 md:p-6 shadow-sm hover:shadow-card transition-shadow">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold">{exp.role}</h3>
                  <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" />{exp.company}</span>
                    {exp.location && (
                      <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{exp.location}</span>
                    )}
                  </div>
                </div>
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                  {dateRange(exp.start_date, exp.end_date)}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{exp.description}</p>
              {exp.highlights?.length > 0 && (
                <ul className="mt-3 space-y-1.5">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="text-sm flex gap-2">
                      <span className="mt-2 h-1 w-1 rounded-full bg-primary shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
