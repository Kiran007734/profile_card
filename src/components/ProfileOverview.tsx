import { Reveal } from './Reveal'
import type { StudentProfile } from '../types'

interface ProfileOverviewProps {
  profile: StudentProfile
}

export function ProfileOverview({ profile }: ProfileOverviewProps) {
  return (
    <section className="overview section-shell" aria-label="Profile information">
      <div className="section-topline"><span>02 / Snapshot</span><span>At a glance</span></div>
      <div className="overview-layout">
        <Reveal className="section-heading-wrap">
          <span className="section-label">Profile / 2026</span>
          <h2 className="section-heading">The details<br /><em>behind</em> the work.</h2>
        </Reveal>
        <div className="overview-content">
          <Reveal delay={100}>
            <p className="overview-lede">{profile.bio}</p>
          </Reveal>
          <div className="profile-facts">
            <Reveal delay={160} className="fact"><span>Name</span><strong>{profile.name}</strong></Reveal>
            <Reveal delay={220} className="fact"><span>Department</span><strong>{profile.department}</strong></Reveal>
            <Reveal delay={280} className="fact"><span>Year</span><strong>{profile.year}</strong></Reveal>
            <Reveal delay={340} className="fact"><span>College</span><strong>{profile.college}</strong></Reveal>
            <Reveal delay={400} className="fact"><span>Role</span><strong>{profile.role}</strong></Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
