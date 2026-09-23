import { supabase } from './supabase'
import type { CarouselImage, Present, SiteSettings } from '../types/database'

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