import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, FileText } from 'lucide-react'
import AvatarLogo from './AvatarLogo'
import ResumeModal from './ResumeModal'

const LINKS = [
  
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/skills', label: 'Skills' },
  { to: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [resume, setResume] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [location.pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <nav className="mx-auto max-w-6xl px-5 sm:px-8">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 ${
            scrolled ? 'glass-strong shadow-panel' : ''
          }`}
        >
          {/* Wordmark */}
          <Link to="/" className="group flex items-center gap-3" aria-label="Home">
            <AvatarLogo size={38} />
            <span className="font-display text-[17px] font-extrabold tracking-tight text-white">
              Subbu
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-mist-100' : 'text-mist-300 hover:text-mist-100'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <span className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-primary-400 to-violet-500" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
            <button
              onClick={() => setResume(true)}
              className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-blue/40 bg-blue-bg/60 px-4 py-2 text-sm font-semibold text-blue-text transition-all hover:border-blue hover:text-white"
            >
              <FileText size={15} /> Resume
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="text-mist-200 md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="mt-2 grid gap-1 rounded-2xl glass-strong p-3 md:hidden">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2.5 text-sm font-medium ${
                    isActive ? 'bg-primary-500/10 text-primary-200' : 'text-mist-300'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <button
              onClick={() => setResume(true)}
              className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-full border border-blue/40 bg-blue-bg/60 px-3 py-2.5 text-sm font-semibold text-blue-text"
            >
              <FileText size={15} /> Resume
            </button>
          </div>
        )}
      </nav>
      <ResumeModal open={resume} onClose={() => setResume(false)} />
    </header>
  )
}
