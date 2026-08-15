import { Canvas } from '@react-three/fiber'
import MorphField from './MorphField'
import type { ShapeKey } from './shapes'

export interface TransitionCanvasProps {
  shape: ShapeKey
  color: string
  count: number
  active: boolean
}

/**
 * The canvas shown inside the page-transition loader. Mounted once and kept
 * alive so a WebGL context is never rebuilt mid-navigation; the render loop is
 * parked (`frameloop="never"`) whenever a transition isn't running.
 */
export default function TransitionCanvas({
  shape,
  color,
  count,
  active,
}: TransitionCanvasProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={active ? 'always' : 'never'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 7.2], fov: 52 }}
      style={{ pointerEvents: 'none' }}
    >
      <MorphField
        count={count}
        shape={shape}
        colorA="#ffffff"
        colorB={color}
        opacity={1}
        scale={1}
        pulse={shape === 'heart' ? 1 : 0.2}
      />
    </Canvas>
  )
}
