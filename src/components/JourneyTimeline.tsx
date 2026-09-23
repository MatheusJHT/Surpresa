import { Check, Heart, LockKeyhole } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Present, UserProgress } from '../types/database'

type JourneyTimelineProps = {
  presents: Present[]
  progress: UserProgress[]
}

export function JourneyTimeline({ presents, progress }: JourneyTimelineProps) {
  const completedIds = new Set(progress.filter((item) => item.completed).map((item) => item.present_id))
  const nextPresentId = presents.find((present) => !completedIds.has(present.id))?.id

  return (
    <div className="journey-timeline" aria-label="Progresso da jornada">
      {presents.map((present) => {
        const completed = completedIds.has(present.id)
        const available = present.id === nextPresentId
        const status = completed ? 'completed' : available ? 'available' : 'locked'
        const content = (
          <>
            <div className="timeline-marker">
              {completed ? <Check size={17} aria-hidden="true" /> : available ? <Heart size={16} aria-hidden="true" /> : <LockKeyhole size={15} aria-hidden="true" />}
            </div>
            <div className="timeline-copy">
              <span>Dia {String(present.day_number).padStart(2, '0')}</span>
              <strong>{completed ? 'Concluído' : available ? 'Disponível' : 'Bloqueado'}</strong>
            </div>
          </>
        )
        return available ? <Link className={`timeline-item ${status}`} to={`/presente/${present.id}`} key={present.id} aria-label={`Abrir dia ${present.day_number}`}>{content}</Link> : <article className={`timeline-item ${status}`} key={present.id} aria-label={`Dia ${present.day_number}: ${status}`}>{content}</article>
      })}
    </div>
  )
}