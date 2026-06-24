'use client'

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react'
import { Course } from '../types/Course'
import { calculateGPA } from '../utils/gradeUtils'
import { getCreditHoursBreakdown } from '../utils/creditHours'
import { getGPAAssessment } from '../utils/gpaAssessment'
import { useLocale } from '../i18n/LocaleContext'

interface GPAStickySummaryProps {
  courses: Course[]
}

interface DockMetrics {
  gapWidth: number
  gapCenter: number
  height: number
}

interface AnimFrame {
  top: number
  width: number
  height: number
  padBlock: number
  padInline: number
  radius: number
  blur: number
  glassAlpha: number
  borderAlpha: number
}

const DOCK_GAP = 8
const DOCK_IN_DURATION_MS = 260
const DOCK_OUT_DURATION_MS = 200

const headerGlassStyle: CSSProperties = {
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
}

function readCSSValue(property: string, fallback: number): number {
  if (typeof document === 'undefined') return fallback
  const probe = document.createElement('div')
  probe.style.cssText = `position:absolute;visibility:hidden;padding-top:var(${property})`
  document.body.appendChild(probe)
  const value = parseFloat(getComputedStyle(probe).paddingTop) || fallback
  document.body.removeChild(probe)
  return value
}

function readDockTop(): number {
  return readCSSValue('--space-md', 16)
}

function computeDockMetrics(): DockMetrics | null {
  const howTo = document.querySelector('.how-to-btn')
  const lang = document.querySelector('.language-switcher')
  if (!howTo || !lang) return null
  const howRect = howTo.getBoundingClientRect()
  const langRect = lang.getBoundingClientRect()
  const gapLeft = howRect.right + DOCK_GAP
  const gapRight = langRect.left - DOCK_GAP
  const gapWidth = Math.max(0, gapRight - gapLeft)
  return {
    gapWidth,
    gapCenter: gapLeft + gapWidth / 2,
    height: howRect.height,
  }
}

function measureRestFromSummary(summary: HTMLElement): AnimFrame {
  const rect = summary.getBoundingClientRect()
  return {
    top: rect.top,
    width: rect.width,
    height: rect.height,
    padBlock: readCSSValue('--space-md', 16),
    padInline: readCSSValue('--space-lg', 24),
    radius: readCSSValue('--radius-lg', 16),
    blur: 0,
    glassAlpha: 0.28,
    borderAlpha: 0.5,
  }
}

function measureRestFromSlot(
  root: HTMLElement,
  height: number,
): AnimFrame {
  const rect = root.getBoundingClientRect()
  return {
    top: rect.top,
    width: root.offsetWidth,
    height,
    padBlock: readCSSValue('--space-md', 16),
    padInline: readCSSValue('--space-lg', 24),
    radius: readCSSValue('--radius-lg', 16),
    blur: 0,
    glassAlpha: 0.28,
    borderAlpha: 0.5,
  }
}

function measureDocked(metrics: DockMetrics, dockTop: number): AnimFrame {
  return {
    top: dockTop,
    width: metrics.gapWidth,
    height: metrics.height,
    padBlock: 0,
    padInline: readCSSValue('--space-md', 16),
    radius: readCSSValue('--radius-md', 12),
    blur: 12,
    glassAlpha: 0.3,
    borderAlpha: 0.4,
  }
}

function animFrameToStyle(
  frame: AnimFrame,
  gapCenter: number,
): CSSProperties & Record<string, string | number> {
  return {
    '--gpa-gap-center': `${gapCenter}px`,
    '--gpa-anim-top': `${frame.top}px`,
    '--gpa-anim-width': `${frame.width}px`,
    '--gpa-anim-height': `${frame.height}px`,
    '--gpa-anim-pad-block': `${frame.padBlock}px`,
    '--gpa-anim-pad-inline': `${frame.padInline}px`,
    '--gpa-anim-radius': `${frame.radius}px`,
    '--gpa-anim-blur': `${frame.blur}px`,
    '--gpa-glass-alpha': frame.glassAlpha,
    '--gpa-border-alpha': frame.borderAlpha,
  }
}

