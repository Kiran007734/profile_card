import type { StudentProfile } from '../types'

interface FooterProps {
  profile: StudentProfile
}

export function Footer({ profile }: FooterProps) {
  return (
    <footer className="site-footer section-shell">
      <span>K / 001 · {profile.name}</span>
      <span>{profile.email} · {profile.phone}</span>
      <span>Back to top <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">↑</button></span>
    </footer>
  )
}
