import { GraduationCap, Users, MapPin } from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

interface Role {
  title: string
  org: string
  location: string
  period: string
  current?: boolean
  points: string[]
  metrics?: string[]
  tags: string[]
}

const ROLES: Role[] = [
  {
    title: 'AI/ML Engineer',
    org: 'Botco.ai',
    location: 'Scottsdale, AZ',
    period: 'Jun 2026 – Present',
    current: true,
    points: [
      'Trained a GPT-2-style autoregressive transformer from scratch on 26M+ clinical events across 4,733 residents — a first-of-its-kind generative clinical AI for assisted-living risk prediction, with no existing market equivalent.',
      'Productionized a multi-outcome evaluation framework — AUROC 0.693 (fall), 0.637 (hospitalization), 0.632 (mortality) — via 3-tier undersampling, loss upweighting, and regression gates.',
      'Leading Phase 3 AL-to-Memory-Care transition prediction: outcome-token architecture across vitals, ADL tasks, diagnoses, and care-plan escalation for 634 confirmed cases over 6/12/18-month horizons.',
      'Developing a CTCAE/PRO-CTCAE adverse-event classification pipeline mapping unstructured clinical notes to NCI toxicity grading.',
      'Reporting directly to the CTO — architecting HIPAA-compliant clinical AI across LangChain, LangGraph, and Kubernetes microservices with MLOps observability.',
    ],
    metrics: ['26M+ events', 'AUROC 0.693', '634 transition cases'],
    tags: ['PyTorch', 'Transformers', 'LangGraph', 'Kubernetes', 'HIPAA'],
  },
  {
    title: 'AI/ML Engineer Intern',
    org: 'Botco.ai',
    location: 'Scottsdale, AZ',
    period: 'Jan – May 2026',
    points: [
      'Reproduced the ARES/ETHOS hospital-mortality inference pipeline on an NVIDIA H100 — 20,000 future patient trajectories via Monte Carlo simulation — achieving AUROC 0.8561, AUPRC 0.2754, Brier 0.0158.',
      'Configured the EHRSHOT clinical ML benchmark with the FEMR pipeline and pretrained CLMBR-T-base weights across 15 few-shot prediction tasks, debugging JAX/CUDA/cuDNN conflicts blocking GPU representation generation.',
      'Engineered a scalable EHR tokenization pipeline normalizing 10,144 fragmented diagnosis codes into ML-ready patient timelines.',
      'Diagnosed 5 root causes of near-random Phase 1 AUC (0.50) — driving Phase 2 architectural fixes that improved AUROC by 19%.',
    ],
    metrics: ['AUROC 0.8561', '20K trajectories', '+19% AUROC'],
    tags: ['H100', 'ETHOS', 'EHRSHOT', 'JAX', 'PyTorch'],
  },
  {
    title: 'Software Engineer Intern',
    org: 'Techavidity Business Solutions',
    location: 'Frisco, TX',
    period: 'Jun – Aug 2025',
    points: [
      'Built an AI-driven health intelligence assistant with RAG pipelines over Neo4j knowledge graphs, ChromaDB, and GPT-based retrieval — enabling multi-hop medical reasoning and scalable semantic search.',
      'Developed an autonomous mobile-testing system with a multi-agent LLM architecture (Planner, Executor, Verifier, Supervisor) and computer vision — 95%+ task-execution accuracy.',
      'Designed an AI-powered IaC security analyzer using CodeBERT and rule-based validation to catch Terraform misconfigurations.',
      'Engineered a cyber threat detection system using LSTM and BERT models to identify C2 patterns in DNS/HTTPS traffic.',
    ],
    metrics: ['95%+ task accuracy', '4-agent architecture'],
    tags: ['RAG', 'Neo4j', 'Multi-agent', 'CodeBERT'],
  },
  {
    title: 'Research Intern',
    org: 'Centre of Electric Mobility, SRMIST',
    location: 'Chennai, India',
    period: 'Feb 2023 – Feb 2024',
    points: [
      'Built Husky, a campus EV transport application supporting 5,000+ students — optimizing ride scheduling and routing across user groups.',
      'Developed a Python routing engine using graph algorithms and priority scheduling to adjust routes dynamically by time, demand, and traffic.',
      'Designed a real-time prioritization model ensuring fair access for differently-abled users.',
    ],
    metrics: ['5,000+ users'],
    tags: ['Python', 'Graph Algorithms', 'Optimization'],
  },
]

