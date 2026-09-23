import { ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { CarouselImage } from '../types/database'

type MemoryCarouselProps = {
  images: CarouselImage[]
}

export function MemoryCarousel({ images }: MemoryCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (images.length < 2) return
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length)
    }, 5000)
    return () => window.clearInterval(timer)
  }, [images.length])

  if (images.length === 0) {
    return (
      <div className="memory-placeholder" role="img" aria-label="Espaço reservado para as fotos das memórias">
        <span className="art-number">01</span>
        <span className="art-caption">memórias que ainda vamos guardar</span>
      </div>
    )
  }

  const image = images[activeIndex]

  function move(step: number) {
    setActiveIndex((current) => (current + step + images.length) % images.length)
  }

  return (
    <div className="memory-carousel" aria-label="Carrossel de memórias">
      <AnimatePresence mode="wait">
        <motion.figure
          className="memory-slide"
          key={image.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src={image.image_url} alt={image.caption ?? 'Memória especial'} />
          {image.caption && <figcaption>{image.caption}</figcaption>}
        </motion.figure>
      </AnimatePresence>
      {images.length > 1 && (
        <div className="carousel-controls">
          <button type="button" aria-label="Memória anterior" onClick={() => move(-1)}><ChevronLeft size={18} /></button>
          <div className="carousel-dots" aria-label="Selecionar memória">
            {images.map((item, index) => (
              <button
                type="button"
                className={index === activeIndex ? 'is-active' : ''}
                aria-label={`Ir para memória ${index + 1}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                key={item.id}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
          <button type="button" aria-label="Próxima memória" onClick={() => move(1)}><ChevronRight size={18} /></button>
        </div>
      )}
    </div>
  )
}