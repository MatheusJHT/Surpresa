import { supabase } from './supabase'
import type { CarouselImage, Present, PresentContent, SiteSettings } from '../types/database'

export async function getPublicPresents(): Promise<Present[]> {
  const { data, error } = await supabase
    .from('public_presents')
    .select('*')
    .eq('is_active', true)
    .order('day_number', { ascending: true })

  if (error) throw error
  return (data ?? []) as Present[]
}

export async function getPublicSiteSettings(): Promise<SiteSettings | null> {
  const { data, error } = await supabase.from('public_site_settings').select('*').maybeSingle()

  if (error) throw error
  return (data as SiteSettings | null) ?? null
}

export async function getPublicCarouselImages(): Promise<CarouselImage[]> {
  const { data, error } = await supabase
    .from('public_carousel_images')
    .select('*')
    .order('display_order', { ascending: true })

  if (error) throw error
  return (data ?? []) as CarouselImage[]
}

export async function getPresentContent(presentId: string): Promise<PresentContent | null> {
  const { data, error } = await supabase.functions.invoke<{ content: PresentContent | null }>('get-present-content', {
    body: { present_id: presentId },
  })
  if (error) throw error
  return data?.content ?? null
}

export async function validatePresentPassword(presentId: string, password: string) {
  const { data, error } = await supabase.functions.invoke<{ success: boolean }>('validate-present-password', {
    body: { present_id: presentId, password },
  })
  if (error) throw error
  return data?.success === true
}

export async function validateAnswer(presentId: string, answer: string) {
  const { data, error } = await supabase.functions.invoke<{ correct: boolean }>('validate-answer', {
    body: { present_id: presentId, answer },
  })
  if (error) throw error
  return data?.correct === true
}