'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  User,
  FolderKanban,
  Briefcase,
  GraduationCap,
  Award,
  Sparkles,
  Inbox,
  Home,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const items = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/profile', label: 'Profile', icon: User },
  { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { href: '/admin/experience', label: 'Experience', icon: Briefcase },
  { href: '/admin/education', label: 'Education', icon: GraduationCap },
  { href: '/admin/certifications', label: 'Certifications', icon: Award },
  { href: '/admin/skills', label: 'Skills', icon: Sparkles },
  { href: '/admin/messages', label: 'Messages', icon: Inbox },
]

export function AdminSidebar() {
  const pathname = usePathname()
  return (
    <aside className="hidden md:flex md:w-64 shrink-0 sticky top-0 h-screen border-r border-border bg-background flex-col">
      <div className="h-16 px-6 flex items-center gap-2 border-b border-border">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">A</span>
        <span className="font-semibold">Admin</span>
      </div>
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {items.map((it) => {
          const Icon = it.icon
          const active = pathname === it.href || (it.href !== '/admin' && pathname.startsWith(it.href))
          return (
            <Link
              key={it.href}
              href={it.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                active
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-foreground/80 hover:bg-muted'
              )}
            >
              <Icon className="h-4 w-4" /> {it.label}
            </Link>
          )
        })}
      </nav>
      <div className="p-3 border-t border-border">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors"
        >
          <Home className="h-4 w-4" /> View public site
        </Link>
      </div>
    </aside>
  )
}
