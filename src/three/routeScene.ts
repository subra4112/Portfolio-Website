import type { ShapeKey } from './shapes'

export interface RouteScene {
  shape: ShapeKey
  colorA: string
  colorB: string
  /** Field opacity — inner pages dim so body copy stays readable. */
  opacity: number
  scale: number
  /** How strongly the cardiac pulse reads, 0–1. */
  pulse: number
  cameraZ: number
}

/**
 * Each page gets its own form, palette and camera distance. The home page runs
 * the beating heart up close; content pages pull back, dim, and settle into a
 * shape that matches what the page is about.
 */
const SCENES: Record<string, RouteScene> = {
  '/': {
    shape: 'heart',
    colorA: '#2ee8a5',
    colorB: '#7c66ff',
    opacity: 1,
    scale: 1,
    pulse: 1,
    cameraZ: 6.8,
  },
  '/about': {
    shape: 'brain',
    colorA: '#2ee8a5',
    colorB: '#9683ff',
    opacity: 0.4,
    scale: 0.86,
    pulse: 0.3,
    cameraZ: 8.4,
  },
  '/projects': {
    shape: 'lattice',
    colorA: '#5bf5bd',
    colorB: '#7c66ff',
    opacity: 0.34,
    scale: 0.86,
    pulse: 0.18,
    cameraZ: 8.6,
  },
  '/experience': {
    shape: 'helix',
    colorA: '#2ee8a5',
    colorB: '#ffbe5c',
    opacity: 0.36,
    scale: 0.86,
    pulse: 0.22,
    cameraZ: 8.4,
  },
  '/skills': {
    shape: 'sphere',
    colorA: '#2ee8a5',
    colorB: '#5bf5bd',
    opacity: 0.32,
    scale: 0.86,
    pulse: 0.18,
    cameraZ: 8.6,
  },
  '/contact': {
    shape: 'knot',
    colorA: '#7c66ff',
    colorB: '#2ee8a5',
    opacity: 0.42,
    scale: 0.86,
    pulse: 0.35,
    cameraZ: 8.2,
  },
}

export function sceneForRoute(pathname: string): RouteScene {
  return SCENES[pathname] ?? SCENES['/']
}
