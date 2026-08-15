import Seo from '../components/Seo'
import Hero from '../components/Hero'
import AboutHome from '../components/AboutHome'

export default function HomePage() {
  return (
    <>
      <Seo
        title="Subbu, AI/ML Engineer in Clinical AI and LLMs"
        description="AI/ML Engineer at Botco.ai building healthcare generative AI. Clinical foundation models trained from scratch, adverse event detection on the Sanofi project, agentic AI and production MLOps."
        path="/"
      />
      <Hero />
      <AboutHome />
    </>
  )
}
