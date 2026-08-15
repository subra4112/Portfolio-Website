import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import CustomCursor from './components/CustomCursor'
import Preloader from './components/Preloader'
import { usePageTransition } from './components/PageTransition'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import ExperiencePage from './pages/ExperiencePage'
import SkillsPage from './pages/SkillsPage'
import ContactPage from './pages/ContactPage'

/** Jump to the top whenever the rendered page actually changes. */
function ScrollToTop({ pathname }: { pathname: string }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])
  return null
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const { displayLocation, overlay } = usePageTransition()

  return (
    <>
      {loading && <Preloader onDone={() => setLoading(false)} />}
      <CustomCursor />
      <ScrollProgress />
      <Nav />
      <ScrollToTop pathname={displayLocation.pathname} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-ink-900"
      >
        Skip to content
      </a>
      <main id="main">
        {/* Routed against displayLocation so the page swaps behind the curtain. */}
        <Routes location={displayLocation} key={displayLocation.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      {overlay}
      {/* location is read so the transition hook re-runs on every navigation */}
      <span hidden data-path={location.pathname} />
    </>
  )
}
