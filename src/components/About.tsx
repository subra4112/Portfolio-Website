import { Brain, Bot, Database, Workflow } from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

/**
 * The About section is framed as a Hugging Face-style model card — a portfolio
 * conceit only an ML engineer would ship. Every field is real information
 * (education, deployment, evals) dressed in model-card vocabulary.
 */
const MODEL_CARD: { key: string; value: string; highlight?: boolean }[] = [
  { key: 'model_id', value: 'subramanian-raj-narayanan' },
  { key: 'architecture', value: 'human transformer · curiosity-dense' },
  { key: 'domain', value: 'clinical AI · LLMs · agentic systems' },
  { key: 'pretraining', value: 'B.Tech CSE — SRM IST (2024)' },
  { key: 'fine_tuning', value: 'M.S. Data Science — ASU (May 2026)' },
  { key: 'deployment', value: 'Botco.ai — Tempe, AZ', highlight: true },
  { key: 'eval/AUROC', value: '0.856 — hospital mortality (ETHOS repro)' },
  { key: 'eval/F1', value: '0.759 macro — adverse events (Sanofi)' },
  { key: 'training_data', value: '26M+ clinical events · 4,733 residents' },
  { key: 'safety', value: 'HIPAA-compliant · production-gated' },
  { key: 'license', value: 'open to full-time roles', highlight: true },
]

const CLUSTERS = [
  {
    icon: Brain,
    title: 'LLMs & GenAI',
    items: ['Transformers from scratch', 'PyTorch', 'LoRA / QLoRA', 'RLHF', 'vLLM'],
  },
  {
    icon: Bot,
    title: 'Agentic AI',
    items: ['LangChain / LangGraph', 'MCP', 'Multi-agent orchestration', 'Tool calling'],
  },
  {
    icon: Database,
    title: 'Retrieval & Data',
    items: ['RAG + hybrid retrieval', 'Neo4j', 'ChromaDB / FAISS / pgvector', 'Reranking'],
  },
  {
    icon: Workflow,
    title: 'MLOps & Infra',
    items: ['Docker / Kubernetes', 'FastAPI', 'MLflow / W&B', 'AWS SageMaker'],
  },
]

export default function About() {
  return (
    <section id="about" className="section">
      <SectionHeading
        color="#b795f5"
        eyebrow="01 · about"
        title="Read the"
        accent="model card"
        subtitle="I build production AI/ML systems that ship to real users in high-stakes, regulated environments — where the model, the retrieval, the evals, and the deployment all have to hold up."
      />

      <div className="grid gap-10 lg:grid-cols-5">
        {/* Narrative */}
        <div className="lg:col-span-2">
          <Reveal className="space-y-5 text-[15px] leading-relaxed text-mist-200">
            <p>
              My work sits at the intersection of{' '}
              <span className="text-mist-100">clinical AI</span>,{' '}
              <span className="text-mist-100">agentic AI</span>, and{' '}
              <span className="text-mist-100">LLM engineering</span>. At Botco.ai I work
              directly with the CTO on one of the most technically demanding clinical AI
              platforms in production — architecture, deployment, and governance.
            </p>
            <p>
              I trained a GPT-2-style transformer from scratch on real longitudinal EHR
              data to predict falls, hospitalizations, and mortality for assisted-living
              residents — a system with no existing market equivalent. Alongside it, I
              built adverse-event detection for a{' '}
              <span className="text-white">Sanofi</span>-funded pharmacovigilance program
              deployed through Sutter Health. Before that: knowledge-graph RAG engines,
              multi-agent testing systems, and cybersecurity ML.
            </p>
            <p>
              I care about the seam where research meets a real user — the unglamorous,
              decisive work of making AI systems evaluable, explainable, and shippable.
            </p>
          </Reveal>

          {/* Skill clusters */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {CLUSTERS.map((c, i) => (
              <Reveal key={c.title} delay={i * 70} className="card p-4">
                <div className="mb-2.5 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-purple-bg text-purple-text">
                  <c.icon size={18} />
                </div>
                <h3 className="font-display text-sm font-semibold text-mist-100">{c.title}</h3>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {c.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md bg-white/[0.03] px-2 py-1 text-[11px] text-mist-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Model card terminal */}
        <Reveal delay={100} className="lg:col-span-3">
          <div className="term h-full">
            <div className="term-bar">
              <span className="term-dot bg-white/25" />
              <span className="term-dot bg-white/25" />
              <span className="term-dot bg-white/25" />
              <span className="ml-3 font-mono text-xs text-mist-400">
                ~/models/subramanian-raj/README.md
              </span>
            </div>
            <div className="p-6 font-mono text-[13px] leading-loose sm:p-7">
              <div className="mb-4 text-mist-400">
                <span className="text-purple-text"># Model Card</span> — human foundation
                model, healthcare-aligned
              </div>
              <div className="space-y-1.5">
                {MODEL_CARD.map((row) => (
                  <div key={row.key} className="flex flex-wrap gap-x-3">
                    <span className="w-32 shrink-0 text-mist-400">{row.key}:</span>
                    <span
                      className={
                        row.highlight ? 'text-purple-text' : 'text-mist-100'
                      }
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 border-t border-white/5 pt-4 text-mist-400">
                <span className="text-purple-text">$</span> intended_use
                <div className="mt-1.5 text-mist-200">
                  AI/ML Engineer · Data Scientist · Clinical AI Engineer · Forward
                  Deployed Engineer — healthcare AI, enterprise AI, and beyond.
                  <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-purple" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
