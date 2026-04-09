/**
 * Navbar — fixed top navigation with scroll show/hide behaviour.
 * Hides on scroll down, reappears on scroll up.
 * Responsive: collapses to hamburger menu on mobile.
 */
import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import LogoIcon from '../icons/Logo'
import MenuIcon from '../icons/Menu'

/** Navigation items. */
interface NavItem {
  label: string
  to: string
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Blog', to: '/blog' },
]

/** Scroll threshold (px) — navbar always visible above this. */
const SCROLL_THRESHOLD = 50

/** Single nav link — highlights when active. */
function NavLink({
  item,
  active,
  className,
  onClick,
}: {
  item: NavItem
  active: boolean
  className?: string
  onClick?: () => void
}) {
  return (
    <Link
      to={item.to}
      onClick={onClick}
      className={`text-sm transition-colors ${
        active ? 'text-terminal-green' : 'text-terminal-dim hover:text-terminal-green'
      } ${className ?? ''}`}
    >
      {item.label}
    </Link>
  )
}

export default function Navbar() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)

  /* Hide navbar on scroll down, show on scroll up. */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setVisible(y < SCROLL_THRESHOLD || y < lastScrollY.current)
      lastScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Close mobile menu on route change. */
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const navClasses = [
    'fixed top-0 left-0 right-0 z-40',
    'bg-terminal-bg/80 backdrop-blur-xl',
    'border-b border-terminal-border',
    'transition-transform duration-300',
    visible ? 'translate-y-0' : '-translate-y-full',
  ].join(' ')

  return (
    <nav className={navClasses}>
      {/* Desktop bar */}
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 text-terminal-green font-bold text-sm hover:text-terminal-cyan transition-colors"
        >
          <LogoIcon />
          <span className="text-terminal-dim font-bold text-sm hidden sm:inline">Cameron Wickes</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.label} item={item} active={pathname === item.to} />
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden text-terminal-dim hover:text-terminal-green"
          aria-label="Toggle menu"
        >
          <MenuIcon open={menuOpen} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-terminal-border bg-terminal-bg/95 backdrop-blur-xl">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.label}
              item={item}
              active={pathname === item.to}
              className="block px-6 py-3 hover:bg-terminal-surface"
              onClick={() => setMenuOpen(false)}
            />
          ))}
        </div>
      )}
    </nav>
  )
}
