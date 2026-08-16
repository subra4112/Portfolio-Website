import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

/* Three matched renders of the same avatar, differing only in the arm:
   0 arm down, 1 hand raised, 2 hand tilted. Played as cels, the way a hand
   drawn wave works, so the character waves instead of the picture rotating. */
const FRAMES = ['/wave-0.jpg', '/wave-1.jpg', '/wave-2.jpg']

/* frame index, and how long to hold it. He raises the hand, waves four
   times, then rests. */
const CELS: [number, number][] = [
  [0, 340], // standing, arm down
  [1, 200], // hand comes up
  [2, 190], // wave out
  [1, 190], // back
  [2, 190], // out
  [1, 190], // back
  [2, 190], // out
  [1, 420], // hold, hand up
]

const GREET_AT = 520
const SUB_AT = 1050
const EXIT_AT = 2350
const DONE_AT = 3050

/**
 * The opening welcome. The avatar was generated from Subbu's own photo, and
 * the wave is real frame animation rather than a transform on one image.
 */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const reduced = usePrefersReducedMotion()
  const [cel, setCel] = useState(0)
  const [stage, setStage] = useState(0)
  const [leaving, setLeaving] = useState(false)

  // Step through the wave cels.
  useEffect(() => {
    if (reduced) return
    let i = 0
    let timer: ReturnType<typeof setTimeout>
    const step = () => {
      timer = setTimeout(() => {
        i = i + 1 < CELS.length ? i + 1 : CELS.length - 1
        setCel(i)
        if (i < CELS.length - 1) step()
      }, CELS[i][1])
    }
    step()
    return () => clearTimeout(timer)
  }, [reduced])

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

  const frame = FRAMES[CELS[cel][0]]

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

      {/* Preload every cel so the wave never stutters on first play. */}
      <div className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
        {FRAMES.map((f) => (
          <img key={f} src={f} alt="" />
        ))}
      </div>

      <div className="relative grid h-full place-items-center px-6">
        <div className="flex flex-col items-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.86, y: 18 }}
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
            {/* Fixed box, frames swapped inside it. Nothing rotates. */}
            <div className="relative h-44 w-44 overflow-hidden rounded-full ring-2 ring-white/20 sm:h-56 sm:w-56">
              {FRAMES.map((f) => (
                <img
                  key={f}
                  src={f}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ opacity: f === frame ? 1 : 0 }}
                />
              ))}
            </div>
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
