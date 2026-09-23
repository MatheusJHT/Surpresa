import { supabase } from './supabase'

const bucket = 'romantic-site'

export async function uploadCarouselImage(file: File) {
  const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const path = `carousel/${crypto.randomUUID()}.${extension}`
  const { error } = await supabase.storage.from(bucket).upload(path, file, { contentType: file.type, upsert: false })
  if (error) throw error
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return { path, url: data.publicUrl }
}

export async function removeCarouselImage(path: string) {
  const { error } = await supabase.storage.from(bucket).remove([path])
  if (error) throw error
}

export function storagePathFromUrl(url: string) {
  const marker = `/storage/v1/object/public/${bucket}/`
  return url.includes(marker) ? decodeURIComponent(url.split(marker)[1]) : null
}