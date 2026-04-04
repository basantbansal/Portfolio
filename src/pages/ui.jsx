import { T } from './Theme'

export function cx(...styles) {
  return Object.assign({}, ...styles.filter(Boolean))
}

export function Text({
  children,
  as: Tag = 'p',
  variant = 'body',
  style = {},
  ...rest
}) {
  const variants = {
    hero: {
      fontFamily: T.display,
      fontSize: T.fsHero,
      color: T.textPrimary,
      fontWeight: 900,
      lineHeight: T.lhHero,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      margin: 0,
    },
    title: {
      fontFamily: T.display,
      fontSize: T.fsTitle,
      color: T.textPrimary,
      letterSpacing: '0.06em',
      lineHeight: T.lhTitle,
      margin: 0,
    },
    sectionLabel: {
      fontFamily: T.mono,
      fontSize: T.fsTiny,
      letterSpacing: '0.4em',
      textTransform: 'uppercase',
      color: T.accentRose,
      margin: 0,
    },
    subtitle: {
      fontFamily: T.mono,
      fontSize: '11px',
      letterSpacing: '0.28em',
      textTransform: 'uppercase',
      color: T.accentAmber,
      margin: 0,
    },
    body: {
      color: T.textSecondary,
      fontSize: T.fsBody,
      lineHeight: T.lhBody,
      margin: 0,
    },
    muted: {
      color: T.textMuted,
      fontSize: T.fsSmall,
      lineHeight: 1.8,
      margin: 0,
    },
    mono: {
      fontFamily: T.mono,
      fontSize: '10px',
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: T.textMuted,
      margin: 0,
    },
  }

  return (
    <Tag style={cx(variants[variant], style)} {...rest}>
      {children}
    </Tag>
  )
}

export function Section({ children, style = {}, ...rest }) {
  return (
    <section
      style={cx(
        {
          background: `linear-gradient(180deg, ${T.bgSection} 0%, ${T.bgDeep} 100%)`,
          padding: '120px 5vw',
          borderTop: `1px solid ${T.border}`,
        },
        style
      )}
      {...rest}
    >
      {children}
    </section>
  )
}

export function Card({ children, hover = false, style = {}, ...rest }) {
  const base = {
    background: `linear-gradient(180deg, ${T.bgCard} 0%, ${T.bgSection} 100%)`,
    border: `1px solid ${T.border}`,
    borderRadius: 18,
    boxShadow: '0 10px 28px rgba(0,0,0,0.14)',
    transition: 'transform 0.2s, background 0.2s, border-color 0.2s, box-shadow 0.2s',
  }

  return (
    <div
      style={cx(base, style)}
      onMouseEnter={
        hover
          ? e => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.background = T.bgCardHov
              e.currentTarget.style.borderColor = T.borderHov
              e.currentTarget.style.boxShadow = `0 12px 34px rgba(0,0,0,0.22)`
            }
          : undefined
      }
      onMouseLeave={
        hover
          ? e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.background = `linear-gradient(180deg, ${T.bgCard} 0%, ${T.bgSection} 100%)`
              e.currentTarget.style.borderColor = T.border
              e.currentTarget.style.boxShadow = '0 10px 28px rgba(0,0,0,0.14)'
            }
          : undefined
      }
      {...rest}
    >
      {children}
    </div>
  )
}

export function Tag({ children, style = {}, ...rest }) {
  return (
    <span
      style={cx(
        {
          padding: '7px 14px',
          border: `1px solid ${T.border}`,
          color: T.textSecondary,
          fontFamily: T.mono,
          fontSize: '10.5px',
          letterSpacing: '0.08em',
          borderRadius: 999,
          background: 'rgba(255,255,255,0.02)',
          transition: 'border-color 0.2s, color 0.2s, background 0.2s, transform 0.2s',
          cursor: 'default',
        },
        style
      )}
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
      {...rest}
    >
      {children}
    </span>
  )
}

export function Button({
  children,
  href,
  variant = 'primary',
  rounded = true,
  style = {},
  ...rest
}) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: '12px 22px',
    border: '1px solid transparent',
    fontFamily: T.mono,
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'transform 0.2s, background 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s',
    borderRadius: rounded ? 999 : T.radius,
  }

  const variants = {
    primary: {
      background: T.accent,
      color: T.bgDeep,
      borderColor: T.accent,
      boxShadow: `0 0 20px ${T.accentGlow}`,
    },
    light: {
      background: T.textPrimary,
      color: T.bgDeep,
      borderColor: T.textPrimary,
    },
    outline: {
      background: 'transparent',
      color: T.textPrimary,
      borderColor: T.borderHov,
    },
    amber: {
      background: T.accentAmber,
      color: T.bgDeep,
      borderColor: T.accentAmber,
      boxShadow: `0 0 20px ${T.accentGlow}`,
    },
  }

  const Comp = href ? 'a' : 'button'

  return (
    <Comp
      href={href}
      type={href ? undefined : 'button'}
      style={cx(base, variants[variant], style)}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        if (variant === 'outline') {
          e.currentTarget.style.background = T.accentGlow
          e.currentTarget.style.borderColor = T.accent
          e.currentTarget.style.color = T.textPrimary
        } else if (variant === 'light') {
          e.currentTarget.style.background = T.accentAmber
          e.currentTarget.style.borderColor = T.accentAmber
          e.currentTarget.style.color = T.bgDeep
          e.currentTarget.style.boxShadow = `0 0 20px ${T.accentGlow}`
        } else {
          e.currentTarget.style.boxShadow = `0 0 24px ${T.accentGlow}`
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        Object.assign(e.currentTarget.style, variants[variant])
        if (variant === 'outline') e.currentTarget.style.boxShadow = 'none'
      }}
      {...rest}
    >
      {children}
    </Comp>
  )
}