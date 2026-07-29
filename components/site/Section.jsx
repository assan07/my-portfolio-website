import { cn } from '@/lib/utils'

export function Section({ id, className, children }) {
  return (
    <section id={id} className={cn('py-16 md:py-24 scroll-mt-20', className)}>
      <div className="container">{children}</div>
    </section>
  )
}
