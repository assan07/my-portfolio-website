import { createClient } from '@/lib/supabase/server'
import { CrudManager } from '../../_components/CrudManager'
import { saveCertification } from '../../actions'

async function CertificationsAdmin() {
  const supabase = await createClient()
  const { data: rows = [] } = await supabase.from('certifications').select('*').order('issued_date', { ascending: false })

  const fields = [
    { name: 'name', label: 'Certification name', type: 'text' },
    { name: 'issuer', label: 'Issuer', type: 'text' },
    {
      name: 'issued_date', label: 'Issued date', type: 'text', placeholder: 'YYYY-MM-DD'
    },
    { name: 'credential_url', label: 'Credential URL', type: 'url' },
  ]

  return (
    <CrudManager
      title="Certifications"
      description="Certifications shown as cards on Home and Resume."
      table="certifications"
      revalidatePath="/admin/certifications"
      rows={rows || []}
      fields={fields}
      saveAction={saveCertification}
    />
  )
}

export default CertificationsAdmin
