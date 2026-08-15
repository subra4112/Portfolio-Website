import Seo from '../components/Seo'
import PageShell from '../components/PageShell'
import Contact from '../components/Contact'

export default function ContactPage() {
  return (
    <PageShell>
      <Seo
        title="Contact | Subramanian Raj Narayanan"
        description="Get in touch about full time AI/ML Engineer, Data Scientist, Clinical AI Engineer and Forward Deployed Engineer roles across healthcare AI and enterprise AI."
        path="/contact"
      />
      <Contact />
    </PageShell>
  )
}
