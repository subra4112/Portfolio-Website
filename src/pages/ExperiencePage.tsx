import Seo from '../components/Seo'
import PageShell from '../components/PageShell'
import Experience from '../components/Experience'

export default function ExperiencePage() {
  return (
    <PageShell next={{ to: '/skills', label: 'Stack' }}>
      <Seo
        title="Experience | Subramanian Raj Narayanan"
        description="AI/ML Engineer at Botco.ai building clinical foundation models in production, plus research, agentic systems and an M.S. in Data Science at Arizona State University."
        path="/experience"
      />
      <Experience />
    </PageShell>
  )
}
