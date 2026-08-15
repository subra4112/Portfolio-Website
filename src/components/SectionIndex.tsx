import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Reveal from './Reveal'
import { ROUTE_THEMES } from '../lib/routeTheme'

const ENTRIES = [
  {
    no: '01',
    to: '/about',
    desc: 'Read the model card — who I am, framed the way an ML engineer would ship it.',
    hint: 'model card · clusters',
  },
  {
    no: '02',
    to: '/projects',
    desc: 'Generative clinical AI, Sanofi adverse-event detection, an ETHOS reproduction on H100s.',
    hint: '7 systems · metrics',
  },
  {
    no: '03',
    to: '/experience',
    desc: 'Training epochs — Botco.ai clinical AI in production, research, and earlier checkpoints.',
    hint: 'botco.ai · timeline',
  },
  {
    no: '04',
    to: '/skills',
    desc: 'The full stack, straight from the terminal — models, retrieval, infra, data.',
    hint: '7 stacks · 60+ tools',
  },
  {
    no: '05',
    to: '/contact',
    desc: 'Open a session — full-time roles, collaborations, or a conversation about clinical AI.',
    hint: 'email · form',
  },
]

/**
 * The home-page directory. Each row is tinted with its destination's theme
 * colour, so the colour you see here is the colour the transition plays in.
 */
export default function SectionIndex() {
  return (
    <section className="section !pt-8">
      <Reveal>
        <div className="mb-8 flex items-center gap-3">
          <span className="h-px w-8 bg-blue/70" />
          <span className="eyebrow text-blue-text">[ 00 · index ]</span>
        </div>
      </Reveal>

      <div className="grid gap-3">
        {ENTRIES.map((e, i) => {
          const theme = ROUTE_THEMES[e.to]
          return (
            <Reveal key={e.to} delay={i * 60}>
              <Link
                to={e.to}
                className="group relative flex items-center gap-5 overflow-hidden rounded-2xl border border-white/12 bg-ink-750 px-5 py-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 sm:px-7"
              >
                {/* Colour wash on hover */}
                <span
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(90deg, ${theme.bg} 0%, transparent 60%)`,
                  }}
                />
                {/* Left colour rail */}
                <span
                  className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100"
                  style={{ backgroundColor: theme.color }}
                />

                <span
                  className="relative hidden font-mono text-xs transition-colors sm:block"
                  style={{ color: theme.text }}
                >
                  /{e.no}
                </span>

                <div className="relative min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
                      {theme.label}
                    </h3>
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-mist-400">
                      {e.hint}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-mist-300">{e.desc}</p>
                </div>

                <span
                  className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-300"
                  style={{
                    borderColor: `${theme.color}55`,
                    color: theme.text,
                  }}
                >
                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
