import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import type { StudentProfile } from '../types'

interface EditProfileModalProps {
  isOpen: boolean
  profile: StudentProfile
  onClose: () => void
  onSave: (profile: StudentProfile) => void
  onReset: () => void
}

export function EditProfileModal({ isOpen, profile, onClose, onSave, onReset }: EditProfileModalProps) {
  const [draft, setDraft] = useState(profile)

  useEffect(() => {
    if (isOpen) setDraft(profile)
  }, [isOpen, profile])

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.body.classList.add('modal-open')
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.classList.remove('modal-open')
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const updateField = <Key extends keyof StudentProfile>(key: Key, value: StudentProfile[Key]) => {
    setDraft((current) => ({ ...current, [key]: value }))
  }

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const image = new Image()
      image.onload = () => {
        const maxDimension = 1200
        const scale = Math.min(1, maxDimension / Math.max(image.naturalWidth, image.naturalHeight))
        const canvas = document.createElement('canvas')
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale))
        canvas.height = Math.max(1, Math.round(image.naturalHeight * scale))
        canvas.getContext('2d')?.drawImage(image, 0, 0, canvas.width, canvas.height)
        updateField('photo', canvas.toDataURL('image/jpeg', 0.82))
      }
      image.src = String(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSave({ ...draft, name: draft.name.trim() || 'Kiran Raj M', skills: draft.skills.filter(Boolean) })
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.currentTarget === event.target && onClose()}>
      <div className="edit-panel" role="dialog" aria-modal="true" aria-labelledby="edit-title">
        <div className="edit-header"><div><span className="section-label">Profile / Edit mode</span><h2 id="edit-title">Make it yours<span className="accent-dot">.</span></h2></div><button className="close-button" onClick={onClose} aria-label="Close edit profile">X</button></div>
        <form onSubmit={handleSubmit}>
          <div className="edit-layout">
            <div className="edit-preview"><div className="edit-image"><img src={draft.photo} alt="Preview of profile portrait" /><span>Live preview</span></div><label className="upload-button">Upload a new photo<input type="file" accept="image/*" onChange={handleImageUpload} /></label><p>Or paste a hosted image URL below.</p><input aria-label="Profile photo URL" type="url" value={draft.photo.startsWith('data:') ? '' : draft.photo} placeholder="https://..." onChange={(event) => updateField('photo', event.target.value)} /></div>
            <div className="edit-fields">
              <label>Student name<input autoFocus required value={draft.name} onChange={(event) => updateField('name', event.target.value)} /></label>
              <div className="field-pair"><label>Department<input required value={draft.department} onChange={(event) => updateField('department', event.target.value)} /></label><label>Year<input required value={draft.year} onChange={(event) => updateField('year', event.target.value)} /></label></div>
              <label>College<input required value={draft.college} onChange={(event) => updateField('college', event.target.value)} /></label>
              <div className="field-pair"><label>Role<input value={draft.role} onChange={(event) => updateField('role', event.target.value)} /></label><label>FORESE role <span className="field-hint">optional</span><input value={draft.foreseRole} onChange={(event) => updateField('foreseRole', event.target.value)} placeholder="Use your current selected role" /></label></div>
              <label>Short bio<textarea rows={4} value={draft.bio} onChange={(event) => updateField('bio', event.target.value)} /></label>
              <label>Skills <span className="field-hint">comma separated</span><textarea rows={3} value={draft.skills.join(', ')} onChange={(event) => updateField('skills', event.target.value.split(',').map((skill) => skill.trim()))} /></label>
              <div className="field-pair"><label>GitHub<input type="url" value={draft.github} onChange={(event) => updateField('github', event.target.value)} /></label><label>LinkedIn<input type="url" value={draft.linkedin} onChange={(event) => updateField('linkedin', event.target.value)} /></label></div>
              <div className="field-pair"><label>Instagram<input type="url" value={draft.instagram} onChange={(event) => updateField('instagram', event.target.value)} /></label><label>Phone<input type="tel" value={draft.phone} onChange={(event) => updateField('phone', event.target.value)} /></label></div>
              <label>Email<input required type="email" value={draft.email} onChange={(event) => updateField('email', event.target.value)} /></label>
            </div>
          </div>
          <div className="edit-actions"><button type="button" className="reset-button" onClick={onReset}>Reset</button><span className="edit-action-spacer" /><button type="button" className="cancel-button" onClick={onClose}>Cancel</button><button type="submit" className="save-button">Save changes <span>-&gt;</span></button></div>
        </form>
      </div>
    </div>
  )
}
