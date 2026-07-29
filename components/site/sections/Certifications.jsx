import { Section } from '../Section'
import { SectionHeading } from '../SectionHeading'
import { Award, ExternalLink } from 'lucide-react'
import { formatMonthYear } from '@/lib/utils/format'

export function Certifications({ certifications }) {
  return (
    <Section id="certifications">
      <SectionHeading eyebrow="Certifications" title="Continuous learning, credentialed." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {certifications.map((c) => (
          <a
            key={c.id}
            href={c.credential_url || '#'}
            target="_blank"
            rel="noopener"
            className="group rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-card hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Award className="h-5 w-5" />
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="mt-4 font-medium leading-snug">{c.name}</div>
            <div className="mt-1 text-xs text-muted-foreground">{c.issuer}</div>
            <div className="mt-3 text-xs text-muted-foreground">Issued {formatMonthYear(c.issued_date)}</div>
          </a>
        ))}
      </div>
    </Section>
  )
}
