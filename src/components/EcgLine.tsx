interface EcgLineProps {
  className?: string
  /** Stroke color; defaults to pulse mint. */
  color?: string
  /** Disable the draw loop (e.g. inside the preloader before "boot"). */
  animate?: boolean
}

/**
 * An ECG / heart-monitor trace that draws itself across its container and
 * repeats — the site's signature motif. Pure SVG + CSS dash animation, no JS
 * per frame. Honors prefers-reduced-motion via index.css (.ecg-path).
 */
export default function EcgLine({
  className = '',
  color = '#2ee8a5',
  animate = true,
}: EcgLineProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 600 60"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden
    >
      {/* Baseline ghost so the geometry is always faintly visible */}
      <path
        d="M0 30 H105 L120 30 L128 12 L136 48 L144 22 L152 30 H240 L252 26 L260 30 H345 L360 30 L368 8 L376 52 L384 20 L392 30 H480 L492 26 L500 30 H600"
        stroke={color}
        strokeOpacity="0.12"
        strokeWidth="1.5"
      />
      <path
        className={animate ? 'ecg-path' : undefined}
        d="M0 30 H105 L120 30 L128 12 L136 48 L144 22 L152 30 H240 L252 26 L260 30 H345 L360 30 L368 8 L376 52 L384 20 L392 30 H480 L492 26 L500 30 H600"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: `drop-shadow(0 0 6px ${color})` }}
      />
    </svg>
  )
}
