import Seo from '../components/Seo'
import PageShell from '../components/PageShell'
import Contact from '../components/Contact'

export default function ContactPage() {
  return (
    <PageShell>
      <Seo
        title="Contact | Subramanian Raj Narayanan"
        description="Get in touch about full-time AI/ML Engineer, Data Scientist, Clinical AI Engineer and Forward Deployed Engineer roles — healthcare AI, enterprise AI, and beyond."
        path="/contact"
      />
      <Contact />
    </PageShell>
  )
}
