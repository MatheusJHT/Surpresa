import { ArrowDown, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MemoryCarousel } from '../components/MemoryCarousel'
import { getPublicCarouselImages, getPublicSiteSettings } from '../services/presents'
import { isSupabaseConfigured } from '../services/supabase'
import type { CarouselImage, SiteSettings } from '../types/database'

const fallbackSettings: SiteSettings = {
  site_title: '19 Anos, 19 Dias, 19 Presentes',
  site_subtitle: 'Uma pequena jornada de amor',
  intro_message: 'Cada presente guarda uma pequena parte da nossa história. Comece quando estiver pronta.',
  final_message: '',
}

export function HomePage() {
  const [settings, setSettings] = useState(fallbackSettings)
  const [images, setImages] = useState<CarouselImage[]>([])
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    if (!isSupabaseConfigured) return
    void Promise.all([getPublicSiteSettings(), getPublicCarouselImages()])
      .then(([remoteSettings, remoteImages]) => {
        if (remoteSettings) setSettings(remoteSettings)
        setImages(remoteImages)
      })
      .catch(() => setLoadError(true))
  }, [])

  return (
    <main className="app-shell">
      <nav className="topbar" aria-label="Navegação principal">
        <span className="brand-mark">19 / 19</span>
        <span className="topbar-note">Uma jornada só nossa</span>
      </nav>

      <section className="hero" aria-labelledby="hero-title">
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="eyebrow">{settings.site_subtitle}</p>
          <h1 id="hero-title">19 anos,<span>19 dias,</span>19 presentes.</h1>
          <p className="hero-description">{settings.intro_message}</p>
          <Link className="primary-button" to="/jornada">
            Começar a jornada <Heart size={17} fill="currentColor" aria-hidden="true" />
          </Link>
          <ArrowDown className="scroll-hint" size={20} aria-hidden="true" />
        </motion.div>
        <MemoryCarousel images={images} />
      </section>

      <section className="home-note" aria-label="Mensagem da jornada">
        <p>{settings.site_title}</p>
        {loadError && <span className="connection-note">A história está carregando em modo de prévia.</span>}
      </section>
    </main>
  )
}