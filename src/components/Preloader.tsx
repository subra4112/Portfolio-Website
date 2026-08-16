import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

/* The wave is driven entirely by CSS in index.css:
     .wave-intro  arm down frame, fades away once
     .wave-hand   tilted hand frame, masked to the hand and forearm only,
                  oscillating against the static base
   Only the hand region blends. The face, jacket and background come from one
   frame and never move, which is what stops the whole picture shimmering.
   Ends at 2500ms. */
const GREET_AT = 620
const SUB_AT = 1120
const EXIT_AT = 2620
const DONE_AT = 3320

/** The opening welcome, using the avatar generated from Subbu's own photo. */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const reduced = usePrefersReducedMotion()
  const [stage, setStage] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (reduced) {
      const t = setTimeout(onDone, 300)
      return () => clearTimeout(t)
    }
    const timers = [
      setTimeout(() => setStage(1), GREET_AT),
      setTimeout(() => setStage(2), SUB_AT),
      setTimeout(() => setLeaving(true), EXIT_AT),
      setTimeout(onDone, DONE_AT),
    ]
    return () => timers.forEach(clearTimeout)
  }, [onDone, reduced])

  if (reduced) {
    return <div className="fixed inset-0 z-[200] bg-ink-900" aria-hidden />
  }

  return (
    <motion.div
      className="fixed inset-0 z-[200] overflow-hidden bg-ink-900"
      initial={{ y: 0 }}
      animate={{ y: leaving ? '-100%' : 0 }}
      transition={{ duration: 0.7, ease: [0.83, 0, 0.17, 1] }}
      aria-hidden
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(40rem 30rem at 50% 40%, rgba(58,131,247,0.2), transparent 70%), radial-gradient(30rem 24rem at 50% 92%, rgba(166,125,242,0.12), transparent 70%)',
        }}
      />
      <div className="absolute inset-0 bg-grid-faint [background-size:64px_64px] opacity-25" />

      <div className="relative grid h-full place-items-center px-6">
        <div className="flex flex-col items-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.88, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="absolute -inset-6 rounded-full blur-2xl"
              style={{
                background:
                  'radial-gradient(circle, rgba(58,131,247,0.45), transparent 68%)',
              }}
            />
            <motion.div
              className="relative h-44 w-44 overflow-hidden rounded-full ring-2 ring-white/20 sm:h-56 sm:w-56"
              animate={{ y: [0, -2.5, 0, -2, 0, -1.5, 0] }}
              transition={{
                duration: 2.5,
                ease: 'easeInOut',
                times: [0, 0.18, 0.34, 0.5, 0.66, 0.82, 1],
              }}
            >
              {/* Static body. Never animates, so nothing shimmers. */}
              <img
                src="/wave-1.jpg"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* Only the hand and forearm blend, continuously. */}
              <img
                src="/wave-2.jpg"
                alt=""
                className="wave-hand absolute inset-0 h-full w-full object-cover"
              />
              {/* Arm down, lifts once at the start. */}
              <img
                src="/wave-0.jpg"
                alt=""
                className="wave-intro absolute inset-0 h-full w-full object-cover"
              />
            </motion.div>
          </motion.div>

          <div className="mt-9 overflow-hidden">
            <motion.h1
              className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
              initial={{ y: '110%' }}
              animate={{ y: stage >= 1 ? '0%' : '110%' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              Hey, I am Subbu
            </motion.h1>
          </div>

          <motion.p
            className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-blue-text"
            initial={{ opacity: 0, y: 8 }}
            animate={stage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.4 }}
          >
            AI and ML Engineer
          </motion.p>

          <div className="mt-8 h-px w-44 overflow-hidden bg-white/15">
            <motion.div
              className="h-full bg-blue"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: EXIT_AT / 1000, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
