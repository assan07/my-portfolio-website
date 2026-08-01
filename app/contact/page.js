import { ContactForm } from './ContactForm'
import { Mail, Github, Linkedin } from 'lucide-react'
import { getProfile } from '@/lib/data'

export const metadata = {
  title: 'Contact',

  description:
    'Get in touch with Achmad Hasanudin for collaboration, freelance projects, internships, or professional opportunities.',

  alternates: {
    canonical: '/contact',
  },

  openGraph: {
    url: '/contact',
  },
}

async function ContactPage() {
  const profile = await getProfile()
  return (
    <div className="container py-16 md:py-24">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Contact
        </div>
        <h1 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight text-balance">
          Let&apos;s build something great together.
        </h1>
        <p className="mt-3 text-muted-foreground text-balance">
          Send a message and I&apos;ll get back to you within 1–2 business days.
        </p>
      </div>

      <div className="mt-10 grid lg:grid-cols-[1fr_1.4fr] gap-10">
        <div className="space-y-3">
          <a href={profile.socials.email} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 hover:shadow-card transition-shadow">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><Mail className="h-5 w-5" /></div>
            <div>
              <div className="text-xs text-muted-foreground">Email</div>
              <div className="font-medium">{profile.email}</div>
            </div>
          </a>
          <a href={profile.socials.linkedin} target="_blank" rel="noopener" className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 hover:shadow-card transition-shadow">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><Linkedin className="h-5 w-5" /></div>
            <div>
              <div className="text-xs text-muted-foreground">LinkedIn</div>
              <div className="font-medium">{profile.socials.linkedin}</div>
            </div>
          </a>
          <a href={profile.socials.github} target="_blank" rel="noopener" className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 hover:shadow-card transition-shadow">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><Github className="h-5 w-5" /></div>
            <div>
              <div className="text-xs text-muted-foreground">GitHub</div>
              <div className="font-medium">{profile.socials.github}</div>
            </div>
          </a>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}

export default ContactPage
