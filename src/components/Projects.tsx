import { useState } from 'react'
import {
  Github,
  Plus,
  Brain,
  Activity,
  Smartphone,
  ShieldCheck,
  HeartPulse,
  Bot,
  Syringe,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import TiltCard from './TiltCard'
import LivePreview from './LivePreview'

interface Project {
  title: string
  tagline: string
  year: string
  category: string
  icon: LucideIcon
  blurb: string
  problem: string
  approach: string
  outcome: string
  stack: string[]
  metrics?: string[]
  github?: string
  badge?: string
  /** Renders a running preview of the real product inside the card. */
  live?: string
  tone: { c: string; bg: string }
}

const BLUE = { c: '#3a83f7', bg: '#133463' }
const PINK = { c: '#f077af', bg: '#663049' }
const PURPLE = { c: '#a67df2', bg: '#3b2366' }
const YELLOW = { c: '#f6c543', bg: '#734615' }
const ORANGE = { c: '#ee7c37', bg: '#653218' }

const PROJECTS: Project[] = [
  {
    title: 'Carlton AI',
    tagline: 'A clinical foundation model, and the console that makes it usable',
    year: '2026',
    category: 'Foundation Models · Product',
    icon: HeartPulse,
    badge: 'First of its kind',
    tone: BLUE,
    live: '/carlton-dashboard.html',
    blurb:
      'A GPT2 style transformer I trained from scratch in PyTorch on millions of real clinical events, plus the risk console that turns its output into something care staff open every morning. Try the live dashboard below.',
    problem:
      'Longitudinal records are fragmented, noisy and heavily imbalanced, so off the shelf models learn almost nothing. And a model that lives only in a notebook changes nothing about how a facility runs.',
    approach:
      'Owned it end to end. Tokenized thousands of fragmented diagnosis codes, designed the architecture, fixed the imbalance with tiered undersampling and loss reweighting, then built the console that ranks residents by urgency and shows the signals behind every score.',
    outcome:
      'Fall risk prediction went from random chance to a usable signal, and the research prototype became a working dashboard with no equivalent on the market.',
    metrics: ['26M+ events', '10M params', 'Phase 3 lead'],
    stack: ['PyTorch', 'Transformers', 'React', 'TypeScript', 'CUDA'],
  },
  {
    title: 'Beyfortus AE Reporting Companion',
    tagline: 'Catching adverse events in the words parents actually use',
    year: '2026',
    category: 'Clinical NLP · Drug Safety',
    icon: Syringe,
    badge: 'Sanofi project',
    tone: PINK,
    live: '/beyfortus-demo.html',
    blurb:
      'A five class adverse event classifier built on RoBERTa for the Beyfortus program at Sanofi, wrapped in a reporting companion that walks a parent through describing a reaction and routes anything serious to a human. The demo below is live.',
    problem:
      'Adverse events hide inside informal parent reported language, and the source VAERS data arrives raw with no labels to train against.',
    approach:
      'Built a dual verification labeling pipeline pairing keyword rules with model agreement, fine tuned RoBERTa across six training rounds, then shipped the reporting interface that puts a human in the loop on every serious case.',
    outcome:
      'Macro F1 0.7594, validated against 36 of 40 real trigger phrases, headed for deployment through Sutter Health.',
    metrics: ['macro F1 0.759', '91.7% labeling accuracy', 'live demo'],
    stack: ['RoBERTa', 'PyTorch', 'Hugging Face', 'Next.js', 'VAERS'],
  },
  {
    title: 'ARES and ETHOS Reproduction',
    tagline: 'Mortality inference from thousands of simulated patient futures',
    year: '2026',
    category: 'Research',
    icon: Activity,
    badge: 'Research',
    tone: PURPLE,
    blurb:
      'Reproduced a frontier hospital mortality inference pipeline on an NVIDIA H100, generating twenty thousand possible patient futures by Monte Carlo simulation to estimate risk from tokenized health timelines.',
    problem:
      'Zero shot clinical inference from generative timelines is new, and trusting it means reproducing it yourself.',
    approach:
      'Stood up the full pipeline on H100 GPUs and benchmarked EHRSHOT with pretrained CLMBR weights, clearing JAX, CUDA and cuDNN conflicts on the way.',
    outcome:
      'Matched published performance, validating the approach that now underpins the production work.',
    metrics: ['AUROC 0.8561', '20K trajectories', 'H100'],
    stack: ['PyTorch', 'ETHOS', 'EHRSHOT', 'JAX'],
  },
  {
    title: 'AskNeo',
    tagline: 'Hybrid retrieval over a knowledge graph and a vector store',
    year: '2025',
    category: 'RAG · Knowledge Graphs',
    icon: Brain,
    github: 'https://github.com/subra4112/AskNeo-Smart-Health-Assistant',
    tone: YELLOW,
    blurb:
      'A retrieval engine that answers multi hop medical questions by combining a Neo4j knowledge graph with ChromaDB vector search through LangChain.',
    problem:
      'Vector search misses structured relationships. Graph queries miss fuzzy recall. Medical questions need both.',
    approach:
      'Built the graph alongside embeddings and routed every query through both, then merged the evidence into one answer.',
    outcome:
      'Multi hop reasoning across structured and semantic data, benchmarked on answer quality.',
    metrics: ['3K+ nodes', '12K+ edges'],
    stack: ['Neo4j', 'ChromaDB', 'LangChain', 'Python'],
  },
  {
    title: 'FocusMate',
    tagline: 'A mobile AI copilot for people with ADHD',
    year: '2025',
    category: 'Agents · Mobile',
    icon: Smartphone,
    github: 'https://github.com/subra4112/FocusMate_AI_Co_Pilot_for_ADHD',
    tone: ORANGE,
    blurb:
      'A productivity assistant in React Native and FastAPI that reads your inbox and calendar, triages what matters, and captures tasks by voice.',
    problem:
      'Productivity tools wait to be used. Attention is exactly what is in short supply.',
    approach:
      'Wired the Gmail and Calendar APIs behind FastAPI, with an LLM layer for triage and action extraction and instant voice capture.',
    outcome:
      'Automated task management that meets people where their attention already is.',
    metrics: ['voice first', 'LLM triage'],
    stack: ['React Native', 'FastAPI', 'Gmail API', 'LLMs'],
  },
  {
    title: 'EDITH QA',
    tagline: 'Four agents that test mobile apps on their own',
    year: '2025',
    category: 'Agents · QA',
    icon: Bot,
    github: 'https://github.com/subra4112/EDITH-QA',
    tone: BLUE,
    blurb:
      'An autonomous testing system where Planner, Executor, Verifier and Supervisor agents collaborate, with computer vision, to run and confirm Android UI tasks.',
    problem: 'Scripted UI tests break every time the interface shifts.',
    approach:
      'Role specialised agents coordinate through a supervisor loop with vision grounded verification and a full audit log.',
    outcome: 'Over 95% task execution accuracy, cutting manual testing effort.',
    metrics: ['95%+ accuracy', '4 agent roles'],
    stack: ['Python', 'LLMs', 'Computer Vision'],
  },
  {
    title: 'ArcDefender',
    tagline: 'Deep learning detection of malware beaconing',
    year: '2025',
    category: 'ML · Security',
    icon: ShieldCheck,
    github: 'https://github.com/subra4112/ArcDefender',
    tone: PINK,
    blurb:
      'A threat detection system using LSTM and BERT models to find command and control traffic hiding inside ordinary DNS and HTTPS activity.',
    problem: 'Stealthy beaconing looks like normal traffic and slips past static rules.',
    approach:
      'Combined sequence modelling with transformer features over live log ingestion.',
    outcome: 'Better identification of covert activity, in an interactive console.',
    metrics: ['LSTM + BERT', 'real time'],
    stack: ['Python', 'LSTM', 'BERT', 'FastAPI'],
  },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false)
  const Icon = project.icon
  const tone = project.tone

  return (
    <TiltCard className="lg:col-span-3">
      <Reveal
        delay={(index % 2) * 70}
        className="card tilt-glare group relative h-full overflow-hidden"
      >
        <div className="p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-4">
              <div
                className="grid h-12 w-12 shrink-0 place-items-center rounded-xl"
                style={{
                  backgroundColor: tone.bg,
                  color: tone.c,
                  boxShadow: `inset 0 0 0 1px ${tone.c}44`,
                }}
              >
                <Icon size={22} />
              </div>
              <div className="min-w-0">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span
                    className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium"
                    style={{
                      backgroundColor: `${tone.c}1a`,
                      color: tone.c,
                      border: `1px solid ${tone.c}44`,
                    }}
                  >
                    {project.category}
                  </span>
                  {project.badge && (
                    <span
                      className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium"
                      style={{ backgroundColor: tone.bg, color: '#ffffff' }}
                    >
                      {project.badge}
                    </span>
                  )}
                  <span className="font-mono text-[11px] text-mist-400">{project.year}</span>
                </div>
                <h3 className="font-display text-2xl font-bold leading-tight text-white">
                  {project.title}
                </h3>
                <p className="mt-1 text-[15px]" style={{ color: tone.c }}>
                  {project.tagline}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1.5">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} on GitHub`}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-mist-300 transition-colors hover:border-white/40 hover:text-white"
                >
                  <Github size={17} />
                </a>
              )}
              <button
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-label={open ? 'Collapse details' : 'Expand details'}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-mist-300 transition-all hover:border-white/40 hover:text-white"
              >
                <Plus
                  size={17}
                  className={`transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
                />
              </button>
            </div>
          </div>

          <p className="mt-4 text-[15px] leading-relaxed text-mist-300">{project.blurb}</p>

          {project.live && (
            <LivePreview src={project.live} title={project.title} tone={tone.c} />
          )}

          {project.metrics && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.metrics.map((m) => (
                <span key={m} className="metric">
                  {m}
                </span>
              ))}
            </div>
          )}

          <div
            className="grid transition-[grid-template-rows] duration-500 ease-out"
            style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
          >
            <div className="overflow-hidden">
              <div className="mt-5 grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-3">
                {[
                  ['Problem', project.problem],
                  ['Approach', project.approach],
                  ['Outcome', project.outcome],
                ].map(([label, body]) => (
                  <div key={label}>
                    <div
                      className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.2em]"
                      style={{ color: tone.c }}
                    >
                      {label}
                    </div>
                    <p className="text-[13px] leading-relaxed text-mist-300">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.map((t) => (
              <span
                key={t}
                className="rounded-md bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-mist-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </TiltCard>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <SectionHeading
        color="#6cc971"
        title="Selected"
        accent="work"
        subtitle="Clinical AI in production, frontier research, and the products people actually open."
      />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-6">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>

      <Reveal delay={120} className="mt-10 text-center">
        <a
          href="https://github.com/subra4112"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
        >
          <Github size={18} /> More on GitHub
        </a>
      </Reveal>
    </section>
  )
}
