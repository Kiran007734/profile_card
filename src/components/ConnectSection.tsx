import { Reveal } from './Reveal'
import type { StudentProfile } from '../types'

interface ConnectSectionProps {
  profile: StudentProfile
}

interface ContactItem {
  label: string
  value: string
  href?: string
  icon: string
  external?: boolean
}

export function ConnectSection({ profile }: ConnectSectionProps) {
  const contacts: ContactItem[] = [
    { label: 'Instagram', value: '@kiran_archer', href: profile.instagram, icon: 'IG', external: true },
    { label: 'GitHub', value: 'Kiran007734', href: profile.github, icon: 'GH', external: true },
    { label: 'LinkedIn', value: profile.linkedin ? 'Open profile' : 'Profile link not added', href: profile.linkedin || undefined, icon: 'in', external: true },
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: '@' },
    { label: 'Phone', value: profile.phone, href: `tel:${profile.phone}`, icon: '↗' },
  ]

  return (
    <section id="connect" className="connect-section section-shell" aria-labelledby="connect-title">
      <div className="section-topline"><span>08 / Connect</span><span>Open to good questions</span></div>
      <Reveal className="connect-heading"><span className="section-label">Let’s make something</span><h2 id="connect-title" className="giant-heading">LET’S<br /><span>TALK<span className="accent-dot">.</span></span></h2></Reveal>
      <div className="connect-grid"><Reveal className="connect-copy" delay={100}><p>If you’re working on an interesting problem, building a thoughtful team, or simply want to compare notes — my inbox is open.</p><span className="connect-mark">↘</span><a className="connect-cta" href={`mailto:${profile.email}`}>Start a conversation <span>↗</span></a></Reveal><div className="social-links">{contacts.map((item, index) => <Reveal key={item.label} delay={140 + index * 70}><ContactLink item={item} index={index} /></Reveal>)}</div></div>
    </section>
  )
}

function ContactLink({ item, index }: { item: ContactItem; index: number }) {
  const content = <><span className="social-index">0{index + 1}</span><span className="social-icon" aria-hidden="true">{item.icon}</span><strong>{item.label}</strong><small>{item.value}</small><i>↗</i></>
  if (!item.href) return <div className="social-link social-link-disabled" aria-label={`${item.label} link not provided`}>{content}</div>
  return <a className="social-link" href={item.href} target={item.external ? '_blank' : undefined} rel={item.external ? 'noreferrer' : undefined} data-cursor="interactive" aria-label={`Open ${item.label}: ${item.value}`}>{content}</a>
}
