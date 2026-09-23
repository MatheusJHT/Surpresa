import bcrypt from 'npm:bcryptjs@2.4.3'
import { json, options, readBody, requireUser, serviceClient } from '../_shared/http.ts'
import { normalizeAnswer } from '../_shared/normalize.ts'

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return options()
  if (request.method !== 'POST') return json({ error: 'Método não permitido.' }, 405)

  const user = await requireUser(request)
  const body = await readBody(request)
  if (!user || !body) return json({ error: 'Não autorizado.' }, 401)

  const admin = serviceClient()
  if (!(await isAdmin(admin, user.id))) return json({ error: 'Não autorizado.' }, 403)

  try {
    switch (body.action) {
      case 'overview': return json(await getOverview(admin))
      case 'update_present': return json(await updatePresent(admin, body))
      case 'update_settings': return json(await updateSettings(admin, body))
      case 'reset_progress': return json(await resetProgress(admin))
      case 'update_carousel': return json(await updateCarousel(admin, body))
      case 'create_carousel': return json(await createCarousel(admin, body))
      case 'delete_carousel': return json(await deleteCarousel(admin, body))
      default: return json({ error: 'Ação desconhecida.' }, 400)
    }
  } catch {
    return json({ error: 'Não foi possível concluir essa alteração.' }, 400)
  }
})

async function isAdmin(admin: ReturnType<typeof serviceClient>, userId: string) {
  const { data } = await admin.from('site_settings').select('admin_user_id').limit(1).maybeSingle()
  return data?.admin_user_id === userId
}

async function getOverview(admin: ReturnType<typeof serviceClient>) {
  const [presentsResult, settingsResult, progressResult, carouselResult] = await Promise.all([
    admin.from('presents').select('id,day_number,title,success_message,riddle,photo_url,hint,normalize_accents,ignore_punctuation,is_active').order('day_number'),
    admin.from('site_settings').select('id,site_title,site_subtitle,intro_message,final_message').limit(1).maybeSingle(),
    admin.from('user_progress').select('id,user_id,present_id,password_verified,question_answered,completed,attempts,completed_at,created_at,updated_at').order('created_at'),
    admin.from('carousel_images').select('id,image_url,caption,display_order,is_active,created_at').order('display_order'),
  ])
  const failed = [presentsResult, settingsResult, progressResult, carouselResult].find((result) => result.error)
  if (failed?.error) throw new Error(`Falha ao carregar dados administrativos: ${failed.error.message}`)
  return { presents: presentsResult.data ?? [], settings: settingsResult.data ?? null, progress: progressResult.data ?? [], carousel: carouselResult.data ?? [] }
}

async function updatePresent(admin: ReturnType<typeof serviceClient>, body: Record<string, unknown>) {
  const presentId = typeof body.present_id === 'string' ? body.present_id : ''
  if (!presentId) throw new Error('Present inválido')
  const update: Record<string, unknown> = {}
  for (const field of ['title', 'question', 'success_message', 'riddle', 'photo_url', 'hint']) {
    if (typeof body[field] === 'string') update[field] = body[field]
  }
  for (const field of ['normalize_accents', 'ignore_punctuation', 'is_active']) {
    if (typeof body[field] === 'boolean') update[field] = body[field]
  }
  if (typeof body.password === 'string' && body.password.trim()) update.password_hash = await bcrypt.hash(body.password.trim(), 10)
  if (typeof body.answer === 'string' && body.answer.trim()) {
    const normalized = normalizeAnswer(body.answer, body.normalize_accents !== false, body.ignore_punctuation !== false)
    update.answer_hash = await bcrypt.hash(normalized, 10)
  }
  const { error } = await admin.from('presents').update(update).eq('id', presentId)
  if (error) throw error
  return { saved: true }
}

async function updateSettings(admin: ReturnType<typeof serviceClient>, body: Record<string, unknown>) {
  const update: Record<string, unknown> = {}
  for (const field of ['site_title', 'site_subtitle', 'intro_message', 'final_message']) {
    if (typeof body[field] === 'string') update[field] = body[field]
  }
  const { data: settings } = await admin.from('site_settings').select('id').limit(1).maybeSingle()
  if (!settings) throw new Error('Configuração ausente')
  const { error } = await admin.from('site_settings').update(update).eq('id', settings.id)
  if (error) throw error
  return { saved: true }
}

async function resetProgress(admin: ReturnType<typeof serviceClient>) {
  const { error } = await admin.from('user_progress').delete().not('id', 'is', null)
  if (error) throw error
  return { reset: true }
}

async function updateCarousel(admin: ReturnType<typeof serviceClient>, body: Record<string, unknown>) {
  const imageId = typeof body.image_id === 'string' ? body.image_id : ''
  if (!imageId) throw new Error('Imagem inválida')
  const update = {
    ...(typeof body.image_url === 'string' ? { image_url: body.image_url } : {}),
    caption: typeof body.caption === 'string' ? body.caption : null,
    display_order: typeof body.display_order === 'number' ? body.display_order : 0,
    is_active: body.is_active !== false,
  }
  const { error } = await admin.from('carousel_images').update(update).eq('id', imageId)
  if (error) throw error
  return { saved: true }
}

async function createCarousel(admin: ReturnType<typeof serviceClient>, body: Record<string, unknown>) {
  if (typeof body.image_url !== 'string' || !body.image_url) throw new Error('Imagem inválida')
  const { error } = await admin.from('carousel_images').insert({
    image_url: body.image_url,
    caption: typeof body.caption === 'string' ? body.caption : null,
    display_order: typeof body.display_order === 'number' ? body.display_order : 0,
    is_active: true,
  })
  if (error) throw error
  return { saved: true }
}

async function deleteCarousel(admin: ReturnType<typeof serviceClient>, body: Record<string, unknown>) {
  if (typeof body.image_id !== 'string' || !body.image_id) throw new Error('Imagem inválida')
  const { error } = await admin.from('carousel_images').delete().eq('id', body.image_id)
  if (error) throw error
  return { deleted: true }
}