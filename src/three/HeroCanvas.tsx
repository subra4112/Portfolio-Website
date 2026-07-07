import { Canvas } from '@react-three/fiber'
import NeuralField from './NeuralField'

/**
 * The WebGL hero canvas. This module is loaded lazily (React.lazy) so the
 * three.js bundle never blocks first paint. Performance guards:
 *  - dpr clamped to [1, 2]
 *  - high-performance GPU hint, no expensive post-processing
 *  - low node count keeps draw calls + overdraw minimal
 *  - frameloop pauses entirely when the hero scrolls out of view (`active`)
 */
export default function HeroCanvas({
  nodeCount = 90,
  active = true,
}: {
  nodeCount?: number
  active?: boolean
}) {
  return (
    <Canvas
      dpr={[1, 2]}
      frameloop={active ? 'always' : 'never'}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      camera={{ position: [0, 0, 6], fov: 55 }}
      style={{ pointerEvents: 'none' }}
    >
      <NeuralField nodeCount={nodeCount} />
    </Canvas>
  )
}
