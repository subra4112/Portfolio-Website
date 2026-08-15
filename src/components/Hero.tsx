import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import MagneticButton from './MagneticButton'
import EcgLine from './EcgLine'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const SOCIALS = [
  { icon: Github, href: 'https://github.com/subra4112', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/subraraj', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:rvanush3@gmail.com', label: 'Email' },
]

const ROLES = [
  'clinical foundation models',
  'agentic AI systems',
  'production RAG pipelines',
  'LLMs that actually ship',
]

/**
 * What I do, in plain language — written for a recruiter skimming for fit,
 * not a benchmark table.
 */
const SPECIALTIES = [
  {
    color: '#63a8f8',
    label: 'Healthcare Generative AI',
    text: 'Clinical foundation models trained from scratch on real patient records — a first of its kind in assisted living.',
  },
  {
    color: '#f491c0',
    label: 'Clinical NLP & Drug Safety',
    text: 'Adverse-event detection for a Sanofi-funded program, validated on real-world reports and deployed through Sutter Health.',
  },
  {
    color: '#b795f5',
    label: 'Agentic AI & RAG',
    text: 'Multi-agent LLM systems and hybrid graph + vector retrieval built for multi-hop clinical reasoning.',
  },
  {
    color: '#6cc971',
    label: 'Production MLOps',
    text: 'HIPAA-compliant clinical AI on Kubernetes, architected hands-on with the CTO and shipped to real care staff.',
  },
]

function RoleRotator() {
  const reduced = usePrefersReducedMotion()
  const [i, setI] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setI((v) => (v + 1) % ROLES.length), 2800)
    return () => clearInterval(id)
  }, [reduced])

  return (
    <span className="relative inline-block text-left">
      <AnimatePresence mode="wait">
        <motion.span
          key={ROLES[i]}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="accent-serif inline-block text-gradient-accent"
        >
          {ROLES[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/** Portrait in full colour, framed on a soft blue glow. */
function Portrait() {
  return (
    <div className="relative mx-auto w-full max-w-[270px] lg:max-w-[330px]">
      <div
        className="absolute -inset-5 -z-10 rounded-[2rem] blur-3xl"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(58,131,247,0.35), rgba(166,125,242,0.18) 55%, transparent 75%)',
        }}
      />
      <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-ink-800">
        <img
          src="/portrait.jpg"
          alt="Subramanian Raj Narayanan"
          className="block w-full object-cover"
          loading="eager"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/85 via-transparent to-transparent" />

        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-full border border-white/15 bg-ink-900/85 px-3.5 py-2 backdrop-blur">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-mist-200">
            open to work
          </span>
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green" />
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Static backdrop only — nothing animates behind the headline. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-grid-faint [background-size:64px_64px] opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-950/70 to-ink-950" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 items-center px-5 pt-28 sm:px-8 lg:pt-24">
        <div className="grid w-full items-center gap-12 lg:grid-cols-5">
          <div className="max-w-3xl lg:col-span-3">
            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-blue/35 bg-blue-bg/60 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-blue-text">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue" />
              </span>
              clinical AI · live in production @ botco.ai
            </div>

            <h1 className="font-display text-6xl font-bold leading-[0.95] tracking-tightest text-white sm:text-8xl">
              Subramanian
              <br />
              <span className="text-gradient">Raj Narayanan</span>
            </h1>

            <p className="mt-8 max-w-2xl font-display text-2xl leading-snug text-mist-200 sm:text-[1.75rem]">
              I train <RoleRotator />
              <br className="hidden sm:block" /> for high-stakes healthcare.
            </p>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-mist-300">
              AI/ML Engineer at <span className="text-white">Botco.ai</span>, where I
              trained a clinical transformer{' '}
              <span className="text-white">from scratch</span> on real patient records and
              shipped adverse-event detection for a{' '}
              <span className="text-white">Sanofi</span>-funded program — architecting
              production clinical AI hands-on with the CTO. M.S. Data Science @ ASU.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <MagneticButton to="/projects" className="btn-primary">
                View the work
              </MagneticButton>
              <MagneticButton
                href="/resume.pdf"
                external
                className="btn-ghost"
                ariaLabel="Open resume PDF"
              >
                Resume
              </MagneticButton>
              <MagneticButton to="/contact" className="btn-ghost">
                Contact
              </MagneticButton>
            </div>

            <div className="mt-10 flex items-center gap-5">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="text-mist-400 transition-colors duration-300 hover:text-white"
                >
                  <Icon size={21} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <Portrait />
          </div>
        </div>
      </div>

      {/* What I specialize in */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-12 pt-8 sm:px-8">
        <EcgLine className="h-9 w-full" color="#3a83f7" />
        <div className="mt-3 border-t border-white/10 pt-6">
          <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.28em] text-mist-400">
            What I specialize in
          </div>
          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {SPECIALTIES.map((s) => (
              <div key={s.label} className="border-l pl-4" style={{ borderColor: s.color }}>
                <div
                  className="font-display text-[15px] font-semibold"
                  style={{ color: s.color }}
                >
                  {s.label}
                </div>
                <p className="mt-1.5 text-[13px] leading-relaxed text-mist-300">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
