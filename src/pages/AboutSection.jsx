import { useEffect, useRef } from 'react'
import { T } from './Theme'
import { Section, Text, Card, Tag } from './ui'

const STATS = [
  { value: '2024', label: 'Started College' },
  { value: 'ECE',  label: 'IIIT Pune' },
  { value: '3',    label: 'Projects Shipped' },
]

export default function AboutSection() {
  const lineRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const secRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      setTimeout(() => {
        if (lineRef.current) lineRef.current.style.cssText += 'width:100%;opacity:1'
        if (leftRef.current) leftRef.current.style.cssText += 'opacity:1;transform:translateX(0)'
        if (rightRef.current) rightRef.current.style.cssText += 'opacity:1;transform:translateX(0)'
      }, 120)
    }, { threshold: 0.2 })

    if (secRef.current) obs.observe(secRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <Section ref={secRef}>
      <Text variant="sectionLabel" style={{ marginBottom: 20 }}>
        01 / About
      </Text>

      <div
        ref={lineRef}
        style={{
          height: 2,
          width: 0,
          opacity: 0,
          background: `linear-gradient(90deg, ${T.accent} 0%, ${T.accentAmber} 45%, ${T.accentRose} 100%)`,
          marginBottom: 60,
          transition: 'width 1.1s cubic-bezier(0.16,1,0.3,1), opacity 0.4s',
          borderRadius: 999,
          boxShadow: `0 0 18px ${T.accentGlow}`,
        }}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '60px 80px', alignItems: 'start' }}>
        <div
          ref={leftRef}
          style={{
            opacity: 0,
            transform: 'translateX(-40px)',
            transition: 'opacity 0.8s 0.25s, transform 0.8s 0.25s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <blockquote
            style={{
              fontFamily: T.display,
              fontSize: 'clamp(1.9rem, 4.6vw, 3.4rem)',
              color: T.textPrimary,
              lineHeight: 1.05,
              letterSpacing: '0.04em',
              margin: '0 0 36px 0',
              borderLeft: `4px solid ${T.accent}`,
              paddingLeft: 22,
              textShadow: '0 4px 24px rgba(255,158,74,0.08)',
            }}
          >
            "Build things.<br />Break limits.<br />Learn in public."
          </blockquote>

          <Text variant="body" style={{ maxWidth: 520 }}>
            I'm Basant, an Electronics & Communication Engineering student at IIIT Pune (2024–2028).
            I focus on Machine Learning, Deep Learning, Computer Vision, and LLMs —
            currently building agentic AI systems with tool use and memory.
          </Text>

          <Text variant="muted" style={{ color: T.accentRose, marginTop: 18 }}>
            Currently obsessed with multi-agent architectures and LangGraph.
          </Text>
        </div>

        <div
          ref={rightRef}
          style={{
            opacity: 0,
            transform: 'translateX(40px)',
            transition: 'opacity 0.8s 0.45s, transform 0.8s 0.45s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 44 }}>
            {STATS.map(({ value, label }) => (
              <Card key={label} style={{ padding: '26px 12px', textAlign: 'center' }}>
                <div style={{ fontFamily: T.display, fontSize: 32, color: T.textPrimary, lineHeight: 1, letterSpacing: '0.06em' }}>
                  {value}
                </div>
                <Text variant="mono" style={{ marginTop: 8 }}>
                  {label}
                </Text>
              </Card>
            ))}
          </div>

          <Text variant="mono" style={{ marginBottom: 14 }}>
            Interests
          </Text>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {['Deep Learning', 'Computer Vision', 'LLMs', 'Agentic AI', 'Competitive Programming', 'Full Stack', 'Kaggle', 'Hackathons'].map(tag => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}