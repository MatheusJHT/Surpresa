import { describe, expect, it } from 'vitest'
import { normalizeAnswer } from './normalizeAnswer'

describe('normalizeAnswer', () => {
  it('ignora caixa, espaços e acentos por padrão', () => {
    expect(normalizeAnswer('  PRAÇA   Central  ')).toBe('praca central')
  })

  it('pode preservar acentos e pontuação quando configurado', () => {
    expect(normalizeAnswer(' Café! ', false, false)).toBe('café!')
  })

  it('remove pontuação sem destruir espaços entre palavras', () => {
    expect(normalizeAnswer('Amor, sempre.')).toBe('amor sempre')
  })
})