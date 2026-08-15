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
  Sparkles,
  FlaskConical,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import TiltCard from './TiltCard'

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
  badgeIcon?: LucideIcon
}

const PROJECTS: Project[] = [
  {
    title: 'Generative Clinical AI',
    tagline: 'A GPT-2-style transformer trained from scratch on real EHR data',
    year: '2026',
    category: 'Clinical AI · Foundation Models',
    icon: HeartPulse,
    badge: 'First of its kind',
    badgeIcon: Sparkles,
    blurb:
      'At Botco.ai, I designed and trained a 10M-parameter autoregressive transformer from scratch in PyTorch on 26M+ clinical events across 4,733 assisted-living residents — a generative clinical AI system with no existing market equivalent.',
    problem:
      'Assisted-living operators need to know which residents are at risk of falls, hospitalization, or death — but longitudinal EHR data is fragmented, noisy, and severely imbalanced (27:1 noise-to-signal).',
    approach:
      'Built the entire pipeline end to end: EHR tokenization normalizing 10,144 fragmented diagnosis codes, GPT-2-style architecture, 3-tier undersampling, loss upweighting, and regression-gated multi-outcome evaluation.',
    outcome:
      'Fall-risk prediction lifted from random chance to AUROC 0.693 (hospitalization 0.637, mortality 0.632), now driving Phase 3: care-level transition prediction over 6/12/18-month horizons for 634 confirmed cases.',
    metrics: ['26M+ events', '10M params', 'AUROC 0.693', '+19% Phase 2 lift'],
    stack: ['PyTorch', 'Transformers', 'EHR Tokenization', 'Python', 'CUDA'],
  },
  {
    title: 'ARES / ETHOS Reproduction',
    tagline: 'Hospital mortality inference via 20K Monte Carlo patient futures',
    year: '2026',
    category: 'Research · Healthcare ML',
    icon: Activity,
    badge: 'Research',
    badgeIcon: FlaskConical,
    blurb:
      'Reproduced the ARES/ETHOS hospital-mortality inference pipeline on an NVIDIA H100 — generating 20,000 future patient trajectories via Monte Carlo simulation to estimate mortality risk from tokenized health timelines.',
    problem:
      'Zero-shot clinical inference from generative patient timelines is a frontier method; reproducing published results end to end is the only way to trust — and extend — it.',
    approach:
      'Stood up the full pipeline on H100 GPUs: 20 Monte Carlo simulations per example over tokenized MIMIC-IV-style timelines, plus the EHRSHOT/FEMR benchmark with pretrained CLMBR-T-base weights across 15 few-shot tasks — debugging JAX, CUDA, cuDNN, and NumPy conflicts along the way.',
    outcome:
      'Matched published performance — AUROC 0.8561, AUPRC 0.2754, Brier 0.0158 — validating the generative-inference approach that now underpins production clinical AI work.',
    metrics: ['AUROC 0.8561', 'Brier 0.0158', '20K trajectories', 'H100'],
    stack: ['PyTorch', 'ETHOS', 'EHRSHOT', 'CLMBR', 'JAX', 'H100'],
  },
  {
    title: 'AskNeo',
    tagline: 'Hybrid RAG over a knowledge graph + vector store for medical QA',
    year: '2025',
    category: 'RAG · Knowledge Graphs',
    icon: Brain,
    github: 'https://github.com/subra4112/AskNeo-Smart-Health-Assistant',
    blurb:
      'A hybrid retrieval engine that answers multi-hop medical questions by combining a Neo4j knowledge graph (3K+ nodes, 12K+ edges) with ChromaDB vector search, orchestrated through LangChain.',
    problem:
      'Pure vector RAG misses structured multi-hop relationships; pure graph queries miss fuzzy semantic recall. Medical QA needs both at once.',
    approach:
      'Built the Neo4j graph alongside ChromaDB embeddings and routed queries through LangChain with GPT-based retrieval, enabling reasoning across structured and semantic data in a single answer.',
    outcome:
      'Multi-hop medical reasoning with scalable semantic search — benchmarked with ROUGE, BLEU, and cosine similarity to quantify answer quality.',
    metrics: ['3K+ nodes', '12K+ edges', 'multi-hop QA'],
    stack: ['Neo4j', 'ChromaDB', 'LangChain', 'GPT-4', 'Python'],
  },
  {
    title: 'FocusMate',
    tagline: 'A mobile AI co-pilot for ADHD users',
    year: '2025',
    category: 'Agents · Mobile',
    icon: Smartphone,
    github: 'https://github.com/subra4112/FocusMate_AI_Co_Pilot_for_ADHD',
    blurb:
      'A mobile AI productivity assistant built with React Native and FastAPI — Gmail and Google Calendar aware, with LLM-powered email triage, action-item extraction, and real-time voice input.',
    problem:
      'Productivity tools are passive. People with ADHD need an assistant that captures intent instantly and turns inboxes and calendars into actions automatically.',
    approach:
      'Integrated the Gmail and Google Calendar APIs behind a FastAPI backend, with an LLM layer for email triage and action-item extraction, plus real-time voice capture in the React Native client.',
    outcome:
      'Automated task management that meets users where attention is scarce — fast voice capture, triaged email, extracted to-dos.',
    metrics: ['voice-first', 'LLM triage', 'auto task extraction'],
    stack: ['React Native', 'FastAPI', 'Gmail API', 'Google Calendar', 'LLMs'],
  },
  {
    title: 'EDITH-QA',
    tagline: 'Multi-agent LLM system for autonomous mobile UI testing',
    year: '2025',
    category: 'Agents · QA',
    icon: Bot,
    github: 'https://github.com/subra4112/EDITH-QA',
    blurb:
      'An autonomous mobile testing system where Planner, Executor, Verifier, and Supervisor LLM agents collaborate — with computer vision — to run and verify Android UI tasks.',
    problem:
      'Mobile UI testing is brittle and manual; scripted tests break every time the UI shifts.',
    approach:
      'Role-specialized LLM agents coordinate through a supervisor loop with vision-grounded verification and structured audit logging for every step.',
    outcome:
      '95%+ task-execution accuracy, meaningfully reducing manual UI-testing effort.',
    metrics: ['95%+ accuracy', '4 agent roles'],
    stack: ['Python', 'LLMs', 'Multi-agent', 'Computer Vision'],
  },
  {
    title: 'ArcDefender',
    tagline: 'Deep-learning detection of malware C2 beaconing',
    year: '2025',
    category: 'ML · Security',
    icon: ShieldCheck,
    github: 'https://github.com/subra4112/ArcDefender',
    blurb:
      'A cyber threat detection system using LSTM and BERT models to identify command-and-control communication patterns hidden in DNS/HTTPS traffic.',
    problem:
      'Stealthy C2 beaconing hides in normal-looking network traffic and evades static rules.',
    approach:
      'Combined LSTM sequence modeling with BERT-based features, real-time log ingestion, and live model inference behind FastAPI + Streamlit.',
    outcome:
      'Improved identification of stealthy C2 activity with an interactive, real-time defense console.',
    metrics: ['LSTM + BERT', 'real-time inference'],
    stack: ['Python', 'LSTM', 'BERT', 'FastAPI', 'Streamlit'],
  },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false)
  const Icon = project.icon
  const BadgeIcon = project.badgeIcon

  return (
    <TiltCard className="lg:col-span-3">
      <Reveal
        delay={(index % 2) * 80}
        className="card tilt-glare group relative h-full overflow-hidden"
      >
        <div className="p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary-500/10 text-primary-300 ring-1 ring-primary-400/20">
              <Icon size={22} />
            </div>
            <div>
              <div className="mb-1.5 flex flex-wrap items-center gap-2">
                <span className="pill">{project.category}</span>
                {project.badge && (
                  <span className={project.badge === 'Research' ? 'pill-violet' : 'pill-amber'}>
                    {BadgeIcon && <BadgeIcon size={10} />}
                    {project.badge}
                  </span>
                )}
                <span className="font-mono text-xs text-mist-400">{project.year}</span>
              </div>
              <h3 className="font-display text-xl font-semibold text-mist-100 transition-colors group-hover:text-primary-200">
                {project.title}
              </h3>
              <p className="mt-0.5 text-sm text-primary-300/90">{project.tagline}</p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} on GitHub`}
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-mist-300 transition-colors hover:border-primary-400/40 hover:text-primary-300"
              >
                <Github size={17} />
              </a>
            )}
            <button
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? 'Collapse details' : 'Expand details'}
              className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-mist-300 transition-all hover:border-primary-400/40 hover:text-primary-300"
            >
              <Plus
                size={17}
                className={`transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
              />
            </button>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-mist-300">{project.blurb}</p>

        {/* Monitor-style metric readouts */}
        {project.metrics && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.metrics.map((m) => (
              <span key={m} className="metric">
                {m}
              </span>
            ))}
          </div>
        )}

        {/* Expandable detail — grid-rows trick animates height with no JS measure */}
        <div
          className="grid transition-[grid-template-rows] duration-500 ease-out"
          style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
        >
          <div className="overflow-hidden">
            <div className="mt-5 grid gap-4 border-t border-white/5 pt-5 sm:grid-cols-3">
              {[
                ['Problem', project.problem],
                ['Approach', project.approach],
                ['Outcome', project.outcome],
              ].map(([label, body]) => (
                <div key={label}>
                  <div className="eyebrow mb-1.5 text-[10px]">{label}</div>
                  <p className="text-[13px] leading-relaxed text-mist-300">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stack */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((t) => (
            <span
              key={t}
              className="rounded-md bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-mist-300"
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
        eyebrow="02 · work"
        title="Selected"
        accent="systems"
        subtitle="Production clinical AI, frontier research reproductions, and agentic systems — each card expands into the problem, approach, and outcome."
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
