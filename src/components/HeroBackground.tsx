import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useDeviceCapability } from '../hooks/useDeviceCapability'

// Lazy so the three.js chunk never blocks first paint.
const HeroCanvas = lazy(() => import('../three/HeroCanvas'))

/** Branded, on-palette static fallback for mobile / low-power / reduced-motion. */
function StaticField() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute left-1/2 top-1/3 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500/20 blur-[120px]" />
      <div className="absolute right-1/4 top-1/2 h-72 w-72 rounded-full bg-violet-500/20 blur-[100px]" />
      <div className="absolute inset-0 bg-grid-faint [background-size:60px_60px] opacity-40" />
      {/* A few static "nodes" so the fallback still reads as a network */}
      <svg className="absolute inset-0 h-full w-full opacity-60" aria-hidden>
        <defs>
          <radialGradient id="node" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5bf5bd" />
            <stop offset="100%" stopColor="#2ee8a5" stopOpacity="0" />
          </radialGradient>
        </defs>
        {[
          [120, 140], [320, 90], [520, 200], [680, 120], [240, 280],
          [460, 340], [620, 300], [180, 420], [400, 460], [560, 440],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4" fill="url(#node)" />
        ))}
      </svg>
    </div>
  )
}

/** Subtle loader shown while the WebGL chunk streams in. */
function CanvasLoader() {
  return (
    <div className="absolute inset-0 grid place-items-center" aria-hidden>
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary-500/30 border-t-primary-400" />
    </div>
  )
}

export default function HeroBackground() {
  const reduced = usePrefersReducedMotion()
  const { isMobile, isLowPower } = useDeviceCapability()
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(true)

  // Pause the render loop whenever the hero scrolls out of view — saves GPU
  // and battery, and keeps the rest of the page perfectly smooth.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.01 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Downgrade to the static field when motion is unwelcome or the GPU is weak.
  if (reduced || isLowPower) {
    return <StaticField />
  }

  return (
    <div ref={ref} className="absolute inset-0">
      <Suspense fallback={<CanvasLoader />}>
        {/* Fewer nodes on mobile keeps it buttery. */}
        <HeroCanvas nodeCount={isMobile ? 55 : 90} active={active} />
      </Suspense>
    </div>
  )
}
