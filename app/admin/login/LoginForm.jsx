'use client'

import { useActionState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Loader2, LogIn, AlertTriangle } from 'lucide-react'
import { signIn } from '../actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const initial = { error: null, success: null }

export function LoginForm() {
  const [inState, inAction, inPending] = useActionState(signIn, initial)
  const params = useSearchParams()
  const unauthorized = params.get('error') === 'unauthorized'

  return (
    <Card className="w-full max-w-md shadow-card border-border/60">
      <CardHeader>
        <CardTitle className="text-2xl">Admin Access</CardTitle>
        <CardDescription>Sign in to manage your personal branding site.</CardDescription>
      </CardHeader>
      <CardContent>
        {unauthorized && (
          <div className="mb-4 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
            <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
            <div>This email is not authorized to access the admin dashboard.</div>
          </div>
        )}

        <form action={inAction} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required autoComplete="email" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
            />
          </div>
          {inState?.error && <p className="text-sm text-destructive">{inState.error}</p>}
          <Button type="submit" className="w-full rounded-full" disabled={inPending}>
            {inPending ? (
              <Loader2 className="mr-1 h-4 w-4 animate-spin" />
            ) : (
              <LogIn className="mr-1 h-4 w-4" />
            )}
            {inPending ? 'Signing in...' : 'Sign in'}
          </Button>
        </form> 
      </CardContent>
    </Card>
  )
}
