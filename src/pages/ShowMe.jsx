import { useEffect, useRef, useState, lazy, Suspense } from 'react'
import gsap from 'gsap'
import ParticlePortrait from '../components/ParticlePortrait'
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa'

import { T } from './Theme'
import { Text, Button } from './ui'

const AboutSection = lazy(() => import('./AboutSection'))
const ProjectsSection = lazy(() => import('./ProjectsSection'))
const SkillsSection = lazy(() => import('./SkillsSection'))
const TimelineSection = lazy(() => import('./TimelineSection'))
const ContactSection = lazy(() => import('./ContactSection'))

import subjectImage from '../assets/izuku-midoriya-10667x6000-19490-Photoroom.png'
import backgroundImage from '../assets/izuku-midoriya-10667x6000-19490.jpg'

const HERO_TEXT = 'BASANT'
const TAGLINE = 'ML \u00b7 Deep Learning \u00b7 Agentic AI'
const DESC = 'Building things. Breaking limits. Learning in public.'

function MagneticButton({ children, href = '#' }) {
  const ref = useRef(null)

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={e => {
        const rect = ref.current.getBoundingClientRect()
        gsap.to(ref.current, {
          x: (e.clientX - rect.left - rect.width / 2) * 0.35,
          y: (e.clientY - rect.top - rect.height / 2) * 0.35,
          duration: 0.3,
          ease: 'power2.out',
        })
      }}
      onMouseLeave={() =>
        gsap.to(ref.current, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1,0.3)',
        })
      }
      style={{ textDecoration: 'none' }}
    >
      <Button variant="light">{children}</Button>
    </a>
  )
}

