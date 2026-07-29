import { createClient } from '@/lib/supabase/server'
import { CrudManager } from '../../_components/CrudManager'
import { saveProject } from '../../actions'
import { Badge } from '@/components/ui/badge'

async function ProjectsAdmin() {
  const supabase = await createClient()
  const { data: rows = [] } = await supabase.from('projects').select('*').order('created_at', { ascending: false })

  const fields = [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea', rows: 4 },
    { name: 'thumbnail', label: 'Thumbnail image', type: 'upload', bucket: 'project-images', accept: 'image/*', kind: 'image', maxWidth: 1600, maxHeight: 1000, quality: 0.85 },
    { name: 'tech', label: 'Technologies', type: 'text', hint: 'Comma-separated, e.g. Next.js, PostgreSQL, Tailwind' },
    { name: 'github_url', label: 'GitHub URL', type: 'url' },
    { name: 'live_url', label: 'Live Demo URL', type: 'url' },
    { name: 'featured', label: 'Featured on Home', type: 'switch' },
  ]

  return (
    <CrudManager
      title="Projects"
      description="Manage the projects that appear on your Projects page and Featured section."
      table="projects"
      revalidatePath="/admin/projects"
      rows={rows || []}
      fields={fields}
      saveAction={saveProject}
    />
  )
}

export default ProjectsAdmin
