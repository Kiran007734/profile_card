import { useEffect, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { PROJECTS } from '../data'
import type { ProjectItem } from '../types'
import { Reveal } from './Reveal'

function ProjectDetail({ project, onClose }: { project: ProjectItem; onClose: () => void }) {
  return (
    <div className="project-modal-backdrop" role="presentation" onMouseDown={(event) => event.currentTarget === event.target && onClose()}>
      <article className={`project-detail-panel project-${project.accent}`} role="dialog" aria-modal="true" aria-labelledby="project-detail-title">
        <div className="project-detail-visual"><span>{project.visual}</span><small>{project.number} / {project.category}</small></div>
        <div className="project-detail-copy"><div className="project-detail-topline"><span>{project.category}</span><button className="close-button" onClick={onClose} aria-label="Close project details">×</button></div><h2 id="project-detail-title">{project.name}<span className="accent-dot">.</span></h2><p className="project-detail-description">{project.detail}</p><div className="project-focus"><span>Focus /</span><div>{project.focus.map((item) => <span key={item}>{item}</span>)}</div></div>{project.href && <a className="detail-github" href={project.href} target="_blank" rel="noreferrer">Open repository <span>↗</span></a>}</div>
      </article>
    </div>
  )
}

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)

  useEffect(() => {
    if (!selectedProject) return
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedProject(null)
    }
    document.body.classList.add('project-modal-open')
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.classList.remove('project-modal-open')
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedProject])

  useEffect(() => {
    const rail = document.querySelector('.project-rail > div') as HTMLElement | null
    const section = document.getElementById('work')
    if (!rail || !section) return
    let frame = 0
    const updateRail = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const bounds = section.getBoundingClientRect()
        const progress = (window.innerHeight - bounds.top) / (bounds.height + window.innerHeight)
        const offset = Math.max(-170, Math.min(40, (progress - 0.2) * -240))
        rail.style.transform = `translate3d(${offset}px, 0, 0)`
      })
    }
    updateRail()
    window.addEventListener('scroll', updateRail, { passive: true })
    window.addEventListener('resize', updateRail)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', updateRail)
      window.removeEventListener('resize', updateRail)
    }
  }, [])

  const openProject = (project: ProjectItem) => setSelectedProject(project)
  const handleProjectKeyDown = (event: ReactKeyboardEvent<HTMLElement>, project: ProjectItem) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openProject(project)
    }
  }

  return (
    <section id="work" className="projects-section section-shell" aria-labelledby="projects-title">
      <div className="section-topline"><span>06 / Selected work</span><span>{PROJECTS.length} directions in motion</span></div>
      <div className="projects-head"><Reveal><span className="section-label">Selected work</span><h2 id="projects-title" className="section-heading">SELECTED<br /><em>WORK.</em></h2></Reveal><Reveal delay={120} className="projects-note"><p>Systems, platforms, and community spaces — each one a different answer to the same question: what could this become?</p><span className="scroll-mark">↘</span></Reveal></div>
      <div className="project-list">
        {PROJECTS.map((project, index) => (
          <Reveal key={project.id} className={`project-item project-${project.accent}`} delay={index * 55}>
            <article className="project-hit-area" role="button" tabIndex={0} data-cursor="interactive" data-cursor-label={`VIEW ${project.number}`} onClick={() => openProject(project)} onKeyDown={(event) => handleProjectKeyDown(event, project)} aria-label={`View details for ${project.name}`}>
              <div className="project-visual"><span className="project-number">{project.number}</span><span className="project-visual-word">{project.visual}</span><span className="project-orbit" /><span className="project-view-label">View / {project.number}</span></div>
              <div className="project-info"><span className="project-stack">{project.category} · {project.stack}</span><h3>{project.name}</h3><p>{project.description}</p><div className="project-info-footer"><span>Open details <b>↗</b></span>{project.href && <a href={project.href} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}>GitHub <b>↗</b></a>}</div></div>
            </article>
          </Reveal>
        ))}
      </div>
      <div className="project-rail" aria-hidden="true"><div>{PROJECTS.concat(PROJECTS.slice(0, 2)).map((project, index) => <span key={`${project.id}-${index}`}>{project.visual} <i>↗</i></span>)}</div></div>
      {selectedProject && <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  )
}