export default function GPAStickySummary({ courses }: GPAStickySummaryProps) {
  const { t, locale } = useLocale()
  const rootRef = useRef<HTMLDivElement>(null)
  const summaryRef = useRef<HTMLElement>(null)
  const isDockedRef = useRef(false)
  const animBusyRef = useRef(false)
  const onAnimCompleteRef = useRef<(() => void) | null>(null)

  const [isFloating, setIsFloating] = useState(false)
  const [isDocked, setIsDocked] = useState(false)
  const [isCompact, setIsCompact] = useState(false)
  const [spacerHeight, setSpacerHeight] = useState(0)
  const [dockMetrics, setDockMetrics] = useState<DockMetrics>({
    gapWidth: 320,
    gapCenter: 0,
    height: 36,
  })
  const dockMetricsRef = useRef(dockMetrics)
  const [animFrame, setAnimFrame] = useState<AnimFrame | null>(null)
  const [isUndocking, setIsUndocking] = useState(false)

  const gpa = calculateGPA(courses)
  const creditHoursBreakdown = getCreditHoursBreakdown(courses)
  const { passedCredits } = creditHoursBreakdown
  const assessment = getGPAAssessment(gpa)
  const showAssessment = gpa !== 0

  const updateDockMetrics = useCallback(() => {
    const metrics = computeDockMetrics()
    if (metrics) setDockMetrics(metrics)
  }, [])

  const runAnimation = useCallback(
    (
      from: AnimFrame,
      to: AnimFrame,
      options: {
        compactStart: boolean
        compactEnd: boolean
        undock?: boolean
        onComplete?: () => void
      },
    ) => {
      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      setIsUndocking(options.undock === true)

      if (reducedMotion) {
        setIsFloating(true)
        setAnimFrame(to)
        setIsCompact(options.compactEnd)
        options.onComplete?.()
        animBusyRef.current = false
        return
      }

      animBusyRef.current = true
      onAnimCompleteRef.current = () => {
        animBusyRef.current = false
        options.onComplete?.()
      }

      setIsFloating(true)
      setAnimFrame(from)
      setIsCompact(options.compactStart)

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimFrame(to)
          setIsCompact(options.compactEnd)
        })
      })
    },
    [],
  )

  useLayoutEffect(() => {
    isDockedRef.current = isDocked
  }, [isDocked])

  useLayoutEffect(() => {
    dockMetricsRef.current = dockMetrics
  }, [dockMetrics])

  useLayoutEffect(() => {
    updateDockMetrics()
    window.addEventListener('resize', updateDockMetrics)
    return () => window.removeEventListener('resize', updateDockMetrics)
  }, [updateDockMetrics, locale])

  useLayoutEffect(() => {
    const el = summaryRef.current
    if (!el || !isFloating) return

    const finish = () => {
      if (!onAnimCompleteRef.current) return
      const done = onAnimCompleteRef.current
      onAnimCompleteRef.current = null
      done()
    }

    const onTransitionEnd = (event: TransitionEvent) => {
      if (event.target !== el) return
      if (event.propertyName !== '--gpa-anim-top') return
      finish()
    }

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const durationMs = reducedMotion
      ? 0
      : isUndocking
        ? DOCK_OUT_DURATION_MS
        : DOCK_IN_DURATION_MS
    const fallback = window.setTimeout(finish, durationMs + 40)

    el.addEventListener('transitionend', onTransitionEnd)
    return () => {
      el.removeEventListener('transitionend', onTransitionEnd)
      window.clearTimeout(fallback)
    }
  }, [isFloating, animFrame, isUndocking])

  useLayoutEffect(() => {
    const root = rootRef.current
    const summary = summaryRef.current
    if (!root || !summary) return

    let raf = 0
    const dockTop = readDockTop()

    const evaluate = () => {
      if (animBusyRef.current) return

      const rootRect = root.getBoundingClientRect()
      const shouldDock = rootRect.top <= dockTop + 1

      if (shouldDock && !isDockedRef.current) {
        const metrics = computeDockMetrics()
        if (!metrics) return

        setDockMetrics(metrics)
        setSpacerHeight(summary.offsetHeight)
        isDockedRef.current = true
        setIsDocked(true)

        const from = measureRestFromSummary(summary)
        const to = measureDocked(metrics, dockTop)

        runAnimation(from, to, {
          compactStart: false,
          compactEnd: true,
          undock: false,
          onComplete: () => {
            setAnimFrame(to)
          },
        })
      } else if (!shouldDock && isDockedRef.current) {
        const metrics = computeDockMetrics() ?? dockMetricsRef.current
        const to = measureRestFromSlot(root, spacerHeight || summary.offsetHeight)
        const from = measureDocked(metrics, dockTop)

        runAnimation(from, to, {
          compactStart: true,
          compactEnd: false,
          undock: true,
          onComplete: () => {
            isDockedRef.current = false
            setIsFloating(false)
            setIsDocked(false)
            setIsCompact(false)
            setIsUndocking(false)
            setAnimFrame(null)
          },
        })
      } else if (shouldDock && isDockedRef.current) {
        updateDockMetrics()
      }
    }

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(evaluate)
    }

    evaluate()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [updateDockMetrics, runAnimation, courses.length, spacerHeight])

  if (courses.length === 0) {
    return null
  }

  const summaryClassName = [
    'gpa-sticky-summary',
    isFloating ? 'is-floating' : '',
    isUndocking ? 'is-undocking' : '',
    isCompact ? 'is-compact' : '',
    showAssessment ? 'has-assessment' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const summaryStyle: CSSProperties & Record<string, string | number> = {
    ...(isFloating && animFrame
      ? animFrameToStyle(animFrame, dockMetrics.gapCenter)
      : {}),
    ...(isFloating && isCompact ? headerGlassStyle : {}),
  }

  const reserveSpace = isDocked || isFloating

  return (
    <>
      <style jsx global>{`@property --gpa-anim-top {
  syntax: '<length>';
  inherits: false;
  initial-value: 0px;
}

@property --gpa-anim-width {
  syntax: '<length>';
  inherits: false;
  initial-value: 0px;
}

@property --gpa-anim-height {
  syntax: '<length>';
  inherits: false;
  initial-value: 0px;
}

@property --gpa-anim-blur {
  syntax: '<length>';
  inherits: false;
  initial-value: 0px;
}

@property --gpa-anim-pad-block {
  syntax: '<length>';
  inherits: false;
  initial-value: 0px;
}

@property --gpa-anim-pad-inline {
  syntax: '<length>';
  inherits: false;
  initial-value: 0px;
}

@property --gpa-anim-radius {
  syntax: '<length>';
  inherits: false;
  initial-value: 0px;
}

@property --gpa-glass-alpha {
  syntax: '<number>';
  inherits: false;
  initial-value: 0.28;
}

@property --gpa-border-alpha {
  syntax: '<number>';
  inherits: false;
  initial-value: 0.5;
}

.gpa-sticky-root {
  width: 100%;
}

.gpa-sticky-slot {
  position: relative;
  width: 100%;
}

.gpa-sticky-summary {
  --gpa-dock-duration: 0.26s;
  --gpa-dock-ease: cubic-bezier(0.22, 1, 0.36, 1);

  position: relative;
  z-index: var(--z-sticky);
  width: 100%;
  margin-bottom: var(--space-sm);
  padding: var(--space-md) var(--space-lg);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  background: rgba(255, 255, 255, 0.28);
  border: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

.gpa-sticky-summary.is-floating {
  position: fixed;
  left: var(--gpa-gap-center, 50%);
  right: auto;
  margin: 0;
  z-index: 245;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  isolation: isolate;
  transform: translateX(-50%);
  top: var(--gpa-anim-top);
  width: var(--gpa-anim-width);
  height: var(--gpa-anim-height);
  padding: var(--gpa-anim-pad-block) var(--gpa-anim-pad-inline);
  border-radius: var(--gpa-anim-radius);
  background: rgba(255, 255, 255, var(--gpa-glass-alpha));
  border: 1px solid rgba(255, 255, 255, var(--gpa-border-alpha));
  backdrop-filter: blur(var(--gpa-anim-blur));
  -webkit-backdrop-filter: blur(var(--gpa-anim-blur));
  box-shadow: var(--shadow-sm);
  transition:
    top var(--gpa-dock-duration) var(--gpa-dock-ease),
    width var(--gpa-dock-duration) var(--gpa-dock-ease),
    height var(--gpa-dock-duration) var(--gpa-dock-ease),
    padding var(--gpa-dock-duration) var(--gpa-dock-ease),
    border-radius var(--gpa-dock-duration) var(--gpa-dock-ease),
    background-color var(--gpa-dock-duration) var(--gpa-dock-ease),
    border-color var(--gpa-dock-duration) var(--gpa-dock-ease),
    box-shadow var(--gpa-dock-duration) var(--gpa-dock-ease),
    backdrop-filter var(--gpa-dock-duration) var(--gpa-dock-ease),
    -webkit-backdrop-filter var(--gpa-dock-duration) var(--gpa-dock-ease),
    --gpa-anim-top var(--gpa-dock-duration) var(--gpa-dock-ease),
    --gpa-anim-width var(--gpa-dock-duration) var(--gpa-dock-ease),
    --gpa-anim-height var(--gpa-dock-duration) var(--gpa-dock-ease),
    --gpa-anim-blur var(--gpa-dock-duration) var(--gpa-dock-ease),
    --gpa-anim-pad-block var(--gpa-dock-duration) var(--gpa-dock-ease),
    --gpa-anim-pad-inline var(--gpa-dock-duration) var(--gpa-dock-ease),
    --gpa-anim-radius var(--gpa-dock-duration) var(--gpa-dock-ease),
    --gpa-glass-alpha var(--gpa-dock-duration) var(--gpa-dock-ease),
    --gpa-border-alpha var(--gpa-dock-duration) var(--gpa-dock-ease);
}

.gpa-sticky-summary.is-floating.is-undocking {
  --gpa-dock-duration: 0.2s;
}

/* Docked: match header float buttons (var(--glass-blur) — blur(var()) is unreliable) */
.gpa-sticky-summary.is-floating.is-compact {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  box-shadow: var(--shadow-xs);
}

.gpa-sticky-row {
  display: grid;
  width: 100%;
  align-items: center;
  column-gap: var(--space-md);
  row-gap: var(--space-sm);
}

.gpa-sticky-summary.has-assessment .gpa-sticky-row,
.gpa-sticky-summary:not(.has-assessment) .gpa-sticky-row {
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
}

.gpa-sticky-side {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: var(--space-xs) var(--space-sm);
  min-width: 0;
}

.gpa-sticky-side-start {
  grid-column: 1;
  justify-self: end;
  justify-content: flex-end;
  text-align: end;
}

.gpa-sticky-side-end {
  grid-column: 3;
  justify-self: start;
  justify-content: flex-start;
  text-align: start;
}

.gpa-sticky-center {
  grid-column: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  flex-shrink: 0;
}

.gpa-sticky-label {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--text-secondary);
  transition: font-size var(--gpa-dock-duration) var(--gpa-dock-ease);
}

.gpa-sticky-value {
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--primary-600);
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
  transition: font-size var(--gpa-dock-duration) var(--gpa-dock-ease);
}

.gpa-sticky-scale {
  font-size: var(--text-sm);
  color: var(--text-muted);
  transition: opacity var(--gpa-dock-duration) var(--gpa-dock-ease);
}

.gpa-sticky-credits .gpa-sticky-value {
  font-size: var(--text-xl);
}

.gpa-sticky-unit {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--text-secondary);
  margin-inline-start: var(--space-xs);
  transition: font-size var(--gpa-dock-duration) var(--gpa-dock-ease);
}

.gpa-sticky-divider {
  width: 1px;
  align-self: stretch;
  min-height: 1.5rem;
  background: var(--border-color);
  flex-shrink: 0;
  transition:
    min-height var(--gpa-dock-duration) var(--gpa-dock-ease),
    width var(--gpa-dock-duration) var(--gpa-dock-ease);
}

.gpa-sticky-assessment {
  font-size: var(--text-sm);
  font-weight: 650;
  text-align: center;
  white-space: nowrap;
  line-height: 1.2;
  transition: font-size var(--gpa-dock-duration) var(--gpa-dock-ease);
}

.gpa-sticky-summary.is-compact .gpa-sticky-row {
  column-gap: var(--space-sm);
  row-gap: 0;
  width: 100%;
  max-width: 100%;
}

.gpa-sticky-summary.is-compact .gpa-sticky-value,
.gpa-sticky-summary.is-compact .gpa-sticky-credits .gpa-sticky-value {
  font-size: var(--text-base);
  line-height: 1;
}

.gpa-sticky-summary.is-compact .gpa-sticky-label,
.gpa-sticky-summary.is-compact .gpa-sticky-unit {
  font-size: var(--text-xs);
  line-height: 1.2;
}

.gpa-sticky-summary.is-compact .gpa-sticky-assessment {
  font-size: var(--text-xs);
}

.gpa-sticky-summary.is-compact .gpa-sticky-divider {
  min-height: 1rem;
}

.gpa-sticky-summary.is-compact .gpa-sticky-side {
  flex-wrap: nowrap;
  gap: var(--space-xs);
}

.gpa-sticky-summary.is-compact .gpa-sticky-scale {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 640px) {
  .gpa-sticky-summary.is-compact .gpa-sticky-side-end .gpa-sticky-label {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
}

@media (max-width: 520px) {
  .gpa-sticky-summary:not(.is-floating) .gpa-sticky-row {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
  }

  .gpa-sticky-summary:not(.is-floating) .gpa-sticky-side-start,
  .gpa-sticky-summary:not(.is-floating) .gpa-sticky-side-end {
    grid-column: 1;
    justify-self: center;
    justify-content: center;
    text-align: center;
  }

  .gpa-sticky-summary:not(.is-floating) .gpa-sticky-center {
    grid-column: 1;
    width: min(12rem, 70%);
  }

  .gpa-sticky-summary:not(.is-floating) .gpa-sticky-divider {
    width: 100%;
    height: 1px;
    min-height: 0;
    align-self: center;
  }

  .gpa-sticky-summary.is-compact .gpa-sticky-side-start .gpa-sticky-label {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
}

@media (max-width: 400px) {
  .gpa-sticky-summary.is-compact .gpa-sticky-assessment {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .gpa-sticky-summary.is-compact .gpa-sticky-center .gpa-sticky-divider:last-child {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .gpa-sticky-summary.is-floating,
  .gpa-sticky-value,
  .gpa-sticky-label,
  .gpa-sticky-unit,
  .gpa-sticky-divider,
  .gpa-sticky-assessment,
  .gpa-sticky-scale {
    transition: none;
  }
}`}</style>
      <div ref={rootRef} className="gpa-sticky-root">
        <div
          className="gpa-sticky-slot"
          style={reserveSpace ? { height: spacerHeight } : undefined}
        >
          <section
            ref={summaryRef}
            className={summaryClassName}
            style={summaryStyle}
            aria-label={t('summary.ariaLabel')}
            aria-live="polite"
          >
            <div className="gpa-sticky-row">
              <div className="gpa-sticky-side gpa-sticky-side-start">
                <span className="gpa-sticky-label">{t('gpa.label')}</span>
                <span className="gpa-sticky-value">{gpa.toFixed(2)}</span>
                <span className="gpa-sticky-scale">{t('gpa.outOf')}</span>
              </div>

              {showAssessment ? (
                <div className="gpa-sticky-center" aria-hidden={false}>
                  <div className="gpa-sticky-divider" aria-hidden="true" />
                  <span
                    className="gpa-sticky-assessment"
                    style={{ color: assessment.color }}
                  >
                    {t(assessment.key)}
                  </span>
                  <div className="gpa-sticky-divider" aria-hidden="true" />
                </div>
              ) : (
                <div className="gpa-sticky-center" aria-hidden="true">
                  <div className="gpa-sticky-divider" />
                </div>
              )}

              <div className="gpa-sticky-side gpa-sticky-side-end">
                <span className="gpa-sticky-label">{t('table.totalHoursCompleted')}</span>
                <span className="gpa-sticky-value gpa-sticky-credits-value">
                  {passedCredits}
                  <span className="gpa-sticky-unit">{t('table.hrs')}</span>
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
