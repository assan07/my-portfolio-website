'use client'

import { useActionState } from 'react'
import { Loader2, Save } from 'lucide-react'
import { toast } from 'sonner'
import { saveProfile } from '../../actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { FileUpload } from '@/components/site/FileUpload'

const initial = { error: null, success: null }

export function ProfileForm({ profile }) {
  const p = profile || {}
  const socials = p.socials || {}
  const [state, action, pending] = useActionState(async (prev, fd) => {
    const res = await saveProfile(prev, fd)
    if (res?.error) toast.error(res.error)
    else if (res?.success) toast.success('Profile saved')
    return res
  }, initial)

  return (
    <form action={action} className="space-y-6 max-w-3xl">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="full_name">Full name</Label>
          <Input id="full_name" name="full_name" defaultValue={p.full_name || ''} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="headline">Headline</Label>
          <Input
            id="headline"
            name="headline"
            defaultValue={p.headline || ''}
            placeholder="Full-Stack Developer"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="tagline">Tagline</Label>
        <Input id="tagline" name="tagline" defaultValue={p.tagline || ''} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" name="bio" rows={5} defaultValue={p.bio || ''} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" defaultValue={p.location || ''} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Public email</Label>
          <Input id="email" name="email" type="email" defaultValue={p.email || ''} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <FileUpload
          name="avatar_url"
          bucket="profile-images"
          accept="image/*"
          kind="image"
          label="Profile photo"
          defaultValue={p.avatar_url || ''}
          maxWidth={800}
          maxHeight={800}
          quality={0.9}
        />
        <FileUpload
          name="resume_url"
          bucket="resumes"
          accept="application/pdf"
          kind="file"
          label="Resume PDF"
          defaultValue={p.resume_url || ''}
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="social_github">GitHub URL</Label>
          <Input id="social_github" name="social_github" defaultValue={socials.github || ''} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="social_linkedin">LinkedIn URL</Label>
          <Input
            id="social_linkedin"
            name="social_linkedin"
            defaultValue={socials.linkedin || ''}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="social_email">Email link (mailto:)</Label>
          <Input id="social_email" name="social_email" defaultValue={socials.email || ''} />
        </div>
      </div>
      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      <Button type="submit" className="rounded-full" disabled={pending}>
        {pending ? (
          <Loader2 className="mr-1 h-4 w-4 animate-spin" />
        ) : (
          <Save className="mr-1 h-4 w-4" />
        )}
        Save profile
      </Button>
      <p className="text-xs text-muted-foreground">
        Drag & drop or click to upload. Files go to Supabase Storage buckets{' '}
        <code>profile-images</code> and <code>resumes</code>. Make sure the buckets exist and are
        public.
      </p>
    </form>
  )
}
