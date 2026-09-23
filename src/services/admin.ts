import { supabase } from './supabase'
import type { AdminOverview } from '../types/database'

export async function isCurrentUserAdmin() {
  const { data, error } = await supabase.rpc('is_current_user_admin')
  if (error) throw error
  return data === true
}

async function adminRequest<T>(body: Record<string, unknown>) {
  const { data, error } = await supabase.functions.invoke<T>('admin-api', { body })
  if (error) throw error
  return data as T
}

export function getAdminOverview() {
  return adminRequest<AdminOverview>({ action: 'overview' })
}

export function saveAdminPresent(payload: Record<string, unknown>) {
  return adminRequest<{ saved: boolean }>({ action: 'update_present', ...payload })
}

export function saveAdminSettings(payload: Record<string, unknown>) {
  return adminRequest<{ saved: boolean }>({ action: 'update_settings', ...payload })
}

export function resetJourneyProgress() {
  return adminRequest<{ reset: boolean }>({ action: 'reset_progress' })
}

export function saveAdminCarousel(payload: Record<string, unknown>) {
  return adminRequest<{ saved: boolean }>({ action: 'update_carousel', ...payload })
}