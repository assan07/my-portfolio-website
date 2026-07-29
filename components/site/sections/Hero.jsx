'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Download, Mail, Github, Linkedin, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero({ profile }) {
  return (
    <section className="relative overflow-hidden">
      {/* subtle gradient bg */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute top-32 -right-24 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <div className="container pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for new opportunities
            </div>

            <h1 className="mt-5 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] text-balance">
              Hi, I&apos;m {profile.full_name.split(' ')[0]}.{' '}
              <span className="text-primary">{profile.headline}.</span>
            </h1>

            <p className="mt-5 text-lg text-muted-foreground max-w-xl leading-relaxed">
              {profile.tagline}
            </p>

            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" /> {profile.location}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="rounded-full">
                <Link href="/projects">
                  View Projects <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <a href={profile.resume_url} download>
                  <Download className="mr-1 h-4 w-4" /> Download Resume
                </a>
              </Button>
              <Button asChild size="lg" variant="ghost" className="rounded-full">
                <Link href="/contact">
                  <Mail className="mr-1 h-4 w-4" /> Contact Me
                </Link>
              </Button>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <Link
                href={profile.socials.github}
                target="_blank"
                rel="noopener"
                className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-border hover:bg-muted transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </Link>
              <Link
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener"
                className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-border hover:bg-muted transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </Link>
              <Link
                href={profile.socials.email}
                className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-border hover:bg-muted transition-colors"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative mx-auto md:mx-0"
          >
            <div className="relative h-72 w-72 md:h-96 md:w-96">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/25 to-secondary/25 blur-2xl" />
              <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-border shadow-card bg-card">
                <Image
                  src={profile.avatar_url}
                  alt={profile.full_name}
                  fill
                  sizes="(max-width: 768px) 288px, 384px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-2xl border border-border bg-card px-4 py-3 shadow-card">
                <div className="text-xs text-muted-foreground">Currently</div>
                <div className="text-sm font-medium">Building great products</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
