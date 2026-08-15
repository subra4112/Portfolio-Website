import Seo from '../components/Seo'
import PageShell from '../components/PageShell'
import Projects from '../components/Projects'

export default function ProjectsPage() {
  return (
    <PageShell next={{ to: '/experience', label: 'Experience' }}>
      <Seo
        title="Work | Subramanian Raj Narayanan"
        description="The Carlton AI clinical dashboard, Beyfortus adverse event detection for Sanofi, a clinical transformer trained from scratch, plus agentic AI and security machine learning."
        path="/projects"
      />
      <Projects />
    </PageShell>
  )
}
