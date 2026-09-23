import { json, options, readBody, requireUser, serviceClient } from '../_shared/http.ts'

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return options()
  if (request.method !== 'POST') return json({ content: null }, 405)

  const user = await requireUser(request)
  const body = await readBody(request)
  const presentId = typeof body?.present_id === 'string' ? body.present_id : ''
  if (!user || !presentId) return json({ content: null }, 400)

  const admin = serviceClient()
  const { data: progress } = await admin
    .from('user_progress')
    .select('password_verified')
    .eq('user_id', user.id)
    .eq('present_id', presentId)
    .maybeSingle()
  if (!progress?.password_verified) return json({ content: null })

  const { data: present } = await admin
    .from('presents')
    .select('id, day_number, title, success_message, riddle, photo_url, hint, is_active')
    .eq('id', presentId)
    .eq('is_active', true)
    .maybeSingle()
  if (!present) return json({ content: null })

  return json({ content: present })
})