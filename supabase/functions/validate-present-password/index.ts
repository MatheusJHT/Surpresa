import bcrypt from 'npm:bcryptjs@2.4.3'
import { json, options, readBody, requireUser, serviceClient } from '../_shared/http.ts'

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return options()
  if (request.method !== 'POST') return json({ success: false }, 405)

  const user = await requireUser(request)
  const body = await readBody(request)
  const presentId = typeof body?.present_id === 'string' ? body.present_id : ''
  const password = typeof body?.password === 'string' ? body.password.trim() : ''
  if (!user || !presentId || !password) return json({ success: false }, 400)

  const admin = serviceClient()
  const { data: present } = await admin
    .from('presents')
    .select('id, day_number, password_hash, is_active')
    .eq('id', presentId)
    .maybeSingle()

  if (!present?.is_active || !(await canAccessPresent(admin, user.id, present.day_number))) {
    return json({ success: false })
  }

  const valid = await bcrypt.compare(password, present.password_hash)
  if (!valid) return json({ success: false })

  await admin.from('user_progress').upsert(
    { user_id: user.id, present_id: present.id, password_verified: true },
    { onConflict: 'user_id,present_id' },
  )
  return json({ success: true })
})

async function canAccessPresent(admin: ReturnType<typeof serviceClient>, userId: string, dayNumber: number) {
  if (dayNumber === 1) return true
  const { data: previous } = await admin
    .from('presents')
    .select('id')
    .eq('day_number', dayNumber - 1)
    .maybeSingle()
  if (!previous) return false
  const { data: progress } = await admin
    .from('user_progress')
    .select('completed')
    .eq('user_id', userId)
    .eq('present_id', previous.id)
    .maybeSingle()
  return progress?.completed === true
}