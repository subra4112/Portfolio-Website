import { useEffect, useRef, type ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  /** Stagger delay in ms. */
  delay?: number
  className?: string
  as?: keyof JSX.IntrinsicElements
}

/**
 * Lightweight scroll-reveal wrapper built on IntersectionObserver + a CSS
 * class (no JS animation cost). Honors prefers-reduced-motion via index.css.
 */
export default function Reveal({
  children,
  delay = 0,
  className = '',
  as = 'div',
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const Tag = as as any

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
