import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import HeroBackground from './HeroBackground'
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

/** Live "vitals" — the readouts a monitor would show for this engineer. */
const VITALS = [
  { value: 26, suffix: 'M+', label: 'clinical events trained on' },
  { value: 4733, suffix: '', label: 'residents modeled' },
  { value: 0.856, suffix: '', decimals: 3, label: 'AUROC · mortality inference' },
  { value: 20, suffix: 'K', label: 'patient trajectories simulated' },
]

function RoleRotator() {
  const reduced = usePrefersReducedMotion()
  const [i, setI] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setI((v) => (v + 1) % ROLES.length), 2600)
    return () => clearInterval(id)
  }, [reduced])

  return (
    <span className="relative inline-block text-left">
      <AnimatePresence mode="wait">
        <motion.span
          key={ROLES[i]}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="accent-serif inline-block text-gradient-accent"
        >
          {ROLES[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/** The portrait, framed like a monitor readout: scanlines, corner ticks, tag. */
function Portrait() {
  return (
    <div className="relative mx-auto w-full max-w-[280px] lg:max-w-[340px]">
      {/* Ambient glow behind the frame */}
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-primary-500/10 blur-3xl" />

      <div className="relative overflow-hidden rounded-3xl border border-primary-400/25 shadow-glow-lg">
        <img
          src="/portrait.jpg"
          alt="Subramanian Raj Narayanan"
          className="block w-full object-cover"
          loading="eager"
        />
        {/* Scanline + tint overlays for the monitor feel */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              'repeating-linear-gradient(0deg, rgba(4,8,7,0.14) 0px, rgba(4,8,7,0.14) 1px, transparent 1px, transparent 4px)',
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />

        {/* Corner ticks */}
        {['top-3 left-3 border-t border-l', 'top-3 right-3 border-t border-r', 'bottom-3 left-3 border-b border-l', 'bottom-3 right-3 border-b border-r'].map(
          (pos) => (
            <span
              key={pos}
              className={`pointer-events-none absolute h-4 w-4 border-primary-400/70 ${pos}`}
            />
          )
        )}

        {/* Subject tag */}
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-lg bg-ink-950/70 px-3 py-2 backdrop-blur">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary-300">
            subject: subraraj
          </span>
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-400" />
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
      {/* 3D / fallback background */}
      <HeroBackground />

      {/* Vignette so text stays legible over the canvas */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950/40 via-transparent to-ink-950" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-950/70 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 items-center px-5 pt-28 sm:px-8 lg:pt-24">
        <div className="grid w-full items-center gap-10 lg:grid-cols-5">
          {/* Copy */}
          <div className="max-w-3xl lg:col-span-3">
            {/* Status chip — reads like a system monitor */}
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-primary-400/20 bg-primary-500/5 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-primary-200 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-400" />
              </span>
              clinical AI · live in production @ botco.ai
            </div>

            <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-tightest text-mist-100 sm:text-7xl">
              Subramanian
              <br />
              <span className="text-gradient">Raj Narayanan</span>
            </h1>

            <p className="mt-7 max-w-2xl font-display text-2xl leading-snug text-mist-200 sm:text-3xl">
              I train <RoleRotator />
              <br className="hidden sm:block" /> for high-stakes healthcare.
            </p>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-mist-300 sm:text-lg">
              AI/ML Engineer at <span className="text-mist-100">Botco.ai</span>, where I built a
              GPT-2-style transformer <span className="text-primary-300">from scratch</span> on
              26M+ real clinical events — a first-of-its-kind generative clinical AI. From
              pretraining to HIPAA-compliant deployment. M.S. Data Science @ ASU.
            </p>

            {/* CTAs */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
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

            {/* Socials */}
            <div className="mt-10 flex items-center gap-5">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="text-mist-400 transition-colors duration-300 hover:text-primary-300"
                >
                  <Icon size={22} />
                </a>
              ))}
            </div>
          </div>

          {/* Portrait */}
          <div className="lg:col-span-2">
            <Portrait />
          </div>
        </div>
      </div>

      {/* Vitals strip — ECG trace + live counters */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-10 pt-8 sm:px-8">
        <EcgLine className="h-10 w-full" />
        <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/5 pt-5 sm:grid-cols-4">
          {VITALS.map((v) => (
            <div key={v.label}>
              <div className="font-mono text-2xl font-medium text-primary-300 sm:text-3xl">
                <Counter
                  value={v.value}
                  suffix={v.suffix}
                  decimals={v.decimals ?? 0}
                />
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-mist-400">
                {v.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
