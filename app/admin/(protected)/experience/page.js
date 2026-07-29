import { createClient } from '@/lib/supabase/server'
import { CrudManager } from '../../_components/CrudManager'
import { saveExperience } from '../../actions'

async function ExperienceAdmin() {
  const supabase = await createClient()
  const { data: rows = [] } = await supabase.from('experiences').select('*').order('start_date', { ascending: false })

  const fields = [
    { name: 'role', label: 'Role', type: 'text' },
    { name: 'company', label: 'Company', type: 'text' },
    { name: 'location', label: 'Location', type: 'text' },
    { name: 'start_date', label: 'Start date', type: 'text', placeholder: 'YYYY-MM', hint: 'Format: YYYY-MM' },
    { name: 'end_date', label: 'End date', type: 'text', placeholder: 'YYYY-MM or leave empty for Present' },
    { name: 'description', label: 'Description', type: 'textarea', rows: 3 },
    { name: 'highlights', label: 'Highlights', type: 'textarea', rows: 3, hint: 'Comma-separated bullet points' },
  ]

  return (
    <CrudManager
      title="Experiences"
      description="Work history shown on Home and Resume pages."
      table="experiences"
      revalidatePath="/admin/experience"
      rows={rows || []}
      fields={fields}
      saveAction={saveExperience}
    />
  )
}

export default ExperienceAdmin