function HeroSection({ isMobile }) {
  const bgRef = useRef(null)
  const solidRef = useRef(null)
  const subjectRef = useRef(null)
  const outlineRef = useRef(null)
  const bioRef = useRef(null)
  const heroWordSize = isMobile ? 'clamp(5.4rem, 24vw, 8rem)' : 'clamp(8rem, 17vw, 13.75rem)'

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      ;[bgRef, solidRef, subjectRef, outlineRef, bioRef].forEach(ref => {
        if (ref.current) ref.current.style.opacity = '1'
      })
      return
    }

    const timer = setTimeout(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .fromTo(bgRef.current, { scale: 1.08, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.15 })
        .fromTo(solidRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.5')
        .fromTo(subjectRef.current, { y: 100, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.95 }, '-=0.45')
        .fromTo(outlineRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.65')
        .fromTo(bioRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.35')
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || isMobile) return

    let moved = false
    const maxOffset = 40
    const bgX = gsap.quickTo(bgRef.current, 'x', { duration: 0.4, ease: 'power2.out' })
    const bgY = gsap.quickTo(bgRef.current, 'y', { duration: 0.4, ease: 'power2.out' })
    const solidX = gsap.quickTo(solidRef.current, 'x', { duration: 0.4, ease: 'power2.out' })
    const solidY = gsap.quickTo(solidRef.current, 'y', { duration: 0.4, ease: 'power2.out' })
    const subjectX = gsap.quickTo(subjectRef.current, 'x', { duration: 0.4, ease: 'power2.out' })
    const subjectY = gsap.quickTo(subjectRef.current, 'y', { duration: 0.4, ease: 'power2.out' })
    const outlineX = gsap.quickTo(outlineRef.current, 'x', { duration: 0.4, ease: 'power2.out' })
    const outlineY = gsap.quickTo(outlineRef.current, 'y', { duration: 0.4, ease: 'power2.out' })

    const onMove = e => {
      moved = true
      const nx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2)
      const ny = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2)

      bgX(-nx * 0.2 * maxOffset)
      bgY(-ny * 0.2 * maxOffset)
      solidX(nx * 0.07 * maxOffset)
      solidY(ny * 0.07 * maxOffset)
      subjectX(nx * 0.1 * maxOffset)
      subjectY(ny * 0.1 * maxOffset)
      outlineX(nx * 0.14 * maxOffset)
      outlineY(ny * 0.14 * maxOffset)
    }

    const onLeave = () => {
      if (!moved) return
      bgX(0)
      bgY(0)
      solidX(0)
      solidY(0)
      subjectX(0)
      subjectY(0)
      outlineX(0)
      outlineY(0)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [isMobile])

  return (
    <section style={{ position: 'relative', width: '100%', height: isMobile ? '100svh' : '100vh', overflow: 'hidden', contain: 'layout style paint' }}>
      <div ref={bgRef} style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <div style={{ position: 'absolute', top: '-5%', left: '-5%', width: '110%', height: '110%' }}>
          <img
            src={backgroundImage}
            alt=""
            aria-hidden
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 35%',
              filter: 'blur(6px) brightness(1.03) saturate(1.08)',
              opacity: 0.95,
              transform: 'scale(1.03)',
            }}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              linear-gradient(
                180deg,
                rgba(24, 10, 8, 0.18) 0%,
                rgba(70, 28, 14, 0.10) 40%,
                rgba(20, 8, 6, 0.26) 100%
              )
            `,
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,215,106,0.12), transparent 30%), radial-gradient(circle at 80% 30%, rgba(245,154,176,0.10), transparent 26%), radial-gradient(circle at 50% 80%, rgba(255,158,74,0.12), transparent 34%)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
            opacity: 0.35,
            pointerEvents: 'none',
            animation: 'grainShift 0.7s steps(6) infinite',
          }}
        />
      </div>

      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%) scaleX(1.18)', zIndex: 5 }}>
        <div ref={solidRef}>
          <Text
            variant="hero"
            style={{
              fontSize: heroWordSize,
              color: '#ffffff',
              textShadow: '0 0 18px rgba(255,255,255,0.08)',
            }}
          >
            {HERO_TEXT}
          </Text>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          zIndex: 3,
          width: '100%',
          height: isMobile ? '120vh' : '92vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <div
          ref={subjectRef}
          style={{
            width: '80%',
            maxWidth: 900,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={subjectImage}
            alt={HERO_TEXT}
            fetchPriority="high"
            decoding="async"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'center bottom',
              transform: isMobile ? 'scale(1.5) translateY(10px)' : 'scale(1.9) translateY(-90px)',
              filter: 'drop-shadow(0 14px 40px rgba(0,0,0,0.22))',
            }}
          />
        </div>
      </div>

      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%) scaleX(1.18)', zIndex: 10 }}>
        <div
          ref={outlineRef}
          style={{
            fontFamily: T.display,
            fontSize: heroWordSize,
            color: 'transparent',
            WebkitTextStroke: isMobile ? '2px rgba(255,255,255,0.35)' : '4px rgba(255,255,255,0.35)',
            fontWeight: 900,
            lineHeight: T.lhHero,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}
          aria-label={HERO_TEXT}
        >
          {HERO_TEXT}
        </div>
      </div>

      <div ref={bioRef} style={{ position: 'absolute', bottom: isMobile ? 78 : 88, left: isMobile ? 20 : 52, zIndex: 20, maxWidth: 390 }}>
        <Text variant="subtitle" style={{ marginBottom: 10, color: T.accentAmber }}>
          {TAGLINE}
        </Text>
        <Text variant="body" style={{ fontSize: '17px', lineHeight: 1.72, color: T.textPrimary, marginBottom: 24 }}>
          {DESC}
        </Text>
        <MagneticButton href="#projects">See My Work</MagneticButton>
      </div>

      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: isMobile ? 26 : 30,
          transform: 'translateX(-50%)',
          zIndex: 22,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: isMobile ? '10px 14px' : '11px 16px',
          borderRadius: 999,
          border: `1px solid ${T.borderHov}`,
          background: 'rgba(20,12,11,0.58)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 14px 34px rgba(0,0,0,0.18)',
          animation: 'hintFloat 2.8s ease-in-out infinite',
        }}
      >
        <span style={{ fontFamily: T.mono, fontSize: isMobile ? 11 : 12, letterSpacing: '0.18em', color: T.textPrimary, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
          Scroll to explore
        </span>

        <div style={{ position: 'relative', width: 22, height: 10 }}>
          <div style={{ position: 'absolute', inset: '4px 0 auto 0', height: 2, borderRadius: 999, background: `linear-gradient(90deg, ${T.accentAmber} 0%, ${T.accent} 100%)` }} />
          <div style={{ position: 'absolute', right: 1, top: 0, width: 7, height: 7, borderRight: `2px solid ${T.accentAmber}`, borderBottom: `2px solid ${T.accentAmber}`, transform: 'rotate(-45deg)' }} />
        </div>
      </div>

      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 0,
          transform: 'translateX(-50%)',
          width: isMobile ? 180 : 280,
          height: isMobile ? 48 : 68,
          zIndex: 21,
          background: `linear-gradient(180deg, rgba(29,18,16,0.08) 0%, ${T.bgDeep} 88%)`,
          borderTop: `1px solid ${T.borderHov}`,
          borderTopLeftRadius: 180,
          borderTopRightRadius: 180,
          boxShadow: '0 -18px 34px rgba(0,0,0,0.18)',
        }}
      />

      <style>{`
        @keyframes grainShift {
          0%   { transform: translate(0,0); }
          20%  { transform: translate(-3%,-3%); }
          40%  { transform: translate(3%,2%); }
          60%  { transform: translate(-2%,3%); }
          80%  { transform: translate(2%,-2%); }
          100% { transform: translate(0,0); }
        }

        @keyframes hintFloat {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%      { transform: translateX(-50%) translateY(-5px); }
        }
      `}</style>
    </section>
  )
}

function PortraitSection({ isMobile }) {
  return (
    <div
      style={{
        position: 'relative',
        zIndex: 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 28,
        marginTop: isMobile ? -28 : -42,
        padding: isMobile ? '72px 24px 88px' : '88px 24px',
        background: `linear-gradient(180deg, rgba(29,18,16,0.98) 0%, ${T.bgSection} 42%, ${T.bgDeep} 100%)`,
        borderTop: `1px solid ${T.borderHov}`,
        borderTopLeftRadius: isMobile ? 28 : 42,
        borderTopRightRadius: isMobile ? 28 : 42,
        borderBottom: `1px solid ${T.border}`,
        boxShadow: '0 -24px 54px rgba(0,0,0,0.18)',
      }}
    >
      <div style={{ position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            inset: -12,
            borderRadius: 20,
            background: T.accentGlow,
            filter: 'blur(20px)',
          }}
        />

        <div
          style={{
            position: 'relative',
            borderRadius: 16,
            padding: 14,
            background: T.bgCard,
            border: `1px solid ${T.border}`,
            boxShadow: `0 0 50px ${T.accentGlow}`,
            overflow: 'hidden',
            animation: 'floatY 6s ease-in-out infinite',
          }}
        >
          <div
            style={{
              position: 'relative',
              borderRadius: 12,
              overflow: 'hidden',
            }}
          >
            <ParticlePortrait />

            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: 32,
                height: '100%',
                pointerEvents: 'none',
                background: `linear-gradient(
                  90deg,
                  rgba(0,0,0,0) 0%,
                  rgba(0,0,0,0.06) 35%,
                  ${T.bgCard} 100%
                )`,
                filter: 'blur(6px)',
              }}
            />

            <div
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                borderRadius: 12,
                boxShadow: 'inset 0 0 12px rgba(255,255,255,0.02)',
              }}
            />
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Text variant="subtitle" style={{ marginBottom: 6, color: T.accent }}>
          Basant Bansal
        </Text>
        <Text
          variant="body"
          style={{
            fontSize: '15px',
            lineHeight: 1.65,
            maxWidth: 260,
            margin: '0 auto',
          }}
        >
          ML/DL | Fullstack | IIIT Pune
        </Text>
      </div>

      <div style={{ display: 'flex', gap: 24 }}>
        {[
          { href: 'https://github.com/basantbansal', Icon: FaGithub, hover: T.textPrimary, label: 'GitHub profile' },
          { href: 'https://www.linkedin.com/in/basant-bansal-22066036b/', Icon: FaLinkedin, hover: '#60a5fa', label: 'LinkedIn profile' },
          { href: 'https://www.instagram.com/basant__bansal/', Icon: FaInstagram, hover: T.accentRose, label: 'Instagram profile' },
        ].map(({ href, Icon, hover, label }) => (
          <a
            aria-label={label}
            key={href}
            href={href}
            target="_blank"
            rel="noreferrer"
            style={{
              color: T.textMuted,
              fontSize: 20,
              transition: 'color 0.2s, transform 0.2s',
              display: 'block',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = hover
              e.currentTarget.style.transform = 'scale(1.18)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = T.textMuted
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            <Icon />
          </a>
        ))}
      </div>

      <style>{`
        @keyframes floatY {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-9px); }
        }
      `}</style>
    </div>
  )
}

export default function ShowMe() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div style={{ background: T.bgDeep }}>
      <HeroSection isMobile={isMobile} />
      <PortraitSection isMobile={isMobile} />
      <Suspense fallback={<div style={{ minHeight: 200 }} />}>
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <TimelineSection />
        <ContactSection />
      </Suspense>
    </div>
  )
}
