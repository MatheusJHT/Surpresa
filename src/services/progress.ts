import { supabase } from './supabase'
import type { UserProgress } from '../types/database'

export async function getMyProgress(): Promise<UserProgress[]> {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) throw error
  return (data ?? []) as UserProgress[]
}