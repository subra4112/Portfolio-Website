import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* -------------------------------------------------------------------------- */
/*  Palette                                                                    */
/* -------------------------------------------------------------------------- */
const MINT = new THREE.Color('#2ee8a5')
const VIOLET = new THREE.Color('#7c66ff')

/* -------------------------------------------------------------------------- */
/*  Node + edge geometry (built once)                                          */
/* -------------------------------------------------------------------------- */
interface Graph {
  positions: Float32Array
  colors: Float32Array
  scales: Float32Array
  offsets: Float32Array
  linePositions: Float32Array
}

function buildGraph(nodeCount: number): Graph {
  const pts: THREE.Vector3[] = []
  const positions = new Float32Array(nodeCount * 3)
  const colors = new Float32Array(nodeCount * 3)
  const scales = new Float32Array(nodeCount)
  const offsets = new Float32Array(nodeCount)

  // Distribute nodes in a flattened spherical volume so it reads as a "field".
  for (let i = 0; i < nodeCount; i++) {
    const r = 2.2 * Math.cbrt(Math.random())
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const x = r * Math.sin(phi) * Math.cos(theta) * 1.5
    const y = r * Math.sin(phi) * Math.sin(theta) * 0.85
    const z = r * Math.cos(phi)
    const v = new THREE.Vector3(x, y, z)
    pts.push(v)

    positions[i * 3] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z

    // Colour by height — pulse mint at the base fading to violet up top.
    const t = THREE.MathUtils.clamp((y + 1.8) / 3.6, 0, 1)
    const c = MINT.clone().lerp(VIOLET, t)
    colors[i * 3] = c.r
    colors[i * 3 + 1] = c.g
    colors[i * 3 + 2] = c.b

    scales[i] = 0.6 + Math.random() * 1.4
    offsets[i] = Math.random() * Math.PI * 2
  }

  // Connect each node to its 2 nearest neighbours (deduped) → faint edges.
  const seen = new Set<string>()
  const lines: number[] = []
  for (let i = 0; i < nodeCount; i++) {
    const dists: { j: number; d: number }[] = []
    for (let j = 0; j < nodeCount; j++) {
      if (i === j) continue
      dists.push({ j, d: pts[i].distanceToSquared(pts[j]) })
    }
    dists.sort((a, b) => a.d - b.d)
    for (let k = 0; k < 2; k++) {
      const j = dists[k].j
      const key = i < j ? `${i}-${j}` : `${j}-${i}`
      if (seen.has(key)) continue
      seen.add(key)
      lines.push(
        pts[i].x, pts[i].y, pts[i].z,
        pts[j].x, pts[j].y, pts[j].z
      )
    }
  }

  return {
    positions,
    colors,
    scales,
    offsets,
    linePositions: new Float32Array(lines),
  }
}

/* -------------------------------------------------------------------------- */
/*  Shaders for the glowing node points                                        */
/* -------------------------------------------------------------------------- */
const nodeVertex = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  attribute float aScale;
  attribute float aOffset;
  attribute vec3 aColor;
  varying vec3 vColor;
  void main() {
    vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    // Gentle brightness/size pulse — positions stay put so edges stay attached.
    float pulse = 0.75 + 0.25 * sin(uTime * 1.5 + aOffset);
    gl_PointSize = uSize * aScale * pulse * (300.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`

const nodeFragment = /* glsl */ `
  varying vec3 vColor;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float halo = smoothstep(0.5, 0.0, d);
    float core = smoothstep(0.22, 0.0, d);
    vec3 col = vColor + core * 0.7;
    gl_FragColor = vec4(col, halo);
  }
`

/* -------------------------------------------------------------------------- */
/*  Ambient drifting dust                                                       */
/* -------------------------------------------------------------------------- */
const dustVertex = /* glsl */ `
  uniform float uTime;
  void main() {
    vec3 p = position;
    p.y += sin(uTime * 0.3 + position.x * 2.0) * 0.15;
    p.x += cos(uTime * 0.2 + position.z * 2.0) * 0.15;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = 0.045 * (300.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`
const dustFragment = /* glsl */ `
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d) * 0.35;
    gl_FragColor = vec4(0.28, 0.91, 0.68, a);
  }
`

/* -------------------------------------------------------------------------- */
/*  Component                                                                   */
/* -------------------------------------------------------------------------- */
export default function NeuralField({ nodeCount = 90 }: { nodeCount?: number }) {
  const group = useRef<THREE.Group>(null!)
  const nodeMat = useRef<THREE.ShaderMaterial>(null!)
  const dustMat = useRef<THREE.ShaderMaterial>(null!)

  const graph = useMemo(() => buildGraph(nodeCount), [nodeCount])

  const dust = useMemo(() => {
    const n = 700
    const arr = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 9
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    return arr
  }, [])

  const nodeUniforms = useMemo(
    () => ({ uTime: { value: 0 }, uSize: { value: 0.16 } }),
    []
  )
  const dustUniforms = useMemo(() => ({ uTime: { value: 0 } }), [])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    if (nodeMat.current) nodeMat.current.uniforms.uTime.value = t
    if (dustMat.current) dustMat.current.uniforms.uTime.value = t

    if (group.current) {
      // Slow autonomous rotation …
      group.current.rotation.y += delta * 0.06
      // … plus pointer parallax, eased.
      const px = state.pointer.x
      const py = state.pointer.y
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        py * 0.25,
        0.04
      )
      group.current.position.x = THREE.MathUtils.lerp(
        group.current.position.x,
        px * 0.4,
        0.04
      )
    }
  })

  return (
    <group ref={group}>
      {/* Edges */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[graph.linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#14d493"
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* Glowing nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[graph.positions, 3]}
          />
          <bufferAttribute attach="attributes-aColor" args={[graph.colors, 3]} />
          <bufferAttribute attach="attributes-aScale" args={[graph.scales, 1]} />
          <bufferAttribute
            attach="attributes-aOffset"
            args={[graph.offsets, 1]}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={nodeMat}
          uniforms={nodeUniforms}
          vertexShader={nodeVertex}
          fragmentShader={nodeFragment}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Ambient dust */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dust, 3]} />
        </bufferGeometry>
        <shaderMaterial
          ref={dustMat}
          uniforms={dustUniforms}
          vertexShader={dustVertex}
          fragmentShader={dustFragment}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}
