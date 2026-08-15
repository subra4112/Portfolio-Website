import Seo from '../components/Seo'
import PageShell from '../components/PageShell'
import Skills from '../components/Skills'

export default function SkillsPage() {
  return (
    <PageShell next={{ to: '/contact', label: 'Contact' }}>
      <Seo
        title="Skills | Subramanian Raj Narayanan"
        description="PyTorch, transformers, LangChain and LangGraph, MCP, RAG and hybrid retrieval, vector databases, Kubernetes, FastAPI, MLflow, AWS and the data engineering stack behind them."
        path="/skills"
      />
      <Skills />
    </PageShell>
  )
}
