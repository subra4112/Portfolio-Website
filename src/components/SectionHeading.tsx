import Reveal from './Reveal'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  accent?: string
  subtitle?: string
  align?: 'left' | 'center'
}

/**
 * Consistent heading block used by every section: a bracketed mono eyebrow
 * (console-log style), a display headline whose accent word is set in italic
 * serif, and an optional subtitle.
 */
export default function SectionHeading({
  eyebrow,
  title,
  accent,
  subtitle,
  align = 'left',
}: SectionHeadingProps) {
  const isCenter = align === 'center'
  return (
    <div className={`mb-14 ${isCenter ? 'mx-auto max-w-2xl text-center' : 'max-w-3xl'}`}>
      <Reveal>
        <div className={`mb-4 flex items-center gap-3 ${isCenter ? 'justify-center' : ''}`}>
          <span className="h-px w-8 bg-primary-400/60" />
          <span className="eyebrow">
            [ {eyebrow} ]
          </span>
        </div>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="font-display text-4xl font-bold leading-tight tracking-tightest text-mist-100 sm:text-5xl">
          {title}{' '}
          {accent && (
            <span className="accent-serif text-gradient-accent">{accent}</span>
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
