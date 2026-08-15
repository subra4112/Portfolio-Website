import * as THREE from 'three'
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js'

/**
 * Procedural point-cloud targets. Every generator returns a Float32Array of
 * `count * 3` positions normalized to the same bounding radius, so the particle
 * field can morph cleanly between any two of them.
 */

export type ShapeKey = 'heart' | 'brain' | 'lattice' | 'helix' | 'sphere' | 'knot'

const RADIUS = 2.5

/** Center on the origin and scale so the farthest point sits at `RADIUS`. */
function normalize(arr: Float32Array): Float32Array {
  const n = arr.length / 3
  let cx = 0
  let cy = 0
  let cz = 0
  for (let i = 0; i < n; i++) {
    cx += arr[i * 3]
    cy += arr[i * 3 + 1]
    cz += arr[i * 3 + 2]
  }
  cx /= n
  cy /= n
  cz /= n

  let max = 0
  for (let i = 0; i < n; i++) {
    const x = (arr[i * 3] -= cx)
    const y = (arr[i * 3 + 1] -= cy)
    const z = (arr[i * 3 + 2] -= cz)
    const d = Math.sqrt(x * x + y * y + z * z)
    if (d > max) max = d
  }
  if (max > 0) {
    const s = RADIUS / max
    for (let i = 0; i < arr.length; i++) arr[i] *= s
  }
  return arr
}

/** Evenly distributed directions on a unit sphere (Fibonacci lattice). */
function fibonacciDir(i: number, total: number, out: THREE.Vector3): THREE.Vector3 {
  const phi = Math.acos(1 - (2 * (i + 0.5)) / total)
  const theta = Math.PI * (1 + Math.sqrt(5)) * i
  out.set(
    Math.sin(phi) * Math.cos(theta),
    Math.sin(phi) * Math.sin(theta),
    Math.cos(phi)
  )
  return out
}

/* -------------------------------------------------------------------------- */
/*  Heart — the signature shape (home)                                        */
/* -------------------------------------------------------------------------- */
function heart(count: number): Float32Array {
  // Classic two-lobe heart outline. As authored it points "up", so the
  // extruded geometry gets flipped below.
  const shape = new THREE.Shape()
  shape.moveTo(0.5, 0.5)
  shape.bezierCurveTo(0.5, 0.5, 0.4, 0, 0, 0)
  shape.bezierCurveTo(-0.6, 0, -0.6, 0.7, -0.6, 0.7)
  shape.bezierCurveTo(-0.6, 1.1, -0.3, 1.54, 0.5, 1.9)
  shape.bezierCurveTo(1.2, 1.54, 1.6, 1.1, 1.6, 0.7)
  shape.bezierCurveTo(1.6, 0.7, 1.6, 0, 1.0, 0)
  shape.bezierCurveTo(0.7, 0, 0.5, 0.5, 0.5, 0.5)

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.55,
    bevelEnabled: true,
    bevelSegments: 10,
    bevelSize: 0.34,
    bevelThickness: 0.34,
    curveSegments: 32,
  })
  geo.rotateZ(Math.PI)
  geo.center()

  const solid = geo.index ? geo.toNonIndexed() : geo
  const mesh = new THREE.Mesh(solid)
  const sampler = new MeshSurfaceSampler(mesh).build()

  const out = new Float32Array(count * 3)
  const v = new THREE.Vector3()
  for (let i = 0; i < count; i++) {
    sampler.sample(v)
    out[i * 3] = v.x
    out[i * 3 + 1] = v.y
    out[i * 3 + 2] = v.z
  }

  solid.dispose()
  if (solid !== geo) geo.dispose()
  return normalize(out)
}

/* -------------------------------------------------------------------------- */
/*  Brain — two wrinkled lobes (about)                                        */
/* -------------------------------------------------------------------------- */
function brain(count: number): Float32Array {
  const out = new Float32Array(count * 3)
  const v = new THREE.Vector3()
  for (let i = 0; i < count; i++) {
    fibonacciDir(i, count, v)
    // Ellipsoid body, then split into left/right hemispheres.
    v.x *= 1.15
    v.y *= 0.92
    v.z *= 1.0
    const side = i % 2 === 0 ? -1 : 1
    v.x += side * 0.42
    // Gyri-like surface wrinkles.
    const w =
      Math.sin(v.x * 5.5) * Math.sin(v.y * 6.5) * Math.sin(v.z * 5.0) * 0.09
    v.multiplyScalar(1 + w)
    // Flatten the underside slightly so it reads as a brain, not a blob.
    if (v.y < 0) v.y *= 0.82
    out[i * 3] = v.x
    out[i * 3 + 1] = v.y
    out[i * 3 + 2] = v.z
  }
  return normalize(out)
}

