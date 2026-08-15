import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { buildShapes, type ShapeKey } from './shapes'

/* -------------------------------------------------------------------------- */
/*  Morph timing — kept in sync between the shader and the CPU "freeze" pass   */
/* -------------------------------------------------------------------------- */
const STAGGER = 0.35 // fraction of the morph spent staggering points in
const SPAN = 1 - STAGGER
const BURST = 0.6 // how far points bow outward mid-flight
const MORPH_SECONDS = 1.25

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uMorph;
  uniform float uSize;
  uniform float uSizeMul;
  uniform float uPulse;
  uniform float uScale;
  uniform float uSpin;
  uniform vec2  uPointer;

  attribute vec3  aTo;
  attribute float aSeed;
  attribute float aScale;

  varying float vDepth;
  varying float vSeed;

  void main() {
    // Per-point staggered morph: each particle starts a little later than the
    // last, so the shape re-forms as a wave rather than a uniform slide.
    float t = clamp((uMorph - aSeed * ${STAGGER.toFixed(2)}) / ${SPAN.toFixed(2)}, 0.0, 1.0);
    t = t * t * (3.0 - 2.0 * t);

    vec3 p = mix(position, aTo, t);
    vec3 dir = normalize(p + vec3(0.0001));

    // Bow outward at the midpoint of the transition, back to zero at the end.
    p += dir * sin(t * 3.141592) * ${BURST.toFixed(2)} * (0.35 + aSeed);

    // Ambient breathing so the cloud is never fully static.
    float n = sin(p.x * 1.6 + uTime * 0.55 + aSeed * 6.283)
            * cos(p.y * 1.4 - uTime * 0.42);
    p += dir * n * 0.06;

    // Cardiac pulse — the whole field beats.
    p *= 1.0 + uPulse * 0.055;
    p *= uScale;

    // Slow rotation about Y.
    float c = cos(uSpin);
    float s = sin(uSpin);
    p = vec3(p.x * c + p.z * s, p.y, -p.x * s + p.z * c);

    // Pointer parallax.
    p.x += uPointer.x * 0.4;
    p.y += uPointer.y * 0.3;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vDepth = clamp((p.y + 2.6) / 5.2, 0.0, 1.0);
    vSeed = aSeed;

    float twinkle = 0.72 + 0.28 * sin(uTime * 1.7 + aSeed * 6.283);
    gl_PointSize = uSize * uSizeMul * aScale * twinkle * (300.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3  uColorA;
  uniform vec3  uColorB;
  uniform float uOpacity;
  uniform float uAlphaMul;
  uniform float uCore;

  varying float vDepth;
  varying float vSeed;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float halo = smoothstep(0.5, 0.0, d);
    float core = smoothstep(0.18, 0.0, d);
    vec3 col = mix(uColorA, uColorB, vDepth) + core * uCore;
    gl_FragColor = vec4(col, halo * uOpacity * uAlphaMul * (0.55 + vSeed * 0.45));
  }
`

/**
 * Mirrors the shader's morph math on the CPU so an in-flight transition can be
 * frozen into a new starting buffer when the route changes mid-morph.
 */
function freeze(
  from: Float32Array,
  to: Float32Array,
  seeds: Float32Array,
  morph: number,
  out: Float32Array
) {
  for (let i = 0; i < seeds.length; i++) {
    let t = (morph - seeds[i] * STAGGER) / SPAN
    t = t < 0 ? 0 : t > 1 ? 1 : t
    t = t * t * (3 - 2 * t)

    const i3 = i * 3
    const x = from[i3] + (to[i3] - from[i3]) * t
    const y = from[i3 + 1] + (to[i3 + 1] - from[i3 + 1]) * t
    const z = from[i3 + 2] + (to[i3 + 2] - from[i3 + 2]) * t

    const burst = Math.sin(t * Math.PI) * BURST * (0.35 + seeds[i])
    const len = Math.hypot(x, y, z) || 1
    out[i3] = x + (x / len) * burst
    out[i3 + 1] = y + (y / len) * burst
    out[i3 + 2] = z + (z / len) * burst
  }
}

export interface MorphFieldProps {
  shape: ShapeKey
  count: number
  colorA: string
  colorB: string
  opacity: number
  scale: number
  /** 0–1: how strongly the cardiac pulse reads on this route. */
  pulse: number
}

export default function MorphField({
  shape,
  count,
  colorA,
  colorB,
  opacity,
  scale,
  pulse,
}: MorphFieldProps) {
  const shapes = useMemo(() => buildShapes(count), [count])

  // Per-point randomness drives the stagger, size jitter and twinkle.
  const { seeds, scales } = useMemo(() => {
    const seeds = new Float32Array(count)
    const scales = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      seeds[i] = Math.random()
      scales[i] = 0.55 + Math.random() * 1.35
    }
    return { seeds, scales }
  }, [count])

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const start = shapes[shape]
    g.setAttribute('position', new THREE.BufferAttribute(start.slice(), 3))
    g.setAttribute('aTo', new THREE.BufferAttribute(start.slice(), 3))
    g.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))
    g.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))
    // The cloud is always on screen and shifts in the vertex shader, so let it
    // skip frustum tests entirely.
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 12)
    return g
    // Rebuilt only when the point count changes; shape changes are animated.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])

  /**
   * Two materials share one uniforms object: a crisp core pass and a wide,
   * faint halo pass. Drawing the same points twice fakes a bloom glow without
   * an EffectComposer — which would otherwise flatten the transparent canvas
   * and hide the CSS gradient behind it.
   */
  const { material, halo, shared } = useMemo(() => {
    const shared = {
      uTime: { value: 0 },
      uMorph: { value: 1 },
      uSize: { value: 0.13 },
      uPulse: { value: 0 },
      uScale: { value: scale },
      uSpin: { value: 0 },
      uPointer: { value: new THREE.Vector2() },
      uColorA: { value: new THREE.Color(colorA) },
      uColorB: { value: new THREE.Color(colorB) },
      uOpacity: { value: opacity },
    }
    const base = {
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }
    const material = new THREE.ShaderMaterial({
      ...base,
      uniforms: {
        ...shared,
        uSizeMul: { value: 1 },
        uAlphaMul: { value: 1 },
        uCore: { value: 0.85 },
      },
    })
    const halo = new THREE.ShaderMaterial({
      ...base,
      uniforms: {
        ...shared,
        uSizeMul: { value: 3.4 },
        uAlphaMul: { value: 0.13 },
        uCore: { value: 0 },
      },
    })
    return { material, halo, shared }
    // Uniforms are animated imperatively; only rebuild on remount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Dispose GPU resources on unmount (R3F only auto-disposes JSX-created ones).
  useEffect(() => () => {
    geometry.dispose()
    material.dispose()
    halo.dispose()
  }, [geometry, material, halo])

  const anim = useRef({
    morph: 1,
    from: shapes[shape],
    to: shapes[shape],
    spin: 0,
    scale,
    opacity,
    pulse,
  })

  // Scratch buffers reused across transitions.
  const scratch = useMemo(() => new Float32Array(count * 3), [count])
  const targetColorA = useMemo(() => new THREE.Color(colorA), [colorA])
  const targetColorB = useMemo(() => new THREE.Color(colorB), [colorB])

  // Kick off a morph whenever the requested shape changes.
  useEffect(() => {
    const a = anim.current
    const next = shapes[shape]
    if (next === a.to) return

    const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute
    const toAttr = geometry.getAttribute('aTo') as THREE.BufferAttribute

    // Freeze wherever the current transition is, and morph on from there.
    freeze(a.from, a.to, seeds, a.morph, scratch)
    ;(posAttr.array as Float32Array).set(scratch)
    ;(toAttr.array as Float32Array).set(next)
    posAttr.needsUpdate = true
    toAttr.needsUpdate = true

    a.from = scratch.slice()
    a.to = next
    a.morph = 0
    shared.uMorph.value = 0
  }, [shape, shapes, geometry, shared, seeds, scratch])

  useFrame((state, delta) => {
    const u = shared
    const a = anim.current
    const t = state.clock.elapsedTime
    const d = Math.min(delta, 0.05) // clamp after tab-switches

    u.uTime.value = t

    if (a.morph < 1) {
      a.morph = Math.min(1, a.morph + d / MORPH_SECONDS)
      u.uMorph.value = a.morph
    }

    // Double-thump cardiac envelope, ~52 bpm.
    const beat = (t % 1.15) / 1.15
    const thump =
      Math.exp(-Math.pow((beat - 0.06) * 13, 2)) +
      Math.exp(-Math.pow((beat - 0.27) * 15, 2)) * 0.5
    a.pulse += (pulse - a.pulse) * d * 3
    u.uPulse.value = thump * a.pulse

    // Ease route-driven properties instead of snapping them.
    a.scale += (scale - a.scale) * d * 2.4
    a.opacity += (opacity - a.opacity) * d * 2.4
    u.uScale.value = a.scale
    u.uOpacity.value = a.opacity

    u.uColorA.value.lerp(targetColorA, d * 2)
    u.uColorB.value.lerp(targetColorB, d * 2)

    a.spin += d * 0.075
    u.uSpin.value = a.spin

    // Eased pointer parallax.
    const p = u.uPointer.value
    p.x += (state.pointer.x - p.x) * d * 2.2
    p.y += (state.pointer.y - p.y) * d * 2.2
  })

  return (
    <>
      <points frustumCulled={false} geometry={geometry} material={halo} />
      <points frustumCulled={false} geometry={geometry} material={material} />
    </>
  )
}
