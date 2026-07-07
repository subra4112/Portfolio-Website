import { useEffect, useState } from 'react'

/**
 * Tracks the user's `prefers-reduced-motion` setting so heavy motion
 * (the 3D hero, parallax, autoplay loops) can be downgraded gracefully.
 */
export function usePrefersReducedMotion(): boolean {
  const query = '(prefers-reduced-motion: reduce)'
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setReduced(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return reduced
}
