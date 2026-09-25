import { Reveal } from './Reveal'
import { JOURNEY } from '../data'
import type { JourneyItem, StudentProfile } from '../types'

interface ExperienceSectionProps {
  profile: StudentProfile
}

export function ExperienceSection({ profile }: ExperienceSectionProps) {
  const renderJourneyItem = (item: JourneyItem, index: number) => (
    <Reveal key={item.label} delay={index * 80} className="journey-item">
      <span className="journey-node" aria-hidden="true" />
      <span className="journey-index">{item.label}</span>
      <span className="journey-year">{index === 0 ? profile.year.replace(/[^0-9]/g, '') || item.year : item.year}</span>
      <div className="journey-content"><h3>{item.title}</h3><p>{item.description}</p></div>
      <span className="journey-arrow">↗</span>
    </Reveal>
  )

  return (
    <section id="journey" className="experience-section section-shell" aria-labelledby="experience-title">
      <div className="section-topline"><span>05 / Journey</span><span>Learning in public</span></div>
      <div className="experience-head"><Reveal><span className="section-label">A work in progress</span><h2 id="experience-title" className="giant-heading">MY<br /><span>JOURNEY<span className="accent-dot">.</span></span></h2></Reveal></div>
      <div className="journey-list">
        <span className="journey-line" aria-hidden="true" />
        {JOURNEY.slice(0, 3).map((item, index) => renderJourneyItem(item, index))}
        {profile.foreseRole && <Reveal delay={240} className="journey-item">
          <span className="journey-node" aria-hidden="true" />
          <span className="journey-index">04 / FORESE</span>
          <span className="journey-year">NOW</span>
          <div className="journey-content"><h3>FORESE</h3><p>{profile.foreseRole} — contributing to the student community and its shared momentum.</p></div>
          <span className="journey-arrow">↗</span>
        </Reveal>}
        {JOURNEY.slice(3).map((item, index) => renderJourneyItem(item, index + 4))}
      </div>
    </section>
  )
}
