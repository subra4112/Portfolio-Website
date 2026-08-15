import { useRef, type ReactNode, type PointerEvent } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

interface TiltCardProps {
  children: ReactNode
  className?: string
  /** Maximum rotation in degrees on each axis. */
  max?: number
}

/**
 * Wraps a card in a pointer-tracked 3D tilt. The transform lives on this
 * wrapper so the inner `.card` keeps its own hover lift and glow, and the
 * pointer position is published as CSS vars for the glare highlight.
 */
export default function TiltCard({ children, className = '', max = 5 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (reduced || !el || e.pointerType === 'touch') return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(1000px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)`
    el.style.setProperty('--gx', `${((px + 0.5) * 100).toFixed(1)}%`)
    el.style.setProperty('--gy', `${((py + 0.5) * 100).toFixed(1)}%`)
  }

  const reset = () => {
    const el = ref.current
    if (el) el.style.transform = ''
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={`tilt-wrap ${className}`}
    >
      {children}
    </div>
  )
}
