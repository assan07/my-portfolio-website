import Link from 'next/link'
import { Github, Linkedin, Mail } from 'lucide-react'
import { profile } from '@/lib/data/profile'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">A</span>
          <div>
            <div className="font-semibold">{profile.full_name}</div>
            <div className="text-xs text-muted-foreground">{profile.headline}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href={profile.socials.github} target="_blank" rel="noopener" aria-label="GitHub" className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-border hover:bg-muted transition-colors">
            <Github className="h-4 w-4" />
          </Link>
          <Link href={profile.socials.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn" className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-border hover:bg-muted transition-colors">
            <Linkedin className="h-4 w-4" />
          </Link>
          <Link href={profile.socials.email} aria-label="Email" className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-border hover:bg-muted transition-colors">
            <Mail className="h-4 w-4" />
          </Link>
        </div>

        <div className="text-xs text-muted-foreground text-center md:text-right">
          &copy; {year} {profile.full_name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
