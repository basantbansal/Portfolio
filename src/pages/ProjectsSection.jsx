import { useEffect, useRef } from 'react'
import { T } from './Theme'

const STATS = [
  { value: '2024', label: 'Started College' },
  { value: 'ECE',  label: 'IIIT Pune' },
  { value: '3',    label: 'Projects Shipped' },
]

export default function AboutSection() {
  const lineRef  = useRef(null)
  const leftRef  = useRef(null)
  const rightRef = useRef(null)
  const secRef   = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      setTimeout(() => {
        if (lineRef.current)  lineRef.current.style.cssText  += 'width:100%;opacity:1'
        if (leftRef.current)  leftRef.current.style.cssText  += 'opacity:1;transform:translateX(0)'
        if (rightRef.current) rightRef.current.style.cssText += 'opacity:1;transform:translateX(0)'
      }, 120)
    }, { threshold: 0.2 })
    if (secRef.current) obs.observe(secRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={secRef} style={{ background: T.bgSection, padding: '120px 5vw', borderTop: `1px solid ${T.border}` }}>
      <p style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: T.textMuted, marginBottom: 20 }}>01 / About</p>

      <div ref={lineRef} style={{ height: 1, width: 0, opacity: 0, background: `linear-gradient(90deg, ${T.accent} 0%, transparent 100%)`, marginBottom: 60, transition: 'width 1.1s cubic-bezier(0.16,1,0.3,1), opacity 0.4s' }} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '60px 80px', alignItems: 'start' }}>

        {/* Left */}
        <div ref={leftRef} style={{ opacity: 0, transform: 'translateX(-40px)', transition: 'opacity 0.8s 0.25s, transform 0.8s 0.25s cubic-bezier(0.16,1,0.3,1)' }}>
          <blockquote style={{ fontFamily: T.display, fontSize: 'clamp(1.8rem, 4.5vw, 3.2rem)', color: T.textPrimary, lineHeight: 1.1, letterSpacing: '0.04em', marginBottom: 36, borderLeft: `3px solid ${T.accent}`, paddingLeft: 22 }}>
            "Build things.<br />Break limits.<br />Learn in public."
          </blockquote>

          <p style={{ color: T.textSecondary, fontSize: 14.5, lineHeight: 1.85, maxWidth: 480 }}>
            I'm Basant, an Electronics & Communication Engineering student at IIIT Pune (2024–2028).
            I focus on Machine Learning, Deep Learning, Computer Vision, and LLMs —
            currently building agentic AI systems with tool use and memory.
          </p>
          <p style={{ color: T.textMuted, fontSize: 13, lineHeight: 1.8, marginTop: 18 }}>
            Currently obsessed with multi-agent architectures and LangGraph.
          </p>
        </div>

        {/* Right */}
        <div ref={rightRef} style={{ opacity: 0, transform: 'translateX(40px)', transition: 'opacity 0.8s 0.45s, transform 0.8s 0.45s cubic-bezier(0.16,1,0.3,1)' }}>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, marginBottom: 44 }}>
            {STATS.map(({ value, label }) => (
              <div key={label} style={{ padding: '24px 12px', background: T.bgCard, border: `1px solid ${T.border}`, textAlign: 'center' }}>
                <div style={{ fontFamily: T.display, fontSize: 30, color: T.textPrimary, lineHeight: 1, letterSpacing: '0.06em' }}>{value}</div>
                <div style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: '0.18em', color: T.textMuted, textTransform: 'uppercase', marginTop: 8 }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <p style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: '0.35em', color: T.textMuted, textTransform: 'uppercase', marginBottom: 14 }}>Interests</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['Deep Learning', 'Computer Vision', 'LLMs', 'Agentic AI', 'Competitive Programming', 'Full Stack', 'Kaggle', 'Hackathons'].map(tag => (
              <span key={tag}
                style={{ padding: '5px 13px', border: `1px solid ${T.border}`, color: T.textMuted, fontFamily: T.mono, fontSize: 10.5, letterSpacing: '0.08em', borderRadius: T.radius, cursor: 'default', transition: 'border-color 0.2s, color 0.2s, background 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.color = T.textPrimary; e.currentTarget.style.background = T.accentGlow }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.textMuted; e.currentTarget.style.background = 'transparent' }}
              >{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}