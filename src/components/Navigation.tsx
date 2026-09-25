import { useEffect, useState } from 'react'
import { MagneticButton } from './MagneticButton'

const NAV_ITEMS = [
  { id: 'profile', label: 'Profile' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'journey', label: 'Journey' },
  { id: 'skills', label: 'Skills' },
  { id: 'connect', label: 'Connect' },
]

interface NavigationProps {
  onEdit: () => void
}

export function Navigation({ onEdit }: NavigationProps) {
  const [activeId, setActiveId] = useState('profile')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const sections = NAV_ITEMS.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0.08, 0.2, 0.5] },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const jumpTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <header className="site-header">
      <button className="brand-mark" onClick={() => jumpTo('profile')} aria-label="Back to profile">
        K<span>.</span>
      </button>
      <nav id="main-navigation" className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
        <span className="nav-caption">STUDENT / 001</span>
        {NAV_ITEMS.map((item, index) => (
          <button key={item.id} className={`nav-link ${activeId === item.id ? 'is-active' : ''}`} onClick={() => jumpTo(item.id)}>
            <span className="nav-index">{String(index + 1).padStart(2, '0')}</span>
            <span>{item.label}</span>
          </button>
        ))}
        <MagneticButton className="nav-edit" onClick={onEdit}>
          Edit profile <span>↗</span>
        </MagneticButton>
      </nav>
      <button className={`menu-toggle ${menuOpen ? 'is-open' : ''}`} onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-controls="main-navigation">
        <span />
        <span />
        <span className="sr-only">Toggle navigation</span>
      </button>
    </header>
  )
}
