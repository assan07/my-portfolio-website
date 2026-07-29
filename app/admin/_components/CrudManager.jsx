'use client'

import { useActionState, useState } from 'react'
import { Loader2, Plus, Save, Trash2, Edit3, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import { deleteRow } from '@/app/admin/actions'
import { FileUpload } from '@/components/site/FileUpload'
import { CrudRow } from './CrudRow'

const initial = { error: null, success: null }

export function CrudManager({
  title,
  description,
  table,
  revalidatePath,
  rows,
  fields,
  saveAction,
}) {
  const [state, action, pending] = useActionState(saveAction, initial)
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  function openNew() {
    setEditing({})
    setOpen(true)
  }
  function openEdit(row) {
    setEditing(row)
    setOpen(true)
  }

  async function handleDelete(row) {
    if (!confirm(`Delete this ${title.toLowerCase().replace(/s$/, '')}?`)) return
    const res = await deleteRow(table, row.id, revalidatePath)
    if (res?.error) toast.error(res.error)
    else toast.success('Deleted')
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{title}</h1>
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        </div>
        <Button onClick={openNew} className="rounded-full">
          <Plus className="mr-1 h-4 w-4" /> Add new
        </Button>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card divide-y divide-border">
        {rows.length === 0 && (
          <div className="p-8 text-center text-sm text-muted-foreground">
            No items yet. Click “Add new” to create your first{' '}
            {title.toLowerCase().replace(/s$/, '')}.
          </div>
        )}
        {rows.map((row) => (
          <div key={row.id} className="flex items-center gap-4 p-4">
            <div className="flex-1 min-w-0">
              <CrudRow table={table} row={row} />
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                size="sm"
                variant="outline"
                onClick={() => openEdit(row)}
                className="rounded-full"
              >
                <Edit3 className="h-3.5 w-3.5" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDelete(row)}
                className="rounded-full text-destructive hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editing?.id ? `Edit ${title.replace(/s$/, '')}` : `New ${title.replace(/s$/, '')}`}
            </DialogTitle>
          </DialogHeader>
          <form
            key={editing?.id || 'new'}
            action={async (fd) => {
              const res = await saveAction(null, fd)
              if (res?.error) toast.error(res.error)
              else {
                toast.success('Saved')
                setOpen(false)
              }
            }}
            className="space-y-4"
          >
            {editing?.id && <input type="hidden" name="id" value={editing.id} />}
            {fields.map((f) => {
              const val = editing?.[f.name]
              const displayVal = Array.isArray(val) ? val.join(', ') : (val ?? '')
              if (f.type === 'upload') {
                return (
                  <FileUpload
                    key={f.name}
                    name={f.name}
                    bucket={f.bucket}
                    accept={f.accept || 'image/*'}
                    kind={f.kind || 'image'}
                    label={f.label}
                    defaultValue={val || ''}
                    maxWidth={f.maxWidth}
                    maxHeight={f.maxHeight}
                    quality={f.quality}
                  />
                )
              }
              if (f.type === 'textarea') {
                return (
                  <div key={f.name} className="space-y-1.5">
                    <Label htmlFor={f.name}>{f.label}</Label>
                    <Textarea
                      id={f.name}
                      name={f.name}
                      rows={f.rows || 3}
                      defaultValue={displayVal}
                      placeholder={f.placeholder}
                    />
                    {f.hint && <p className="text-xs text-muted-foreground">{f.hint}</p>}
                  </div>
                )
              }
              if (f.type === 'select') {
                return (
                  <div key={f.name} className="space-y-1.5">
                    <Label htmlFor={f.name}>{f.label}</Label>
                    <select
                      id={f.name}
                      name={f.name}
                      defaultValue={displayVal}
                      className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                    >
                      {(f.options || []).map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>
                )
              }
              if (f.type === 'switch') {
                return (
                  <label key={f.name} className="flex items-center gap-2 select-none">
                    <input
                      type="checkbox"
                      name={f.name}
                      defaultChecked={!!val}
                      className="h-4 w-4 rounded border-input"
                    />
                    <span className="text-sm">{f.label}</span>
                  </label>
                )
              }
              return (
                <div key={f.name} className="space-y-1.5">
                  <Label htmlFor={f.name}>{f.label}</Label>
                  <Input
                    id={f.name}
                    name={f.name}
                    defaultValue={displayVal}
                    placeholder={f.placeholder}
                    type={f.type === 'url' ? 'url' : 'text'}
                  />
                  {f.hint && <p className="text-xs text-muted-foreground">{f.hint}</p>}
                </div>
              )
            })}
            {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="rounded-full"
              >
                <X className="mr-1 h-4 w-4" /> Cancel
              </Button>
              <Button type="submit" className="rounded-full" disabled={pending}>
                {pending ? (
                  <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-1 h-4 w-4" />
                )}
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
