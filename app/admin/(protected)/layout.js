import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AdminSidebar } from '../_components/AdminSidebar'
import { AdminTopbar } from '../_components/AdminTopbar'

async function ProtectedLayout({ children }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 min-w-0">
          <AdminTopbar email={user.email} />
          <main className="p-6 md:p-10 max-w-6xl">{children}</main>
        </div>
      </div>
    </div>
  )
}

export default ProtectedLayout
