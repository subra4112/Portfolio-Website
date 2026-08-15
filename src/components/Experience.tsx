import { GraduationCap, Users, MapPin, ExternalLink } from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

interface Role {
  title: string
  org: string
  /** Company site, shown as a link on the org name. */
  orgUrl?: string
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
    orgUrl: 'https://botco.ai',
    location: 'Scottsdale, Arizona',
    period: 'Jun 2026 to Present',
    current: true,
    points: [
      'Fine tuned a RoBERTa transformer into a five class adverse event classifier for Sanofi’s Beyfortus program, landing on macro F1 0.7594 as the best of six training rounds and validating on 36 of 40 real trigger phrases before deployment through Sutter Health.',
      'Solved a raw unlabeled VAERS dataset problem with a dual verification pipeline combining keyword rules and model agreement, reaching 91.7% labeling accuracy.',
      'Trained a GPT2 style autoregressive transformer from scratch on millions of clinical events, building a first of its kind generative clinical AI system.',
      'Leading Phase 3 care transition prediction and building a CTCAE adverse event pipeline that maps clinical notes to NCI toxicity grading.',
      'Report directly to the CTO, working hands on with client stakeholders across LangChain, LangGraph and Kubernetes microservices, delivering HIPAA compliant solutions with full MLOps observability.',
    ],
    metrics: ['macro F1 0.759', '91.7% labeling accuracy', 'Phase 3 lead'],
    tags: ['PyTorch', 'RoBERTa', 'LangGraph', 'Kubernetes', 'HIPAA'],
  },
  {
    title: 'AI/ML Engineer Intern',
    org: 'Botco.ai',
    orgUrl: 'https://botco.ai',
    location: 'Scottsdale, Arizona',
    period: 'Jan 2026 to May 2026',
    points: [
      'Reproduced the ARES and ETHOS hospital mortality inference pipeline on an NVIDIA H100, generating twenty thousand patient trajectories by Monte Carlo simulation and reaching AUROC 0.8561.',
      'Configured the EHRSHOT clinical benchmark with pretrained CLMBR weights across fifteen few shot tasks, clearing JAX, CUDA and cuDNN conflicts that blocked GPU representation generation.',
      'Engineered an EHR tokenization pipeline that normalized ten thousand fragmented diagnosis codes into machine readable patient timelines.',
      'Diagnosed five root causes behind near random early performance, driving the architectural fixes that improved AUROC by 19%.',
    ],
    metrics: ['AUROC 0.8561', '20K trajectories', '+19% AUROC'],
    tags: ['H100', 'ETHOS', 'EHRSHOT', 'JAX', 'PyTorch'],
  },
  {
    title: 'Software Engineer Intern',
    org: 'Techavidity Business Solutions',
    location: 'Frisco, Texas',
    period: 'Jun 2025 to Aug 2025',
    points: [
      'Built an AI driven health intelligence assistant with RAG pipelines over Neo4j knowledge graphs and ChromaDB, enabling multi hop medical reasoning.',
      'Developed an autonomous mobile testing system using Planner, Executor, Verifier and Supervisor agents with computer vision, reaching over 95% task execution accuracy.',
      'Designed an AI powered infrastructure security analyzer using CodeBERT to catch Terraform misconfigurations.',
      'Engineered a cyber threat detection system using LSTM and BERT to identify command and control patterns in network traffic.',
    ],
    metrics: ['95%+ task accuracy', '4 agent roles'],
    tags: ['RAG', 'Neo4j', 'CodeBERT', 'LSTM'],
  },
  {
    title: 'Research Intern',
    org: 'Centre of Electric Mobility, SRMIST',
    location: 'Chennai, India',
    period: 'Feb 2023 to Feb 2024',
    points: [
      'Built Husky, a campus electric vehicle transport app serving over five thousand students, optimizing ride scheduling and routing.',
      'Developed a Python routing engine using graph algorithms and priority scheduling that adapts to time, demand and traffic.',
      'Designed a real time prioritization model ensuring fair access for differently abled users.',
    ],
    metrics: ['5,000+ users'],
    tags: ['Python', 'Graph Algorithms', 'Optimization'],
  },
]

