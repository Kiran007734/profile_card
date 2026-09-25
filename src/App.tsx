import { useEffect, useState } from 'react'
import { AboutSection } from './components/AboutSection'
import { ConnectSection } from './components/ConnectSection'
import { CustomCursor } from './components/CustomCursor'
import { EditProfileModal } from './components/EditProfileModal'
import { ExperienceSection } from './components/ExperienceSection'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navigation } from './components/Navigation'
import { ProfileOverview } from './components/ProfileOverview'
import { ProjectsSection } from './components/ProjectsSection'
import { ProofSection } from './components/ProofSection'
import { SkillsSection } from './components/SkillsSection'
import { loadProfile, resetProfile, saveProfile } from './profileStorage'
import type { StudentProfile } from './types'

function App() {
  const [profile, setProfile] = useState<StudentProfile>(loadProfile)
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [showSaved, setShowSaved] = useState(false)

  useEffect(() => {
    saveProfile(profile)
  }, [profile])

  useEffect(() => {
    const updateProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0
      document.documentElement.style.setProperty('--scroll-progress', `${progress}%`)
      document.documentElement.style.setProperty('--hero-parallax', `${Math.min(window.scrollY * 0.06, 42)}px`)
    }
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  const handleSave = (nextProfile: StudentProfile) => {
    setProfile(nextProfile)
    setIsEditorOpen(false)
    setShowSaved(true)
    window.setTimeout(() => setShowSaved(false), 2600)
  }

  const handleReset = () => {
    setProfile(resetProfile())
    setIsEditorOpen(false)
    setShowSaved(true)
    window.setTimeout(() => setShowSaved(false), 2600)
  }

  return (
    <>
      <CustomCursor />
      <Navigation onEdit={() => setIsEditorOpen(true)} />
      <main>
        <Hero profile={profile} onEdit={() => setIsEditorOpen(true)} />
        <ProfileOverview profile={profile} />
        <AboutSection />
        <SkillsSection profile={profile} />
        <ExperienceSection profile={profile} />
        <ProjectsSection />
        <ProofSection />
        <ConnectSection profile={profile} />
      </main>
      <Footer profile={profile} />
      <div className={`save-toast ${showSaved ? 'is-visible' : ''}`} role="status"><span>✓</span> Profile updated</div>
      <div className="page-progress" aria-hidden="true"><span /></div>
      <EditProfileModal isOpen={isEditorOpen} profile={profile} onClose={() => setIsEditorOpen(false)} onSave={handleSave} onReset={handleReset} />
    </>
  )
}

export default App
