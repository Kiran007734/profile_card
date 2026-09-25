import { DEFAULT_PROFILE } from './data'
import type { StudentProfile } from './types'

const STORAGE_KEY = 'studentProfile'
const LEGACY_STORAGE_KEY = 'kiran-student-profile-v2'

function normalizeProfile(value: Partial<StudentProfile>): StudentProfile {
  const profile = { ...DEFAULT_PROFILE, ...value }
  return {
    ...profile,
    name: profile.name === 'Kiran' ? DEFAULT_PROFILE.name : profile.name,
    github: profile.github === 'https://github.com/' ? DEFAULT_PROFILE.github : profile.github,
    linkedin: profile.linkedin === 'https://www.linkedin.com/' ? DEFAULT_PROFILE.linkedin : profile.linkedin,
    email: profile.email === 'hello@kiran.dev' ? DEFAULT_PROFILE.email : profile.email,
    foreseRole: profile.foreseRole || DEFAULT_PROFILE.foreseRole,
  }
}

export function loadProfile(): StudentProfile {
  if (typeof window === 'undefined') return DEFAULT_PROFILE
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY) ?? window.localStorage.getItem(LEGACY_STORAGE_KEY)
    return stored ? normalizeProfile(JSON.parse(stored) as Partial<StudentProfile>) : DEFAULT_PROFILE
  } catch {
    return DEFAULT_PROFILE
  }
}

export function saveProfile(profile: StudentProfile) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
  } catch {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...profile, photo: DEFAULT_PROFILE.photo }))
    } catch {
      return
    }
  }
}

export function resetProfile() {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(STORAGE_KEY)
    window.localStorage.removeItem(LEGACY_STORAGE_KEY)
  }
  return DEFAULT_PROFILE
}
