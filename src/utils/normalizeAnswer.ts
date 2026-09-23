export function normalizeAnswer(value: string, removeAccents = true, ignorePunctuation = true) {
  let normalized = value.trim().replace(/\s+/g, ' ').toLocaleLowerCase('pt-BR')
  if (removeAccents) normalized = normalized.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  if (ignorePunctuation) normalized = normalized.replace(/[\p{P}\p{S}]/gu, '')
  return normalized.trim().replace(/\s+/g, ' ')
}