import Seo from '../components/Seo'
import Hero from '../components/Hero'

export default function HomePage() {
  return (
    <>
      <Seo
        title="Subramanian Raj Narayanan, AI/ML Engineer in Clinical AI and LLMs"
        description="AI/ML Engineer at Botco.ai building healthcare generative AI. Clinical foundation models trained from scratch, adverse event detection for a Sanofi funded program, agentic AI and production MLOps."
        path="/"
      />
      <Hero />
    </>
  )
}
