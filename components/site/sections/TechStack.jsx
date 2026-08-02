import Image from 'next/image'
import { Section } from '../Section'
import { SectionHeading } from '../SectionHeading'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'


const levelStyles = {
  Advanced: 'bg-primary/10 text-primary border-primary/20 dark:bg-primary/20',
  Intermediate:
    'bg-secondary/15 text-secondary-foreground border-secondary/30 dark:bg-secondary/20 dark:text-secondary',
  Basic: 'bg-muted text-muted-foreground border-border',
}


export function TechStack({ groups }) {
  return (
    <Section id="tech-stack" className="bg-muted/40 rounded-[2rem]">
      <SectionHeading
        eyebrow="Tech Stack"
        title="Tools I use to design, build, and ship."
        description="A curated set of technologies I reach for across web, mobile, and backend work."
      />

      <div className="space-y-10">
        {groups.map((group) => (
          <div key={group.category}>
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-lg font-semibold">{group.category}</h3>
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">
                {group.items.length} technologies
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {group.items.map((item) => (
                <div
                  key={`${group.category}-${item.name}`}
                  className="group relative flex flex-col items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm hover:shadow-card hover:-translate-y-0.5 transition-all"
                >
                  <div className="h-12 w-12 flex items-center justify-center">
                    <Image
                      src={
                        item.custom_icon || `https://cdn.simpleicons.org/${item.slug}/${item.color}`
                      }
                      alt={item.name}
                      width={40}
                      height={40}
                      className="h-10 w-10 object-contain"
                      unoptimized
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">{item.name}</div>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn(
                      'text-[10px] font-medium rounded-full border',
                      levelStyles[item.level]
                    )}
                  >
                    {item.level}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
