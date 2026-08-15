import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

/**
 * A cursor-aware accent: a soft glowing dot that trails the pointer and grows
 * over interactive elements. Disabled on touch devices and reduced motion.
 */
export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (reduced) return
    if (window.matchMedia('(pointer: coarse)').matches) return
    setEnabled(true)

    let rx = 0, ry = 0, x = 0, y = 0
    let raf = 0

    const onMove = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
      if (dot.current) {
        dot.current.style.transform = `translate(${x}px, ${y}px)`
      }
    }
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      const interactive = t.closest('a, button, input, textarea, [data-cursor]')
      if (ring.current) {
        ring.current.style.width = interactive ? '56px' : '28px'
        ring.current.style.height = interactive ? '56px' : '28px'
        ring.current.style.borderColor = interactive
          ? 'rgba(255,255,255,0.9)'
          : 'rgba(255,255,255,0.35)'
      }
    }
    const loop = () => {
      rx += (x - rx) * 0.18
      ry += (y - ry) * 0.18
      if (ring.current) {
        ring.current.style.transform = `translate(${rx}px, ${ry}px)`
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf)
    }
  }, [reduced])

  if (!enabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block" aria-hidden>
      <div
        ref={dot}
        className="absolute -ml-1 -mt-1 h-2 w-2 rounded-full bg-primary-300"
        style={{ boxShadow: '0 0 12px rgba(255,255,255,0.9)' }}
      />
      <div
        ref={ring}
        className="absolute h-7 w-7 rounded-full border"
        style={{
          marginLeft: '-14px',
          marginTop: '-14px',
          borderColor: 'rgba(255,255,255,0.35)',
          transition: 'width 0.25s ease, height 0.25s ease, border-color 0.25s ease',
        }}
      />
    </div>
  )
}
