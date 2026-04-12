import { useEffect, useRef } from 'react'
import { T } from './Theme'
import { Section, Text, Card, Tag, Button } from './ui'

const PROJECTS = [
  {
    title: 'Digit Recognizer',
    kicker: 'Kaggle / Computer Vision',
    year: '2026',
    summary: 'An ensemble of three CNNs trained from scratch for handwritten digit recognition, then validated again on real-world handwritten photos for robustness.',
    highlights: [
      '99.58% evaluation accuracy with a leaderboard-ready training pipeline.',
      'Batch normalization, augmentation, and learning-rate scheduling for stability.',
      'Real-photo verification to check performance beyond the benchmark split.',
    ],
    stack: ['Python', 'TensorFlow', 'CNNs', 'Kaggle'],
    color: T.accentGreen,
  },
  {
    title: 'Facial Emotion Recognition',
    kicker: 'Deep Learning / OpenCV',
    year: '2026',
    summary: 'A compact FER2013 emotion model paired with real-time face detection, designed to keep inference lightweight while still handling a difficult dataset.',
    highlights: [
      'Roughly 60% accuracy on FER2013 with a 1.4M-parameter CNN.',
      'Live OpenCV detection pipeline for real-time webcam testing.',
      'Built to balance model size, speed, and usable prediction quality.',
    ],
    stack: ['Python', 'OpenCV', 'CNNs', 'Computer Vision'],
    color: T.accent,
  },
  {
    title: 'E-Commerce Web App',
    kicker: 'Full Stack / Deployment',
    year: '2025',
    summary: 'An Amazon-inspired web app with separate frontend and backend deployments, responsive shopping flows, and production-safe API integration.',
    highlights: [
      'Frontend and backend deployed independently for cleaner production setup.',
      'Responsive UI patterns for browsing, product detail, and purchase journeys.',
      'Production CORS handling and practical API wiring across environments.',
    ],
    stack: ['React', 'Backend APIs', 'Vercel', 'Render'],
    color: T.accentRose,
  },
]

function ProjectCard({ project, index, registerCard }) {
  return (
    <Card
      hover
      ref={node => registerCard(node, index)}
      style={{
        position: 'relative',
        minHeight: '100%',
        padding: '28px 24px',
        overflow: 'hidden',
        opacity: 0,
        transform: 'translateY(30px)',
        transition: 'opacity 0.7s, transform 0.7s cubic-bezier(0.16,1,0.3,1), background 0.2s, border-color 0.2s, box-shadow 0.2s',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${project.color}22 0%, transparent 58%)`,
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 18 }}>
          <Text variant="subtitle" style={{ color: project.color }}>
            {project.kicker}
          </Text>

          <span
            style={{
              padding: '6px 11px',
              borderRadius: 999,
              border: `1px solid ${project.color}44`,
              background: `${project.color}12`,
              color: project.color,
              fontFamily: T.mono,
              fontSize: 11,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
            }}
          >
            {project.year}
          </span>
        </div>

        <Text as="h3" variant="title" style={{ fontSize: '2rem', letterSpacing: '0.05em', lineHeight: 0.98, marginBottom: 16 }}>
          {project.title}
        </Text>

        <Text variant="body" style={{ fontSize: '16px', lineHeight: 1.8, marginBottom: 22 }}>
          {project.summary}
        </Text>

        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', display: 'grid', gap: 12 }}>
          {project.highlights.map((highlight, highlightIndex) => (
            <li key={highlight} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 12, alignItems: 'start' }}>
              <span
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  border: `1px solid ${project.color}55`,
                  display: 'grid',
                  placeItems: 'center',
                  color: project.color,
                  fontFamily: T.mono,
                  fontSize: 10.5,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  background: `${project.color}10`,
                  flexShrink: 0,
                }}
              >
                {String(highlightIndex + 1).padStart(2, '0')}
              </span>

              <Text variant="muted" style={{ fontSize: '15px', lineHeight: 1.7, color: T.textSecondary }}>
                {highlight}
              </Text>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 'auto' }}>
          {project.stack.map(item => (
            <Tag key={item}>{item}</Tag>
          ))}
        </div>
      </div>
    </Card>
  )
}

export default function ProjectsSection() {
  const sectionRef = useRef(null)
  const introRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    const timers = []
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()

      if (introRef.current) {
        introRef.current.style.opacity = '1'
        introRef.current.style.transform = 'translateY(0)'
      }

      cardRefs.current.forEach((card, index) => {
        const timer = setTimeout(() => {
          if (!card) return
          card.style.opacity = '1'
          card.style.transform = 'translateY(0)'
        }, 140 + index * 110)
        timers.push(timer)
      })
    }, { threshold: 0.2 })

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => {
      observer.disconnect()
      timers.forEach(clearTimeout)
    }
  }, [])

  const registerCard = (node, index) => {
    cardRefs.current[index] = node
  }

  return (
    <Section ref={sectionRef}>
      <div id="projects" style={{ scrollMarginTop: 112 }}>
        <Text variant="sectionLabel" style={{ marginBottom: 20 }}>
          02 / Projects
        </Text>
      </div>

      <div
        ref={introRef}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: 24,
          flexWrap: 'wrap',
          marginBottom: 56,
          opacity: 0,
          transform: 'translateY(28px)',
          transition: 'opacity 0.7s, transform 0.7s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <div style={{ maxWidth: 640 }}>
          <Text as="h2" variant="title" style={{ marginBottom: 18 }}>
            Selected Projects
          </Text>

          <Text variant="body" style={{ fontSize: '16.5px', lineHeight: 1.8 }}>
            A focused look at the work that best represents how I build: strong ML foundations, practical deployment thinking, and clean product execution.
          </Text>
        </div>

        <Button href="https://github.com/basantbansal" variant="outline" target="_blank" rel="noreferrer">
          View GitHub
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} registerCard={registerCard} />
        ))}
      </div>
    </Section>
  )
}
