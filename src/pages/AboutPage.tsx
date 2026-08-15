import Seo from '../components/Seo'
import PageShell from '../components/PageShell'
import About from '../components/About'

export default function AboutPage() {
  return (
    <PageShell next={{ to: '/projects', label: 'Projects — selected systems' }}>
      <Seo
        title="About | Subramanian Raj Narayanan"
        description="AI/ML Engineer working at the intersection of clinical AI, agentic AI and LLM engineering — building production systems for high-stakes, regulated healthcare environments."
        path="/about"
      />
      <About />
    </PageShell>
  )
}
