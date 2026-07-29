import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="container py-32 md:py-40 text-center">
      <div className="text-7xl md:text-8xl font-bold tracking-tight text-primary">404</div>
      <h1 className="mt-3 text-2xl md:text-3xl font-semibold">Page not found</h1>
      <p className="mt-2 text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Button asChild className="mt-8 rounded-full">
        <Link href="/">Take me home</Link>
      </Button>
    </div>
  )
}
