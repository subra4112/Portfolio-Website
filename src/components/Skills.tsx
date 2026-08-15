import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

interface Group {
  name: string
  tone: string
  /** Weight drives bubble size: 2 is a headline skill, 0 is supporting. */
  skills: [string, 0 | 1 | 2][]
}

const GROUPS: Group[] = [
  {
    name: 'AI and Generative AI',
    tone: '#3a83f7',
    skills: [
      ['PyTorch', 2], ['Transformers', 2], ['LLMs', 2], ['Fine Tuning', 1],
      ['LoRA and QLoRA', 1], ['RLHF', 1], ['Embeddings', 1], ['Hugging Face', 1],
      ['TensorFlow', 0], ['Scikit learn', 0], ['Computer Vision', 0], ['CUDA', 0], ['spaCy', 0],
    ],
  },
  {
    name: 'Agentic AI',
    tone: '#a67df2',
    skills: [
      ['LangChain', 2], ['LangGraph', 2], ['MCP', 1], ['Agent Orchestration', 1],
      ['Tool Calling', 1], ['AI Agents', 1], ['Persistent Memory', 0],
    ],
  },
  {
    name: 'Retrieval and RAG',
    tone: '#f077af',
    skills: [
      ['RAG Pipelines', 2], ['Hybrid Retrieval', 1], ['Reranking', 1], ['Vector Search', 1],
      ['Semantic Search', 0], ['LlamaIndex', 0], ['Prompt Engineering', 0],
    ],
  },
  {
    name: 'MLOps and Cloud',
    tone: '#53b559',
    skills: [
      ['Docker', 2], ['Kubernetes', 2], ['FastAPI', 1], ['MLflow', 1],
      ['Weights and Biases', 1], ['vLLM', 1], ['AWS SageMaker', 1],
      ['CI and CD', 0], ['Model Monitoring', 0], ['Linux', 0], ['Git', 0],
    ],
  },
  {
    name: 'Databases and Vectors',
    tone: '#f6c543',
    skills: [
      ['PostgreSQL', 2], ['Neo4j', 2], ['ChromaDB', 1], ['FAISS', 1], ['pgvector', 1],
      ['Pinecone', 0], ['Milvus', 0], ['Weaviate', 0], ['MongoDB', 0], ['MySQL', 0],
    ],
  },
  {
    name: 'Data Engineering',
    tone: '#ee7c37',
    skills: [
      ['PySpark', 2], ['Kafka', 1], ['Airflow', 1], ['ETL Pipelines', 1],
      ['Databricks', 0], ['Snowflake', 0], ['Redshift', 0], ['Grafana', 0],
    ],
  },
  {
    name: 'Languages',
    tone: '#63a8f8',
    skills: [
      ['Python', 2], ['SQL', 2], ['C++', 1], ['TypeScript', 1], ['Java', 0], ['R', 0],
    ],
  },
]

/** Bigger for headline skills, smaller for supporting ones. */
const SIZE: Record<0 | 1 | 2, string> = {
  2: 'px-6 py-3.5 text-lg sm:text-xl',
  1: 'px-5 py-3 text-base',
  0: 'px-4 py-2.5 text-sm',
}

export default function Skills() {
  return (
    <section id="skills" className="section">
      <SectionHeading
        color="#f6c543"
        title="The"
        accent="stack"
        subtitle="What I reach for, sized by how often I actually reach for it."
      />

      <div className="space-y-12">
        {GROUPS.map((group, gi) => (
          <Reveal key={group.name} delay={gi * 60}>
            <div className="mb-5 flex items-center gap-3">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: group.tone }}
              />
              <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                {group.name}
              </h3>
              <span
                className="h-px flex-1"
                style={{ background: `linear-gradient(90deg, ${group.tone}55, transparent)` }}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              {group.skills.map(([skill, weight], i) => (
                <span
                  key={skill}
                  className={`bubble ${SIZE[weight]}`}
                  style={
                    {
                      '--tone': group.tone,
                      '--delay': `${(i % 7) * 0.42}s`,
                      '--dur': `${6.5 + (i % 4) * 0.9}s`,
                      color: weight === 2 ? '#ffffff' : undefined,
                      borderColor: weight === 2 ? `${group.tone}66` : undefined,
                    } as React.CSSProperties
                  }
                >
                  {skill}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
