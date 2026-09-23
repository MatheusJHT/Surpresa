export type Present = {
  id: string
  day_number: number
  title: string
  is_active: boolean
}

export type PresentContent = {
  id: string
  day_number: number
  title: string
  success_message: string
  riddle: string
  photo_url: string | null
  hint: string | null
  is_active: boolean
}

export type SiteSettings = {
  site_title: string
  site_subtitle: string
  intro_message: string
  final_message: string
}

export type CarouselImage = {
  id: string
  image_url: string
  caption: string | null
  display_order: number
}

export type UserProgress = {
  id: string
  user_id: string
  present_id: string
  password_verified: boolean
  question_answered: boolean
  completed: boolean
  attempts: number
  completed_at: string | null
  created_at: string
  updated_at: string
}

export type AdminPresent = Present & {
  success_message: string
  riddle: string
  photo_url: string | null
  hint: string | null
  normalize_accents: boolean
  ignore_punctuation: boolean
}

export type AdminCarouselImage = CarouselImage & {
  is_active: boolean
  created_at: string
}

export type AdminOverview = {
  presents: AdminPresent[]
  settings: (SiteSettings & { id: string }) | null
  progress: UserProgress[]
  carousel: AdminCarouselImage[]
}