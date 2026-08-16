import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { SKILL_INFO } from '../lib/skillInfo'

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

const SIZE: Record<0 | 1 | 2, string> = {
  2: 'px-6 py-3.5 text-lg sm:text-xl',
  1: 'px-5 py-3 text-base',
  0: 'px-4 py-2.5 text-sm',
}

interface Active {
  skill: string
  tone: string
  /** Viewport coordinates of the bubble that opened it. */
  top: number
  left: number
  width: number
  height: number
}

const POP_W = 320
const GUTTER = 12

/** Clamps the popup inside the viewport so it can never cause overflow. */
function popPosition(a: Active) {
  const vw = document.documentElement.clientWidth
  const vh = document.documentElement.clientHeight
  const w = Math.min(POP_W, vw - GUTTER * 2)
  const centered = a.left + a.width / 2 - w / 2
  const left = Math.max(GUTTER, Math.min(centered, vw - w - GUTTER))
  // Flip above the bubble when there is no room below.
  const below = a.top + a.height
  const flip = below + 190 > vh && a.top > 200
  return { w, left, top: flip ? a.top - 10 : below + 10, flip }
}

export default function Skills() {
  const [active, setActive] = useState<Active | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  // Dismiss on Escape, on a click outside, and on scroll or resize, since the
  // popup is anchored to where the bubble was when it opened.
  useEffect(() => {
    if (!active) return
    const close = () => setActive(null)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    const onDown = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (!t.closest('[data-skill-pop]') && !t.closest('[data-bubble]')) close()
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('scroll', close, { passive: true })
    window.addEventListener('resize', close)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('scroll', close)
      window.removeEventListener('resize', close)
    }
  }, [active])

  return (
    <section id="skills" className="section" ref={rootRef}>
      <SectionHeading
        color="#f6c543"
        title="The"
        accent="stack"
        subtitle="Sized by how often I reach for it. Tap any of them and I will explain what it actually is."
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
              {group.skills.map(([skill, weight], i) => {
                const isOpen = active?.skill === skill
                return (
                  <span key={skill} className="inline-flex">
                    <button
                      data-bubble
                      onClick={(e) => {
                        if (isOpen) return setActive(null)
                        const r = e.currentTarget.getBoundingClientRect()
                        setActive({
                          skill,
                          tone: group.tone,
                          top: r.top,
                          left: r.left,
                          width: r.width,
                          height: r.height,
                        })
                      }}
                      aria-expanded={isOpen}
                      className={`bubble ${SIZE[weight]}`}
                      style={
                        {
                          '--tone': group.tone,
                          '--delay': `${(i % 7) * 0.42}s`,
                          '--dur': `${6.5 + (i % 4) * 0.9}s`,
                          color: isOpen || weight === 2 ? '#ffffff' : undefined,
                          borderColor: isOpen
                            ? group.tone
                            : weight === 2
                              ? `${group.tone}66`
                              : undefined,
                          boxShadow: isOpen ? `0 0 28px -6px ${group.tone}` : undefined,
                        } as React.CSSProperties
                      }
                    >
                      {skill}
                    </button>
                  </span>
                )
              })}
            </div>
          </Reveal>
        ))}
      </div>

      {/* Portalled and fixed, so a Reveal transform can never trap it and it
          can never widen the page. */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {active && (() => {
              const { w, left, top, flip } = popPosition(active)
              return (
                <motion.div
                  data-skill-pop
                  initial={{ opacity: 0, y: flip ? 6 : -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: flip ? 6 : -6, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="fixed z-[120] rounded-2xl border bg-ink-800 p-4 text-left shadow-panel"
                  style={{
                    borderColor: `${active.tone}66`,
                    width: w,
                    left,
                    top,
                    transform: flip ? 'translateY(-100%)' : undefined,
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className="font-display text-[15px] font-bold"
                      style={{ color: active.tone }}
                    >
                      {active.skill}
                    </span>
                    <button
                      onClick={() => setActive(null)}
                      aria-label="Close"
                      className="mt-0.5 shrink-0 text-mist-400 transition-colors hover:text-white"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-mist-200">
                    {SKILL_INFO[active.skill] ?? 'Part of my day to day toolkit.'}
                  </p>
                </motion.div>
              )
            })()}
          </AnimatePresence>,
          document.body
        )}
    </section>
  )
}
