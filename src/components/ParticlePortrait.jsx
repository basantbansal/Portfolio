import { useEffect, useRef, useState } from 'react'

const INTRO_DURATION = 2.8
const IDLE_VELOCITY = 0.035
const IDLE_FRAME_LIMIT = 18
const MAX_INTERACTION_DISTANCE = 60
const IMAGE_SRC = '/profile.png'

function getPortraitSize(width, desktopSize, tabletSize, mobileSize) {
  if (width <= 480) {
    return Math.min(mobileSize, width - 40)
  }

  if (width <= 768) {
    return Math.min(tabletSize, width - 60)
  }

  return desktopSize
}

export default function ParticlePortrait({
  desktopSize = 340,
  tabletSize = 280,
  mobileSize = 220,
}) {
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000, active: false })
  const linesRef = useRef([])
  const imageLoadedRef = useRef(false)
  const startTimeRef = useRef(0)
  const frameRef = useRef(null)
  const visibleRef = useRef(true)
  const pageVisibleRef = useRef(true)
  const idleFramesRef = useRef(0)
  const [size, setSize] = useState(() =>
    typeof window === 'undefined'
      ? desktopSize
      : getPortraitSize(window.innerWidth, desktopSize, tabletSize, mobileSize)
  )

  useEffect(() => {
    const updateSize = () => {
      const nextSize = getPortraitSize(window.innerWidth, desktopSize, tabletSize, mobileSize)
      setSize(currentSize => (currentSize === nextSize ? currentSize : nextSize))
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [desktopSize, tabletSize, mobileSize])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    contextRef.current = context
    canvas.width = size
    canvas.height = size

    let destroyed = false
    let imageReady = false

    imageLoadedRef.current = false
    linesRef.current = []
    idleFramesRef.current = 0

    const stopAnimation = () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
        frameRef.current = null
      }
    }

    const scheduleFrame = () => {
      if (
        frameRef.current !== null ||
        !imageLoadedRef.current ||
        !visibleRef.current ||
        !pageVisibleRef.current
      ) {
        return
      }

      frameRef.current = requestAnimationFrame(draw)
    }

    const draw = () => {
      frameRef.current = null

      if (destroyed || !visibleRef.current || !pageVisibleRef.current) return

      const ctx = contextRef.current
      if (!ctx) return

      ctx.clearRect(0, 0, size, size)

      if (!imageLoadedRef.current) return

      const lines = linesRef.current
      const mouse = mouseRef.current
      const elapsed = (performance.now() - startTimeRef.current) / 1000
      const introActive = elapsed < INTRO_DURATION
      let maxVelocity = 0
      let shouldContinue = introActive || mouse.active

      for (const line of lines) {
        const particleTime = elapsed - line.delay

        if (particleTime < 0) {
          shouldContinue = true
          continue
        }

        const fadeProgress = Math.min(particleTime / 1.5, 1)
        const easedFade = 1 - Math.pow(1 - fadeProgress, 2)
        line.currentAlpha = line.baseAlpha * easedFade

        const moveProgress = Math.min(particleTime / 2.5, 1)
        const easedMove = 1 - Math.pow(1 - moveProgress, 3)

        if (mouse.active) {
          const dx = line.x - mouse.x
          const dy = line.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < MAX_INTERACTION_DISTANCE && dist > 0) {
            const force = (1 - dist / MAX_INTERACTION_DISTANCE) * 2
            line.vx += (dx / dist) * force
            line.vy += (dy / dist) * force
          }
        }

        const dx = line.targetX - line.x
        const dy = line.targetY - line.y
        const pullStrength = 0.01 + easedMove * 0.07

        line.vx += dx * pullStrength
        line.vy += dy * pullStrength
        line.vx *= 0.92
        line.vy *= 0.92
        line.x += line.vx
        line.y += line.vy

        maxVelocity = Math.max(maxVelocity, Math.abs(line.vx) + Math.abs(line.vy))

        ctx.strokeStyle = `rgba(100, 255, 218, ${line.currentAlpha})`
        ctx.lineWidth = size <= 280 ? 1 : 1.35
        ctx.beginPath()
        ctx.moveTo(line.x, line.y)
        ctx.lineTo(line.x + line.length, line.y)
        ctx.stroke()
      }

      if (!shouldContinue && maxVelocity > IDLE_VELOCITY) {
        shouldContinue = true
      }

      if (shouldContinue) {
        idleFramesRef.current = 0
      } else if (idleFramesRef.current < IDLE_FRAME_LIMIT) {
        idleFramesRef.current += 1
        shouldContinue = true
      }

      if (shouldContinue) scheduleFrame()
    }

    const handleImageReady = image => {
      if (destroyed || imageReady) return
      imageReady = true

      const offscreen = document.createElement('canvas')
      const offscreenContext = offscreen.getContext('2d')
      if (!offscreenContext) return

      offscreen.width = size
      offscreen.height = size

      const scale = 0.8
      const imageAspect = image.width / image.height

      let drawHeight = size * scale
      let drawWidth = drawHeight * imageAspect

      if (drawWidth > size * scale) {
        drawWidth = size * scale
        drawHeight = drawWidth / imageAspect
      }

      const offsetX = (size - drawWidth) / 2
      const offsetY = (size - drawHeight) / 2

      offscreenContext.drawImage(image, offsetX, offsetY, drawWidth, drawHeight)
      const pixels = offscreenContext.getImageData(0, 0, size, size).data

      const lines = []
      const rowGap = size <= 280 ? 6 : 7
      const emptyStep = size <= 280 ? 3 : 4
      const scatterRange = size <= 280 ? 240 : 280

      for (let y = 0; y < size; y += rowGap) {
        let x = 0

        while (x < size) {
          const index = (y * size + x) * 4
          const alpha = pixels[index + 3]

          if (alpha > 128) {
            const r = pixels[index]
            const g = pixels[index + 1]
            const b = pixels[index + 2]
            const brightness = (r + g + b) / (3 * 255)
            const lineLength = Math.floor(1 + brightness * (size <= 280 ? 7 : 13))
            const scatterX = (Math.random() - 0.5) * scatterRange
            const scatterY = (Math.random() - 0.5) * scatterRange

            lines.push({
              x: x + scatterX,
              y: y + scatterY,
              targetX: x,
              targetY: y,
              vx: 0,
              vy: 0,
              length: lineLength,
              baseAlpha: 0.5 + brightness * 0.7,
              currentAlpha: 0,
              delay: Math.random() * 0.3,
            })

            x += lineLength + 3
          } else {
            x += emptyStep
          }
        }
      }

      linesRef.current = lines
      imageLoadedRef.current = true
      startTimeRef.current = performance.now()
      scheduleFrame()
    }

    const ensureAnimation = () => {
      idleFramesRef.current = 0
      scheduleFrame()
    }

    const handleMouseMove = event => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = event.clientX - rect.left
      mouseRef.current.y = event.clientY - rect.top
      mouseRef.current.active = true
      ensureAnimation()
    }

    const handleTouchMove = event => {
      const rect = canvas.getBoundingClientRect()
      const touch = event.touches[0]
      if (!touch) return

      mouseRef.current.x = touch.clientX - rect.left
      mouseRef.current.y = touch.clientY - rect.top
      mouseRef.current.active = true
      ensureAnimation()
    }

    const handleLeave = () => {
      mouseRef.current.active = false
      ensureAnimation()
    }

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting

        if (visibleRef.current) {
          scheduleFrame()
        } else {
          stopAnimation()
        }
      },
      { threshold: 0.05 }
    )

    const handleVisibilityChange = () => {
      pageVisibleRef.current = document.visibilityState === 'visible'

      if (pageVisibleRef.current) {
        scheduleFrame()
      } else {
        stopAnimation()
      }
    }

    const image = new Image()
    image.decoding = 'async'
    image.src = IMAGE_SRC
    image.onload = () => handleImageReady(image)
    image.onerror = stopAnimation

    if (image.complete && image.naturalWidth > 0) {
      handleImageReady(image)
    }

    const passiveOptions = { passive: true }

    intersectionObserver.observe(canvas)
    handleVisibilityChange()
    document.addEventListener('visibilitychange', handleVisibilityChange)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleLeave)
    canvas.addEventListener('touchmove', handleTouchMove, passiveOptions)
    canvas.addEventListener('touchend', handleLeave, passiveOptions)

    return () => {
      destroyed = true
      stopAnimation()
      intersectionObserver.disconnect()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleLeave)
      canvas.removeEventListener('touchmove', handleTouchMove, passiveOptions)
      canvas.removeEventListener('touchend', handleLeave, passiveOptions)
    }
  }, [size])

  return (
    <canvas
      ref={canvasRef}
      className="simulation-container"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        cursor: 'default',
      }}
    />
  )
}
