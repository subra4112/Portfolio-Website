import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const GREETING = 'Hey, I am Subbu'

/* The avatar swings in and waves, the greeting types itself, then the
   curtain lifts. Timer driven end to end so it can never strand. */
const AVATAR_AT = 120
const GREET_AT = 620
const SUB_AT = 1180
const EXIT_AT = 2050
const DONE_AT = 2750

/**
 * The opening welcome. Uses the animated avatar generated from Subbu's own
 * photo, waving the visitor in.
 */
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
      setTimeout(() => setStage(1), AVATAR_AT),
      setTimeout(() => setStage(2), GREET_AT),
      setTimeout(() => setStage(3), SUB_AT),
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
      {/* Warm wash behind the avatar */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(40rem 30rem at 50% 38%, rgba(58,131,247,0.22), transparent 70%), radial-gradient(30rem 24rem at 50% 90%, rgba(166,125,242,0.14), transparent 70%)',
        }}
      />
      <div className="absolute inset-0 bg-grid-faint [background-size:64px_64px] opacity-25" />

      <div className="relative grid h-full place-items-center px-6">
        <div className="flex flex-col items-center">
          {/* Avatar, swinging in with a wave */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.5, y: 40, rotate: -12 }}
            animate={
              stage >= 1
                ? { opacity: 1, scale: 1, y: 0, rotate: 0 }
                : { opacity: 0, scale: 0.5, y: 40, rotate: -12 }
            }
            transition={{ type: 'spring', stiffness: 170, damping: 14 }}
          >
            <span
              className="absolute -inset-6 rounded-full blur-2xl"
              style={{
                background:
                  'radial-gradient(circle, rgba(58,131,247,0.5), transparent 68%)',
              }}
            />
            <motion.img
              src="/avatar-wave.jpg"
              alt=""
              className="preload-avatar relative h-40 w-40 rounded-full object-cover ring-2 ring-white/20 sm:h-52 sm:w-52"
              animate={stage >= 1 ? { rotate: [0, 4, -3, 3, 0] } : {}}
              transition={{ duration: 1.5, delay: 0.25, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* Greeting */}
          <div className="mt-9 overflow-hidden">
            <motion.h1
              className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
              initial={{ y: '110%' }}
              animate={{ y: stage >= 2 ? '0%' : '110%' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              {GREETING}
            </motion.h1>
          </div>

          <motion.p
            className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-blue-text"
            initial={{ opacity: 0, y: 8 }}
            animate={stage >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.4 }}
          >
            AI and ML Engineer
          </motion.p>

          {/* Progress rail */}
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
