import { Reveal } from './Reveal'
import type { StudentProfile } from '../types'

interface HeroProps {
  profile: StudentProfile
  onEdit: () => void
}

export function Hero({ profile, onEdit }: HeroProps) {
  const [firstName, ...rest] = profile.name.trim().split(' ')
  const lastName = rest.join(' ')

  return (
    <section id="profile" className="hero section-shell" aria-labelledby="hero-title">
      <span className="hero-decoration hero-decoration-one" aria-hidden="true" />
      <span className="hero-decoration hero-decoration-two" aria-hidden="true" />
      <div className="hero-topline section-topline">
        <span>01 / Profile</span>
        <span>Scroll to explore <i className="scroll-arrow">↓</i></span>
      </div>
      <div className="hero-grid">
        <div className="hero-copy">
          <Reveal className="hero-kicker"><span className="status-dot" /> {profile.year} / {profile.department}<small>{profile.college}</small></Reveal>
          <h1 id="hero-title" className="hero-title" aria-label={profile.name}>
            <Reveal delay={80}><span>{firstName || profile.name}</span></Reveal>
            {lastName && <Reveal delay={150}><span className="hero-title-offset">{lastName}</span></Reveal>}
          </h1>
          <Reveal className="hero-statement" delay={230}>
            <p>Building intelligent products,<br />interfaces and experiments<br />with code.</p>
          </Reveal>
        </div>
        <Reveal className="hero-portrait-wrap" delay={180}>
          <div className="hero-portrait-frame" data-cursor="interactive">
            <img src={profile.photo} alt={`${profile.name} profile portrait`} className="hero-portrait" />
            <div className="portrait-stamp">AI<br />DS</div>
            <span className="portrait-caption">Portrait / Current self</span>
          </div>
        </Reveal>
      </div>
      <div className="hero-footer">
        <p className="hero-note">A student profile, shaped like<br />a working notebook.</p>
        <button className="text-action" onClick={onEdit}>Update your details <span>↗</span></button>
        <span className="hero-year">© 2026</span>
      </div>
    </section>
  )
}
