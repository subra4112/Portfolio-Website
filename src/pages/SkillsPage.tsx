import PageShell from '../components/PageShell'
import Skills from '../components/Skills'

export default function SkillsPage() {
  return (
    <PageShell next={{ to: '/contact', label: 'Contact — open a session' }}>
      <Skills />
    </PageShell>
  )
}
