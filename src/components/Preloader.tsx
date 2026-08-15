import { useEffect, useState } from 'react'
import EcgLine from './EcgLine'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const BOOT_LINES = [
  { text: 'boot subraraj.os --env=production', prompt: true },
  { text: 'loading model weights', status: 'OK' },
  { text: 'mounting clinical knowledge base', status: 'OK' },
  { text: 'spinning up agents · planner / executor / verifier', status: 'OK' },
  { text: 'running vitals check', status: 'OK' },
]

const STEP_MS = 320
const NOMINAL_MS = BOOT_LINES.length * STEP_MS + 250 // "SYSTEMS NOMINAL" moment
const EXIT_MS = NOMINAL_MS + 600 // curtain starts lifting
const DONE_MS = EXIT_MS + 750 // unmount

/**
 * Boot sequence curtain: a terminal types its startup checks while an ECG
 * trace draws and a progress readout climbs to 100, then SYSTEMS NOMINAL
 * flashes and the curtain lifts. Reduced motion users skip straight through.
 */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const reduced = usePrefersReducedMotion()
  const [step, setStep] = useState(0)
  const [nominal, setNominal] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (reduced) {
      const t = setTimeout(onDone, 350)
      return () => clearTimeout(t)
    }
    const interval = setInterval(
      () => setStep((s) => Math.min(s + 1, BOOT_LINES.length)),
      STEP_MS
    )
    const t1 = setTimeout(() => setNominal(true), NOMINAL_MS)
    const t2 = setTimeout(() => setLeaving(true), EXIT_MS)
    const t3 = setTimeout(onDone, DONE_MS)
    return () => {
      clearInterval(interval)
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [onDone, reduced])

  if (reduced) {
    return <div className="fixed inset-0 z-[200] bg-ink-950" aria-hidden />
  }

  const progress = Math.round((step / BOOT_LINES.length) * 100)

  return (
    <div
      className="fixed inset-0 z-[200] overflow-hidden bg-ink-950 transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
      style={{ transform: leaving ? 'translateY(-100%)' : 'translateY(0)' }}
      aria-hidden
    >
      {/* Faint grid backdrop */}
      <div className="absolute inset-0 bg-grid-faint [background-size:60px_60px] opacity-30" />

      <div className="relative grid h-full place-items-center px-6">
        <div className="w-full max-w-lg">
          {/* Terminal */}
          <div className="term shadow-panel">
            <div className="term-bar justify-between">
              <div className="flex items-center gap-2">
                <span className="term-dot bg-white/25" />
                <span className="term-dot bg-white/25" />
                <span className="term-dot bg-white/25" />
                <span className="ml-3 font-mono text-xs text-mist-400">
                  subraraj.os boot
                </span>
              </div>
              <span className="font-mono text-xs tabular-nums text-primary-300">
                {progress}%
              </span>
            </div>
            <div className="min-h-[172px] p-5 font-mono text-[12.5px] leading-relaxed sm:text-[13px]">
              {BOOT_LINES.slice(0, step).map((line, i) => (
                <div key={i} className="flex items-baseline justify-between gap-4">
                  <span className={line.prompt ? 'text-mist-100' : 'text-mist-300'}>
                    {line.prompt ? (
                      <>
                        <span className="text-primary-400">$ </span>
                        {line.text}
                      </>
                    ) : (
                      <>
                        <span className="text-mist-400">&gt; </span>
                        {line.text}
                      </>
                    )}
                  </span>
                  {line.status && (
                    <span className="shrink-0 text-primary-300">[ {line.status} ]</span>
                  )}
                </div>
              ))}
              {!nominal && step < BOOT_LINES.length && (
                <span className="inline-block h-4 w-2 translate-y-0.5 animate-blink bg-primary-400" />
              )}
              {nominal && (
                <div className="mt-3 inline-flex items-center gap-2 rounded-md border border-primary-400/30 bg-primary-500/10 px-3 py-1 font-semibold tracking-[0.25em] text-primary-300">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-400" />
                  </span>
                  SYSTEMS NOMINAL
                </div>
              )}
            </div>
            {/* Progress bar */}
            <div className="h-1 w-full bg-white/5">
              <div
                className="h-full bg-white transition-[width] duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* ECG trace under the terminal */}
          <div className="preloader-trace mt-6">
            <EcgLine className="h-10 w-full" />
          </div>
        </div>
      </div>

      {/* The boot trace draws in one fast pass instead of the ambient loop */}
      <style>{`.preloader-trace .ecg-path { animation-duration: ${
        NOMINAL_MS / 1000
      }s; animation-iteration-count: 1; animation-fill-mode: forwards; }`}</style>
    </div>
  )
}
