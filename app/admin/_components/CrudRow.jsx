'use client'

import { Badge } from '@/components/ui/badge'
import { formatMonthYear } from '@/lib/utils/format'
import { dateRange } from '@/lib/utils/format'
import Image from 'next/image'

export function CrudRow({ table, row }) {
  switch (table) {
    case 'projects':
      return (
        <div>
          <div className="flex items-center gap-2 font-medium">
            {row.title}
            {row.featured && (
              <Badge variant="secondary" className="rounded-full">
                Featured
              </Badge>
            )}
          </div>

          {row.description && (
            <div className="mt-1 line-clamp-1 text-xs text-muted-foreground">{row.description}</div>
          )}

          {Array.isArray(row.tech) && row.tech.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {row.tech.slice(0, 6).map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="rounded-full text-[10px] font-normal"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          )}
        </div>
      )

    case 'skills':
      return (
        <div className="flex items-center gap-3">
          {console.log(row.custom_icon)}
          {row.custom_icon ? (
            <Image
              src={row.custom_icon}
              alt={row.name}
              className="h-10 w-10 rounded-md border bg-background object-contain p-1"
              width={40}
              height={40}
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-muted text-xs font-semibold text-muted-foreground">
              {row.name?.charAt(0).toUpperCase()}
            </div>
          )}

          <div>
            <div className="font-medium">
              {row.name} <span className="font-normal text-muted-foreground">· {row.category}</span>
            </div>

            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline" className="rounded-full text-[10px]">
                {row.level}
              </Badge>

              <span>slug: {row.slug}</span>

              <span>#{row.color}</span>
            </div>
          </div>
        </div>
      )

    case 'experiences':
      return (
        <div>
          <div className="font-medium">
            {row.role} <span className="text-muted-foreground font-normal">· {row.company}</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {dateRange(row.start_date, row.end_date)} · {row.location}
          </div>
        </div>
      )

    case 'education':
      return (
        <div>
          <div className="font-medium">{row.degree}</div>

          <div className="text-xs text-muted-foreground mt-1">
            {row.school} · {dateRange(row.start_date, row.end_date)}
          </div>
        </div>
      )

    case 'certifications':
      return (
        <div>
          <div className="font-medium">{row.name}</div>

          <div className="text-xs text-muted-foreground mt-1 ">
            {row.issuer} · {formatMonthYear(row.issued_date)}
          </div>
        </div>
      )

    default:
      return <div className="text-sm text-muted-foreground">No renderer available.</div>
  }
}
