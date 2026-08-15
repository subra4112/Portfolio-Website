import Seo from '../components/Seo'
import Hero from '../components/Hero'
import SectionIndex from '../components/SectionIndex'

export default function HomePage() {
  return (
    <>
      <Seo
        title="Subramanian Raj Narayanan — AI/ML Engineer · Clinical AI & LLMs"
        description="AI/ML Engineer at Botco.ai building first-of-its-kind generative clinical AI — a transformer trained from scratch on 26M+ clinical events, plus RAG pipelines, agentic AI and production MLOps."
        path="/"
      />
      <Hero />
      <SectionIndex />
    </>
  )
}
