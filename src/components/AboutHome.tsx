import { GraduationCap, Briefcase } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const SPECIALTIES = [
  {
    color: '#63a8f8',
    label: 'Healthcare Generative AI',
    text: 'Clinical foundation models trained from scratch on real patient records.',
  },
  {
    color: '#f491c0',
    label: 'Clinical NLP and Drug Safety',
    text: 'Adverse event detection on the Sanofi project, headed for Sutter Health.',
  },
  {
    color: '#b795f5',
    label: 'Agentic AI and RAG',
    text: 'Multi agent LLM systems and hybrid graph plus vector retrieval.',
  },
  {
    color: '#6cc971',
    label: 'Production MLOps',
    text: 'HIPAA compliant clinical AI on Kubernetes, architected with the CTO.',
  },
]

const EDUCATION = [
  {
    degree: 'M.S. Data Science',
    school: 'Arizona State University',
    when: '2024 to 2026',
  },
  {
    degree: 'B.Tech Computer Science Engineering',
    school: 'SRM Institute of Science and Technology',
    when: '2020 to 2024',
  },
]

const WORK = [
  {
    role: 'AI/ML Engineer',
    org: 'Botco.ai',
    when: '2026 to now',
    current: true,
  },
  { role: 'AI/ML Engineer Intern', org: 'Botco.ai', when: '2026' },
  { role: 'Software Engineer Intern', org: 'Techavidity', when: '2025' },
  { role: 'Research Intern', org: 'Centre of Electric Mobility, SRMIST', when: '2023 to 2024' },
]

/**
 * The home page About block. Education and work sit side by side as a compact
 * record, with the specialization grid underneath.
 */
export default function AboutHome() {
  return (
    <section id="about" className="section pt-4 sm:pt-6">
      <SectionHeading
        color="#63a8f8"
        title="About"
        accent="me"
        subtitle="I build production AI that ships into regulated, high stakes healthcare, where the model, the evaluation and the deployment all have to hold up."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Education */}
        <Reveal className="card p-6 sm:p-7">
          <div className="mb-6 flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-blue-bg text-blue-text">
              <GraduationCap size={18} />
            </span>
            <h3 className="font-display text-xl font-bold text-white">Education</h3>
          </div>
          <div className="space-y-5">
            {EDUCATION.map((e) => (
              <div key={e.school} className="border-l-2 border-blue/50 pl-4">
                <div className="font-display text-lg font-bold leading-snug text-white">
                  {e.degree}
                </div>
                <div className="mt-0.5 text-[15px] text-blue-text">{e.school}</div>
                <div className="mt-1 font-mono text-xs text-mist-400">{e.when}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Work */}
        <Reveal delay={80} className="card p-6 sm:p-7">
          <div className="mb-6 flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-orange-bg text-orange-text">
              <Briefcase size={18} />
            </span>
            <h3 className="font-display text-xl font-bold text-white">Work</h3>
          </div>
          <div className="space-y-4">
            {WORK.map((w) => (
              <div
                key={`${w.org}-${w.when}`}
                className="flex items-baseline justify-between gap-4 border-l-2 border-orange/50 pl-4"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-display text-[17px] font-bold leading-snug text-white">
                      {w.role}
                    </span>
                    {w.current && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-bg px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-orange-on">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-70" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange" />
                        </span>
                        now
                      </span>
                    )}
                  </div>
                  <div className="text-[15px] text-orange-text">{w.org}</div>
                </div>
                <span className="shrink-0 font-mono text-xs text-mist-400">{w.when}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Specializations */}
      <Reveal delay={140} className="mt-10">
        <h3 className="mb-6 font-display text-2xl font-bold text-white sm:text-3xl">
          What I specialize in
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SPECIALTIES.map((s) => (
            <div
              key={s.label}
              className="group relative overflow-hidden rounded-2xl border border-white/12 bg-ink-750 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/25"
            >
              <span
                className="absolute inset-x-0 top-0 h-[3px]"
                style={{ backgroundColor: s.color }}
              />
              <span
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(18rem circle at 50% 0%, ${s.color}22, transparent 70%)`,
                }}
              />
              <div
                className="relative font-display text-lg font-bold leading-tight"
                style={{ color: s.color }}
              >
                {s.label}
              </div>
              <p className="relative mt-2 text-[15px] leading-relaxed text-mist-300">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
