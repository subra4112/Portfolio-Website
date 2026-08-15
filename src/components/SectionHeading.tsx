import Reveal from './Reveal'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  accent?: string
  subtitle?: string
  align?: 'left' | 'center'
  /** Section accent colour — one of the route theme hues. */
  color?: string
}

/**
 * Eyebrow + headline + subtitle. The eyebrow and the accent word carry the
 * section's colour, which is how each page reads as its own place.
 */
export default function SectionHeading({
  eyebrow,
  title,
  accent,
  subtitle,
  align = 'left',
  color = '#63a8f8',
}: SectionHeadingProps) {
  const isCenter = align === 'center'
  return (
    <div className={`mb-14 ${isCenter ? 'mx-auto max-w-2xl text-center' : 'max-w-3xl'}`}>
      <Reveal>
        <div className={`mb-4 flex items-center gap-3 ${isCenter ? 'justify-center' : ''}`}>
          <span
            className="h-px w-8"
            style={{ backgroundColor: color, opacity: 0.7 }}
          />
          <span className="eyebrow" style={{ color }}>
            [ {eyebrow} ]
          </span>
        </div>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="font-display text-4xl font-bold leading-tight tracking-tightest text-white sm:text-5xl">
          {title}{' '}
          {accent && (
            <span className="accent-serif" style={{ color }}>
              {accent}
            </span>
          )}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={140}>
          <p className="mt-5 text-lg leading-relaxed text-mist-300">{subtitle}</p>
        </Reveal>
      )}
    </div>
  )
}
