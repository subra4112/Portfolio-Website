import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import MorphField from './MorphField'
import Dust from './Dust'
import type { ShapeKey } from './shapes'

export type FieldPhase = 'enter' | 'in' | 'out'

/** Per-phase look: the field flies in from far and wide, settles, then implodes. */
const PHASES: Record<FieldPhase, { scale: number; opacity: number; z: number }> = {
  enter: { scale: 1.7, opacity: 0, z: 11.5 },
  in: { scale: 1, opacity: 1, z: 7 },
  out: { scale: 0.55, opacity: 0, z: 5 },
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
      <Dust count={Math.round(count * 0.08)} opacity={p.opacity * 0.5} />
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
