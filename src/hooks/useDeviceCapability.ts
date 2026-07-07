import { useEffect, useState } from 'react'

export interface DeviceCapability {
  /** Coarse pointer / small viewport — treat as mobile. */
  isMobile: boolean
  /** Low core count, save-data, or no WebGL — render the static fallback. */
  isLowPower: boolean
}

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

/**
 * Detects whether this device should run the full GPU 3D hero or a lighter,
 * static fallback. Cheap heuristics only — runs once on mount.
 */
export function useDeviceCapability(): DeviceCapability {
  const [cap, setCap] = useState<DeviceCapability>({
    isMobile: false,
    isLowPower: false,
  })

  useEffect(() => {
    const isMobile =
      window.matchMedia('(max-width: 768px)').matches ||
      window.matchMedia('(pointer: coarse)').matches

    const cores = navigator.hardwareConcurrency ?? 8
    // saveData is non-standard but widely supported; access defensively.
    const saveData = (navigator as any).connection?.saveData === true

    const isLowPower = !detectWebGL() || cores <= 4 || saveData

    setCap({ isMobile, isLowPower })
  }, [])

  return cap
}
