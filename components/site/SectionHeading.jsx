import { cn } from '@/lib/utils'

export function SectionHeading({ eyebrow, title, description, align = 'left', className }) {
  return (
    <div
      className={cn(
        'mb-10 md:mb-14 max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      {eyebrow && (
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {eyebrow}
        </div>
      )}
      <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-muted-foreground leading-relaxed text-balance">{description}</p>
      )}
    </div>
  )
}
