import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { X, Download, ExternalLink } from 'lucide-react'

export interface ResumeModalProps {
  open: boolean
  onClose: () => void
}

const SRC = '/resume.pdf'

/**
 * Opens the resume in a full screen popup with the site blurred behind it,
 * so it can be read without leaving the page, and downloaded from inside.
 */
export default function ResumeModal({ open, onClose }: ResumeModalProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.body.classList.add('has-modal')
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
      document.body.classList.remove('has-modal')
    }
  }, [open, onClose])

  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[190] flex flex-col p-0 sm:p-6 lg:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.22 }}
    >
      <div className="absolute inset-0 bg-ink-950/75" onClick={onClose} aria-hidden />

      <motion.div
        className="relative flex h-full w-full flex-col overflow-hidden border border-white/15 bg-ink-900 shadow-panel sm:rounded-2xl"
        initial={{ opacity: 0, scale: 0.96, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="h-2 w-2 shrink-0 rounded-full bg-blue" />
            <span className="truncate font-display text-base font-bold text-white sm:text-lg">
              Resume
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={SRC}
              download="Subramanian Raj Narayanan Resume.pdf"
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-ink-900 transition-colors hover:bg-mist-200"
            >
              <Download size={13} /> Download
            </a>
            <a
              href={SRC}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs text-mist-200 transition-colors hover:border-white/45 hover:text-white"
            >
              <ExternalLink size={13} /> New tab
            </a>
            <button
              onClick={onClose}
              className="grid h-8 w-8 place-items-center rounded-full border border-white/20 text-mist-200 transition-colors hover:border-white/45 hover:text-white"
              aria-label="Close resume"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <object data={SRC} type="application/pdf" className="h-full w-full flex-1">
          {/* Shown when the browser cannot display PDFs inline, e.g. most phones. */}
          <div className="grid h-full place-items-center p-8 text-center">
            <div>
              <p className="text-[15px] text-mist-300">
                Your browser cannot show the PDF inline.
              </p>
              <a
                href={SRC}
                download="Subramanian Raj Narayanan Resume.pdf"
                className="btn-primary mt-5"
              >
                <Download size={16} /> Download the resume
              </a>
            </div>
          </div>
        </object>
      </motion.div>
    </motion.div>,
    document.body
  )
}
