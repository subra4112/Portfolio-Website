import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, FileText } from 'lucide-react'

const LINKS = [
  
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/skills', label: 'Skills' },
  { to: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
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
          <Link to="/" className="group flex items-center gap-2.5" aria-label="Home">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary-400 to-violet-500 font-mono text-sm font-bold text-ink-950">
              ⌁
            </span>
            <span className="font-mono text-sm font-semibold tracking-wide text-mist-100">
              subra<span className="text-primary-400">raj</span>
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
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex items-center gap-1.5 rounded-lg border border-primary-400/30 bg-primary-500/10 px-3.5 py-2 text-sm font-semibold text-primary-300 transition-all hover:border-primary-400/60 hover:text-primary-200"
            >
              <FileText size={15} /> Resume
            </a>
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
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1.5 rounded-lg border border-primary-400/30 bg-primary-500/10 px-3 py-2.5 text-sm font-semibold text-primary-300"
            >
              <FileText size={15} /> Resume
            </a>
          </div>
        )}
      </nav>
    </header>
  )
}
