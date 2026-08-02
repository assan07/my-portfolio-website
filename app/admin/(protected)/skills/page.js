import { createClient } from '@/lib/supabase/server'
import { CrudManager } from '../../_components/CrudManager'
import { saveSkill } from '../../actions'
import { Badge } from '@/components/ui/badge'

async function SkillsAdmin() {
  const supabase = await createClient()
  const { data: rows = [] } = await supabase.from('skills').select('*').order('category', { ascending: true }).order('sort_order', { ascending: true })

  const fields = [
    { name: 'category', label: 'Category', type: 'select', options: ['Frontend', 'Mobile', 'Backend', 'Database', 'Tools'] },
    { name: 'name', label: 'Name', type: 'text', placeholder: 'e.g. React' },
    { name: 'slug', label: 'Icon slug', type: 'text', placeholder: 'react', hint: 'Simple Icons slug (see simpleicons.org)' },
    { name: 'color', label: 'Icon color (hex, no #)', type: 'text', placeholder: '61DAFB' },
    { name: 'custom_icon', label: 'Custom Icon', type: 'upload', bucket: 'skill-icons', accept: 'image/svg+xml,image/png,image/webp', kind: 'image', hint: 'Optional. Upload an SVG when the icon is unavailable in Simple Icons.', },
    { name: 'level', label: 'Level', type: 'select', options: ['Advanced', 'Intermediate', 'Basic'] },
    { name: 'sort_order', label: 'Sort order', type: 'text', placeholder: '0' },
  ]

  return (
    <CrudManager
      title="Skills"
      description="Tech stack shown on Home. Group by category, use official Simple Icons slugs."
      table="skills"
      revalidatePath="/admin/skills"
      rows={rows || []}
      fields={fields}
      saveAction={saveSkill}

    />
  )
}

export default SkillsAdmin