const EDUCATION = [
  {
    degree: 'M.S. Data Science (Computing & Decision Analytics)',
    school: 'Arizona State University',
    place: 'Tempe, AZ',
    when: 'Aug 2024 – May 2026',
  },
  {
    degree: 'B.Tech, Computer Science Engineering',
    school: 'SRM Institute of Science & Technology',
    place: 'Chennai, India',
    when: 'Sep 2020 – May 2024',
  },
]

const LEADERSHIP = [
  {
    role: 'Director of Engineering',
    org: 'Engineering International Student Association, ASU',
    when: 'May 2025 – May 2026',
  },
  {
    role: 'Member, Analytics Society',
    org: 'IIM Bangalore',
    when: 'Jan 2023 – Jun 2024',
  },
]

export default function Experience() {
  return (
    <section id="experience" className="section">
      <SectionHeading
        eyebrow="03 · experience"
        title="Training"
        accent="epochs"
        subtitle="From clinical foundation models in production to agentic systems and research — each role a checkpoint."
      />

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-primary-400/50 via-white/10 to-transparent sm:left-[9px]" />
        <div className="space-y-6">
          {ROLES.map((role, i) => (
            <Reveal key={`${role.org}-${role.period}`} delay={i * 60} className="relative pl-8 sm:pl-10">
              <span
                className={`absolute left-0 top-2 grid h-4 w-4 place-items-center rounded-full ring-4 ring-ink-950 ${
                  role.current ? 'bg-primary-400' : 'bg-white/20'
                }`}
              >
                {role.current && (
                  <span className="absolute inline-flex h-4 w-4 animate-ping rounded-full bg-primary-400/60" />
                )}
              </span>

              <div className="card p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-mist-100">
                      {role.title}{' '}
                      <span className="text-primary-300">· {role.org}</span>
                    </h3>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-mist-400">
                      <MapPin size={12} /> {role.location}
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 font-mono text-xs font-medium ${
                      role.current
                        ? 'bg-primary-500/15 text-primary-200 ring-1 ring-primary-400/30'
                        : 'bg-white/5 text-mist-300'
                    }`}
                  >
                    {role.period}
                  </span>
                </div>

                <ul className="mt-4 space-y-2">
                  {role.points.map((p, j) => (
                    <li key={j} className="flex gap-2.5 text-sm leading-relaxed text-mist-300">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400/70" />
                      {p}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap items-center gap-1.5">
                  {role.metrics?.map((m) => (
                    <span key={m} className="metric">
                      {m}
                    </span>
                  ))}
                  {role.tags.map((t) => (
                    <span key={t} className="pill">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Education + Leadership */}
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <Reveal className="card p-6">
          <div className="mb-5 flex items-center gap-2.5 text-primary-300">
            <GraduationCap size={20} />
            <h3 className="font-display text-lg font-semibold text-mist-100">Education</h3>
          </div>
          <div className="space-y-5">
            {EDUCATION.map((e) => (
              <div key={e.school} className="border-l border-white/10 pl-4">
                <div className="font-medium text-mist-100">{e.degree}</div>
                <div className="text-sm text-primary-300">{e.school}</div>
                <div className="mt-0.5 text-xs text-mist-400">
                  {e.place} · {e.when}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={80} className="card p-6">
          <div className="mb-5 flex items-center gap-2.5 text-primary-300">
            <Users size={20} />
            <h3 className="font-display text-lg font-semibold text-mist-100">Leadership</h3>
          </div>
          <div className="space-y-5">
            {LEADERSHIP.map((l) => (
              <div key={l.org} className="border-l border-white/10 pl-4">
                <div className="font-medium text-mist-100">{l.role}</div>
                <div className="text-sm text-primary-300">{l.org}</div>
                <div className="mt-0.5 text-xs text-mist-400">{l.when}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
