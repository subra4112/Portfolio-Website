import Seo from '../components/Seo'
import PageShell from '../components/PageShell'
import Projects from '../components/Projects'

export default function ProjectsPage() {
  return (
    <PageShell next={{ to: '/experience', label: 'Experience — training epochs' }}>
      <Seo
        title="Projects | Subramanian Raj Narayanan"
        description="Generative clinical AI trained from scratch on 26M+ EHR events, an ARES/ETHOS reproduction on H100 GPUs, hybrid knowledge-graph RAG, multi-agent testing and security ML."
        path="/projects"
      />
      <Projects />
    </PageShell>
  )
}