/* -------------------------------------------------------------------------- */
/*  Lattice — a structured grid of nodes (projects)                           */
/* -------------------------------------------------------------------------- */
function lattice(count: number): Float32Array {
  const per = Math.ceil(Math.cbrt(count * 2.4))
  const cells: number[] = []
  for (let x = 0; x < per; x++) {
    for (let y = 0; y < per; y++) {
      for (let z = 0; z < per; z++) {
        const onShell =
          x === 0 || y === 0 || z === 0 ||
          x === per - 1 || y === per - 1 || z === per - 1
        // Keep the shell plus a sparse interior so it reads as volume, not a box.
        if (onShell || Math.random() < 0.16) cells.push(x, y, z)
      }
    }
  }

  const out = new Float32Array(count * 3)
  const total = cells.length / 3
  for (let i = 0; i < count; i++) {
    // Deterministic stride keeps the lattice even when cells > count.
    const c = Math.floor((i / count) * total) * 3
    const j = (per - 1) / 2
    out[i * 3] = (cells[c] - j) / j + (Math.random() - 0.5) * 0.05
    out[i * 3 + 1] = (cells[c + 1] - j) / j + (Math.random() - 0.5) * 0.05
    out[i * 3 + 2] = (cells[c + 2] - j) / j + (Math.random() - 0.5) * 0.05
  }
  return normalize(out)
}

/* -------------------------------------------------------------------------- */
/*  Helix — a double strand with rungs (experience / timeline)                 */
/* -------------------------------------------------------------------------- */
function helix(count: number): Float32Array {
  const out = new Float32Array(count * 3)
  const turns = 3.2
  const height = 5.2
  const r = 1.15
  for (let i = 0; i < count; i++) {
    const t = i / count
    const a = t * Math.PI * 2 * turns
    const y = (t - 0.5) * height
    const slot = i % 5
    if (slot < 2) {
      // The two backbones.
      const off = slot * Math.PI
      out[i * 3] = Math.cos(a + off) * r
      out[i * 3 + 1] = y
      out[i * 3 + 2] = Math.sin(a + off) * r
    } else {
      // Rungs bridging the strands.
      const f = (slot - 2) / 2 // 0, 0.5, 1
      const x1 = Math.cos(a) * r
      const z1 = Math.sin(a) * r
      const x2 = Math.cos(a + Math.PI) * r
      const z2 = Math.sin(a + Math.PI) * r
      out[i * 3] = x1 + (x2 - x1) * f
      out[i * 3 + 1] = y
      out[i * 3 + 2] = z1 + (z2 - z1) * f
    }
  }
  return normalize(out)
}

/* -------------------------------------------------------------------------- */
/*  Sphere — the full stack as a globe (skills)                               */
/* -------------------------------------------------------------------------- */
function sphere(count: number): Float32Array {
  const out = new Float32Array(count * 3)
  const v = new THREE.Vector3()
  for (let i = 0; i < count; i++) {
    fibonacciDir(i, count, v)
    // A thin shell rather than a hard surface.
    v.multiplyScalar(1 + (Math.random() - 0.5) * 0.06)
    out[i * 3] = v.x
    out[i * 3 + 1] = v.y
    out[i * 3 + 2] = v.z
  }
  return normalize(out)
}

/* -------------------------------------------------------------------------- */
/*  Torus knot — connection / signal (contact)                                */
/* -------------------------------------------------------------------------- */
function knot(count: number): Float32Array {
  const out = new Float32Array(count * 3)
  const p = 2
  const q = 3
  const tube = 0.42
  for (let i = 0; i < count; i++) {
    const u = (i / count) * Math.PI * 2 * p
    const cu = Math.cos(u)
    const su = Math.sin(u)
    const quOverP = (q / p) * u
    const cs = Math.cos(quOverP)

    const cx = (2 + cs) * cu * 0.5
    const cy = (2 + cs) * su * 0.5
    const cz = Math.sin(quOverP) * 0.5

    // Scatter around the curve so the knot reads as a solid tube.
    const a = Math.random() * Math.PI * 2
    const rr = tube * Math.sqrt(Math.random())
    out[i * 3] = cx + Math.cos(a) * rr
    out[i * 3 + 1] = cy + Math.sin(a) * rr
    out[i * 3 + 2] = cz + Math.cos(a * 1.7) * rr * 0.8
  }
  return normalize(out)
}

const GENERATORS: Record<ShapeKey, (count: number) => Float32Array> = {
  heart,
  brain,
  lattice,
  helix,
  sphere,
  knot,
}

/** Builds every morph target once, for a given particle count. */
export function buildShapes(count: number): Record<ShapeKey, Float32Array> {
  return {
    heart: GENERATORS.heart(count),
    brain: GENERATORS.brain(count),
    lattice: GENERATORS.lattice(count),
    helix: GENERATORS.helix(count),
    sphere: GENERATORS.sphere(count),
    knot: GENERATORS.knot(count),
  }
}
