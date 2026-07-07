import PageShell from '../components/PageShell'
import About from '../components/About'

export default function AboutPage() {
  return (
    <PageShell next={{ to: '/projects', label: 'Projects — selected systems' }}>
      <About />
    </PageShell>
  )
}
