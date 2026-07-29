import { createClient } from '@/lib/supabase/server'
import { ProfileForm } from './ProfileForm'

async function ProfileAdmin() {
  const supabase = await createClient()
  const { data: profile } = await supabase.from('profiles').select('*').limit(1).maybeSingle()

  return (
    <div>
      <h1 className="text-2xl font-semibold">Profile</h1>
      <p className="text-sm text-muted-foreground mt-1">Manage your public profile information.</p>
      <div className="mt-6">
        <ProfileForm profile={profile} />
      </div>
    </div>
  )
}

export default ProfileAdmin
