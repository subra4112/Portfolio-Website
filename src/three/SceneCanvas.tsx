import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import MorphField from './MorphField'
import Dust from './Dust'
import { sceneForRoute } from './routeScene'

/** Eases the camera between per-route distances instead of cutting. */
function CameraRig({ z }: { z: number }) {
  const { camera } = useThree()
  const target = useRef(z)
  target.current = z

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05)
    camera.position.z += (target.current - camera.position.z) * d * 2.2
  })
  return null
}

export interface SceneCanvasProps {
  pathname: string
  count: number
  dustCount: number
  active: boolean
}

/**
 * The site's persistent WebGL layer. It never unmounts across route changes —
 * instead the particle field morphs from one page's shape to the next, which is
 * what makes navigation feel continuous.
 */
export default function SceneCanvas({
  pathname,
  count,
  dustCount,
  active,
}: SceneCanvasProps) {
  const scene = sceneForRoute(pathname)

  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={active ? 'always' : 'never'}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      camera={{ position: [0, 0, scene.cameraZ], fov: 55 }}
      style={{ pointerEvents: 'none' }}
    >
      <CameraRig z={scene.cameraZ} />
      <Dust count={dustCount} opacity={scene.opacity * 0.55} />
      <MorphField
        count={count}
        shape={scene.shape}
        colorA={scene.colorA}
        colorB={scene.colorB}
        opacity={scene.opacity}
        scale={scene.scale}
        pulse={scene.pulse}
      />
    </Canvas>
  )
}