const EDUCATION = [
  {
    degree: 'M.S. Data Science',
    school: 'Arizona State University',
    place: 'Tempe, Arizona',
    when: 'Aug 2024 to May 2026',
  },
  {
    degree: 'B.Tech Computer Science Engineering',
    school: 'SRM Institute of Science and Technology',
    place: 'Chennai, India',
    when: 'Sep 2020 to May 2024',
  },
]

const LEADERSHIP = [
  {
    role: 'Director of Engineering',
    org: 'Engineering International Student Association, ASU',
    when: 'May 2025 to May 2026',
  },
  {
    role: 'Member, Analytics Society',
    org: 'IIM Bangalore',
    when: 'Jan 2023 to Jun 2024',
  },
]

export default function Experience() {
  return (
    <section id="experience" className="section">
      <SectionHeading
        color="#f1a275"
        title="Where I have"
        accent="built"
        subtitle="Clinical foundation models in production, frontier research, and the teams around them."
      />

      <div className="relative">
        <div className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-orange/60 via-white/10 to-transparent sm:left-[9px]" />
        <div className="space-y-6">
          {ROLES.map((role, i) => (
            <Reveal
              key={`${role.org}-${role.period}`}
              delay={i * 60}
              className="relative pl-8 sm:pl-10"
            >
              <span
                className={`absolute left-0 top-2 grid h-4 w-4 place-items-center rounded-full ring-4 ring-ink-900 ${
                  role.current ? 'bg-orange' : 'bg-white/25'
                }`}
              >
                {role.current && (
                  <span className="absolute inline-flex h-4 w-4 animate-ping rounded-full bg-orange/60" />
                )}
              </span>

              <div className="card p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                  <div className="min-w-0">
                    <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                      {role.title}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                      {role.orgUrl ? (
                        <a
                          href={role.orgUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[15px] font-medium text-orange-text underline decoration-orange/40 underline-offset-4 transition-colors hover:text-orange hover:decoration-orange"
                        >
                          {role.org}
                          <ExternalLink size={13} />
                        </a>
                      ) : (
                        <span className="text-[15px] font-medium text-orange-text">
                          {role.org}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5 text-xs text-mist-400">
                        <MapPin size={12} /> {role.location}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 font-mono text-xs ${
                      role.current
                        ? 'bg-orange-bg text-orange-on ring-1 ring-orange/40'
                        : 'bg-white/[0.06] text-mist-300'
                    }`}
                  >
                    {role.period}
                  </span>
                </div>

                <ul className="mt-4 space-y-2.5">
                  {role.points.map((p, j) => (
                    <li
                      key={j}
                      className="flex gap-3 text-[15px] leading-relaxed text-mist-300"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange/70" />
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

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <Reveal className="card p-6">
          <div className="mb-5 flex items-center gap-2.5 text-orange-text">
            <GraduationCap size={20} />
            <h3 className="font-display text-xl font-bold text-white">Education</h3>
          </div>
          <div className="space-y-5">
            {EDUCATION.map((e) => (
              <div key={e.school} className="border-l border-white/15 pl-4">
                <div className="font-medium text-white">{e.degree}</div>
                <div className="text-sm text-orange-text">{e.school}</div>
                <div className="mt-0.5 text-xs text-mist-400">
                  {e.place} · {e.when}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={80} className="card p-6">
          <div className="mb-5 flex items-center gap-2.5 text-orange-text">
            <Users size={20} />
            <h3 className="font-display text-xl font-bold text-white">Leadership</h3>
          </div>
          <div className="space-y-5">
            {LEADERSHIP.map((l) => (
              <div key={l.org} className="border-l border-white/15 pl-4">
                <div className="font-medium text-white">{l.role}</div>
                <div className="text-sm text-orange-text">{l.org}</div>
                <div className="mt-0.5 text-xs text-mist-400">{l.when}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
