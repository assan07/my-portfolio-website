import { Section } from '../Section'
import { SectionHeading } from '../SectionHeading'

export function About({ profile }) {
  return (
    <Section id="about">
      <SectionHeading
        eyebrow="About Me"
        title="A little bit about who I am and what I do."
      />
      <div className="grid md:grid-cols-3 gap-8 md:gap-12">
        <div className="md:col-span-2">
          <p className="text-lg leading-relaxed text-muted-foreground">{profile.bio}</p>
        </div>
        <div className="space-y-4">
          {[
            { label: 'Based in', value: profile.location },
            { label: 'Focus', value: 'Web & Mobile Development' },
            { label: 'Open to', value: 'Full-time · Freelance · Collaboration' },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-border bg-card p-4">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{item.label}</div>
              <div className="mt-1 font-medium">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
