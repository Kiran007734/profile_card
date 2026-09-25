import { PROOF_ITEMS } from '../data'
import { Reveal } from './Reveal'

export function ProofSection() {
  return (
    <section className="proof-section section-shell" aria-labelledby="proof-title">
      <div className="section-topline"><span>07 / Small pieces of proof</span><span>The work between the work</span></div>
      <div className="proof-head"><Reveal><span className="section-label">Evidence, in small type</span><h2 id="proof-title" className="section-heading">SMALL<br /><em>PIECES.</em></h2></Reveal><Reveal delay={100} className="proof-note"><p>A compact trail of communities, experiments, and technical work that keep the larger ideas honest.</p></Reveal></div>
      <div className="proof-list">{PROOF_ITEMS.map((item, index) => <Reveal key={item.label} delay={index * 60} className="proof-item"><span>{item.label}</span><strong>{item.title}</strong><p>{item.detail}</p><i>↗</i></Reveal>)}</div>
    </section>
  )
}
