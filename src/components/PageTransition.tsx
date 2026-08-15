import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { themeForRoute } from '../lib/routeTheme'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useDeviceCapability } from '../hooks/useDeviceCapability'

const TransitionCanvas = lazy(() => import('../three/TransitionCanvas'))

/* Timing: cover in → swap the page behind it → hold on the 3D → cover out. */
const COVER_IN = 340
const SWAP_AT = 380
const HOLD_UNTIL = 1020
const TOTAL = 1360

export interface PageTransitionResult {
  /** The location the router should actually render (lags during a transition). */
  displayLocation: ReturnType<typeof useLocation>
  overlay: React.ReactNode
}

/**
 * Drives the 3D loader that plays between sections. On navigation it covers the
 * screen, swaps the routed page underneath while hidden, runs the particle
 * field morphing into the destination's shape and colour, then lifts away.
 */
export function usePageTransition(): PageTransitionResult {
  const location = useLocation()
  const reduced = usePrefersReducedMotion()
  const { isMobile } = useDeviceCapability()

  const [displayLocation, setDisplayLocation] = useState(location)
  const [running, setRunning] = useState(false)
  const [phase, setPhase] = useState<'in' | 'out'>('in')
  // Kept mounted after the first transition so the WebGL context is reused.
  const [mounted, setMounted] = useState(false)

  const theme = themeForRoute(location.pathname)

  /* Held in a ref, not in the effect's deps: swapping the page mid-transition
     must not re-run the effect, because its cleanup would cancel the timers
     that lift the curtain and unmount it. */
  const shownPath = useRef(displayLocation.pathname)
  useEffect(() => {
    shownPath.current = displayLocation.pathname
  }, [displayLocation])

  useEffect(() => {
    // On mount the two agree, so this only ever runs for real navigations.
    if (location.pathname === shownPath.current) return

    if (reduced) {
      setDisplayLocation(location)
      return
    }

    setMounted(true)
    setPhase('in')
    setRunning(true)
    const swap = setTimeout(() => setDisplayLocation(location), SWAP_AT)
    const lift = setTimeout(() => setPhase('out'), HOLD_UNTIL)
    // Unmounting is driven by this timer, never by an animation completing —
    // rAF is throttled in background tabs and would otherwise strand the
    // curtain on screen forever.
    const done = setTimeout(() => setRunning(false), TOTAL)
    return () => {
      clearTimeout(swap)
      clearTimeout(lift)
      clearTimeout(done)
    }
  }, [location, reduced])

  const overlay = (
    <>
      {running && (
        <motion.div
          key="page-transition"
          className="fixed inset-0 z-[150] grid place-items-center overflow-hidden bg-ink-900"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{
            clipPath:
              phase === 'out' ? 'inset(100% 0 0 0)' : 'inset(0 0 0% 0)',
          }}
          transition={{
            duration: COVER_IN / 1000,
            ease: [0.76, 0, 0.24, 1],
          }}
          aria-hidden
        >
          {/* Colour wash keyed to the destination */}
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background: `radial-gradient(45rem 32rem at 50% 45%, ${theme.bg}, transparent 70%)`,
            }}
          />

          {/* The 3D field, boxed in the middle of the curtain */}
          <div className="relative h-[46vh] max-h-[420px] w-full max-w-[560px]">
            {mounted && (
              <Suspense fallback={null}>
                <TransitionCanvas
                  shape={theme.shape}
                  color={theme.color}
                  count={isMobile ? 2400 : 6000}
                  active={running}
                />
              </Suspense>
            )}
          </div>

          {/* Destination label */}
          <div className="absolute inset-x-0 bottom-[18%] flex flex-col items-center gap-4 px-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.35 }}
              className="flex flex-col items-center gap-2"
            >
              <span
                className="font-mono text-[11px] uppercase tracking-[0.32em]"
                style={{ color: theme.text }}
              >
                {theme.loading}
              </span>
              <span className="font-display text-3xl font-semibold text-white sm:text-4xl">
                {theme.label}
              </span>
            </motion.div>

            {/* Progress rail */}
            <div className="h-px w-40 overflow-hidden bg-white/15">
              <motion.div
                className="h-full"
                style={{ backgroundColor: theme.color }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{
                  duration: (HOLD_UNTIL - COVER_IN) / 1000,
                  ease: 'easeInOut',
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </>
  )

  return { displayLocation, overlay }
}
