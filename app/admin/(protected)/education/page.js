import { createClient } from '@/lib/supabase/server'
import { CrudManager } from '../../_components/CrudManager'
import { saveEducation } from '../../actions'

async function EducationAdmin() {
  const supabase = await createClient()
  const { data: rows = [] } = await supabase.from('education').select('*').order('start_date', { ascending: false })

  const fields = [
    { name: 'degree', label: 'Degree', type: 'text' },
    { name: 'school', label: 'School', type: 'text' },
    { name: 'location', label: 'Location', type: 'text' },
    { name: 'start_date', label: 'Start date', type: 'text', placeholder: 'YYYY-MM' },
    { name: 'end_date', label: 'End date', type: 'text', placeholder: 'YYYY-MM' },
    { name: 'description', label: 'Description', type: 'textarea', rows: 3 },
  ]

  return (
    <CrudManager
      title="Education"
      description="Your academic background."
      table="education"
      revalidatePath="/admin/education"
      rows={rows || []}
      fields={fields}
      saveAction={saveEducation}
    />
  )
}

export default EducationAdmin
