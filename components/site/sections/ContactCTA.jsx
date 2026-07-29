import Link from 'next/link'
import { Mail, ArrowRight } from 'lucide-react'
import { Section } from '../Section'
import { Button } from '@/components/ui/button'

export function ContactCTA({ profile }) {
  return (
    <Section id="contact-cta">
      <div className="relative overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-primary to-primary/80 text-primary-foreground px-6 py-14 md:px-14 md:py-20">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-black/10 blur-3xl" />
        <div className="relative max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
            <Mail className="h-3.5 w-3.5" /> Let&apos;s work together
          </div>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-balance">
            Have a project in mind, or just want to say hi?
          </h2>
          <p className="mt-3 text-primary-foreground/85 leading-relaxed">
            I&apos;m always open to interesting conversations — whether it&apos;s a new opportunity,
            a collaboration, or a quick question.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="secondary" className="rounded-full bg-white text-primary hover:bg-white/90">
              <Link href="/contact">
                Get in touch <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-white/30 bg-transparent text-primary-foreground hover:bg-white/10">
              <a href={profile.socials.email}>Email me directly</a>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  )
}
