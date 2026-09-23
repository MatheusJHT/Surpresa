import bcrypt from 'npm:bcryptjs@2.4.3'
import { json, options, readBody, requireUser, serviceClient } from '../_shared/http.ts'
import { normalizeAnswer } from '../_shared/normalize.ts'

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return options()
  if (request.method !== 'POST') return json({ correct: false }, 405)

  const user = await requireUser(request)
  const body = await readBody(request)
  const presentId = typeof body?.present_id === 'string' ? body.present_id : ''
  const answer = typeof body?.answer === 'string' ? body.answer : ''
  if (!user || !presentId || !answer.trim()) return json({ correct: false }, 400)

  const admin = serviceClient()
  const [{ data: present }, { data: progress }] = await Promise.all([
    admin.from('presents').select('id, answer_hash, normalize_accents, ignore_punctuation').eq('id', presentId).maybeSingle(),
    admin.from('user_progress').select('password_verified, attempts').eq('user_id', user.id).eq('present_id', presentId).maybeSingle(),
  ])
  if (!present || !progress?.password_verified) return json({ correct: false })

  const normalized = normalizeAnswer(answer, present.normalize_accents, present.ignore_punctuation)
  const correct = await bcrypt.compare(normalized, present.answer_hash)
  const attempts = (progress.attempts ?? 0) + 1

  await admin.from('user_progress').update({
    attempts,
    ...(correct ? { question_answered: true, completed: true, completed_at: new Date().toISOString() } : {}),
  }).eq('user_id', user.id).eq('present_id', presentId)

  return json({ correct })
})