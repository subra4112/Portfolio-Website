import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Maximize2, X, ExternalLink } from 'lucide-react'

export interface LivePreviewProps {
  src: string
  title: string
  /** Accent colour for the frame and controls. */
  tone: string
}

/**
 * Renders a real, running page inside the card so visitors see the product
 * before they click. The preview itself is inert (pointer events off, scaled
 * down); clicking expands the same URL into a full screen, fully interactive
 * frame. The iframe only mounts once the card scrolls into view, so a heavy
 * bundle never blocks the rest of the page.
 */
export default function LivePreview({ src, title, tone }: LivePreviewProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const el = hostRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    io.observe(el)
    // Backstop: a background tab never reports an intersection, so the preview
    // would otherwise sit at "loading" forever. The iframe still carries
    // loading="lazy", so the browser defers the actual fetch either way.
    const fallback = setTimeout(() => setInView(true), 1500)
    return () => {
      io.disconnect()
      clearTimeout(fallback)
    }
  }, [])

  // Close on Escape while expanded, and lock background scrolling.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <>
      <div
        ref={hostRef}
        className="group/preview relative mt-5 overflow-hidden rounded-xl border"
        style={{ borderColor: `${tone}44` }}
      >
        <div className="relative h-[220px] w-full overflow-hidden bg-ink-900 sm:h-[300px]">
          {inView ? (
            <iframe
              src={src}
              title={title}
              tabIndex={-1}
              aria-hidden
              loading="lazy"
              className="pointer-events-none absolute left-0 top-0 origin-top-left border-0"
              style={{ width: '200%', height: '200%', transform: 'scale(0.5)' }}
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center">
              <span className="font-mono text-xs text-mist-400">loading preview</span>
            </div>
          )}

          {/* Click target */}
          <button
            onClick={() => setOpen(true)}
            className="absolute inset-0 grid place-items-center bg-ink-900/0 transition-colors duration-300 hover:bg-ink-900/55 focus-visible:bg-ink-900/55"
            aria-label={`Open ${title} full screen`}
          >
            <span
              className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium opacity-0 transition-opacity duration-300 group-hover/preview:opacity-100 focus-visible:opacity-100"
              style={{ backgroundColor: tone, color: '#0d0d0d' }}
            >
              <Maximize2 size={15} />
              Open live dashboard
            </span>
          </button>
        </div>

        <div className="flex items-center justify-between gap-3 border-t px-4 py-2.5"
          style={{ borderColor: `${tone}33`, background: '#141414' }}
        >
          <span className="font-mono text-[11px] text-mist-300">live preview</span>
          <span className="flex items-center gap-1.5 font-mono text-[11px]" style={{ color: tone }}>
            <span className="relative flex h-1.5 w-1.5">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
                style={{ backgroundColor: tone }}
              />
              <span
                className="relative inline-flex h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: tone }}
              />
            </span>
            running
          </span>
        </div>
      </div>

      {/* Full screen */}
      {open && (
        <motion.div
          className="fixed inset-0 z-[180] flex flex-col bg-ink-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6">
            <span className="truncate font-display text-base font-semibold text-white sm:text-lg">
              {title}
            </span>
            <div className="flex shrink-0 items-center gap-2">
              <a
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs text-mist-200 transition-colors hover:border-white/40 hover:text-white"
              >
                <ExternalLink size={13} /> New tab
              </a>
              <button
                onClick={() => setOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-full border border-white/20 text-mist-200 transition-colors hover:border-white/40 hover:text-white"
                aria-label="Close preview"
              >
                <X size={16} />
              </button>
            </div>
          </div>
          <iframe src={src} title={title} className="h-full w-full flex-1 border-0" />
        </motion.div>
      )}
    </>
  )
}
