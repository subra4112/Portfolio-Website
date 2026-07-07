import PageShell from '../components/PageShell'
import Projects from '../components/Projects'

export default function ProjectsPage() {
  return (
    <PageShell next={{ to: '/experience', label: 'Experience — training epochs' }}>
      <Projects />
    </PageShell>
  )
}
