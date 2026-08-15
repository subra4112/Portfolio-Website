import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { themeForRoute } from '../lib/routeTheme'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useDeviceCapability } from '../hooks/useDeviceCapability'
import type { FieldPhase } from '../three/TransitionCanvas'

const TransitionCanvas = lazy(() => import('../three/TransitionCanvas'))

/* Choreography, in ms.
   0     accent panel starts up
   70    dark panel follows          → reads as a double wipe, not one slab
   ~520  fully covered
   540   the routed page swaps underneath, unseen
   540+  particles fly in, camera dollies from far to near
   1080  particles implode, panels lift (dark first, accent trailing)
   1620  overlay unmounts                                                     */
const PANEL_DUR = 0.46
const PANEL_STAGGER = 0.07
const SWAP_AT = 540
const HOLD_UNTIL = 1080
const TOTAL = 1620

const EASE = [0.83, 0, 0.17, 1] as const

export interface PageTransitionResult {
  /** The location the router should render (lags during a transition). */
  displayLocation: ReturnType<typeof useLocation>
  overlay: React.ReactNode
}

/**
 * The 3D loader that plays between sections. A coloured panel wipes up, a dark
 * panel follows, the routed page swaps while hidden, the particle field flies
 * in and morphs into the destination's shape, then both panels lift away.
 */
export function usePageTransition(): PageTransitionResult {
  const location = useLocation()
  const reduced = usePrefersReducedMotion()
  const { isMobile } = useDeviceCapability()

  const [displayLocation, setDisplayLocation] = useState(location)
  const [running, setRunning] = useState(false)
  const [curtain, setCurtain] = useState<'in' | 'out'>('in')
  const [field, setField] = useState<FieldPhase>('enter')
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
    setCurtain('in')
    setField('enter')
    setRunning(true)

    // One frame later, let the field fly in from its 'enter' pose.
    const raf = requestAnimationFrame(() => setField('in'))
    const swap = setTimeout(() => setDisplayLocation(location), SWAP_AT)
    const lift = setTimeout(() => {
      setField('out')
      setCurtain('out')
    }, HOLD_UNTIL)
    // Unmounting is timer-driven, never dependent on an animation finishing —
    // rAF is throttled in background tabs and would strand the curtain.
    const done = setTimeout(() => setRunning(false), TOTAL)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(swap)
      clearTimeout(lift)
      clearTimeout(done)
    }
  }, [location, reduced])

  const leaving = curtain === 'out'
  const panel = (delay: number) => ({ duration: PANEL_DUR, ease: EASE, delay })

  const overlay = running ? (
    <div className="pointer-events-none fixed inset-0 z-[150] overflow-hidden" aria-hidden>
      {/* Leading colour sweep */}
      <motion.div
        className="absolute inset-0"
        style={{ backgroundColor: theme.color }}
        initial={{ y: '100%' }}
        animate={{ y: leaving ? '-100%' : '0%' }}
        transition={panel(leaving ? PANEL_STAGGER : 0)}
      />
      {/* Dark panel trailing it */}
      <motion.div
        className="absolute inset-0 bg-ink-900"
        initial={{ y: '100%' }}
        animate={{ y: leaving ? '-100%' : '0%' }}
        transition={panel(leaving ? 0 : PANEL_STAGGER)}
      />

      {/* Contents */}
      <motion.div
        className="absolute inset-0 grid place-items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: field === 'in' ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {/* Colour wash behind the geometry */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(42rem 30rem at 50% 42%, ${theme.bg}, transparent 72%)`,
          }}
        />

        {/* Full bleed and radially masked, so the canvas has no visible edge. */}
        <div
          className="absolute inset-0"
          style={{
            maskImage:
              'radial-gradient(circle at 50% 44%, #000 0%, #000 42%, transparent 72%)',
            WebkitMaskImage:
              'radial-gradient(circle at 50% 44%, #000 0%, #000 42%, transparent 72%)',
          }}
        >
          {mounted && (
            <Suspense fallback={null}>
              <TransitionCanvas
                shape={theme.shape}
                color={theme.color}
                count={isMobile ? 2400 : 6000}
                active={running}
                phase={field}
              />
            </Suspense>
          )}
        </div>

        <div className="absolute inset-x-0 bottom-[17%] flex flex-col items-center gap-5 px-6">
          <motion.span
            className="font-mono text-[11px] uppercase tracking-[0.34em]"
            style={{ color: theme.text }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: field === 'in' ? 1 : 0, y: field === 'in' ? 0 : 8 }}
            transition={{ duration: 0.3, delay: 0.06 }}
          >
            {theme.loading}
          </motion.span>

          {/* Destination name, one letter at a time */}
          <span className="flex overflow-hidden font-display text-4xl font-semibold text-white sm:text-5xl">
            {theme.label.split('').map((ch, i) => (
              <motion.span
                key={`${theme.label}-${i}`}
                initial={{ y: '110%' }}
                animate={{ y: field === 'in' ? '0%' : '110%' }}
                transition={{
                  duration: 0.42,
                  ease: EASE,
                  delay: field === 'in' ? 0.08 + i * 0.035 : 0,
                }}
              >
                {ch}
              </motion.span>
            ))}
          </span>

          {/* Progress rail */}
          <div className="h-px w-44 overflow-hidden bg-white/15">
            <motion.div
              className="h-full"
              style={{ backgroundColor: theme.color }}
              initial={{ width: '0%' }}
              animate={{ width: field === 'in' ? '100%' : '0%' }}
              transition={{ duration: (HOLD_UNTIL - SWAP_AT) / 1000, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  ) : null

  return { displayLocation, overlay }
}
