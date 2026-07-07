import PageShell from '../components/PageShell'
import Experience from '../components/Experience'

export default function ExperiencePage() {
  return (
    <PageShell next={{ to: '/skills', label: 'Skills — the stack' }}>
      <Experience />
    </PageShell>
  )
}
