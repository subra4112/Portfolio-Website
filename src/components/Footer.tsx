import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react'

const SOCIALS = [
  { icon: Github, href: 'https://github.com/subra4112', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/subraraj', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:rvanush3@gmail.com', label: 'Email' },
]

const LINKS = [
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/skills', label: 'Skills' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative mt-10 border-t border-white/5">
      <div className="hairline absolute inset-x-0 top-0 opacity-50" />
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Link to="/" className="font-mono text-lg font-semibold text-mist-100">
              subra<span className="text-primary-400">raj</span>
            </Link>
            <p className="mt-2 max-w-sm text-sm text-mist-400">
              AI/ML engineer building generative clinical AI, agentic systems, and the
              production infrastructure that keeps them alive.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-mist-300 transition-colors hover:text-primary-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-mist-300 transition-colors hover:border-primary-400/40 hover:text-primary-300"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-mist-400 sm:flex-row">
          <span>© {year} Subramanian Raj Narayanan · Built with React, R3F &amp; Tailwind</span>
          <button
            onClick={toTop}
            className="group inline-flex items-center gap-1.5 transition-colors hover:text-primary-300"
          >
            Back to top
            <ArrowUp size={13} className="transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
