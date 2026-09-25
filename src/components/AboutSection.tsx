import { Reveal } from './Reveal'

export function AboutSection() {
  return (
    <section id="about" className="about-section section-shell" aria-labelledby="about-title">
      <div className="section-topline"><span>03 / Point of view</span><span>About me</span></div>
      <Reveal className="about-intro">
        <span className="section-label">A little context</span>
        <h2 id="about-title" className="giant-heading">ABOUT<br /><span>ME<span className="accent-dot">.</span></span></h2>
      </Reveal>
      <div className="about-bottom">
        <Reveal className="about-aside" delay={100}><span>(01)</span><span>Curious by default.<br />Precise by practice.</span></Reveal>
        <Reveal className="about-copy" delay={160}>
          <p>I’m an Artificial Intelligence & Data Science student interested in the space where intelligent systems become useful, understandable, and a little more delightful to use.</p>
          <p>From full-stack builds and AI/ML experiments to hackathons, project development, and technical club work, I like moving an idea all the way from a messy question to something people can try.</p>
        </Reveal>
      </div>
    </section>
  )
}
