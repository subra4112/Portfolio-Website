import { useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = /* glsl */ `
  uniform float uTime;
  attribute float aSeed;
  varying float vSeed;
  void main() {
    vSeed = aSeed;
    vec3 p = position;
    p.y += sin(uTime * 0.25 + position.x * 1.6) * 0.35;
    p.x += cos(uTime * 0.18 + position.z * 1.4) * 0.35;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = (0.9 + aSeed * 1.6) * (110.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3  uColor;
  uniform float uOpacity;
  varying float vSeed;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d) * uOpacity * (0.25 + vSeed * 0.75);
    gl_FragColor = vec4(uColor, a);
  }
`

/** Slow ambient motes that give the scene depth behind the main field. */
export default function Dust({
  count = 600,
  opacity = 0.5,
}: {
  count?: number
  opacity?: number
}) {
  const { geometry, material } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const seeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16
      positions[i * 3 + 1] = (Math.random() - 0.5) * 11
      positions[i * 3 + 2] = (Math.random() - 0.5) * 9 - 1
      seeds[i] = Math.random()
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))
    geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 20)

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#ffffff') },
        uOpacity: { value: opacity },
      },
    })
    return { geometry, material }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])

  useEffect(() => () => {
    geometry.dispose()
    material.dispose()
  }, [geometry, material])

  useFrame((state, delta) => {
    material.uniforms.uTime.value = state.clock.elapsedTime
    const cur = material.uniforms.uOpacity.value as number
    material.uniforms.uOpacity.value = cur + (opacity - cur) * Math.min(delta, 0.05) * 2.4
  })

  return <points frustumCulled={false} geometry={geometry} material={material} />
}
