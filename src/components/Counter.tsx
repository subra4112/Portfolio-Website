import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

interface CounterProps {
  /** Final value, e.g. 26 for "26M+". */
  value: number
  /** Decimal places to render while counting (for AUROC-style values). */
  decimals?: number
  prefix?: string
  suffix?: string
  /** Animation length in ms. */
  duration?: number
  className?: string
}

/**
 * A count-up number that runs once when it scrolls into view — the "vitals
 * monitor" readout. Skips straight to the final value for reduced motion.
 */
export default function Counter({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1600,
  className = '',
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = usePrefersReducedMotion()
  const [display, setDisplay] = useState(reduced ? value : 0)

  useEffect(() => {
    if (reduced) {
      setDisplay(value)
      return
    }
    const el = ref.current
    if (!el) return

    let raf = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1)
          // ease-out cubic — fast start, gentle landing
          const eased = 1 - Math.pow(1 - t, 3)
          setDisplay(value * eased)
          if (t < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, duration, reduced])

  const formatted =
    decimals > 0
      ? display.toFixed(decimals)
      : Math.round(display).toLocaleString()

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
