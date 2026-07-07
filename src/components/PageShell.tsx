import { type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from './Reveal'

interface PageShellProps {
  children: ReactNode
  /** The page that follows this one — rendered as an "up next" teaser. */
  next?: { to: string; label: string }
}

/** Shared wrapper for every routed page: entrance motion + "up next" link. */
export default function PageShell({ children, next }: PageShellProps) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="pt-16"
    >
      {children}

      {next && (
        <div className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
          <Reveal>
            <Link
              to={next.to}
              className="group flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.015] px-6 py-6 transition-colors duration-300 hover:border-primary-400/30 hover:bg-primary-500/[0.05] sm:px-8"
            >
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-mist-400">
                  up next
                </div>
                <div className="mt-1 font-display text-2xl font-semibold text-mist-100 transition-colors group-hover:text-primary-200">
                  {next.label}
                </div>
              </div>
              <ArrowRight
                size={22}
                className="text-mist-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary-300"
              />
            </Link>
          </Reveal>
        </div>
      )}
    </motion.div>
  )
}
