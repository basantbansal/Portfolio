import { useEffect, useRef, useState } from 'react'
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa'
import { Section, Text } from './ui'
import { T } from './Theme'

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/basantbansal', Icon: FaGithub },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/basant-bansal-22066036b/', Icon: FaLinkedin },
  { label: 'Instagram', href: 'https://www.instagram.com/basant__bansal/', Icon: FaInstagram },
]

const EMAIL = 'itsbasanthere@gmail.com'

export default function ContactSection() {
  const secRef = useRef(null)
  const textRef = useRef(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      setTimeout(() => {
        if (textRef.current) {
          textRef.current.style.opacity = '1'
          textRef.current.style.transform = 'translateY(0)'
        }
      }, 100)
    }, { threshold: 0.2 })

    if (secRef.current) observer.observe(secRef.current)
    return () => observer.disconnect()
  }, [])

  const copyEmail = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(EMAIL)
      } else {
        window.location.href = `mailto:${EMAIL}`
        return
      }

      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${EMAIL}`
    }
  }

  return (
    <Section ref={secRef} id="contact" style={{ padding: '120px 5vw 80px' }}>
      <Text variant="sectionLabel" style={{ marginBottom: 20 }}>
        05 / Contact
      </Text>
      <div
        ref={textRef}
        style={{
          opacity: 0,
          transform: 'translateY(36px)',
          transition: 'opacity 0.8s, transform 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <Text as="h2" variant="title" style={{ fontSize: 'clamp(2.6rem, 9vw, 6.8rem)', lineHeight: 0.95, marginBottom: 20 }}>
          Let's Build<br />Something.
        </Text>

        <Text variant="body" style={{ maxWidth: 420, marginBottom: 52, fontSize: '16.5px', lineHeight: 1.8 }}>
          Open to hackathon collabs, ML projects, internships, or just talking about AI and deep learning.
        </Text>

        <button
          type="button"
          onClick={copyEmail}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 20,
            padding: '18px 24px',
            border: `1px solid ${T.border}`,
            marginBottom: 60,
            cursor: 'pointer',
            background: `linear-gradient(180deg, ${T.bgCard} 0%, ${T.bgSection} 100%)`,
            transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s, transform 0.2s',
            borderRadius: 999,
            boxShadow: '0 8px 26px rgba(0,0,0,0.14)',
            appearance: 'none',
            textAlign: 'left',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = T.accent
            e.currentTarget.style.boxShadow = `0 0 26px ${T.accentGlow}`
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = T.border
            e.currentTarget.style.boxShadow = '0 8px 26px rgba(0,0,0,0.14)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          <span style={{ fontFamily: T.mono, fontSize: 14, color: T.textSecondary, letterSpacing: '0.04em' }}>
            {EMAIL}
          </span>

          <span
            style={{
              fontFamily: T.mono,
              fontSize: 10.5,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: copied ? T.accentGreen : T.accentAmber,
              transition: 'color 0.2s',
              minWidth: 70,
            }}
          >
            {copied ? 'Copied' : 'Copy Email'}
          </span>
        </button>

        <div style={{ height: 1, background: `linear-gradient(90deg, ${T.border} 0%, transparent 100%)`, marginBottom: 36 }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  color: T.textMuted,
                  textDecoration: 'none',
                  fontFamily: T.mono,
                  fontSize: 12,
                  letterSpacing: '0.1em',
                  transition: 'color 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = T.accent
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = T.textMuted
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <Icon size={14} />
                {label}
              </a>
            ))}
          </div>

          <Text variant="mono" style={{ opacity: 0.75 }}>
            Basant Bansal / IIIT Pune / 2024-2028
          </Text>
        </div>
      </div>
    </Section>
  )
}
