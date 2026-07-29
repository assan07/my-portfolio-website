import { createClient } from '@/lib/supabase/server'
import { deleteMessage, toggleMessageRead } from '../../actions'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Mail, Trash2, MailOpen } from 'lucide-react'

async function MessagesAdmin() {
  const supabase = await createClient()
  const { data: rows = [] } = await supabase.from('messages').select('*').order('created_at', { ascending: false })

  return (
    <div>
      <h1 className="text-2xl font-semibold">Messages</h1>
      <p className="text-sm text-muted-foreground mt-1">Contact form submissions.</p>

      <div className="mt-6 space-y-3">
        {(!rows || rows.length === 0) && (
          <div className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
            No messages yet.
          </div>
        )}
        {(rows || []).map((m) => (
          <div key={m.id} className={`rounded-2xl border border-border bg-card p-5 ${m.is_read ? 'opacity-70' : ''}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{m.name}</span>
                  <span className="text-sm text-muted-foreground truncate">&lt;{m.email}&gt;</span>
                  {!m.is_read && <Badge className="rounded-full" variant="default">New</Badge>}
                </div>
                {m.subject && <div className="mt-1 text-sm font-medium">{m.subject}</div>}
                <p className="mt-2 text-sm text-muted-foreground whitespace-pre-wrap">{m.message}</p>
                <div className="mt-2 text-xs text-muted-foreground">{new Date(m.created_at).toLocaleString()}</div>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <form action={toggleMessageRead}>
                  <input type="hidden" name="id" value={m.id} />
                  <input type="hidden" name="is_read" value={String(!m.is_read)} />
                  <Button type="submit" size="sm" variant="outline" className="rounded-full">
                    {m.is_read ? <><Mail className="h-3.5 w-3.5 mr-1" /> Mark unread</> : <><MailOpen className="h-3.5 w-3.5 mr-1" /> Mark read</>}
                  </Button>
                </form>
                <form action={deleteMessage}>
                  <input type="hidden" name="id" value={m.id} />
                  <Button type="submit" size="sm" variant="outline" className="rounded-full w-full text-destructive hover:text-destructive">
                    <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                  </Button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MessagesAdmin
