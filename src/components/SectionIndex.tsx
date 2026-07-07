import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Reveal from './Reveal'

const ENTRIES = [
  {
    no: '01',
    to: '/about',
    title: 'About',
    desc: 'Read the model card — who I am, framed the way an ML engineer would ship it.',
    hint: 'model card · clusters',
  },
  {
    no: '02',
    to: '/projects',
    title: 'Projects',
    desc: 'Generative clinical AI, an ETHOS reproduction on H100s, agentic systems, and more.',
    hint: '6 systems · metrics',
  },
  {
    no: '03',
    to: '/experience',
    title: 'Experience',
    desc: 'Training epochs — Botco.ai clinical AI in production, research, and earlier checkpoints.',
    hint: 'botco.ai · timeline',
  },
  {
    no: '04',
    to: '/skills',
    title: 'Skills',
    desc: 'The full stack, listed straight from the terminal — models, retrieval, infra, data.',
    hint: '7 stacks · 60+ tools',
  },
  {
    no: '05',
    to: '/contact',
    title: 'Contact',
    desc: 'Open a session — full-time roles, collaborations, or a conversation about clinical AI.',
    hint: 'email · form',
  },
]

/**
 * The home-page directory: every section of the site is its own page, indexed
 * here like console routes (and like search-result sitelinks).
 */
export default function SectionIndex() {
  return (
    <section className="section !pt-8">
      <Reveal>
        <div className="mb-8 flex items-center gap-3">
          <span className="h-px w-8 bg-primary-400/60" />
          <span className="eyebrow">[ 00 · index ]</span>
        </div>
      </Reveal>

      <div className="overflow-hidden rounded-2xl border border-white/8">
        {ENTRIES.map((e, i) => (
          <Reveal key={e.to} delay={i * 60}>
            <Link
              to={e.to}
              className={`group flex items-center gap-5 bg-white/[0.015] px-5 py-6 transition-colors duration-300 hover:bg-primary-500/[0.06] sm:px-8 ${
                i > 0 ? 'border-t border-white/5' : ''
              }`}
            >
              <span className="hidden font-mono text-xs text-mist-400 transition-colors group-hover:text-primary-400 sm:block">
                /{e.no}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-display text-xl font-semibold text-mist-100 transition-colors group-hover:text-primary-200 sm:text-2xl">
                    {e.title}
                  </h3>
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-mist-400">
                    {e.hint}
                  </span>
                </div>
                <p className="mt-1 truncate text-sm text-mist-300 sm:whitespace-normal">
                  {e.desc}
                </p>
              </div>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-mist-300 transition-all duration-300 group-hover:border-primary-400/50 group-hover:text-primary-300 group-hover:shadow-glow">
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
