import { ArrowDown, Heart, LockKeyhole } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link, Route, Routes } from 'react-router-dom'

const days = Array.from({ length: 19 }, (_, index) => index + 1)

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/jornada" element={<JourneyPage />} />
    </Routes>
  )
}

function HomePage() {
  return (
    <main className="app-shell">
      <nav className="topbar" aria-label="Navegação principal">
        <span className="brand-mark">19 / 19</span>
        <span className="topbar-note">Uma jornada só nossa</span>
      </nav>

      <section className="hero" aria-labelledby="hero-title">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="eyebrow">Uma pequena jornada de amor</p>
          <h1 id="hero-title">
            19 anos,
            <span>19 dias,</span>
            19 presentes.
          </h1>
          <p className="hero-description">
            Cada presente guarda uma pequena parte da nossa história. Comece quando estiver pronta.
          </p>
          <Link className="primary-button" to="/jornada">
            Começar a jornada <Heart size={17} fill="currentColor" aria-hidden="true" />
          </Link>
          <ArrowDown className="scroll-hint" size={20} aria-hidden="true" />
        </motion.div>

        <div className="hero-art" aria-label="Espaço reservado para as memórias do casal">
          <span className="art-number">01</span>
          <span className="art-caption">memórias que ainda vamos guardar</span>
        </div>
      </section>

      <section className="journey-preview" aria-labelledby="preview-title">
        <div>
          <p className="eyebrow">O caminho</p>
          <h2 id="preview-title">Uma surpresa de cada vez.</h2>
        </div>
        <div className="day-grid" aria-label="Prévia dos 19 dias">
          {days.map((day) => (
            <div className={`day-tile ${day === 1 ? 'is-available' : ''}`} key={day}>
              <span>Dia {String(day).padStart(2, '0')}</span>
              {day === 1 ? <Heart size={16} aria-label="Disponível" /> : <LockKeyhole size={15} aria-label="Bloqueado" />}
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

function JourneyPage() {
  return (
    <main className="app-shell centered-page">
      <p className="eyebrow">Nossa jornada</p>
      <h1>O primeiro capítulo está esperando.</h1>
      <Link className="primary-button" to="/">Voltar ao início</Link>
    </main>
  )
}

export default App