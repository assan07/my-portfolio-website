import { LogOut } from 'lucide-react'
import { signOut } from '../actions'
import { Button } from '@/components/ui/button'

export function AdminTopbar({ email }) {
  return (
    <div className="h-16 border-b border-border bg-background px-6 flex items-center justify-between gap-4">
      <div className="text-sm text-muted-foreground truncate">Signed in as <span className="font-medium text-foreground">{email}</span></div>
      <form action={signOut}>
        <Button type="submit" variant="outline" size="sm" className="rounded-full">
          <LogOut className="h-4 w-4 mr-1" /> Sign out
        </Button>
      </form>
    </div>
  )
}
