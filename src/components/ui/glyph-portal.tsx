import React, {
  useId,
  useRef,
  useLayoutEffect,
  type ReactNode,
  type CSSProperties,
} from 'react'

export interface GlyphPortalProps {
  word?: string
  focusChar?: string
  interactive?: boolean
  background?: ReactNode
  front?: ReactNode
  children?: ReactNode
  scrollLength?: number
  fontFamily?: string
  fontWeight?: number
  annotations?: boolean
  enterLabel?: string
  className?: string
  style?: CSSProperties
  onProgress?: (progress: number) => void
}

function clamp(val: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, val))
}

function smooth(min: number, max: number, val: number): number {
  const h = clamp((val - min) / (max - min))
  return h * h * (3 - 2 * h)
}

const DEFAULT_FONT = '"Arial Black", "Arial", sans-serif'

interface InteriorResult {
  x: number
  y: number
  radius: number
  index?: number
}

function interior(
  ctx: CanvasRenderingContext2D,
  char: string,
  font: string,
): InteriorResult | null {
  const canvas = ctx.canvas
  ctx.font = font
  const metrics = ctx.measureText(char)
  const pad = 8
  const left = Math.ceil(metrics.actualBoundingBoxLeft)
  const top = Math.ceil(metrics.actualBoundingBoxAscent)
  canvas.width = Math.max(
    1,
    Math.ceil(metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight) + pad * 2,
  )
  canvas.height = Math.max(
    1,
    Math.ceil(metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent) + pad * 2,
  )
  ctx.font = font
  ctx.fontKerning = 'none'
  ctx.fillText(char, pad + left, pad + top)
  const { width, height } = canvas
  const data = ctx.getImageData(0, 0, width, height).data
  const table = new Uint16Array(width + 1)
  let maxD = 0
  let maxX = 0
  let maxY = 0
  for (let y = 0; y < height; y++) {
    let prev = 0
    for (let x = 0; x < width; x++) {
      const cur = table[x + 1]
      table[x + 1] =
        data[(y * width + x) * 4 + 3] > 245
          ? Math.min(cur, table[x], prev) + 1
          : 0
      prev = cur
      if (table[x + 1] > maxD) {
        maxD = table[x + 1]
        maxX = x
        maxY = y
      }
    }
  }
  return maxD < 3
    ? null
    : {
        x: (maxX + 1 - maxD / 2 - pad - left) / 3,
        y: (maxY + 1 - maxD / 2 - pad - top) / 3,
        radius: (maxD / 2 - 1) / 3,
      }
}

function scrollParent(el: HTMLElement): HTMLElement | null {
  for (let p = el.parentElement; p; p = p.parentElement) {
    if (
      /(auto|scroll|hidden)/.test(getComputedStyle(p).overflowY) &&
      p !== document.body &&
      p !== document.documentElement
    ) {
      return p
    }
  }
  return null
}

