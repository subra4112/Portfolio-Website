import { useEffect, useState } from 'react'

/** A thin neon progress bar pinned to the top of the viewport. */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const height = document.documentElement.scrollHeight - window.innerHeight
      setProgress(height > 0 ? (scrollTop / height) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed left-0 top-0 z-[90] h-0.5 w-full bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-primary-400 to-violet-500 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%`, boxShadow: '0 0 12px rgba(46,232,165,0.7)' }}
      />
    </div>
  )
}
