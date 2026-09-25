export interface StudentProfile {
  name: string
  photo: string
  department: string
  year: string
  college: string
  role: string
  foreseRole: string
  bio: string
  skills: string[]
  instagram: string
  github: string
  linkedin: string
  email: string
  phone: string
}

export interface JourneyItem {
  year: string
  title: string
  description: string
  label: string
}

export interface ProjectItem {
  id: string
  number: string
  name: string
  description: string
  detail: string
  category: string
  stack: string
  focus: string[]
  href?: string
  visual: string
  accent: string
}

export interface ProofItem {
  label: string
  title: string
  detail: string
}
