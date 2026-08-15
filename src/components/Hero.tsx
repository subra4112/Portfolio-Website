import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import MagneticButton from './MagneticButton'
import EcgLine from './EcgLine'
import Counter from './Counter'
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

/** Headline numbers, all from shipped work. */
const VITALS = [
  { value: 26, suffix: 'M+', label: 'clinical events trained on' },
  { value: 0.856, decimals: 3, suffix: '', label: 'AUROC · mortality inference' },
  { value: 0.759, decimals: 3, suffix: '', label: 'macro F1 · adverse events' },
  { value: 91.7, decimals: 1, suffix: '%', label: 'VAERS labeling accuracy' },
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
          className="accent-serif inline-block"
        >
          {ROLES[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/** Portrait framed like a record card — desaturated to match the theme. */
function Portrait() {
  return (
    <div className="relative mx-auto w-full max-w-[260px] lg:max-w-[320px]">
      <div className="relative overflow-hidden rounded-2xl border border-white/15">
        <img
          src="/portrait.jpg"
          alt="Subramanian Raj Narayanan"
          className="block w-full object-cover grayscale contrast-[1.05]"
          loading="eager"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />

        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-lg border border-white/10 bg-ink-950/85 px-3 py-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist-300">
            subject: subraraj
          </span>
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
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
            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-mist-200">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
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
              AI/ML Engineer at <span className="text-white">Botco.ai</span> — I trained a
              GPT-2-style transformer <span className="text-white">from scratch</span> on
              26M+ real clinical events, and built adverse-event detection for a{' '}
              <span className="text-white">Sanofi</span>-funded program deployed through
              Sutter Health. M.S. Data Science @ ASU.
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

      {/* Vitals strip */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-10 pt-8 sm:px-8">
        <EcgLine className="h-9 w-full" color="#ffffff" />
        <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/10 pt-5 sm:grid-cols-4">
          {VITALS.map((v) => (
            <div key={v.label}>
              <div className="font-mono text-2xl font-medium text-white sm:text-3xl">
                <Counter
                  value={v.value}
                  suffix={v.suffix}
                  decimals={v.decimals ?? 0}
                />
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-mist-400">
                {v.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