export const GlyphPortal: React.FC<GlyphPortalProps> = ({
  word = 'SUBLIME',
  focusChar,
  interactive = true,
  background,
  front,
  children,
  scrollLength = 2.4,
  fontFamily = DEFAULT_FONT,
  fontWeight = 900,
  annotations = false,
  enterLabel = 'Enter section',
  className,
  style,
  onProgress,
}) => {
  const generatedId = useId().replace(/[^a-zA-Z0-9]/g, '')
  const sectionId = `gp-${generatedId}`
  const clipId = `${sectionId}-clip`

  const rootRef = useRef<HTMLElement | null>(null)
  const startTimeRef = useRef(0)
  const onProgressRef = useRef(onProgress)
  useLayoutEffect(() => {
    onProgressRef.current = onProgress
    if (!startTimeRef.current) {
      startTimeRef.current = Date.now()
    }
  }, [onProgress])

  const safeWord = word.trim().normalize('NFC') || 'SUBLIME'
  const charList = Array.from(safeWord).reduce<Array<{ char: string; index: number }>>(
    (acc, char) => {
      const prevIndex =
        acc.length > 0 ? acc[acc.length - 1].index + acc[acc.length - 1].char.length : 0
      acc.push({ char, index: prevIndex })
      return acc
    },
    [],
  )

  const safeScrollLength = Number.isFinite(scrollLength) ? clamp(scrollLength, 1, 8) : 2.4
  const safeFontWeight = Number.isFinite(fontWeight) ? clamp(fontWeight, 1, 1000) : 900
  const hasFront = front != null
  const hasChildren = children != null
  const selector = `:where(#${sectionId})`

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const pin = root.querySelector<HTMLElement>('[data-gp-pin]')
    const field = root.querySelector<HTMLElement>('[data-gp-field]')
    const art = root.querySelector<SVGSVGElement>('[data-gp-art]')
    const clipEl = root.querySelector<SVGClipPathElement>(`#${clipId}`)
    const glyphText = root.querySelector<SVGTextElement>('[data-gp-glyph]')
    const marks = root.querySelector<SVGGElement>('[data-gp-marks]')
    const choices = root.querySelector<HTMLElement>('[data-gp-choices]')
    const choiceButtons = choices ? Array.from(choices.querySelectorAll<HTMLButtonElement>('button')) : []
    const select = root.querySelector<HTMLSelectElement>('[data-gp-select]')
    const scroller = scrollParent(root)
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d', { willReadFrequently: true })

    if (!pin || !field || !art || !clipEl || !glyphText || !marks || !choices || !select || !ctx) {
      return
    }

    let isDestroyed = false
    let rafId = 0
    let needsMeasure = true
    let isIntersecting = true
    let isInkRead = false
    const startTime = startTimeRef.current
    let isFontReady = false
    let isFontTimedOut = false

    let clientW = 1
    let clientH = 1
    let totalScrollDist = 1
    let baseScale = 1
    let maxScale = 1
    let wordCenter = { x: 0, y: 0 }
    let targetGlyph: (InteriorResult & { index: number }) | null = null
    let lastProgress = -1
    let interiors: Array<InteriorResult & { index: number }> = []
    let charBoxes: Array<{ index: number; x: number; y: number; width: number; height: number }> = []
    let isChoosingActive = false
    let totalBounds = { x: 0, y: 0, width: 1, height: 1 }
    let initialScan = true

    glyphText.style.fontFamily = fontFamily
    const fontFamilies =
      getComputedStyle(glyphText).fontFamily.match(/(?:[^,"']+|"[^"]*"|'[^']*')+/g) ?? []
    const availableFamilies = fontFamilies.filter((f) => {
      try {
        return document.fonts.check(`${safeFontWeight} 100px ${f.trim()}`, safeWord)
      } catch {
        return false
      }
    })
    glyphText.style.fontFamily = [...availableFamilies, DEFAULT_FONT].join(',')
    isFontTimedOut = availableFamilies.length < fontFamilies.length

    const readInk = (): boolean => {
      if (!ctx) return false
      const computed = getComputedStyle(glyphText)
      const bigFont = `${computed.fontWeight} 300px ${computed.fontFamily}`
      ctx.font = `${computed.fontWeight} 100px ${computed.fontFamily}`
      ctx.fontKerning = 'none'

      const totalMetrics = ctx.measureText(safeWord)
      const xOffsets = Array.from(
        { length: safeWord.length },
        (_, idx) => ctx.measureText(safeWord.slice(0, idx)).width,
      )

      totalBounds = {
        x: -totalMetrics.actualBoundingBoxLeft,
        y: -totalMetrics.actualBoundingBoxAscent,
        width: totalMetrics.actualBoundingBoxLeft + totalMetrics.actualBoundingBoxRight,
        height: totalMetrics.actualBoundingBoxAscent + totalMetrics.actualBoundingBoxDescent,
      }

      if (!totalBounds.width || !totalBounds.height) return false

      wordCenter = {
        x: totalBounds.x + totalBounds.width / 2,
        y: totalBounds.y + totalBounds.height / 2,
      }

      const explicitFocusIdx = focusChar ? safeWord.indexOf(focusChar.normalize('NFC')) : -1
      let charIdx = 0
      interiors = []
      charBoxes = []

      for (const char of Array.from(safeWord)) {
        ctx.font = `${computed.fontWeight} 100px ${computed.fontFamily}`
        const m = ctx.measureText(char)
        charBoxes.push({
          index: charIdx,
          x: xOffsets[charIdx] - m.actualBoundingBoxLeft,
          y: -m.actualBoundingBoxAscent,
          width: m.actualBoundingBoxLeft + m.actualBoundingBoxRight,
          height: m.actualBoundingBoxAscent + m.actualBoundingBoxDescent,
        })

        const hole = interior(ctx, char, bigFont)
        if (hole) {
          interiors.push({
            ...hole,
            x: hole.x + xOffsets[charIdx],
            index: charIdx,
          })
        }
        charIdx += char.length
      }

      targetGlyph =
        interiors.find((it) => it.index === explicitFocusIdx) ??
        [...interiors].sort(
          (a, b) => b.radius - a.radius || Math.abs(a.x - wordCenter.x) - Math.abs(b.x - wordCenter.x),
        )[0] ??
        null

      return true
    }

    const selectTarget = (g: (InteriorResult & { index: number }) | null) => {
      targetGlyph = g
      maxScale = targetGlyph
        ? Math.max(baseScale, Math.hypot(clientW, clientH) / (targetGlyph.radius * 1.35))
        : baseScale

      root.dataset.gpFocus = targetGlyph ? Array.from(safeWord.slice(targetGlyph.index))[0] : ''
      root.dataset.gpFocusIndex = String(targetGlyph?.index ?? -1)

      for (const btn of choiceButtons) {
        const isMatch = Number(btn.dataset.gpLetter) === targetGlyph?.index
        btn.disabled = !interiors.some((it) => it.index === Number(btn.dataset.gpLetter))
        btn.setAttribute('aria-checked', String(isMatch))
        btn.tabIndex = isMatch ? 0 : -1
      }

      if (select.value !== '') {
        select.value = String(targetGlyph?.index ?? -1)
      }
      for (const opt of Array.from(select.options)) {
        opt.disabled = opt.value === '' || !interiors.some((it) => it.index === Number(opt.value))
      }

      const inv = 1 / baseScale
      const guideY = totalBounds.y + totalBounds.height + 25 * inv
      const leftX = totalBounds.x
      const rightX = leftX + totalBounds.width
      const crossPath = targetGlyph
        ? `M${targetGlyph.x - 9 * inv} ${targetGlyph.y}h${18 * inv}M${targetGlyph.x} ${targetGlyph.y - 9 * inv}v${18 * inv}`
        : ''
      const pathEl = marks.querySelector('path')
      if (pathEl) {
        pathEl.setAttribute(
          'd',
          `M${leftX} ${guideY}H${rightX}M${leftX} ${guideY - 5 * inv}v${10 * inv}M${rightX} ${guideY - 5 * inv}v${10 * inv}${crossPath}`,
        )
        pathEl.setAttribute('stroke-width', String(inv))
      }
    }

    const calculatePosition = (): number => {
      const topOffset = scroller ? scroller.getBoundingClientRect().top + scroller.clientTop : 0
      return clamp((topOffset - root.getBoundingClientRect().top) / totalScrollDist)
    }

    const paint = (pos: number) => {
      const isMotionOff = reducedMotion.matches || !isFontReady || isFontTimedOut || !targetGlyph
      const prog = isMotionOff ? 0 : pos
      const zoomProgress = clamp(prog / (hasChildren ? 0.78 : 0.94))
      const easedProgress =
        zoomProgress < 0.5
          ? 4 * zoomProgress ** 3
          : 1 - (-2 * zoomProgress + 2) ** 3 / 2

      const currentScale = Math.exp(
        Math.log(baseScale) + Math.log(maxScale / baseScale) * easedProgress,
      )
      const scaleFraction =
        maxScale === baseScale
          ? 0
          : (1 / currentScale - 1 / baseScale) / (1 / maxScale - 1 / baseScale)

      const focusX = wordCenter.x + ((targetGlyph?.x ?? wordCenter.x) - wordCenter.x) * scaleFraction
      const focusY = wordCenter.y + ((targetGlyph?.y ?? wordCenter.y) - wordCenter.y) * scaleFraction
      const rotateDeg = -4 * smooth(0.06, 0.5, zoomProgress) * (1 - smooth(0.62, 0.92, zoomProgress))

      const targetX = clientW / 2
      const targetY = clientH * 0.46 + clientH * 0.04 * easedProgress
      const fullTransform = `translate(${targetX}px, ${targetY}px) scale(${currentScale}) rotate(${rotateDeg}deg) translate(${-focusX}px, ${-focusY}px)`

      const rad = (rotateDeg * Math.PI) / 180
      const centerOffsetX = clientW / 2 / currentScale
      const centerOffsetY = (clientH * 0.46 + clientH * 0.04 * easedProgress) / currentScale

      clipEl.setAttribute('transform', `scale(${currentScale}) rotate(${rotateDeg})`)
      glyphText.setAttribute(
        'transform',
        `translate(${Math.cos(rad) * centerOffsetX + Math.sin(rad) * centerOffsetY - focusX} ${-Math.sin(rad) * centerOffsetX + Math.cos(rad) * centerOffsetY - focusY})`,
      )

      marks.style.transform = fullTransform
      marks.style.opacity = String(1 - smooth(0.015, 0.17, prog))

      isChoosingActive = interactive && !isMotionOff && prog < 0.04
      choices.inert = !isChoosingActive
      root.dataset.gpChoosing = String(isChoosingActive)

      field.style.clipPath = zoomProgress >= 1 ? 'none' : `url(#${clipId})`

      root.style.setProperty('--gp-caption', String(1 - smooth(0.01, 0.16, prog)))
      root.style.setProperty('--gp-reveal', String(isMotionOff ? 1 : smooth(0.78, 0.9, prog)))
      root.style.setProperty(
        '--gp-field-scale',
        String(1 + 0.16 * smooth(0, 0.82, prog)),
      )
      root.style.setProperty('--gp-caption-hit', prog < 0.08 ? 'auto' : 'none')
      root.dataset.gpEntered = String(prog >= 0.9)
      root.dataset.gpProgress = prog.toFixed(5)

      if (prog !== lastProgress) {
        lastProgress = prog
        onProgressRef.current?.(prog)
      }
    }

    const layout = () => {
      if (!root.clientWidth) return
      clientW = pin.clientWidth
      const viewportProbe = root.querySelector<HTMLElement>('[data-gp-viewport]')
      const vpHeight = viewportProbe?.offsetHeight ?? window.innerHeight
      const computedHeight = Math.max(1, Math.min(scroller?.clientHeight ?? vpHeight, vpHeight))

      clientH = reducedMotion.matches ? Math.min(computedHeight * 0.75, 480) : computedHeight
      root.style.setProperty('--gp-height', `${clientH}px`)
      totalScrollDist = clientH * safeScrollLength

      art.setAttribute('viewBox', `0 0 ${clientW} ${clientH}`)

      if (initialScan) {
        isInkRead = readInk()
        initialScan = false
      }
      if (!isInkRead) return

      const maxH = hasFront && clientH < 480
        ? Math.min(clientH * 0.38, Math.max(24, clientH - 264))
        : clientH * 0.38

      baseScale = Math.min((clientW * 0.84) / totalBounds.width, maxH / totalBounds.height)
      selectTarget(targetGlyph)

      for (const btn of choiceButtons) {
        const box = charBoxes.find((b) => b.index === Number(btn.dataset.gpLetter))
        if (box) {
          Object.assign(btn.style, {
            left: `${clientW / 2 + (box.x - wordCenter.x) * baseScale}px`,
            top: `${clientH * 0.46 + (box.y - wordCenter.y) * baseScale - Math.max(0, 44 - box.height * baseScale) / 2}px`,
            width: `${Math.max(1, box.width * baseScale)}px`,
            height: `${Math.max(44, box.height * baseScale)}px`,
          })
        }
      }

      root.style.setProperty('--gp-word-top', `${clientH * 0.46 - (totalBounds.height * baseScale) / 2}px`)
      root.style.setProperty('--gp-word-bottom', `${clientH * 0.46 + (totalBounds.height * baseScale) / 2}px`)
      root.dataset.gpReady = 'true'
      root.dataset.gpMotion = !reducedMotion.matches && isFontReady && !isFontTimedOut && targetGlyph ? 'on' : 'off'
    }

    const tick = (timestamp?: number) => {
      rafId = 0
      if (!isDestroyed) {
        if (timestamp !== undefined && !isFontReady) {
          isFontReady = true
          if (!isFontTimedOut) {
            isFontTimedOut = performance.now() - startTime > 2500
          }
          needsMeasure = true
        }
        if (needsMeasure) {
          needsMeasure = false
          layout()
        }
        if (isInkRead) {
          paint(calculatePosition())
        }
      }
    }

    const scheduleTick = () => {
      if (!rafId && isIntersecting) {
        rafId = requestAnimationFrame(tick)
      }
    }

    const onResize = () => {
      cancelAnimationFrame(rafId)
      needsMeasure = true
      tick()
    }

    const onScroll = () => scheduleTick()

    const onChoiceClick = (e: Event) => {
      if (!isChoosingActive || calculatePosition() >= 0.04) return
      const target = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-gp-letter]')
      const matched = interiors.find((it) => it.index === Number(target?.dataset.gpLetter))
      if (matched && matched !== targetGlyph) {
        selectTarget(matched)
        paint(calculatePosition())
      }
    }

    const onChoiceKey = (e: KeyboardEvent) => {
      if (!isChoosingActive || !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(e.key)) {
        return
      }
      e.preventDefault()
      const currIdx = interiors.findIndex((it) => it === targetGlyph)
      const nextIdx =
        e.key === 'Home'
          ? 0
          : e.key === 'End'
            ? interiors.length - 1
            : (currIdx + (e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 1) + interiors.length) % interiors.length
      const btn = choiceButtons.find((b) => Number(b.dataset.gpLetter) === interiors[nextIdx].index)
      btn?.focus({ preventScroll: true })
    }

    const onSelectChange = () => {
      if (!isChoosingActive || calculatePosition() >= 0.04) return
      const matched = interiors.find((it) => it.index === Number(select.value))
      if (matched) {
        selectTarget(matched)
        paint(calculatePosition())
      }
    }

    choices.addEventListener('pointerover', onChoiceClick)
    choices.addEventListener('click', onChoiceClick)
    choices.addEventListener('focusin', onChoiceClick)
    choices.addEventListener('keydown', onChoiceKey)
    select.addEventListener('change', onSelectChange)

    const resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(root)
    if (scroller) resizeObserver.observe(scroller)

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting
        if (isIntersecting) {
          needsMeasure = true
          scheduleTick()
        } else if (rafId) {
          cancelAnimationFrame(rafId)
          rafId = 0
        }
      },
      { root: scroller, rootMargin: '100% 0px' },
    )
    intersectionObserver.observe(root)

    const scrollTarget = scroller ?? window
    scrollTarget.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    window.visualViewport?.addEventListener('resize', onResize)
    reducedMotion.addEventListener('change', onResize)

    tick()
    scheduleTick()

    return () => {
      isDestroyed = true
      cancelAnimationFrame(rafId)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      scrollTarget.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.visualViewport?.removeEventListener('resize', onResize)
      reducedMotion.removeEventListener('change', onResize)
      choices.removeEventListener('pointerover', onChoiceClick)
      choices.removeEventListener('click', onChoiceClick)
      choices.removeEventListener('focusin', onChoiceClick)
      choices.removeEventListener('keydown', onChoiceKey)
      select.removeEventListener('change', onSelectChange)
    }
  }, [safeWord, focusChar, interactive, fontFamily, safeFontWeight, safeScrollLength, clipId, hasFront, hasChildren])

  return (
    <section
      ref={rootRef}
      id={sectionId}
      className={className}
      aria-label={safeWord}
      style={
        {
          '--gp-length': safeScrollLength,
          '--gp-characters': charList.length,
          ...style,
        } as CSSProperties
      }
    >
      <style>{`
        ${selector} {
          --gp-paper: transparent;
          --gp-ink: #ffffff;
          --gp-field: #ffffff;
          --gp-foreground: #ffffff;
          position: relative;
          isolation: isolate;
          background: transparent;
          color: var(--gp-ink);
          font-family: Arial, sans-serif;
        }
        ${selector} > [data-gp-viewport] {
          position: absolute;
          inset: 0 auto auto 0;
          height: 100vh;
          height: 100svh;
          width: 0;
          pointer-events: none;
          visibility: hidden;
        }
        ${selector} [data-gp-pin] {
          position: relative;
          height: var(--gp-height, 100svh);
          overflow: clip;
          isolation: isolate;
          container-type: size;
          background: transparent;
        }
        ${selector} [data-gp-field] {
          position: absolute;
          inset: 0;
          background: var(--gp-field);
          opacity: 0;
          pointer-events: none;
        }
        ${selector}[data-gp-ready] [data-gp-field] {
          opacity: 1;
        }
        ${selector} [data-gp-art] {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
          pointer-events: none;
        }
        ${selector} [data-gp-marks] {
          fill: none;
          stroke: var(--gp-ink);
          opacity: .6;
        }
        ${selector} [data-gp-choices] {
          position: absolute;
          inset: 0;
          visibility: hidden;
          pointer-events: none;
        }
        ${selector}[data-gp-choosing=true] [data-gp-choices] {
          visibility: visible;
        }
        ${selector} [data-gp-letter] {
          box-sizing: border-box;
          position: absolute;
          border: 0;
          padding: 0;
          margin: 0;
          background: transparent;
          cursor: pointer;
          pointer-events: auto;
          touch-action: pan-y;
        }
        ${selector} [data-gp-letter]:disabled {
          pointer-events: none;
        }
        ${selector} [data-gp-letter]:focus-visible {
          outline: 2px solid var(--gp-field);
          outline-offset: 5px;
        }
        ${selector} [data-gp-touch-picker] {
          display: none;
          position: absolute;
          top: calc(var(--gp-word-bottom, 50%) + 42px);
          left: 50%;
          transform: translateX(-50%);
          font: 12px/1.4 Arial, sans-serif;
          align-items: center;
          gap: 12px;
          visibility: hidden;
        }
        ${selector}[data-gp-choosing=true] [data-gp-touch-picker] {
          visibility: visible;
        }
        ${selector} [data-gp-select] {
          min-height: 44px;
          min-width: 90px;
          border: 1px solid #d8deda;
          border-radius: 4px;
          background: var(--gp-paper);
          color: var(--gp-ink);
          padding: 0 10px;
          font: inherit;
        }
        ${selector} [data-gp-select]:focus-visible {
          outline: 2px solid var(--gp-field);
          outline-offset: 4px;
        }
        @media (any-pointer: coarse) {
          ${selector} [data-gp-touch-picker] {
            display: flex;
          }
        }
        ${selector} [data-gp-fallback] {
          position: absolute;
          inset: 0;
          display: none;
          place-items: center;
          font-size: min(calc(100cqw / var(--gp-characters)), 38cqh);
          line-height: 1;
          color: var(--gp-field);
        }
        ${selector}[data-gp-ready] [data-gp-fallback] {
          visibility: hidden;
        }
        ${selector} [data-gp-caption] {
          position: absolute;
          inset: auto 8% 9%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          font: 12px/1.4 Arial, sans-serif;
          opacity: var(--gp-caption, 1);
          pointer-events: var(--gp-caption-hit, auto);
          font-family: inherit;
        }
        ${selector} [data-gp-front] {
          position: absolute;
          inset: 0;
          opacity: var(--gp-caption, 1);
          pointer-events: none;
        }
        ${selector} [data-gp-front] a,
        ${selector} [data-gp-front] button {
          pointer-events: var(--gp-caption-hit, auto);
        }
        ${selector} [data-gp-front]:focus-within {
          opacity: 1;
        }
        ${selector} [data-gp-hint] {
          max-width: 30ch;
          color: var(--gp-ink);
        }
        ${selector} [data-gp-enter] {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          min-height: 44px;
          color: inherit;
          font: inherit;
          text-decoration: none;
          letter-spacing: inherit;
        }
        ${selector} [data-gp-enter]:focus-visible {
          outline: 2px solid currentColor;
          outline-offset: 5px;
          background: var(--gp-paper);
          color: var(--gp-ink);
          padding: 0 12px;
          margin: 0 -12px;
        }
        ${selector} [data-gp-caption]:focus-within {
          opacity: 1;
          pointer-events: auto;
        }
        ${selector} [data-gp-content] {
          box-sizing: border-box;
          position: relative;
          min-height: var(--gp-height, 100svh);
          padding: clamp(32px, 7%, 100px);
          display: grid;
          align-content: center;
          color: var(--gp-foreground);
          background: var(--gp-field);
          overflow-wrap: anywhere;
        }
        ${selector}[data-gp-motion=on] {
          height: calc((1 + var(--gp-length)) * var(--gp-height, 100svh));
        }
        ${selector}[data-gp-motion=on]:has([data-gp-content]) {
          height: auto;
          min-height: calc((1 + var(--gp-length)) * var(--gp-height, 100svh));
        }
        ${selector}[data-gp-motion=on] [data-gp-pin] {
          position: sticky;
          top: 0;
        }
        ${selector}[data-gp-motion=off] [data-gp-hint] {
          display: none;
        }
        ${selector}[data-gp-motion=on] [data-gp-content] {
          margin-top: calc((var(--gp-length) - 1) * var(--gp-height));
          background: transparent;
          opacity: var(--gp-reveal, 0);
          pointer-events: none;
        }
        ${selector}[data-gp-motion=on][data-gp-entered=true] [data-gp-content] {
          pointer-events: auto;
        }
        ${selector}[data-gp-motion=on]:has([data-gp-content]:focus-within) [data-gp-field] {
          clip-path: none !important;
        }
        ${selector}[data-gp-motion=on] [data-gp-content]:focus-within {
          opacity: 1;
          pointer-events: auto;
        }
        ${selector}:has([data-gp-content]:focus-within) [data-gp-caption],
        ${selector}:has([data-gp-content]:focus-within) [data-gp-marks] {
          opacity: 0;
        }
        ${selector} [data-gp-default-title] {
          color: inherit;
          font: 400 clamp(32px, 5vw, 72px)/1.05 Georgia, serif;
          letter-spacing: -.035em;
          max-width: 13ch;
          margin: 0 0 24px;
          text-wrap: balance;
        }
        ${selector} [data-gp-default-copy] {
          color: inherit;
          font: 16px/1.6 Arial, sans-serif;
          max-width: 36ch;
          margin: 0;
        }
        @media (prefers-reduced-motion: reduce) {
          ${selector} [data-gp-pin] {
            position: relative !important;
          }
          ${selector} [data-gp-content] {
            margin-top: 0 !important;
            opacity: 1 !important;
            background: var(--gp-field) !important;
            min-height: 0;
            padding-block: 64px;
          }
          ${selector} [data-gp-caption] {
            opacity: 1 !important;
          }
          ${selector} [data-gp-hint] {
            display: none;
          }
        }
      `}</style>

      <noscript>
        <style>{`
          ${selector} [data-gp-fallback] { display: grid; }
          ${selector} [data-gp-hint] { display: none; }
        `}</style>
      </noscript>

      <div data-gp-viewport="true" aria-hidden="true" />

      <div data-gp-pin="true">
        <div data-gp-field="true" aria-hidden="true" inert={true}>
          {background ?? (
            <div
              data-gp-default-field="true"
              style={{
                position: 'absolute',
                inset: 0,
                transform: 'scale(var(--gp-field-scale, 1))',
                background:
                  'radial-gradient(circle at 18% 8%, rgba(68,125,98,.72), transparent 34%), radial-gradient(circle at 82% 20%, rgba(251,251,250,.12), transparent 28%), radial-gradient(circle at 48% 78%, rgba(9,48,35,.5), transparent 44%), linear-gradient(135deg, #0b3b2a 0%, #14573f 48%, #082d22 100%)',
              }}
            />
          )}
        </div>

        <svg data-gp-art="true" aria-hidden="true" focusable="false">
          <defs>
            <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
              <text
                data-gp-glyph="true"
                x="0"
                y="0"
                style={{
                  fontFamily,
                  fontWeight: safeFontWeight,
                  fontSize: 100,
                  fontKerning: 'none',
                  fontVariantLigatures: 'none',
                  letterSpacing: 0,
                }}
              >
                {safeWord}
              </text>
            </clipPath>
          </defs>

          <g data-gp-marks="true" style={{ visibility: annotations ? 'visible' : 'hidden' }}>
            <path />
          </g>
        </svg>

        <div
          data-gp-choices="true"
          role="radiogroup"
          aria-label="Choose the letter to enter through"
          inert={true}
        >
          {charList.map(({ char, index }, idx) => (
            <button
              key={index}
              type="button"
              role="radio"
              aria-checked="false"
              tabIndex={-1}
              data-gp-letter={index}
              aria-label={`${char}, letter ${idx + 1} of ${charList.length}`}
            />
          ))}
        </div>

        <label data-gp-touch-picker="true">
          <span
            style={{
              position: 'absolute',
              width: 1,
              height: 1,
              overflow: 'hidden',
              clipPath: 'inset(50%)',
            }}
          >
            Entry letter
          </span>
          <select data-gp-select="true" defaultValue="">
            <option value="" disabled>
              Choose a letter
            </option>
            {charList.map(({ char, index }, idx) => (
              <option key={index} value={index}>
                {idx + 1} · {char}
              </option>
            ))}
          </select>
        </label>

        {front && <div data-gp-front="true">{front}</div>}

        <span
          data-gp-fallback="true"
          aria-hidden="true"
          style={{ fontFamily, fontWeight: safeFontWeight }}
        >
          {safeWord}
        </span>

        {enterLabel && (
          <div data-gp-caption="true">
            <span data-gp-hint="true" aria-hidden="true">
              {interactive ? 'Scroll to enter.' : annotations ? 'A passage through type' : ''}
            </span>
            <a data-gp-enter="true" href={`#${sectionId}-content`}>
              {enterLabel}
              <span aria-hidden="true">↘</span>
            </a>
          </div>
        )}
      </div>

      {children ? (
        <div data-gp-content="true" id={`${sectionId}-content`} tabIndex={-1}>
          {children}
        </div>
      ) : null}
    </section>
  )
}

export default GlyphPortal
