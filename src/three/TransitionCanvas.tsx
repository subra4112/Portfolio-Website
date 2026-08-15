import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import MorphField from './MorphField'
import type { ShapeKey } from './shapes'

export type FieldPhase = 'enter' | 'in' | 'out'

/** Per-phase look: the field flies in from far and wide, settles, then implodes. */
/* Deliberately small. The geometry is a mark above the label, not a backdrop
   the text has to fight through. */
const PHASES: Record<FieldPhase, { scale: number; opacity: number; z: number }> = {
  enter: { scale: 1.15, opacity: 0, z: 13 },
  in: { scale: 0.62, opacity: 1, z: 10.5 },
  out: { scale: 0.3, opacity: 0, z: 9 },
}

/** Eases the camera toward the phase's distance — a dolly, not a cut. */
function Dolly({ z }: { z: number }) {
  const { camera } = useThree()
  const target = useRef(z)
  target.current = z

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05)
    camera.position.z += (target.current - camera.position.z) * d * 3.4
  })
  return null
}

export interface TransitionCanvasProps {
  shape: ShapeKey
  color: string
  count: number
  active: boolean
  phase: FieldPhase
}

/**
 * The canvas inside the page-transition curtain. Mounted once and kept alive so
 * a WebGL context is never rebuilt mid-navigation; the render loop parks
 * (`frameloop="never"`) whenever a transition isn't running.
 */
export default function TransitionCanvas({
  shape,
  color,
  count,
  active,
  phase,
}: TransitionCanvasProps) {
  const p = PHASES[phase]

  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={active ? 'always' : 'never'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, PHASES.enter.z], fov: 52 }}
      style={{ pointerEvents: 'none' }}
    >
      <Dolly z={p.z} />
      {/* No ambient dust here: it filled the viewport corners and made the
          canvas read as a visible rectangle. */}
      <MorphField
        count={count}
        shape={shape}
        colorA="#ffffff"
        colorB={color}
        opacity={p.opacity}
        scale={p.scale}
        pulse={shape === 'heart' ? 1 : 0.25}
      />
    </Canvas>
  )
}
