import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import type { ShapeKey } from '../three/shapes'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useDeviceCapability } from '../hooks/useDeviceCapability'

const LabCanvas = lazy(() => import('../three/LabCanvas'))

interface View {
  key: ShapeKey
  label: string
  title: string
  caption: string
  pulse: number
}

/** Each form maps to something real in the work — not decoration for its own sake. */
const VIEWS: View[] = [
  {
    key: 'heart',
    label: 'patient',
    title: 'The patient',
    caption:
      '26M+ longitudinal clinical events across 4,733 assisted-living residents — the substrate everything else is trained on.',
    pulse: 1,
  },
  {
    key: 'brain',
    label: 'model',
    title: 'The model',
    caption:
      'A 10M-parameter GPT-2-style transformer, pretrained from scratch in PyTorch on tokenized patient timelines.',
    pulse: 0.25,
  },
  {
    key: 'lattice',
    label: 'architecture',
    title: 'The architecture',
    caption:
      'LangChain and LangGraph services on Kubernetes, HIPAA-gated, with MLflow and Weights & Biases observability.',
    pulse: 0.1,
  },
  {
    key: 'helix',
    label: 'trajectory',
    title: 'The trajectory',
    caption:
      '20,000 Monte Carlo futures simulated per patient to estimate long-horizon risk — AUROC 0.856 on mortality.',
    pulse: 0.15,
  },
  {
    key: 'sphere',
    label: 'embeddings',
    title: 'The embedding space',
    caption:
      'Hybrid retrieval across vector stores and Neo4j knowledge graphs, reranked for multi-hop clinical reasoning.',
    pulse: 0.1,
  },
  {
    key: 'knot',
    label: 'signal',
    title: 'The signal',
    caption:
      'Adverse events pulled out of unstructured notes — a RoBERTa classifier at macro F1 0.759, validated on real parent-reported phrasing.',
    pulse: 0.3,
  },
]

const CYCLE_MS = 6000

/** Lightweight stand-in when WebGL is unwanted or unavailable. */
function StaticPanel() {
  return (
    <div className="relative grid h-full w-full place-items-center overflow-hidden">
      <div className="absolute inset-0 bg-grid-faint [background-size:48px_48px] opacity-50" />
      <div className="absolute h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="relative h-40 w-40 rounded-full border border-white/25" />
    </div>
  )
}

/**
 * The site's 3D centrepiece — deliberately boxed. The particle system lives
 * inside a bordered viewport with its own controls, so it can be dramatic
 * without ever competing with text for legibility.
 */
export default function ShapeLab() {
  const reduced = usePrefersReducedMotion()
  const { isMobile, isLowPower } = useDeviceCapability()
  const [index, setIndex] = useState(0)
  const [auto, setAuto] = useState(true)
  const [visible, setVisible] = useState(false)
  const hostRef = useRef<HTMLDivElement>(null)

  const view = VIEWS[index]

  // Only render while the panel is actually on screen.
  useEffect(() => {
    const el = hostRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Auto-advance until the visitor takes over.
  useEffect(() => {
    if (!auto || reduced || !visible) return
    const id = setInterval(
      () => setIndex((i) => (i + 1) % VIEWS.length),
      CYCLE_MS
    )
    return () => clearInterval(id)
  }, [auto, reduced, visible])

  const pick = (i: number) => {
    setIndex(i)
    setAuto(false)
  }

  return (
    <section id="viewer" className="section !pt-4">
      <SectionHeading
        eyebrow="00 · viewer"
        title="What I actually"
        accent="build"
        subtitle="Six views of one clinical AI system — from the raw patient record to the signal pulled out the other end."
      />

      <Reveal>
        <div ref={hostRef} className="term">
          <div className="term-bar justify-between">
            <div className="flex items-center gap-2">
              <span className="term-dot bg-white/25" />
              <span className="term-dot bg-white/25" />
              <span className="term-dot bg-white/25" />
              <span className="ml-3 font-mono text-xs text-mist-400">
                viewer — {view.label}
              </span>
            </div>
            <span className="font-mono text-[11px] text-mist-400">
              {String(index + 1).padStart(2, '0')} / {String(VIEWS.length).padStart(2, '0')}
            </span>
          </div>

          {/* Viewport */}
          <div className="relative h-[340px] bg-[#080808] sm:h-[460px]">
            {reduced || isLowPower ? (
              <StaticPanel />
            ) : (
              <Suspense fallback={null}>
                <LabCanvas
                  shape={view.key}
                  count={isMobile ? 2600 : 7000}
                  dustCount={isMobile ? 220 : 500}
                  active={visible}
                  pulse={view.pulse}
                />
              </Suspense>
            )}

            {/* Caption sits in a corner, never across the geometry */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#080808] via-[#080808]/85 to-transparent p-5 sm:p-6">
              <h3 className="font-display text-lg font-semibold text-white sm:text-xl">
                {view.title}
              </h3>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-mist-300">
                {view.caption}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-1.5 overflow-x-auto border-t border-white/8 p-3">
            {VIEWS.map((v, i) => (
              <button
                key={v.key}
                onClick={() => pick(i)}
                aria-pressed={i === index}
                className={`shrink-0 rounded-lg px-3.5 py-2 font-mono text-xs transition-colors duration-300 ${
                  i === index
                    ? 'bg-white text-ink-950'
                    : 'text-mist-400 hover:bg-white/5 hover:text-mist-100'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
