import { Section } from '../Section'
import { SectionHeading } from '../SectionHeading'
import { GraduationCap, MapPin } from 'lucide-react'
import { dateRange } from '@/lib/utils/format'

export function Education({ education }) {
  return (
    <Section id="education" className="bg-muted/40 rounded-[2rem]">
      <SectionHeading eyebrow="Education" title="My academic background." />
      <div className="grid md:grid-cols-2 gap-5">
        {education.map((edu) => (
          <div
            key={edu.id}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-card transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{edu.degree}</h3>
                <div className="mt-1 text-sm text-muted-foreground">{edu.school}</div>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  {edu.location && (
                    <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{edu.location}</span>
                  )}
                  <span>{dateRange(edu.start_date, edu.end_date)}</span>
                </div>
                {edu.description && (
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{edu.description}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
