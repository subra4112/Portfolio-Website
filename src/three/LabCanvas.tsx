import { Canvas } from '@react-three/fiber'
import MorphField from './MorphField'
import Dust from './Dust'
import type { ShapeKey } from './shapes'

export interface LabCanvasProps {
  shape: ShapeKey
  count: number
  dustCount: number
  active: boolean
  /** Only the heart beats. */
  pulse: number
}

/**
 * A *contained* WebGL viewport. Unlike the old full-bleed background, this
 * canvas is bounded by its panel and never sits under body copy — so the field
 * can run at full brightness without hurting readability.
 */
export default function LabCanvas({
  shape,
  count,
  dustCount,
  active,
  pulse,
}: LabCanvasProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={active ? 'always' : 'never'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 7.4], fov: 52 }}
      style={{ pointerEvents: 'none' }}
    >
      <Dust count={dustCount} opacity={0.35} />
      <MorphField
        count={count}
        shape={shape}
        colorA="#ffffff"
        colorB="#8a8a8a"
        opacity={1}
        scale={1}
        pulse={pulse}
      />
    </Canvas>
  )
}
