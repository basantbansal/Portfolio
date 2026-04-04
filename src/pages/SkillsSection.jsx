import { useEffect, useRef } from 'react'
import { T } from './Theme'
import { Section, Text, Card } from './ui'

const SKILL_GROUPS = [
  {
    label: 'Languages',
    skills: [
      { name: 'Python'},
      { name: 'C / C++'},
      { name: 'JavaScript' },
    ],
  },
  {
    label: 'AI / ML',
    skills: [
      { name: 'TensorFlow / Keras' },
      { name: 'OpenCV'},
      { name: 'Pandas / NumPy' },
      { name: 'Scikit-learn' },
    ],
  },
  {
    label: 'Web & Tools',
    skills: [
      { name: 'React' },
      { name: 'Backend APIs' },
      { name: 'Git / GitHub' },
      { name: 'Kaggle' },
    ],
  },
]

function SkillBar({ name, level, delay }) {
  const barRef = useRef(null)
  const fillRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      setTimeout(() => {
        if (barRef.current) barRef.current.style.opacity = '1'
        if (fillRef.current) fillRef.current.style.width = `100%`
      }, delay)
    }, { threshold: 0.3 })

    if (barRef.current) obs.observe(barRef.current)
    return () => obs.disconnect()
  }, [level, delay])

  return (
  <div ref={barRef} style={{ opacity: 0, transition: 'opacity 0.5s' }}>
    <div
      style={{
        padding: '14px 16px',
        border: `1px solid ${T.border}`,
        borderRadius: 999,
        fontFamily: T.mono,
        fontSize: 11,
        letterSpacing: '0.08em',
        color: T.textSecondary,
        background: 'rgba(255,255,255,0.02)',
        transition: 'all 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = T.accent
        e.currentTarget.style.color = T.textPrimary
        e.currentTarget.style.background = T.accentGlow
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = T.border
        e.currentTarget.style.color = T.textSecondary
        e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {name}
    </div>
  </div>
)
}

function SkillGroup({ group, groupIndex }) {
  const headRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      setTimeout(() => {
        if (headRef.current) {
          headRef.current.style.opacity = '1'
          headRef.current.style.transform = 'translateY(0)'
        }
      }, groupIndex * 100)
    }, { threshold: 0.2 })

    if (headRef.current) obs.observe(headRef.current)
    return () => obs.disconnect()
  }, [groupIndex])

  return (
    <Card style={{ padding: '36px 28px' }}>
      <div
        ref={headRef}
        style={{
          opacity: 0,
          transform: 'translateY(18px)',
          transition: 'opacity 0.6s, transform 0.6s cubic-bezier(0.16,1,0.3,1)',
          marginBottom: 30,
        }}
      >
        <Text variant="subtitle" style={{ color: T.accentRose, marginBottom: 6 }}>
          Stack
        </Text>
        <Text as="h3" variant="title" style={{ fontSize: '1.7rem', letterSpacing: '0.08em' }}>
          {group.label}
        </Text>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        {group.skills.map((s, i) => (
          <SkillBar key={s.name} name={s.name} level={s.level} delay={groupIndex * 100 + i * 80 + 200} />
        ))}
      </div>
    </Card>
  )
}

export default function SkillsSection() {
  return (
    <Section>
      <Text variant="sectionLabel" style={{ marginBottom: 20 }}>
        03 / Skills
      </Text>

      <Text as="h2" variant="title" style={{ marginBottom: 60 }}>
        What I Work With
      </Text>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
        {SKILL_GROUPS.map((g, i) => (
          <SkillGroup key={g.label} group={g} groupIndex={i} />
        ))}
      </div>

      <Text variant="mono" style={{ textAlign: 'center', marginTop: 36, opacity: 0.7 }}>
        Self-assessed — update SKILL_GROUPS in SkillsSection.jsx
      </Text>
    </Section>
  )
}