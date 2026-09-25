import { useState } from 'react'
import { Reveal } from './Reveal'
import type { StudentProfile } from '../types'

interface SkillsSectionProps {
  profile: StudentProfile
}

const GROUPS = [
  { number: '01', title: 'AI & ML', description: 'Turning data into informed decisions.', className: 'skill-coral' },
  { number: '02', title: 'FULL STACK', description: 'Making useful ideas feel complete.', className: 'skill-olive' },
  { number: '03', title: 'DATA', description: 'Finding the signal in the noise.', className: 'skill-blue' },
  { number: '04', title: 'INTERACTION', description: 'Giving technology a human rhythm.', className: 'skill-ink' },
]

export function SkillsSection({ profile }: SkillsSectionProps) {
  const [openGroup, setOpenGroup] = useState(0)
  const skillsForGroup = (groupIndex: number) => {
    const grouped = profile.skills.filter((_, skillIndex) => skillIndex % GROUPS.length === groupIndex)
    return grouped.length ? grouped : profile.skills.slice(0, 3)
  }

  return (
    <section id="skills" className="skills-section section-shell" aria-labelledby="skills-title">
      <div className="section-topline"><span>04 / Toolkit</span><span>{profile.skills.length} active skills</span></div>
      <div className="skills-head">
        <Reveal><span className="section-label">What I build</span><h2 id="skills-title" className="section-heading">Ideas with<br /><em>range.</em></h2></Reveal>
        <Reveal delay={100} className="skills-intro"><p>Different problems call for different tools. I like learning the language of each one.</p><span className="scroll-mark">↘</span></Reveal>
      </div>
      <div className="skill-list">
        {GROUPS.map((group, index) => {
          const isOpen = openGroup === index
          return (
            <Reveal key={group.number} delay={index * 55} className={`skill-row ${group.className} ${isOpen ? 'is-open' : ''}`}>
              <button className="skill-trigger" onClick={() => setOpenGroup(isOpen ? -1 : index)} aria-expanded={isOpen}>
                <span className="skill-number">{group.number}</span>
                <span className="skill-name">{group.title}</span>
                <span className="skill-description">{group.description}</span>
                <span className="skill-toggle">{isOpen ? '−' : '+'}</span>
              </button>
              <div className="skill-detail"><div>{skillsForGroup(index).map((skill) => <span key={skill}>{skill}</span>)}</div></div>
            </Reveal>
          )
        })}
      </div>
      <Reveal className="skill-ticker" delay={100}>
        <span>Current stack</span><div>{profile.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
      </Reveal>
    </section>
  )
}
