import { Suspense, lazy, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useDeviceCapability } from '../hooks/useDeviceCapability'

// Lazy so the three.js chunk never blocks first paint.
const SceneCanvas = lazy(() => import('../three/SceneCanvas'))

/** Branded, on-palette static stand-in for low-power / reduced-motion. */
function StaticField() {
  return (
    <div className="pointer-events-none fixed inset-0" style={{ zIndex: -2 }} aria-hidden>
      <div className="absolute left-1/2 top-1/3 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500/15 blur-[120px]" />
      <div className="absolute right-1/4 top-1/2 h-72 w-72 rounded-full bg-violet-500/15 blur-[100px]" />
      <div className="absolute inset-0 bg-grid-faint [background-size:60px_60px] opacity-30" />
    </div>
  )
}

/**
 * The persistent 3D backdrop for the whole site. Mounted once at the app root
 * and never unmounted, so the particle field can morph continuously as the
 * route changes rather than tearing down and rebuilding a canvas per page.
 */
export default function BackgroundScene() {
  const reduced = usePrefersReducedMotion()
  const { isMobile, isLowPower } = useDeviceCapability()
  const { pathname } = useLocation()
  const [active, setActive] = useState(
    () => typeof document === 'undefined' || !document.hidden
  )

  // Stop rendering entirely while the tab is in the background.
  useEffect(() => {
    const onVisibility = () => setActive(!document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  if (reduced || isLowPower) return <StaticField />

  return (
    <div
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: -2 }}
      aria-hidden
    >
      <Suspense fallback={null}>
        <SceneCanvas
          pathname={pathname}
          count={isMobile ? 2600 : 6800}
          dustCount={isMobile ? 260 : 620}
          active={active}
        />
      </Suspense>
    </div>
  )
}
