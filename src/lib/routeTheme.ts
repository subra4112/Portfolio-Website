import type { ShapeKey } from '../three/shapes'

export interface RouteTheme {
  label: string
  /** Shown during the transition loader. */
  loading: string
  shape: ShapeKey
  color: string
  bg: string
  text: string
}

/**
 * Every route owns one of ChatGPT's six theme colours. That colour drives the
 * page's accents and the 3D transition loader, so navigation reads as moving
 * between distinct places rather than one flat surface.
 */
export const ROUTE_THEMES: Record<string, RouteTheme> = {
  '/': {
    label: 'Home',
    loading: 'Booting session',
    shape: 'heart',
    color: '#3a83f7',
    bg: '#133463',
    text: '#63a8f8',
  },
  '/projects': {
    label: 'Work',
    loading: 'Fetching systems',
    shape: 'lattice',
    color: '#53b559',
    bg: '#1f4e25',
    text: '#6cc971',
  },
  '/experience': {
    label: 'Experience',
    loading: 'Replaying epochs',
    shape: 'helix',
    color: '#ee7c37',
    bg: '#653218',
    text: '#f1a275',
  },
  '/skills': {
    label: 'Stack',
    loading: 'Mounting stack',
    shape: 'sphere',
    color: '#f6c543',
    bg: '#734615',
    text: '#f6c543',
  },
  '/contact': {
    label: 'Contact',
    loading: 'Opening channel',
    shape: 'knot',
    color: '#f077af',
    bg: '#663049',
    text: '#f491c0',
  },
}

export function themeForRoute(pathname: string): RouteTheme {
  return ROUTE_THEMES[pathname] ?? ROUTE_THEMES['/']
}
