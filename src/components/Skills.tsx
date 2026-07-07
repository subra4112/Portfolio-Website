import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

/** Grouped exactly like the resume's technical-skills section. */
const STACKS = [
  {
    dir: 'languages',
    skills: ['Python', 'C++', 'SQL', 'Java', 'R', 'TypeScript'],
  },
  {
    dir: 'ai-ml--genai',
    skills: [
      'Transformers', 'LLMs', 'PyTorch', 'TensorFlow', 'Fine-tuning', 'LoRA / QLoRA',
      'RLHF', 'Embeddings', 'Hugging Face', 'Computer Vision', 'CUDA', 'spaCy',
    ],
  },
  {
    dir: 'agentic-ai',
    skills: [
      'LangChain', 'LangGraph', 'MCP', 'Multi-agent Orchestration',
      'Tool / Function Calling', 'AI Agents', 'Persistent Memory',
    ],
  },
  {
    dir: 'retrieval--rag',
    skills: [
      'RAG Pipelines', 'Hybrid Retrieval', 'Reranking', 'Vector Search',
      'Semantic Search', 'LlamaIndex', 'Prompt Engineering',
    ],
  },
  {
    dir: 'mlops--cloud',
    skills: [
      'Docker', 'Kubernetes', 'FastAPI', 'CI/CD', 'MLflow', 'Weights & Biases',
      'vLLM', 'AWS SageMaker', 'Model Monitoring', 'Linux', 'Git',
    ],
  },
  {
    dir: 'databases',
    skills: [
      'PostgreSQL', 'MongoDB', 'Neo4j', 'ChromaDB', 'Milvus', 'Pinecone',
      'Weaviate', 'pgvector', 'FAISS', 'MySQL',
    ],
  },
  {
    dir: 'data-engineering',
    skills: [
      'PySpark', 'Kafka', 'Airflow', 'ETL Pipelines', 'Databricks',
      'Snowflake', 'Redshift', 'Grafana',
    ],
  },
]

const MARQUEE = [
  'PyTorch', 'Transformers', 'LangChain', 'LangGraph', 'MCP', 'RAG', 'vLLM',
  'Kubernetes', 'Docker', 'FastAPI', 'Neo4j', 'ChromaDB', 'FAISS', 'MLflow',
  'Hugging Face', 'CUDA', 'H100', 'Kafka', 'Airflow', 'Snowflake', 'AWS',
]

export default function Skills() {
  return (
    <section id="skills" className="section">
      <SectionHeading
        eyebrow="04 · toolbox"
        title="The"
        accent="stack"
        subtitle="Everything I reach for — from transformer pretraining to the pipelines and infra that keep it alive in production."
      />

      <Reveal>
        <div className="term">
          <div className="term-bar">
            <span className="term-dot bg-rose-400/70" />
            <span className="term-dot bg-amber-400/70" />
            <span className="term-dot bg-primary-400/70" />
            <span className="ml-3 font-mono text-xs text-mist-400">
              subra@production:~/stack
            </span>
          </div>
          <div className="grid gap-x-8 gap-y-6 p-6 sm:grid-cols-2 sm:p-8">
            {STACKS.map((s, i) => (
              <Reveal key={s.dir} delay={i * 50} className={i === STACKS.length - 1 ? 'sm:col-span-2' : ''}>
                <div className="font-mono text-[13px] text-mist-400">
                  <span className="text-primary-400">$</span> ls{' '}
                  <span className="text-violet-300">{s.dir}/</span>
                </div>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {s.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-white/5 bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-mist-200 transition-colors hover:border-primary-400/40 hover:text-primary-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Tech marquee */}
      <Reveal delay={120} className="mt-10 overflow-hidden">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-950 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-950 to-transparent" />
          <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-3">
            {[...MARQUEE, ...MARQUEE].map((t, i) => (
              <span
                key={i}
                className="whitespace-nowrap rounded-lg border border-white/5 bg-white/[0.02] px-4 py-2 font-mono text-sm text-mist-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[marquee_28s_linear_infinite\\] { animation: none; }
        }
      `}</style>
    </section>
  )
}
