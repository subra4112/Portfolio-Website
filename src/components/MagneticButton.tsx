import { useRef, type ReactNode, type MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

interface MagneticButtonProps {
  children: ReactNode
  /** Internal route — renders a client-side <Link>. */
  to?: string
  /** External or anchor href — renders a plain <a>. */
  href?: string
  onClick?: () => void
  className?: string
  ariaLabel?: string
  download?: boolean
  external?: boolean
}

/**
 * A button/link with a magnetic hover — the element eases toward the cursor.
 * Falls back to a plain element when reduced motion is requested.
 */
export default function MagneticButton({
  children,
  to,
  href,
  onClick,
  className = '',
  ariaLabel,
  download,
  external,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)
  const reduced = usePrefersReducedMotion()

  const handleMove = (e: MouseEvent) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    ref.current.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`
  }

  const reset = () => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)'
  }

  const common = {
    ref,
    onMouseMove: handleMove,
    onMouseLeave: reset,
    className,
    'aria-label': ariaLabel,
    style: { transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1)' },
  }

  if (to) {
    return (
      <Link {...common} to={to} onClick={onClick}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a
        {...common}
        href={href}
        onClick={onClick}
        download={download}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    )
  }
  return (
    <button {...common} onClick={onClick} type="button">
      {children}
    </button>
  )
}
