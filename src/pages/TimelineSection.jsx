import { useEffect, useRef } from 'react'
import { T } from './Theme'
import { Section, Text, Card } from './ui'

const EVENTS = [
  {
    year: '2028',
    title: 'Target: AI Engineer / Data Scientist',
    subtitle: 'Large-scale company',
    type: 'goal',
    desc: 'The north star. Everything before this is prep.',
    color: T.accentAmber,
  },
  {
    year: '2026',
    title: 'Digit Recognizer - Kaggle',
    subtitle: '99.58% accuracy / Leaderboard',
    type: 'achievement',
    desc: 'Ensemble of 3 CNNs from scratch. Batch normalization, data augmentation, and ReduceLROnPlateau. Verified on real handwritten digit photos.',
    color: T.accentGreen,
  },
  {
    year: '2026',
    title: 'Facial Emotion Recognition',
    subtitle: 'FER2013 / ~60% accuracy',
    type: 'achievement',
    desc: '1.4M parameter deep CNN with OpenCV real-time face detection. Near human-level on a notoriously hard dataset.',
    color: T.accent,
  },
  {
    year: '2025',
    title: 'E-Commerce Web Application',
    subtitle: 'React / Vercel / Render',
    type: 'project',
    desc: 'Full-stack Amazon-like platform with separate frontend and backend deployments and production CORS configuration.',
    color: T.accentRose,
  },
  {
    year: '2024',
    title: 'B.Tech - Electronics & Communication',
    subtitle: 'IIIT Pune / 2024-2028',
    type: 'education',
    desc: 'Started building. Started breaking. Learning ML, Deep Learning, LLMs, and agentic AI systems.',
    color: T.textSecondary,
  },
]

const TYPE_LABEL = {
  goal: 'Goal',
  achievement: 'Achievement',
  project: 'Project',
  education: 'Education',
}

function TimelineItem({ event, index, isLast }) {
  const itemRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      setTimeout(() => {
        if (itemRef.current) {
          itemRef.current.style.opacity = '1'
          itemRef.current.style.transform = 'translateX(0)'
        }
        setTimeout(() => {
          if (lineRef.current) lineRef.current.style.height = '100%'
        }, 300)
      }, index * 140)
    }, { threshold: 0.2 })

    if (itemRef.current) observer.observe(itemRef.current)
    return () => observer.disconnect()
  }, [index])

  return (
    <div style={{ display: 'flex', gap: 28, position: 'relative' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 54, flexShrink: 0 }}>
        <span style={{ fontFamily: T.display, fontSize: '1.15rem', color: event.color, letterSpacing: '0.1em', lineHeight: 1, marginBottom: 10 }}>
          {event.year}
        </span>

        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: event.color,
            boxShadow: `0 0 16px ${event.color}88`,
            flexShrink: 0,
            zIndex: 1,
          }}
        />

        {!isLast && (
          <div
            style={{
              width: 2,
              flexGrow: 1,
              minHeight: 56,
              marginTop: 8,
              background: 'rgba(255,255,255,0.05)',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 999,
            }}
          >
            <div
              ref={lineRef}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '0%',
                background: `linear-gradient(180deg, ${event.color} 0%, transparent 100%)`,
                transition: 'height 0.9s cubic-bezier(0.16,1,0.3,1)',
              }}
            />
          </div>
        )}
      </div>

      <div
        ref={itemRef}
        style={{
          opacity: 0,
          transform: 'translateX(28px)',
          transition: 'opacity 0.7s, transform 0.7s cubic-bezier(0.16,1,0.3,1)',
          paddingBottom: isLast ? 0 : 44,
          flexGrow: 1,
        }}
      >
        <Card hover style={{ padding: '24px 24px', borderLeft: `3px solid ${event.color}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6, flexWrap: 'wrap', gap: 8 }}>
            <h3 style={{ fontFamily: T.display, fontSize: '1.35rem', color: T.textPrimary, letterSpacing: '0.06em', margin: 0, lineHeight: 1 }}>
              {event.title}
            </h3>

            <span
              style={{
                fontFamily: T.mono,
                fontSize: 10,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: event.color,
                padding: '5px 10px',
                border: `1px solid ${event.color}44`,
                borderRadius: 999,
                whiteSpace: 'nowrap',
                background: `${event.color}12`,
              }}
            >
              {TYPE_LABEL[event.type]}
            </span>
          </div>

          <Text variant="mono" style={{ marginBottom: 10 }}>
            {event.subtitle}
          </Text>

          <Text variant="body" style={{ fontSize: '15.5px', lineHeight: 1.75, margin: 0 }}>
            {event.desc}
          </Text>
        </Card>
      </div>
    </div>
  )
}

export default function TimelineSection() {
  return (
    <Section>
      <div id="timeline" style={{ scrollMarginTop: 112 }}>
        <Text variant="sectionLabel" style={{ marginBottom: 20 }}>
          04 / Timeline
        </Text>
      </div>

      <Text as="h2" variant="title" style={{ marginBottom: 60 }}>
        The Journey
      </Text>

      <div style={{ maxWidth: 760 }}>
        {EVENTS.map((event, index) => (
          <TimelineItem key={event.year + event.title} event={event} index={index} isLast={index === EVENTS.length - 1} />
        ))}
      </div>
    </Section>
  )
}
