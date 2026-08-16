import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import MagneticButton from './MagneticButton'
import EcgLine from './EcgLine'
import ResumeModal from './ResumeModal'
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

function Portrait() {
  return (
    <div className="relative mx-auto w-full max-w-[280px] lg:max-w-[340px]">
      <div
        className="absolute -inset-5 -z-10 rounded-[2rem] blur-3xl"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(58,131,247,0.35), rgba(166,125,242,0.18) 55%, transparent 75%)',
        }}
      />
      {/* Nothing overlaps the photo. No badge, no scrim across the face. */}
      <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-ink-800">
        <img
          src="/portrait.jpg"
          alt="Subramanian Raj Narayanan"
          width={900}
          height={900}
          className="block w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
      </div>
    </div>
  )
}

export default function Hero() {
  const [resumeOpen, setResumeOpen] = useState(false)

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-grid-faint [background-size:64px_64px] opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-900/70 to-ink-900" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-4 pt-28 sm:px-8 sm:pt-32">
        <div className="grid w-full items-center gap-10 lg:grid-cols-5 lg:gap-14">
          <div className="lg:col-span-3">
            {/* Sized with clamp and set nowrap so "Raj Narayanan" always holds
                one line, at every width, without ever overflowing. */}
            <h1 className="font-display text-[clamp(2.3rem,6vw,4.9rem)] font-extrabold leading-[0.95] tracking-tightest text-white">
              <span className="block whitespace-nowrap">Subramanian</span>
              <span className="text-gradient block whitespace-nowrap">Raj Narayanan</span>
            </h1>

            <p className="mt-8 font-display text-2xl leading-snug text-mist-200 sm:text-3xl">
              I train <RoleRotator />
              <br className="hidden sm:block" /> for high stakes healthcare.
            </p>

            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-mist-300">
              AI/ML Engineer at <span className="text-white">Botco.ai</span>, where I
              trained a clinical transformer{' '}
              <span className="text-white">from scratch</span> on real patient records and
              shipped adverse event detection on the{' '}
              <span className="text-white">Sanofi</span> project. I work directly with the
              CTO on systems that reach real clinicians. M.S. Data Science at ASU.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <MagneticButton to="/projects" className="btn-primary">
                View the work
              </MagneticButton>
              <MagneticButton
                onClick={() => setResumeOpen(true)}
                className="btn-ghost"
                ariaLabel="Open resume"
              >
                Resume
              </MagneticButton>
              <MagneticButton to="/contact" className="btn-ghost">
                Contact
              </MagneticButton>
            </div>

            <div className="mt-9 flex items-center gap-5">
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

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-6 pt-10 sm:px-8">
        <EcgLine className="h-9 w-full" color="#3a83f7" />
      </div>

      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  )
}
