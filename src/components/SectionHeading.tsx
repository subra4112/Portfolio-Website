import Reveal from './Reveal'

interface SectionHeadingProps {
  title: string
  accent?: string
  subtitle?: string
  align?: 'left' | 'center'
  /** Section accent colour. */
  color?: string
}

/** Just the title. No numbered eyebrow, no brackets, nothing to decode. */
export default function SectionHeading({
  title,
  accent,
  subtitle,
  align = 'left',
  color = '#63a8f8',
}: SectionHeadingProps) {
  const isCenter = align === 'center'
  return (
    <div className={`mb-12 ${isCenter ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}`}>
      <Reveal>
        <h2 className="font-display text-[2.75rem] font-extrabold leading-[1.02] tracking-tightest text-white sm:text-6xl">
          {title}{' '}
          {accent && (
            <span className="accent-serif" style={{ color }}>
              {accent}
            </span>
          )}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={100}>
          <p className="mt-5 text-lg leading-relaxed text-mist-300 sm:text-xl">{subtitle}</p>
        </Reveal>
      )}
    </div>
  )
}
